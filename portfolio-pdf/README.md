# UI / UX / Product PDF Casebook

This project generates the 26-page portfolio PDF:

```text
dist/安雨鑫-UIUX-Product-作品集.pdf
```

## Hard Limits

- Final file must be 20MB or less.
- Final file must be strictly less than 20,000,000 bytes.
- Target size is 14-18MB, with a hard maximum of 20MB.
- The PDF must contain exactly 26 pages at 960 x 540 points.

## Page Map

```text
1-3   Cover, resume snapshot, portfolio and AIGC overview
4-7   Soundscape
8-11  Renew
12-15 LIGHTMAP
16-19 Lumen
20-23 Flow
24    Badcase Museum
25    Homestyler AIGC workflow
26    Contact and QR codes
```

## Build

From `portfolio-pdf`:

```powershell
$python='C:\Users\anyuxin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $python scripts/prepare-images.py
& $python scripts/generate-shared-assets.py
node scripts/capture-storyboard.cjs
node scripts/build-html.cjs
node scripts/build-pdf.cjs
& $python scripts/validate-pdf.py
```

## Validate

```powershell
& $python scripts/validate-pdf.py
```

Checks:

- 26 pages
- 960 x 540 PDF points
- File size below both 20MB limits
- Minimum extracted text length

## Render QA

```powershell
& $python scripts/render-pages.py
```

Outputs:

- `dist/qa/page-XX.png`
- `dist/qa/contact-sheet.jpg`

The renderer also fails if a blank page is detected.

## QR Codes

The generated QR codes currently target the planned production origin:

```text
https://anyuxin-portfolio.pages.dev/
```

If the final domain changes, update the URLs in `scripts/generate-shared-assets.py`, rerun the shared asset generator, and rebuild the PDF.

## Flow Storyboard

The Flow PDF page uses four stills extracted from:

```text
portfolio-site/projects/flow/showcase/flow-demo-15s.mp4
```

The PDF does not embed video.
