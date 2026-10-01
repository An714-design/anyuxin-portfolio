function optionalChapter(modulePath) {
  try {
    return require(modulePath);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND' && error.message.includes(modulePath)) return [];
    throw error;
  }
}

const pages = [
  ...optionalChapter('./pages/front.cjs'),
  ...optionalChapter('./pages/soundscape.cjs'),
  ...optionalChapter('./pages/renew.cjs'),
  ...optionalChapter('./pages/lightmap.cjs'),
  ...optionalChapter('./pages/lumen.cjs'),
  ...optionalChapter('./pages/flow.cjs'),
  ...optionalChapter('./pages/aigc-close.cjs')
];

function renderBook() {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><link rel="stylesheet" href="../src/styles.css"></head><body>${pages.join('')}</body></html>`;
}

if (require.main === module) process.stdout.write(renderBook());
module.exports = { renderBook };
