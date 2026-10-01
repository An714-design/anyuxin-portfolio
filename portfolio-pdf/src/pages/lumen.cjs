const { page, image, footer } = require('../components.cjs');

const screens = [
  ['01', 'Onboarding', 'media/lumen/screens/01-onboarding.jpg'],
  ['02', '今晚这一页', 'media/lumen/screens/02-home.jpg'],
  ['03', '噪声分类', 'media/lumen/screens/03-checkin.jpg'],
  ['04', '说给夜晚听', 'media/lumen/screens/04-listener.jpg'],
  ['05', '微行动', 'media/lumen/screens/05-micro-action.jpg'],
  ['06', '声音陪伴', 'media/lumen/screens/06-audio-player.jpg'],
  ['07', '睡眠模式', 'media/lumen/screens/07-sleep-mode.jpg'],
  ['08', '夜行公交', 'media/lumen/screens/08-dream-bus.jpg']
];

module.exports = [
  page({
    number: 16,
    accent: '#d8a15e',
    className: 'dark',
    body: `
      <div class="project-hero">
        <div>
          <p class="eyebrow">04 · LUMEN</p>
          <h1>有些夜晚，<br>只需要被经过。</h1>
          <p class="lead">夜猫族的矛盾不是懒，而是想睡，又不想结束今天。直接劝睡会制造对抗，睡眠陪伴应该先接住情绪，再把选择权交还给用户。</p>
          <div class="meta-row"><span>独立完成用户研究与体验</span><span>AI 边界 · 情绪设计</span><span>12 屏 · 夜行叙事</span></div>
        </div>
        <div class="hero-shot">${image('media/lumen/kv/key-visual.jpg', 'Lumen 夜色书房项目主视觉', 'media')}</div>
      </div>
      <div class="insight-strip"><span>目标不是阻止熬夜，而是逐步归还夜间自主感。</span></div>
      ${footer('Lumen · User tension and product opportunity')}
    `
  }),
  page({
    number: 17,
    accent: '#7b6c9d',
    className: 'lumen-night',
    body: `
      <p class="eyebrow">RESEARCH & AI BOUNDARY</p>
      <h2>听得见你，但不一直听着你。</h2>
      <div class="research-grid">
        <article><span>01</span><h3>接住</h3><p>先让用户把噪声说出来，不急着给建议。</p></article>
        <article><span>02</span><h3>命名</h3><p>把模糊烦躁变成可识别的情绪和事件。</p></article>
        <article><span>03</span><h3>延后</h3><p>允许用户暂不处理，保留重新进入的入口。</p></article>
      </div>
      <div class="dual-media">${image('media/lumen/diagrams/weekly-journey.jpg', 'Lumen 七天控制感曲线', 'media')}${image('media/lumen/diagrams/ai-system.jpg', 'Lumen AI 三种存在方式', 'media')}</div>
      <p class="statement">Curator 负责内容整理，Listener 提供有限倾听，Dreamweaver 只在用户主动发起时创造梦境。</p>
      ${footer('Lumen · Research synthesis and AI boundaries')}
    `
  }),
  page({
    number: 18,
    accent: '#d8a15e',
    className: 'lumen-night',
    body: `
      <div class="chapter-head"><div><p class="eyebrow">UI SYSTEM</p><h2>低刺激，不等于低层次。</h2></div><p>午夜蓝、月光金和月白形成克制的夜间层级。默认低音量、低对比、可退出，并通过减少动态效果保护睡眠状态。</p></div>
      <div class="screen-caption-grid dark-grid">
        ${screens.slice(0, 6).map(([no, label, src]) => `<article>${image(src, `${no} ${label}`, 'media')}<span>${no} · ${label}</span></article>`).join('')}
      </div>
      <div class="dual-media bottom">${image('media/lumen/motion/night-bus-poster.jpg', 'Lumen 夜行公交梦境海报', 'media')}${image('media/lumen/screens/12-memory-privacy.jpg', 'Lumen 记忆与隐私设置', 'media')}</div>
      ${footer('Lumen · UI system, night bus and privacy')}
    `
  }),
  page({
    number: 19,
    accent: '#a8c8a0',
    body: `
      <div class="chapter-head"><div><p class="eyebrow">CORE EXPERIENCE</p><h2>用一条夜晚路径完成收束。</h2></div><p>噪声分类到有限倾听，再到微行动、声音陪伴和睡眠模式。用户可以随时延后或退出。</p></div>
      <div class="phone-row compact">${screens.slice(2).map(([no, label, src]) => image(src, `${no} ${label}`, 'phone')).join('')}</div>
      <div class="reflection-row">
        <p><b>AIGC 角色</b> 梦境插画和主视觉用于方向探索，人工统一光源、构图、情绪与品牌叙事。</p>
        <p><b>边界与反思</b> 语音识别、睡眠效果和长期行为改善不能由作品集演示替代。好产品不应让用户永久依赖。</p>
      </div>
      ${footer('Lumen · Core experience, AIGC role and reflection')}
    `
  })
];
