(() => {
  const body = document.body;
  const slug = body.dataset.project;
  if (!slug) return;
  const dock = document.createElement('nav');
  dock.className = 'project-dock';
  dock.setAttribute('aria-label', '作品集项目导航');
  dock.innerHTML = `<a href="../../work/index.html">全部项目</a><span class="current">${body.dataset.projectTitle}</span><a href="${body.dataset.nextHref}">下一个项目</a>`;
  body.appendChild(dock);
})();

