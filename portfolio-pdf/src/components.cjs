function page({ number, accent = '#151515', className = '', body = '' }) {
  const classes = ['page', className].filter(Boolean).join(' ');
  return `<section class="${classes}" style="--accent:${accent}"><div class="page__rail"></div><div class="page__content">${body}</div><span class="page__number">${number}</span></section>`;
}

function image(src, alt, className = '') {
  if (!alt || !alt.trim()) throw new Error('Image alt text is required');
  return `<img class="${className}" src="${src}" alt="${alt}">`;
}

function grid(columns, items) {
  return `<div class="grid-${columns}">${items.join('')}</div>`;
}

function footer(left, right = '安雨鑫 · UI / UX / Product Designer') {
  return `<div class="footer-note"><span>${left}</span><span>${right}</span></div>`;
}

module.exports = { page, image, grid, footer };
