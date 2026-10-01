const { page, image, footer } = require('../components.cjs');

module.exports = [
  page({
    number: 24,
    accent: '#7e74a2',
    body: `
      <div class="chapter-head"><div><p class="eyebrow">AIGC EVIDENCE · 01</p><h2>Badcase 博物馆</h2></div><p>把 AIGC 生图问题变成可复用方法。重点不是展示模型，而是建立问题分类、Prompt Diff、收敛判断和质量门槛。</p></div>
      <div class="badcase-grid">
        <div class="badcase-stat"><strong>12</strong><span>真实 Badcase</span><p>文字 / 风格 / 主体 / 材质 / 构图 5 类</p></div>
        <div class="badcase-stat"><strong>35</strong><span>轮迭代</span><p>记录每次 Prompt 与输出的变化</p></div>
        <div class="badcase-stat"><strong>2.9</strong><span>平均收敛轮次</span><p>用数据判断问题类型和优化路径</p></div>
      </div>
      <div class="diff-panel"><div class="diff-before"><span>Before Prompt</span><p>主体清晰，但光源方向和材质描述冲突。</p></div><div class="diff-after"><span>After Prompt</span><p>拆分为主体、光线、材质、负面约束四个层级。</p></div></div>
      <div class="reflection-row"><p><b>方法</b> 根因筛选与统计让 Prompt 迭代从经验判断变成可复用流程。</p><p><b>边界</b> 这组数据用于说明个人测试过程，不代表商业化生产指标。</p></div>
      ${footer('AIGC Evidence · Badcase Museum')}
    `
  }),
  page({
    number: 25,
    accent: '#e0a93e',
    body: `
      <div class="chapter-head"><div><p class="eyebrow">AIGC EVIDENCE · 02</p><h2>Homestyler AIGC 工作流</h2></div><p>在 3D 家装家居平台实习期间，把素材下载、参考图截取、模型处理、Banner 生成与多语言上架拆成可重复 SOP。</p></div>
      <div class="ops-flow">${['素材下载', '参考图截取', '模型处理', 'Banner 生成', '质量检查', '多语言上架'].map((item, index) => `<span><b>${String(index + 1).padStart(2, '0')}</b>${item}</span>`).join('')}</div>
      <div class="ops-grid">
        <article><span>Automation</span><h3>2 类辅助脚本</h3><p>场景自动整合与四方连续贴图批量生成。</p></article>
        <article><span>Decision</span><h3>Token 成本 vs 准确率</h3><p>3ds Max 模型修改改为人工处理 + AI 辅助脚本。</p></article>
        <article><span>Output</span><h3>500+ 模型质检与上架</h3><p>英语、日语、土耳其语、葡萄牙语等标题与内容。</p></article>
        <article><span>Efficiency</span><h3>3 天缩短至 1 天</h3><p>单项目素材处理周期。</p></article>
      </div>
      <p class="statement">用 SOP、Token 成本和准确率划定 AI 与人工的边界。</p>
      ${footer('AIGC Evidence · Homestyler workflow')}
    `
  }),
  page({
    number: 26,
    accent: '#151515',
    body: `
      <div class="closing-copy">
        <p class="eyebrow">THANK YOU</p>
        <h1>安雨鑫</h1>
        <h2>UI / UX / Product Designer</h2>
        <p>AIGC-oriented product and interface design</p>
        <a href="mailto:18939807980@163.com">18939807980@163.com</a>
      </div>
      <div class="qr-row">
        <figure><img src="media/shared/portfolio-qr.png" alt="作品集网站二维码"><figcaption>作品集网站</figcaption></figure>
        <figure><img src="media/shared/resume-qr.png" alt="简历下载二维码"><figcaption>一页简历</figcaption></figure>
      </div>
      ${footer('Portfolio Casebook · 26 Pages')}
    `
  })
];
