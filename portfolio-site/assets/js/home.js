(() => {
  const grid = document.querySelector('[data-project-grid]');
  if (!grid || !window.PORTFOLIO) return;
  grid.innerHTML = window.PORTFOLIO.projects.map((project, index) => `
    <article class="project-card" style="--accent:${project.accent}">
      <a href="./${project.projectPath}">
        <div class="project-card__no">${String(index + 1).padStart(2, '0')}</div>
        <img src="./${project.cover}" alt="${project.title} 项目封面">
        <div class="project-card__body">
          <p>${project.domain}</p>
          <h3>${project.title}</h3>
          <p>${project.thesis}</p>
          <dl><dt>Role</dt><dd>${project.role}</dd><dt>Duration</dt><dd>${project.duration}</dd></dl>
        </div>
      </a>
    </article>
  `).join('');
})();
