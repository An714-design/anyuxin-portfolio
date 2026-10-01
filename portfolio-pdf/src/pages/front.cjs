const { page, image, footer } = require('../components.cjs');

const projects = [
  ['声场 Soundscape', '让空间音频成为看得见的界面语言。', 'soundscape'],
  ['续费侦探 Renew', '把分散的续费线索，转化为可确认、可行动的订阅决策。', 'renew'],
  ['拾光 LIGHTMAP', '用编号把侦察、拍摄、上传与复盘串成一段完整的城市光影游戏。', 'lightmap'],
  ['光合 Lumen', '睡眠陪伴不是让用户依赖产品，而是逐步获得对夜晚的控制感。', 'lumen'],
  ['Flow 流', '把专注、日程与睡前清空组织成一组可以完成的流。', 'flow']
];

const pages = [
  page({
    number: 1,
    accent: '#e0a93e',
    className: 'dark cover',
    body: `
      <div class="cover__copy">
        <p class="eyebrow">UI / UX / PRODUCT DESIGNER · 2026</p>
        <h1>安雨鑫<br><span>产品 · 体验 · 界面</span></h1>
        <p>从问题定义、用户研究、信息架构到 UI 系统与 AIGC 工作流。</p>
      </div>
      <div class="cover__grid">
        ${projects.map(([title, , slug], index) => `<div class="cover__item item-${index + 1}">${image(`media/covers/${slug}.jpg`, `${title} 项目封面`, 'media')}</div>`).join('')}
      </div>
      ${footer('Portfolio Casebook · 26 Pages')}
    `
  }),
  page({
    number: 2,
    accent: '#7e74a2',
    body: `
      <p class="eyebrow">RESUME SNAPSHOT</p>
      <div class="resume-snapshot">
        <div>
          <h2>安雨鑫</h2>
          <p class="lead">UI / UX / Product Designer · AIGC-oriented</p>
          <div class="fact-list">
            <div><span>Education</span><strong>上海理工大学 · 产品设计</strong><p>GPA 3.6 · 专业排名前 10%</p></div>
            <div><span>Internship</span><strong>Homestyler</strong><p>3D 数字资产运营（AIGC 向）</p></div>
            <div><span>Core Work</span><strong>Badcase 博物馆</strong><p>Prompt Diff · 轮次收敛 · 根因筛选</p></div>
            <div><span>Other Evidence</span><strong>SCI 可视化 · 迪卡侬 CMF</strong><p>科研叙事、趋势调研、材料与色彩方案</p></div>
          </div>
        </div>
        <div class="capability-panel">
          <p class="section-label">CAPABILITIES</p>
          <div class="pill-grid">
            <span>用户研究</span><span>信息架构</span><span>产品逻辑</span><span>交互设计</span><span>UI 系统</span><span>动效原型</span><span>Prompt 设计</span><span>Agent 工作流</span><span>3D 设计</span><span>视觉排版</span>
          </div>
          <div class="stat"><strong>5</strong><span>完整项目案例</span></div>
          <div class="stat"><strong>20</strong><span>项目核心页面</span></div>
        </div>
      </div>
      ${footer('Resume snapshot · Full resume linked from portfolio website')}
    `
  }),
  page({
    number: 3,
    accent: '#8faf88',
    body: `
      <div class="overview-head">
        <div><p class="eyebrow">PORTFOLIO OVERVIEW</p><h2>五个项目，五种视觉世界。</h2></div>
        <p>统一的是设计判断与案例结构，每个项目保留自己的产品逻辑、视觉语言和交互节奏。</p>
      </div>
      <div class="overview-grid">
        ${projects.map(([title, thesis, slug], index) => `<article class="overview-card"><span>${String(index + 1).padStart(2, '0')} · ${title}</span>${image(`media/covers/${slug}.jpg`, `${title} 项目封面`, 'media')}<p>${thesis}</p></article>`).join('')}
      </div>
      <div class="workflow-strip">
        ${['问题定义', '资料整理', 'AI 辅助发散', '人工筛选', 'Prompt 迭代', '视觉与语义一致性', '可用性与质量检查', '人工最终决策'].map((item, index) => `<span><b>${String(index + 1).padStart(2, '0')}</b>${item}</span>`).join('')}
      </div>
      ${footer('Human-in-the-loop AIGC workflow')}
    `
  })
];

module.exports = pages;
