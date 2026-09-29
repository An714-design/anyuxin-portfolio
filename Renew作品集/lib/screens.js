const tokens = require('./tokens');

const FONT = tokens.font.body;
const DISPLAY = tokens.font.display;
const MONO = tokens.font.mono;

const SCREEN_CSS = `
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}
body{font-family:${FONT};background:${tokens.colors.paper};color:${tokens.colors.ink}}
.screen{position:relative;width:390px;height:844px;overflow:hidden;background:${tokens.colors.paper};color:${tokens.colors.ink}}
.screen.dark{background:${tokens.colors.ink};color:${tokens.colors.surface}}
.status{height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;font-size:11px;font-family:${MONO};letter-spacing:.04em;opacity:.68}
.body{padding:12px 24px 0}
.kicker{font-size:10px;line-height:1.3;letter-spacing:.18em;text-transform:uppercase;color:${tokens.colors.signal}}
h1,h2,h3{font-family:${DISPLAY};font-weight:500;letter-spacing:-.03em}
h1{font-size:34px;line-height:1.16}h2{font-size:26px;line-height:1.18}h3{font-size:17px;line-height:1.28}
p{font-size:13px;line-height:1.6;color:rgba(21,21,21,.65)}
.dark p{color:rgba(255,253,248,.65)}.muted{color:${tokens.colors.muted}}
.mono{font-family:${MONO};font-variant-numeric:tabular-nums}
.card{background:${tokens.colors.surface};border:1px solid ${tokens.colors.line};border-radius:${tokens.radius.card}px;padding:16px}
.dark .card{background:rgba(255,253,248,.06);border-color:rgba(255,253,248,.14)}
.row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid ${tokens.colors.line}}
.row:last-child{border-bottom:0;padding-bottom:0}.row:first-child{padding-top:0}
.chip{display:inline-flex;align-items:center;height:28px;padding:0 10px;border-radius:${tokens.radius.pill}px;background:rgba(255,90,54,.12);color:#B83A22;font-size:11px;font-weight:700}
.chip.acid{background:rgba(200,244,90,.18);color:#465B00}.chip.warn{background:rgba(243,181,68,.18);color:#7A5200}
.btn{height:52px;border-radius:${tokens.radius.control}px;display:flex;align-items:center;justify-content:center;background:${tokens.colors.ink};color:${tokens.colors.surface};font-weight:700;font-size:14px}
.btn.ghost{background:transparent;color:inherit;border:1px solid ${tokens.colors.lineStrong}}
.dark .btn{background:${tokens.colors.acid};color:${tokens.colors.ink}}.dark .btn.ghost{border-color:rgba(255,253,248,.25)}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.mini{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:${tokens.colors.muted}}
.source{font-size:11px;line-height:1.45;color:${tokens.colors.muted}}
.confidence{height:6px;border-radius:99px;background:rgba(21,21,21,.08);overflow:hidden}.confidence i{display:block;height:100%;border-radius:99px;background:${tokens.colors.acid}}
.field{border:1px solid ${tokens.colors.line};border-radius:12px;padding:11px 12px;background:rgba(255,253,248,.7)}
.field.warn{border-color:${tokens.colors.warning};background:rgba(243,181,68,.09)}
.field b{display:block;font-size:14px;margin-top:3px}.field span{font-size:10px;color:${tokens.colors.muted}}
.nav{position:absolute;left:0;right:0;bottom:0;height:68px;border-top:1px solid ${tokens.colors.line};display:grid;grid-template-columns:repeat(4,1fr);align-items:center;text-align:center;font-size:10px;color:${tokens.colors.muted};background:rgba(244,240,232,.94)}
.nav b{display:block;font-size:16px;line-height:1;margin-bottom:5px;color:${tokens.colors.ink}}
.dark .nav{background:rgba(21,21,21,.94);border-color:rgba(255,253,248,.12);color:rgba(255,253,248,.48)}.dark .nav b{color:${tokens.colors.surface}}
.phone-bar{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);width:134px;height:5px;border-radius:99px;background:currentColor;opacity:.7}
.amount{font-family:${MONO};font-size:32px;font-weight:700;letter-spacing:-.05em}
.rule{height:1px;background:${tokens.colors.line};margin:14px 0}
.scan{position:relative;overflow:hidden}.scan:after{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:${tokens.colors.signal};animation:scan 900ms ${tokens.motion.easing} infinite}
@keyframes scan{from{transform:translateY(0)}to{transform:translateY(132px)}}
@media(prefers-reduced-motion:reduce){.scan:after{animation:none;transform:translateY(66px)}}
`;

