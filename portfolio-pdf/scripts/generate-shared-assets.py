from pathlib import Path
from PIL import Image
import subprocess

root = Path(__file__).resolve().parents[1]
shared = root / "dist" / "media" / "shared"
shared.mkdir(parents=True, exist_ok=True)

# Minimal QR encoder for Version 4-L, byte mode, mask 0.
EXP = [0] * 512
LOG = [0] * 256
x = 1
for i in range(255):
    EXP[i] = x
    LOG[x] = i
    x <<= 1
    if x & 0x100:
        x ^= 0x11D
for i in range(255, 512):
    EXP[i] = EXP[i - 255]

def gf_mul(a, b):
    if a == 0 or b == 0:
        return 0
    return EXP[LOG[a] + LOG[b]]

def rs_generator(degree):
    poly = [1]
    for i in range(degree):
        poly.append(0)
        for j in range(len(poly) - 1, 0, -1):
            poly[j] = poly[j - 1] ^ gf_mul(poly[j], EXP[i])
        poly[0] = gf_mul(poly[0], EXP[i])
    return poly

def rs_remainder(data, degree):
    gen = rs_generator(degree)
    result = [0] * degree
    for value in data:
        factor = value ^ result[0]
        result = result[1:] + [0]
        if factor:
            for i in range(degree):
                result[i] ^= gf_mul(gen[i + 1], factor)
    return result

def append_bits(bits, value, length):
    for i in range(length - 1, -1, -1):
        bits.append((value >> i) & 1)

def make_data_codewords(text):
    payload = text.encode("utf-8")
    if len(payload) > 78:
        raise ValueError("QR payload exceeds Version 4-L byte capacity")
    bits = []
    append_bits(bits, 0b0100, 4)
    append_bits(bits, len(payload), 8)
    for byte in payload:
        append_bits(bits, byte, 8)
    capacity = 80 * 8
    append_bits(bits, 0, min(4, capacity - len(bits)))
    while len(bits) % 8:
        bits.append(0)
    data = [int("".join(str(bit) for bit in bits[i:i+8]), 2) for i in range(0, len(bits), 8)]
    pads = [0xEC, 0x11]
    while len(data) < 80:
        data.append(pads[(len(data) - len(bits)//8) % 2])
    return data

def format_bits(ecc_bits, mask):
    data = (ecc_bits << 3) | mask
    rem = data
    for _ in range(10):
        rem = (rem << 1) ^ ((rem >> 9) * 0x537)
    return ((data << 10) | rem) ^ 0x5412

def build_qr(text):
    version = 4
    size = version * 4 + 17
    matrix = [[0] * size for _ in range(size)]
    function = [[False] * size for _ in range(size)]

    def set_module(x, y, dark):
        if 0 <= x < size and 0 <= y < size:
            matrix[y][x] = 1 if dark else 0

    def draw_finder(cx, cy):
        for dy in range(-4, 5):
            for dx in range(-4, 5):
                x = cx + dx
                y = cy + dy
                if not (0 <= x < size and 0 <= y < size):
                    continue
                dist = max(abs(dx), abs(dy))
                set_module(x, y, dist == 0 or dist in (2, 3))
                function[y][x] = True

    draw_finder(3, 3)
    draw_finder(size - 4, 3)
    draw_finder(3, size - 4)

    for i in range(8, size - 8):
        set_module(i, 6, i % 2 == 0)
        set_module(6, i, i % 2 == 0)
        function[6][i] = True
        function[i][6] = True

    center = 26
    for dy in range(-2, 3):
        for dx in range(-2, 3):
            dist = max(abs(dx), abs(dy))
            set_module(center + dx, center + dy, dist == 0 or dist == 2)
            function[center + dy][center + dx] = True

    set_module(8, 4 * version + 9, True)
    function[4 * version + 9][8] = True

    for i in range(6):
        function[i][8] = True
    function[7][8] = True
    function[8][8] = True
    function[8][7] = True
    for i in range(9, 15):
        function[8][14 - i] = True
    for i in range(8):
        function[8][size - 1 - i] = True
    for i in range(8, 15):
        function[size - 15 + i][8] = True
    function[size - 8][8] = True

    data = make_data_codewords(text)
    codewords = data + rs_remainder(data, 20)
    bits = []
    for codeword in codewords:
        append_bits(bits, codeword, 8)

    bit_index = 0
    upward = True
    right = size - 1
    while right >= 1:
        if right == 6:
            right -= 1
        for vert in range(size):
            y = size - 1 - vert if upward else vert
            for j in range(2):
                x = right - j
                if function[y][x]:
                    continue
                if bit_index < len(bits):
                    matrix[y][x] = bits[bit_index]
                    bit_index += 1
        upward = not upward
        right -= 2

    for y in range(size):
        for x in range(size):
            if not function[y][x] and (x + y) % 2 == 0:
                matrix[y][x] ^= 1

    bits_format = format_bits(0b01, 0)
    def fbit(i):
        return (bits_format >> i) & 1
    for i in range(6):
        set_module(8, i, fbit(i))
    set_module(8, 7, fbit(6))
    set_module(8, 8, fbit(7))
    set_module(7, 8, fbit(8))
    for i in range(9, 15):
        set_module(14 - i, 8, fbit(i))
    for i in range(8):
        set_module(size - 1 - i, 8, fbit(i))
    for i in range(8, 15):
        set_module(8, size - 15 + i, fbit(i))
    set_module(8, size - 8, True)
    return matrix

def save_qr(text, output):
    matrix = build_qr(text)
    scale = 12
    quiet = 4
    size = len(matrix)
    image = Image.new("RGB", ((size + quiet * 2) * scale, (size + quiet * 2) * scale), "white")
    pixels = image.load()
    for y, row in enumerate(matrix):
        for x, value in enumerate(row):
            if value:
                for py in range((y + quiet) * scale, (y + quiet + 1) * scale):
                    for px in range((x + quiet) * scale, (x + quiet + 1) * scale):
                        pixels[px, py] = (0, 0, 0)
    image.save(output, "PNG", optimize=True)

portfolio_url = "https://anyuxin-portfolio.pages.dev/"
resume_url = "https://anyuxin-portfolio.pages.dev/resume/"
flow_url = "https://anyuxin-portfolio.pages.dev/projects/flow/"
save_qr(portfolio_url, shared / "portfolio-qr.png")
save_qr(resume_url, shared / "resume-qr.png")
save_qr(flow_url, shared / "flow-qr.png")

print({"qr": [portfolio_url, resume_url, flow_url]})



