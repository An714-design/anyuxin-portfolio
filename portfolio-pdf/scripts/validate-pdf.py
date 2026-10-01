from pathlib import Path
from pypdf import PdfReader

pdf = Path("dist/安雨鑫-UIUX-Product-作品集.pdf")
assert pdf.exists(), "PDF missing"
size = pdf.stat().st_size
assert size <= 20 * 1024 * 1024, f"PDF exceeds 20 MiB: {size}"
assert size < 20_000_000, f"PDF is not below 20,000,000 bytes: {size}"
reader = PdfReader(str(pdf))
assert len(reader.pages) == 26, f"Expected 26 pages, found {len(reader.pages)}"
extracted = []
for page in reader.pages:
    width = float(page.mediabox.width)
    height = float(page.mediabox.height)
    assert abs(width - 960) < 1, f"Unexpected width: {width}"
    assert abs(height - 540) < 1, f"Unexpected height: {height}"
    extracted.append(page.extract_text() or "")
text_length = len("".join(extracted))
assert text_length >= 1200, f"PDF text extraction too small: {text_length}"
print({"bytes": size, "pages": len(reader.pages), "text_length": text_length, "target_max": 20_000_000})
