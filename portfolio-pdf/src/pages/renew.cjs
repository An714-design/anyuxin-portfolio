const { page, image, footer } = require('../components.cjs');

module.exports = [
  page({
    number: 8,
    accent: '#c8f45a',
    body: `
      <div class="project-hero">
        <div>
          <p class="eyebrow">02 · RENEW</p>
          <h1>把分散的续费线索，<br>变成可确认的订阅决策。</h1>
          <p class="lead">用户的问题不是不会记账，而是不知道下周会扣什么、哪些订阅已经失去价值，以及取消应该从哪里开始。</p>
          <div class="meta-row"><span>独立完成产品与体验</span><span>概念项目 · 端到端设计</span><span>产品逻辑 · IA · UI</span></div>
        </div>
        <div class="hero-shot">${image('media/renew/kv/key-visual.jpg', 'Renew 续费雷达项目主视觉', 'media')}</div>
      </div>
      <div class="persona-strip">
        <div><span>Persona</span><strong>林知夏 · 27 岁 · 互联网运营</strong></div>
        <div><span>Pain 01</span><p>续费日期分散，看不见未来支出。</p></div>
        <div><span>Pain 02</span><p>提醒发生得太晚，错过取消窗口。</p></div>
        <div><span>Pain 03</span><p>取消路径不透明，不知道从哪里开始。</p></div>
      </div>
      ${footer('Renew · Opportunity and user problem')}
    `
  }),
  page({
    number: 9,
    accent: '#151515',
    className: 'renew-dark',
    body: `
      <p class="eyebrow">PRODUCT LOGIC</p>
      <h2>从记录历史，走向处理决定。</h2>
      <div class="logic-chain">${['线索', '订阅库', '续费雷达', '风险优先级', '行动', '再次验证'].map((item, index) => `<span><b>${String(index + 1).padStart(2, '0')}</b>${item}</span>`).join('')}</div>
      <div class="media-wide light">${image('media/renew/diagrams/information-architecture.jpg', 'Renew 信息架构图', 'media')}</div>
      <p class="statement">AI 负责识别，用户负责确认。</p>\n      <div class="two-callouts">
        <p><b>AI 负责识别</b> 提取商户、金额、周期和日期，并保留来源与置信度。</p>
        <p><b>用户负责确认</b> 低置信度字段必须修正，系统不把识别结果直接当成扣费事实。</p>
      </div>
      ${footer('Renew · Information architecture and AI role')}
    `
  }),
  page({
    number: 10,
    accent: '#f3b544',
    body: `
      <div class="chapter-head"><div><p class="eyebrow">DECISION SYSTEM</p><h2>用一张雷达回答：最近会被扣什么钱？</h2></div><p>中心是今天，轨道按时间展开。风险由金额、使用频率和价格变化共同决定，帮助用户安排处理顺序，而不是制造焦虑。</p></div>
      <div class="media-wide">${image('media/renew/screens/05-renewal-radar.jpg', 'Renew 续费雷达界面', 'media')}</div>
      <div class="risk-grid">
        <article><span>High Risk</span><h3>7 天内高风险</h3><p>金额高、使用少或刚涨价，进入首页最高优先级。</p></article>
        <article><span>Attention</span><h3>30 天内需关注</h3><p>显示在日历内圈，可选择延后提醒。</p></article>
        <article><span>Handled</span><h3>已处理或暂停</h3><p>不继续打扰，但保留来源并等待再次验证。</p></article>
      </div>
      ${footer('Renew · Radar and risk model')}
    `
  }),
  page({
    number: 11,
    accent: '#ff5a36',
    body: `
      <div class="chapter-head"><div><p class="eyebrow">ACTION & TRUST</p><h2>取消不是一次按钮点击。</h2></div><p>取消助手只提供步骤、入口和模板，不自动取消，也不替用户执行取消。系统不接入银行卡密码，不保存完整邮件，并把来源与凭证保留给用户。</p></div>
      <div class="media-wide">${image('media/renew/diagrams/cancellation-flow.jpg', 'Renew 取消流程与凭证图', 'media')}</div>
      <div class="reflection-row">
        <p><b>有效续费决策</b> 用户完成一次明确决定，而不是被产品说服继续付费。</p>
        <p><b>边界</b> AI 建议、用户确认、可修改、可撤回。识别准确率、支付平台规则和合规边界仍需真实接入验证。</p>
      </div>
      ${footer('Renew · Cancellation flow, metrics and limitations')}
    `
  })
];

