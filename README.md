# 安雨鑫 UI / UX / Product Portfolio

Static portfolio website for five complete UI/UX projects, plus the AIGC workflow and design decision map.

## Preview

From `portfolio-site`:

```powershell
node scripts/serve.cjs
```

Open `http://127.0.0.1:4173/`.

## Full Verification

```powershell
node --test
node scripts/validate-site.cjs
node scripts/visual-check.cjs
```

The visual check generates 24 screenshots in `qa/`:

- 12 routes
- 1440 x 900 desktop
- 390 x 844 mobile

## Deploy Root

Deploy the contents of `portfolio-site/` as a static site.

Supported hosts:

- Cloudflare Pages
- GitHub Pages
- Vercel static hosting
- Any static HTTP server

No build command or runtime dependency is required.

## Routes

```text
/
/work/
/thinking/
/aigc-process/
/about/
/resume/
/contact/
/projects/soundscape/
/projects/renew/
/projects/lightmap/
/projects/lumen/
/projects/flow/
```

## Media Rule

The only retained video is:

```text
projects/flow/showcase/flow-demo-15s.mp4
```

The Flow 38-second video, LIGHTMAP video, and Lumen motion iframes have been removed.

## Resume

Download entry:

```text
resume/安雨鑫-UIUX-Product-简历.pdf
```

## Sitemap

Generate a production sitemap after the deployment domain is known:

```powershell
$env:SITE_ORIGIN='https://your-domain.example'
node scripts/generate-sitemap.cjs
```

For local verification, the default origin is `http://127.0.0.1:4173`.
