(() => {
  const grid = document.querySelector('[data-decision-grid]');
  const projects = window.PORTFOLIO?.projects || [];
  const decisions = window.PORTFOLIO?.decisions || [];
  if (!grid) return;
  grid.innerHTML = decisions.map((record, index) => {
    const project = projects.find(item => item.slug === record.slug);
    return `
      <article class="decision-card" style="--accent:${project?.accent || '#151515'}">
        <div class="decision-card__head"><span>${String(index + 1).padStart(2, '0')}</span><h2><a href="../${project?.projectPath || ''}">${project?.title || record.slug}</a></h2></div>
        <div class="decision-card__grid">
          <div><small>Problem</small><p>${record.problem}</p></div>
          <div><small>Tension</small><p>${record.tension}</p></div>
          <div><small>Decision</small><p>${record.decision}</p></div>
          <div><small>Rejected</small><p>${record.rejected}</p></div>
          <div><small>Rationale</small><p>${record.rationale}</p></div>
          <div><small>Unresolved</small><p>${record.unresolved}</p></div>
        </div>
      </article>
    `;
  }).join('');
})();
