(() => {
  const grid = document.querySelector('[data-project-grid]');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const projects = window.PORTFOLIO?.projects || [];
  if (!grid) return;
  const render = filter => {
    const visible = filter === 'all' ? projects : projects.filter(project => project.capabilities.includes(filter));
    grid.innerHTML = visible.map((project, index) => `<a class="work-row" style="--accent:${project.accent}" href="../${project.projectPath}"><span class="work-row__no">${String(index + 1).padStart(2, '0')}</span><img src="../${project.cover}" alt="${project.title} 项目封面"><span class="work-row__meta">${project.domain}</span><strong>${project.title}</strong><small>${project.thesis}</small></a>`).join('');
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  };
  buttons.forEach(button => button.addEventListener('click', () => render(button.dataset.filter)));
  render('all');
})();
