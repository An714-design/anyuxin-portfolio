(() => {
  const body = document.body;
  if (!body.dataset.project) return;
  const gridIcon = `<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="3" width="5" height="5" rx="1"></rect><rect x="12" y="3" width="5" height="5" rx="1"></rect><rect x="3" y="12" width="5" height="5" rx="1"></rect><rect x="12" y="12" width="5" height="5" rx="1"></rect></svg>`;
  const prevIcon = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4.5 7 10l5.5 5.5"></path></svg>`;
  const nextIcon = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7.5 4.5 5.5 5.5-5.5 5.5"></path></svg>`;
  const dock = document.createElement('nav');
  dock.className = 'project-dock';
  dock.setAttribute('aria-label', '项目切换');
  dock.innerHTML = [
    `<a href="../../work/index.html" aria-label="全部项目" title="全部项目">${gridIcon}</a>`,
    `<a href="${body.dataset.prevHref}" aria-label="上一个项目" title="上一个项目">${prevIcon}</a>`,
    `<a href="${body.dataset.nextHref}" aria-label="下一个项目" title="下一个项目">${nextIcon}</a>`
  ].join('');
  body.appendChild(dock);
})();
