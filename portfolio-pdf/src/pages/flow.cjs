const { page, image, footer } = require('../components.cjs');

const screens = [
  ['01', '今日 Bento', 'media/flow/screens/01-today.jpg'],
  ['02', '今日意图', 'media/flow/screens/02-intention.jpg'],
  ['03', '专注设置', 'media/flow/screens/03-focus-setup.jpg'],
  ['04', '专注计时', 'media/flow/screens/04-focus-running.jpg'],
  ['05', '分心提醒', 'media/flow/screens/05-distraction.jpg'],
  ['06', '完成一个流', 'media/flow/screens/06-complete.jpg'],
  ['07', '日程时间轴', 'media/flow/screens/07-schedule.jpg'],
  ['08', '日复盘', 'media/flow/screens/08-review.jpg'],
  ['09', '专注统计', 'media/flow/screens/09-stats.jpg'],
  ['10', '睡前清空', 'media/flow/screens/10-winddown.jpg']
];

module.exports = [
  page({
    number: 20,
    accent: '#8faf88',
    body: `
      <div class="project-hero">
        <div>
          <p class="eyebrow">05 · FLOW</p>
          <h1>专注，<br>像水一样。</h1>
          <p class="lead">专注工具容易同时制造更多任务和更多打断。Flow 用 Bento 模块承载单个动作，再用一条完整的流串联意图、专注、复盘与睡前清空。</p>
          <div class="meta-row"><span>独立完成 UI 系统与动效</span><span>10 屏 · 15 秒演示</span><span>Bento · Calm · Interaction</span></div>
        </div>
        <div class="hero-shot">${image('media/flow/kv/key-visual.jpg', 'Flow Calm 主视觉', 'media')}</div>
      </div>
      <div class="logic-chain calm">${['设定意图', '选择任务', '专注运行', '处理分心', '完成复盘', '睡前清空'].map((item, index) => `<span><b>${String(index + 1).padStart(2, '0')}</b>${item}</span>`).join('')}</div>
      ${footer('Flow · Problem, positioning and Calm principles')}
    `
  }),
  page({
    number: 21,
    accent: '#8faf88',
    body: `
      <div class="chapter-head"><div><p class="eyebrow">BENTO SYSTEM</p><h2>每一屏，一个主要动作。</h2></div><p>Bento 网格不是卡片堆叠，而是用尺寸表达优先级。鼠尾草绿、暖沙、雾蓝与留白共同降低认知负担。</p></div>
      <div class="screen-caption-grid compact-grid">
        ${screens.slice(0, 6).map(([no, label, src]) => `<article>${image(src, `${no} ${label}`, 'media')}<span>${no} · ${label}</span></article>`).join('')}
      </div>
      <div class="system-strip calm"><span>#F4F3EF</span><span>#8FAF88</span><span>#DCE7D8</span><span>#EDE7DA</span><span>#D3E0CE</span><span>One screen · One action</span></div>
      ${footer('Flow · Bento information architecture')}
    `
  }),
  page({
    number: 22,
    accent: '#6e8f6a',
    body: `
      <div class="chapter-head"><div><p class="eyebrow">UI & MOTION</p><h2>完成一个流，而不是刷新一组数据。</h2></div><p>组件层级围绕专注状态变化：等待、运行、分心、完成、复盘。动效使用缓入缓出与轻微位移，避免弹跳和惩罚感。</p></div>
      <div class="screen-caption-grid compact-grid">
        ${screens.slice(4).map(([no, label, src]) => `<article>${image(src, `${no} ${label}`, 'media')}<span>${no} · ${label}</span></article>`).join('')}
      </div>
      <div class="system-strip calm"><span>Bento module</span><span>Timer ring</span><span>Intent chip</span><span>Review card</span><span>Calm motion</span><span>Reduced motion</span></div>
      ${footer('Flow · UI system, components and motion principles')}
    `
  }),
  page({
    number: 23,
    accent: '#8faf88',
    body: `
      <div class="chapter-head"><div><p class="eyebrow">15-SECOND STORYBOARD</p><h2>15 秒精华版 · 唯一保留的动态演示。</h2></div><p>品牌 → 首页 → 专注 → 完成 → 复盘 → 睡前 → 品牌收尾。PDF 不嵌入视频，用四张关键帧保留节奏。</p></div>
      <div class="storyboard-grid">
        ${[1, 2, 3, 4].map(index => `<figure>${image(`media/flow/flow-storyboard-0${index}.jpg`, `Flow 15 秒演示第 ${index} 帧`, 'media')}<span>Frame 0${index}</span></figure>`).join('')}
      </div>
      <div class="qr-panel"><img src="media/shared/flow-qr.png" alt="Flow 网站演示二维码"><div><b>扫码查看 15 秒演示</b><p>网站只保留这一条动态内容，其他项目使用静态关键帧。</p></div></div>
      <div class="reflection-row"><p><b>取舍</b> 分心提醒允许结束，不用惩罚感强迫用户继续。</p><p><b>反思</b> 不同工作节奏下的个性化提醒和长期专注改善仍需真实使用验证。</p></div>
      ${footer('Flow · Complete flow, storyboard and reflection')}
    `
  })
];
