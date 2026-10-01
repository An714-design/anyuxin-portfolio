const { page, image, footer } = require('../components.cjs');

const screens = [
  ['01', '首页 · 现在就听', 'media/soundscape/images/4_461.jpg'],
  ['02', '正在播放', 'media/soundscape/images/4_408.jpg'],
  ['03', '空间电台', 'media/soundscape/images/4_536.jpg'],
  ['04', '歌单详情', 'media/soundscape/images/4_679.jpg'],
  ['05', '沉浸可视化', 'media/soundscape/images/4_753.jpg'],
  ['06', '我的', 'media/soundscape/images/4_823.jpg']
];

module.exports = [
  page({
    number: 4,
    accent: '#7e74a2',
    body: `
      <div class="project-hero">
        <div>
          <p class="eyebrow">01 · SOUNDSCAPE</p>
          <h1>让空间音频<br>成为看得见的界面语言。</h1>
          <p class="lead">空间音频正在成为移动端听歌的新常态，但主流音乐 App 仍以二维歌单组织内容。用户难以感知声音方位，也不容易理解如何进入沉浸体验。</p>
          <div class="meta-row"><span>独立完成 UI/UX</span><span>6 周 · 3 轮迭代</span><span>用户旅程 · 信息架构 · 视觉系统</span></div>
        </div>
        <div class="hero-shot">${image('media/soundscape/images/4_384.jpg', 'Soundscape 项目主视觉', 'media')}</div>
      </div>
      <div class="insight-strip"><span>目标不是做更多播放功能，而是让空间感先被理解，再被操作。</span></div>
      ${footer('Soundscape · Problem and positioning')}
    `
  }),
  page({
    number: 5,
    accent: '#5e9aa8',
    body: `
      <p class="eyebrow">USER JOURNEY</p>
      <h2>三个场景，一条情绪曲线。</h2>
      <div class="scene-grid">
        <article><span>Commute</span><h3>通勤</h3><p>从拥挤环境中快速进入自己的声音空间。</p></article>
        <article><span>Exercise</span><h3>运动</h3><p>让空间变化和节奏共同推动身体状态。</p></article>
        <article><span>Sleep</span><h3>睡前</h3><p>降低刺激，用方位和包围感帮助情绪收束。</p></article>
      </div>
      <div class="media-wide">${image('media/soundscape/images/4_607.jpg', 'Soundscape 用户旅程与情绪曲线', 'media')}</div>
      <div class="three-notes">
        <p><b>Insight 01</b> 用户先感知方位，才会理解空间音频的价值。</p>
        <p><b>Insight 02</b> 播放页必须同时保留操控清晰度。</p>
        <p><b>Insight 03</b> 场景比曲风更适合作为推荐入口。</p>
      </div>
      ${footer('Soundscape · Research and journey')}
    `
  }),
  page({
    number: 6,
    accent: '#7e74a2',
    body: `
      <div class="chapter-head"><div><p class="eyebrow">VISUAL SYSTEM</p><h2>把声音画成同心波场。</h2></div><p>视觉系统用低饱和紫、青、玫瑰色降低长时间聆听的刺激。空间可视化由同心波场、方向节点和波形条共同构成。</p></div>
      <div class="phone-row compact">${screens.slice(0, 4).map(([no, label, src]) => image(src, `${no} ${label}`, 'phone')).join('')}</div>
      <div class="system-strip"><span>#F3F2F8</span><span>#5E9AA8</span><span>#7E74A2</span><span>#B08696</span><span>Type · Spatial clarity</span><span>Component · Wave / Node / Player</span></div>
      ${footer('Soundscape · UI system and visualization')}
    `
  }),
  page({
    number: 7,
    accent: '#b08696',
    body: `
      <div class="chapter-head"><div><p class="eyebrow">CORE EXPERIENCE</p><h2>六屏完成一次沉浸。</h2></div><p>从首页发现、播放控制、空间电台到沉浸可视化，操作始终围绕同一套方位语言展开。</p></div>
      <div class="screen-caption-grid">
        ${screens.map(([no, label, src]) => `<article>${image(src, `${no} ${label}`, 'media')}<span>${no} · ${label}</span></article>`).join('')}
      </div>
      <div class="reflection-row"><p><b>取舍</b> 沉浸感不能以牺牲可读性为代价。最终把可视化放在播放控制之外，不替代基础操作。</p><p><b>反思</b> 真实空间音频设备、不同听力条件和耳机差异仍需要后续可用性验证。</p></div>
      ${footer('Soundscape · Core experience and reflection')}
    `
  })
];

