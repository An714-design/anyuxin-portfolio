from pathlib import Path
from PIL import Image, ImageOps
import json
import shutil

root = Path(__file__).resolve().parents[1]
site = root.parent / "portfolio-site"
out = root / "dist" / "media"
if not (site / "content" / "projects.json").exists():
    raise SystemExit("Missing portfolio-site content")
if out.exists():
    shutil.rmtree(out)
out.mkdir(parents=True, exist_ok=True)

sources = {
    "covers": site / "assets" / "covers",
    "soundscape": site / "projects" / "soundscape",
    "renew": site / "projects" / "renew",
    "lightmap": site / "projects" / "lightmap",
    "lumen": site / "projects" / "lumen",
    "flow": site / "projects" / "flow",
}
allowed = {".png", ".jpg", ".jpeg", ".webp"}
manifest = []
for slug, source in sources.items():
    if not source.exists():
        continue
    for file in sorted(source.rglob("*")):
        if not file.is_file() or file.suffix.lower() not in allowed:
            continue
        rel = file.relative_to(source)
        target = out / slug / rel.with_suffix(".jpg")
        target.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(file) as image:
            image = ImageOps.exif_transpose(image)
            if image.width > 1400:
                height = round(image.height * (1400 / image.width))
                image = image.resize((1400, height), Image.Resampling.LANCZOS)
            if image.mode not in ("RGB", "L"):
                background = Image.new("RGB", image.size, "white")
                if image.mode == "RGBA":
                    background.paste(image, mask=image.getchannel("A"))
                else:
                    background.paste(image)
                image = background
            else:
                image = image.convert("RGB")
            image.save(target, "JPEG", quality=82, optimize=True, progressive=True)
            manifest.append({"source": str(file), "output": str(target.relative_to(root)), "width": image.width, "height": image.height})
(root / "dist" / "media-manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
total = sum((root / item["output"]).stat().st_size for item in manifest)
print(json.dumps({"files": len(manifest), "bytes": total}, ensure_ascii=False))