function shell({ theme = 'paper', body }) {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${SCREEN_CSS}</style></head><body><div class="screen ${theme === 'dark' ? 'dark' : ''}"><div class="status"><span>9:41</span><span class="mono">Renew · DEMO</span><span>5G ▰</span></div>${body}<div class="phone-bar"></div></div></body></html>`;
}

const screens = [
  {
    id: '01-onboarding',
    label: '把续费变透明',
    html: shell({
      body: `<div class="body"><div class="kicker">Renew · Subscription Detective</div><h1 style="margin-top:12px">把偷偷续费，<br>变成看得见的支出。</h1><p style="margin-top:16px;max-width:310px">导入账单、邮件或截图，Renew 帮你识别订阅、标记下一次续费，再决定要不要继续。</p><div class="card" style="margin-top:26px"><div class="row"><div><h3>01 · 导入线索</h3><p>账单、邮件和截图都可以。</p></div><span class="chip">识别</span></div><div class="row"><div><h3>02 · 确认订阅</h3><p>低置信度字段由你确认。</p></div><span class="chip acid">确认</span></div><div class="row"><div><h3>03 · 处理续费</h3><p>保留、暂停、降级或取消。</p></div><span class="chip warn">行动</span></div></div><div class="btn" style="margin-top:18px">导入第一张账单</div><div class="btn ghost" style="margin-top:10px">先手动添加一个订阅</div><p class="source" style="margin-top:14px">不接入银行卡密码，不保存完整邮件。当前为作品集演示数据。</p></div>`
    })
  },
  {
    id: '02-import-center',
    label: '导入一条线索',
    html: shell({
      body: `<div class="body"><div class="kicker">01 · Import</div><h2 style="margin-top:9px">导入一条线索</h2><p style="margin-top:10px">选择一种方式，Renew 只读取你主动提供的文件。</p><div class="card scan" style="margin-top:20px;padding:22px"><div class="mini">主要入口</div><h3 style="margin-top:8px">上传账单截图</h3><p style="margin-top:6px">支持 png、jpg 和 pdf，演示数据将在本地模拟解析。</p><div class="btn" style="margin-top:16px">选择文件</div></div><div class="grid-2" style="margin-top:12px"><div class="card"><span class="chip">邮件</span><h3 style="margin-top:10px">转发邮件</h3><p>复制邮件内容或上传截图。</p></div><div class="card"><span class="chip acid">手动</span><h3 style="margin-top:10px">手动添加</h3><p>已知道金额和周期时更快。</p></div></div><div class="rule"></div><div class="row"><span>最近导入</span><span class="mono">9 月 18 日 · 2 条线索</span></div></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  },
  {
    id: '03-detection-queue',
    label: '识别队列',
    html: shell({
      body: `<div class="body"><div class="kicker">02 · Review</div><h2 style="margin-top:9px">需要确认 2 个字段</h2><p style="margin-top:8px">高置信度线索已整理，低置信度字段会保留原文来源。</p><div class="card" style="margin-top:18px"><div class="row"><div><h3>StreamMax</h3><p>9 月 18 日 · 来自邮件截图</p></div><span class="chip acid">98%</span></div><div class="confidence"><i style="width:98%"></i></div><p class="source" style="margin-top:10px">金额 ¥68.00 · 月付 · 下次续费 10 月 18 日</p></div><div class="card" style="margin-top:12px"><div class="row"><div><h3>CloudBox</h3><p>9 月 20 日 · 来自 PDF 账单</p></div><span class="chip warn">需确认</span></div><div class="field warn" style="margin-top:12px"><span>币种 · 请检查</span><b>USD $12.99</b></div><div class="field warn" style="margin-top:10px"><span>周期 · 请检查</span><b>年付 / 月付？</b></div></div><div class="btn" style="margin-top:16px">确认高置信度项目</div><div class="btn ghost" style="margin-top:10px">逐条检查</div></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  },
  {
    id: '04-confirmation-editor',
    label: '确认识别结果',
    html: shell({
      body: `<div class="body"><div class="kicker">03 · Confirm</div><h2 style="margin-top:9px">确认识别结果</h2><p style="margin-top:8px">每个字段都保留来源。你修改后，续费雷达会立即更新。</p><div class="card" style="margin-top:16px"><div class="row"><span>商户</span><b>CloudBox</b></div><div class="row"><span>金额</span><b class="mono">$12.99</b></div><div class="row"><span>周期</span><b>年付</b></div><div class="field warn" style="margin-top:12px"><span>下次续费日 · 低置信度</span><b class="mono">2026-10-20</b></div><div class="source" style="margin-top:8px">来源：CloudBox_Bill_2026.pdf</div></div><div class="card" style="margin-top:12px;background:rgba(200,244,90,.1)"><div class="row" style="border-bottom:0"><div><h3>Renew 判断</h3><p>金额较高，年付周期。建议加入雷达后观察。</p></div><span class="chip acid">保留</span></div></div><div class="btn" style="margin-top:18px">加入续费雷达</div><div class="btn ghost" style="margin-top:10px">修改字段</div></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  }
];

module.exports = { screens, shell, SCREEN_CSS };
