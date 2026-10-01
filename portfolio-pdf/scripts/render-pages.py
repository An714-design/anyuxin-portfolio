from pathlib import Path
from PIL import Image
import json
import shutil
import subprocess

root = Path(__file__).resolve().parents[1]
pdf = root / "dist" / "安雨鑫-UIUX-Product-作品集.pdf"
qa = root / "dist" / "qa"
if qa.exists():
    shutil.rmtree(qa)
qa.mkdir(parents=True, exist_ok=True)
pdftoppm = Path(r"C:\Users\anyuxin\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe")
subprocess.run([str(pdftoppm), "-png", "-r", "110", str(pdf), str(qa / "page")], check=True)
files = sorted(qa.glob("page-*.png"))
if len(files) != 26:
    raise SystemExit(f"Expected 26 rendered pages, found {len(files)}")
thumbs = []
stats = []
for file in files:
    with Image.open(file) as image:
        image = image.convert("RGB")
        sample = image.resize((80, 45))
        pixels = list(sample.get_flattened_data() if hasattr(sample, "get_flattened_data") else sample.getdata())
        non_white = sum(1 for r, g, b in pixels if r < 245 or g < 245 or b < 245) / len(pixels)
        stats.append({"page": file.name, "width": image.width, "height": image.height, "non_white": round(non_white, 3)})
        thumb = image.copy()
        thumb.thumbnail((320, 180), Image.Resampling.LANCZOS)
        thumbs.append(thumb)
cols, rows = 5, 6
cell_w, cell_h = 336, 204
sheet = Image.new("RGB", (cols * cell_w, rows * cell_h), "#dfdbd3")
for index, thumb in enumerate(thumbs):
    x = (index % cols) * cell_w + (cell_w - thumb.width) // 2
    y = (index // cols) * cell_h + (cell_h - thumb.height) // 2
    sheet.paste(thumb, (x, y))
sheet.save(qa / "contact-sheet.jpg", "JPEG", quality=88, optimize=True)
blank = [item for item in stats if item["non_white"] < 0.01]
print(json.dumps({"pages": len(files), "blank_pages": blank, "contact_sheet": str(qa / "contact-sheet.jpg")}, ensure_ascii=False))
if blank:
    raise SystemExit("Blank pages detected")



