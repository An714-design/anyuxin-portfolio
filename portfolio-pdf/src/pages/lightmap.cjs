const { page, image, footer } = require('../components.cjs');

const screenData = [
  ['作战终端', 'media/lightmap/images/2_2.jpg'],
  ['光影侦察地图', 'media/lightmap/images/2_3.jpg'],
  ['光线窗口时间轴', 'media/lightmap/images/2_4.jpg'],
  ['作战简报', 'media/lightmap/images/2_5.jpg'],
  ['影像档案', 'media/lightmap/images/2_6.jpg'],
  ['行动结算', 'media/lightmap/images/3_527.jpg']
];

module.exports = [
  page({
    number: 12,
    accent: '#e0a93e',
    className: 'dark',
    body: `
      <div class="project-hero">
        <div>
          <p class="eyebrow">03 · LIGHTMAP</p>
          <h1>追逐一束光，<br>完成一段城市侦察。</h1>
          <p class="lead">把城市光影发现、实地拍摄和影像归档组织成一套游戏化流程。玩家不是为了刷任务，而是为了在一天中捕捉一次不可复制的光线。</p>
          <div class="meta-row"><span>独立完成世界观与体验</span><span>完整设计系统</span><span>游戏循环 · UX · UI</span></div>
        </div>
        <div class="hero-shot">${image('media/lightmap/images/2_1.jpg', 'LIGHTMAP 城市光影项目主视觉', 'media')}</div>
      </div>
      <div class="tactical-strip"><span>#141619</span><span>#DAD3C1</span><span>#E0A93E</span><span>#668B5B</span><span>#6687A2</span><span>#B4412E</span></div>
      ${footer('LIGHTMAP · Worldview and target experience')}
    `
  }),
  page({
    number: 13,
    accent: '#6687a2',
    className: 'lightmap-paper',
    body: `
      <p class="eyebrow">GAME LOOP</p>
      <h2>一次完整的追光闭环。</h2>
      <div class="game-loop">${['发现', '侦察', '抵达', '拍摄', '上传', '复盘'].map((item, index) => `<span><b>${String(index + 1).padStart(2, '0')}</b>${item}</span>`).join('')}</div>
      <div class="media-wide">${image('media/lightmap/images/3_529.jpg', 'LIGHTMAP 核心玩法循环图', 'media')}</div>
      <div class="three-notes">
        <p><b>动机层</b> 光线窗口和地点稀缺性形成探索欲。</p>
        <p><b>任务层</b> 编号把一次行动固定在可追踪的目标上。</p>
        <p><b>奖励层</b> 底片、评级和档案提供可回看的成果。</p>
      </div>
      ${footer('LIGHTMAP · Gameplay loop and UX structure')}
    `
  }),
  page({
    number: 14,
    accent: '#e0a93e',
    className: 'dark',
    body: `
      <div class="chapter-head"><div><p class="eyebrow">UI SYSTEM</p><h2>战术终端，不是装饰主题。</h2></div><p>深墨底、羊皮纸、战术金和编号系统共同服务于任务状态、光线窗口和风险判断。字体按标题、读数、正文分工。</p></div>
      <div class="screen-caption-grid dark-grid">
        ${screenData.map(([label, src]) => `<article>${image(src, `LIGHTMAP ${label}`, 'media')}<span>${label}</span></article>`).join('')}
      </div>
      ${footer('LIGHTMAP · UI system and six screens')}
    `
  }),
  page({
    number: 15,
    accent: '#b4412e',
    body: `
      <div class="chapter-head"><div><p class="eyebrow">ONE NUMBER · FOUR SCREENS</p><h2>编号 03 · 外滩观景平台</h2></div><p>玩家在地图上锁定的目标，会一路追到详情、拍摄与结算。编号不是装饰，而是稳定的任务锚点。</p></div>
      <div class="chain-grid">
        <article><span>01</span><h3>地图 · 锁定</h3>${image('media/lightmap/images/2_3.jpg', '地图锁定编号 03', 'media')}</article>
        <article><span>02</span><h3>详情 · 阅读窗口</h3>${image('media/lightmap/images/2_4.jpg', '详情查看光线窗口', 'media')}</article>
        <article><span>03</span><h3>拍摄 · 执行行动</h3>${image('media/lightmap/images/2_5.jpg', '拍摄行动简报', 'media')}</article>
        <article><span>04</span><h3>结算 · 回顾成果</h3>${image('media/lightmap/images/2_6.jpg', '行动结算与影像归档', 'media')}</article>
      </div>
      <div class="reflection-row"><p><b>取舍</b> 游戏感必须服务于目标识别，不能只靠视觉噪声制造刺激。</p><p><b>反思</b> 长期游戏循环、真实玩家留存和不同城市的任务密度仍需后续测试。</p></div>
      ${footer('LIGHTMAP · Cross-screen continuity and reflection')}
    `
  })
];
