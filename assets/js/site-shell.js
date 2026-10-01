(() => {
  const base = document.documentElement.dataset.base || '.';
  const active = document.body.dataset.page || '';
  const links = [
    ['work', 'Work'],
    ['thinking', 'Thinking'],
    ['aigc-process', 'AIGC'],
    ['about', 'About'],
    ['resume', 'Resume'],
    ['contact', 'Contact']
  ];
  const href = key => `${base}/${key === 'work' ? 'work/' : `${key}/`}`;
  document.querySelectorAll('[data-site-header]').forEach(node => {
    node.innerHTML = `<header class="site-header"><div class="wrap site-nav"><a class="brand" href="${base}/">安雨鑫 / UI · UX · Product</a><nav class="nav-links" aria-label="主导航">${links.map(([key, label]) => `<a href="${href(key)}"${active === key ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav></div></header>`;
  });
  document.querySelectorAll('[data-site-footer]').forEach(node => {
    node.innerHTML = `<footer class="site-footer"><div class="wrap"><strong>Open to UI / UX / Product Designer roles.</strong><p><a href="mailto:18939807980@163.com">18939807980@163.com</a></p></div></footer>`;
  });
})();
