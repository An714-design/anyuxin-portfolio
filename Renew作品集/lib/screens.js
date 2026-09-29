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
.radar{position:relative;width:286px;height:286px;margin:18px auto 4px;border-radius:50%;background:${tokens.colors.paper};border:1px solid rgba(21,21,21,.08)}
.radar-ring{position:absolute;inset:0;border-radius:50%;border:1px dashed rgba(21,21,21,.14)}
.radar-ring.two{inset:31px}.radar-ring.three{inset:62px}
.radar-center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:72px;height:72px;border-radius:50%;background:${tokens.colors.ink};color:${tokens.colors.surface};display:grid;place-items:center;text-align:center;font-size:11px}
.radar-node{position:absolute;width:18px;height:18px;border-radius:50%;background:${tokens.colors.signal};outline:6px solid rgba(255,90,54,.12)}
.radar-node.yellow{background:${tokens.colors.warning};outline:6px solid rgba(243,181,68,.14)}
.radar-node.gray{background:${tokens.colors.muted};outline:6px solid rgba(139,135,126,.12)}
.radar-label{position:absolute;font-family:${MONO};font-size:9px;padding:4px 6px;border-radius:6px;background:${tokens.colors.surface};border:1px solid ${tokens.colors.line};white-space:nowrap}
.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-top:18px}
.day{height:56px;border:1px solid ${tokens.colors.line};border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:11px;background:rgba(255,253,248,.55)}
.day b{font-family:${MONO};font-size:13px}.day i{width:6px;height:6px;border-radius:50%;background:${tokens.colors.signal};margin-top:5px}.day.active{border-color:${tokens.colors.ink};background:${tokens.colors.ink};color:${tokens.colors.surface}}.day.active i{background:${tokens.colors.acid}}
.price-bars{height:96px;display:flex;align-items:flex-end;gap:10px;margin-top:18px;padding:0 4px}
.price-bar{flex:1;border-radius:8px 8px 3px 3px;background:rgba(21,21,21,.12);position:relative}.price-bar.on{background:${tokens.colors.ink}}.price-bar span{position:absolute;left:50%;bottom:-22px;transform:translateX(-50%);font-family:${MONO};font-size:9px;color:${tokens.colors.muted}}
.step{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid ${tokens.colors.line}}.step:last-child{border-bottom:0}
.step-num{width:28px;height:28px;flex:0 0 auto;border-radius:50%;display:grid;place-items:center;background:${tokens.colors.ink};color:${tokens.colors.surface};font-family:${MONO};font-size:11px}
.step.done .step-num{background:${tokens.colors.acid};color:${tokens.colors.ink}}
.check{width:22px;height:22px;border-radius:7px;border:1px solid ${tokens.colors.lineStrong};display:grid;place-items:center;font-size:12px}.check.on{background:${tokens.colors.acid};border-color:${tokens.colors.acid}}
.stamp{display:inline-flex;align-items:center;justify-content:center;height:34px;padding:0 12px;border:1px solid ${tokens.colors.signal};color:${tokens.colors.signal};border-radius:6px;font-family:${MONO};font-size:11px;letter-spacing:.08em;transform:rotate(-3deg)}
.swatch{height:54px;border-radius:12px;border:1px solid ${tokens.colors.line};display:flex;align-items:flex-end;padding:8px;color:${tokens.colors.surface};font-family:${MONO};font-size:9px}.swatch.light{color:${tokens.colors.ink}}
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
  ,
  {
    id: '05-renewal-radar',
    label: '续费雷达',
    html: shell({
      body: `<div class="body"><div class="kicker">Renewal Radar · 模拟数据</div><h2 style="margin-top:8px">未来 7 天<br>将扣 ¥186.00</h2><div class="radar"><div class="radar-ring"></div><div class="radar-ring two"></div><div class="radar-ring three"></div><div class="radar-center"><b>今天</b><span>10.02</span></div><div class="radar-node" style="left:228px;top:44px"></div><div class="radar-label" style="left:242px;top:28px">StreamMax ¥68</div><div class="radar-node yellow" style="left:56px;top:94px"></div><div class="radar-label" style="left:10px;top:72px">CloudBox $12.99</div><div class="radar-node gray" style="left:202px;top:216px"></div><div class="radar-label" style="left:220px;top:218px">Music+ 保留</div></div><div class="card"><div class="row"><div><h3>StreamMax</h3><p>10 月 18 日 · 月付</p></div><b class="mono">¥68.00</b></div><div class="row"><div><h3>CloudBox</h3><p>10 月 20 日 · 年付 · 需检查</p></div><b class="mono">$12.99</b></div></div><p class="source" style="margin-top:12px">节点位置和金额均为作品集模拟数据。</p></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  },
  {
    id: '06-renewal-calendar',
    label: '续费日历',
    html: shell({
      body: `<div class="body"><div class="kicker">Calendar · October</div><h2 style="margin-top:8px">续费日历</h2><p style="margin-top:8px">看到扣费节奏，也看到哪些日子会集中支出。</p><div class="calendar-grid"><div class="day"><span>一</span><b>5</b></div><div class="day"><span>二</span><b>6</b></div><div class="day active"><span>三</span><b>7</b><i></i></div><div class="day"><span>四</span><b>8</b></div><div class="day"><span>五</span><b>9</b></div><div class="day"><span>六</span><b>10</b></div><div class="day"><span>日</span><b>11</b></div><div class="day"><span>一</span><b>12</b></div><div class="day"><span>二</span><b>13</b></div><div class="day"><span>三</span><b>14</b></div><div class="day"><span>四</span><b>15</b></div><div class="day"><span>五</span><b>16</b></div><div class="day"><span>六</span><b>17</b></div><div class="day"><span>日</span><b>18</b><i></i></div></div><div class="card" style="margin-top:16px"><div class="row"><span>本月预计</span><b class="mono">¥486.00</b></div><div class="row"><span>高风险项目</span><b>2 个</b></div><div class="row"><span>待验证取消</span><b>1 个</b></div></div><p class="source" style="margin-top:12px">日历和金额为模拟数据。</p></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  },
  {
    id: '07-subscription-detail',
    label: '订阅详情',
    html: shell({
      body: `<div class="body"><div class="kicker">Subscription · CloudBox</div><div class="row" style="margin-top:10px;border-bottom:0;padding:0"><div><h2>CloudBox</h2><p>云存储 · 年付</p></div><span class="chip warn">需检查</span></div><div class="card" style="margin-top:16px"><span class="mini">下次续费</span><div class="amount" style="margin-top:6px">$12.99</div><p class="mono">2026-10-20 · 还有 18 天</p><div class="rule"></div><span class="mini">价格变化</span><div class="price-bars"><div class="price-bar" style="height:48%"><span>2023</span></div><div class="price-bar" style="height:58%"><span>2024</span></div><div class="price-bar on" style="height:84%"><span>2025</span></div><div class="price-bar on" style="height:100%"><span>2026</span></div></div></div><div class="card" style="margin-top:16px"><div class="row"><span>最近使用</span><b>62 天前</b></div><div class="row"><span>识别来源</span><b>PDF 账单</b></div><div class="row"><span>当前判断</span><b>建议观察</b></div></div><div class="grid-2" style="margin-top:16px"><div class="btn">取消订阅</div><div class="btn ghost">暂时保留</div></div><p class="source" style="margin-top:12px">使用记录和价格变化均为模拟数据。</p></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  },
  {
    id: '08-cancel-assistant',
    label: '取消助手',
    html: shell({
      body: `<div class="body"><div class="kicker">Cancel Assistant · 4 steps</div><h2 style="margin-top:8px">取消前检查</h2><p style="margin-top:8px">先确认剩余权益、导出内容和取消后的生效时间。</p><div class="card" style="margin-top:16px"><div class="step done"><div class="step-num">✓</div><div><h3>导出内容</h3><p>确认云盘文件已备份。</p></div></div><div class="step done"><div class="step-num">✓</div><div><h3>确认剩余权益</h3><p>取消后仍可使用到 10 月 20 日。</p></div></div><div class="step"><div class="step-num">3</div><div><h3>打开取消入口</h3><p>在账户设置中找到“管理订阅”。</p></div></div><div class="step"><div class="step-num">4</div><div><h3>保存取消凭证</h3><p>截图或记录确认邮件。</p></div></div></div><div class="card" style="margin-top:12px"><div class="mini">客服话术模板</div><p style="margin-top:8px">“你好，我希望取消当前 CloudBox 年付订阅，并确认不会在下个周期自动续费。请提供取消确认编号。”</p></div><div class="btn" style="margin-top:16px">复制话术并开始</div><div class="btn ghost" style="margin-top:10px">我还不想取消</div><div class="stamp" style="margin-top:18px">DEMO CANCEL FLOW</div></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  },
  {
    id: '09-savings-report',
    label: '节省报告',
    html: shell({
      body: `<div class="body"><div class="kicker">Savings · October</div><h2 style="margin-top:8px">预计节省</h2><div class="amount" style="margin-top:10px">¥816</div><p>来自 3 个已经确认取消的订阅。金额为模拟数据。</p><div class="card" style="margin-top:16px"><div class="row"><div><h3>StreamMax</h3><p>已取消 · 月付</p></div><b class="mono">¥68</b></div><div class="row"><div><h3>CloudBox</h3><p>等待确认 · 年付</p></div><b class="mono">$12.99</b></div><div class="row"><div><h3>FocusKit</h3><p>已取消 · 月付</p></div><b class="mono">¥45</b></div></div><div class="card" style="margin-top:12px;background:rgba(200,244,90,.12)"><div class="row" style="border-bottom:0"><div><h3>下一次验证</h3><p>10 月 20 日再次检查是否扣费。</p></div><span class="chip acid">已安排</span></div></div></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  },
  {
    id: '10-privacy-settings',
    label: '隐私与设置',
    html: shell({
      body: `<div class="body"><div class="kicker">Privacy · Your boundary</div><h2 style="margin-top:8px">不保存完整邮件</h2><p style="margin-top:8px">Renew 只保留识别所需的字段，并显示每一条信息的来源。</p><div class="card" style="margin-top:16px"><div class="row"><div><h3>不接入银行卡密码</h3><p>演示版本不连接任何真实支付账户。</p></div><span class="check on">✓</span></div><div class="row"><div><h3>不保存完整邮件</h3><p>只保留商户、金额、周期和续费日。</p></div><span class="check on">✓</span></div><div class="row"><div><h3>允许删除识别记录</h3><p>单条删除或清除全部演示数据。</p></div><span class="check on">✓</span></div></div><div class="card" style="margin-top:12px"><span class="mini">演示数据声明</span><p style="margin-top:7px">当前所有订阅名称、金额和日期均为作品集模拟数据，不代表真实用户或真实交易。</p></div><div class="grid-2" style="margin-top:16px"><div class="btn">导出数据</div><div class="btn ghost">删除全部</div></div></div><div class="nav"><div><b>⌂</b>首页</div><div><b>◷</b>日历</div><div><b>▤</b>订阅</div><div><b>↘</b>节省</div></div>`
    })
  }
];

module.exports = { screens, shell, SCREEN_CSS };
