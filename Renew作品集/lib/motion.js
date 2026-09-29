const tokens = require('./tokens');

const BASE = `
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}
body{font-family:${tokens.font.body};background:${tokens.colors.paper};color:${tokens.colors.ink}}
.scene{position:relative;width:1600px;height:1000px;overflow:hidden;background:${tokens.colors.paper}}
.mono{font-family:${tokens.font.mono};font-variant-numeric:tabular-nums}
.display{font-family:${tokens.font.display};font-weight:500;letter-spacing:-.05em}
.kicker{font-family:${tokens.font.mono};font-size:14px;letter-spacing:.2em;text-transform:uppercase;color:${tokens.colors.signal}}
.caption{font-size:16px;line-height:1.6;color:rgba(21,21,21,.64)}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;

const keyVisual = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${BASE}
.scene{background:${tokens.colors.ink};color:${tokens.colors.surface}}
.grid{position:absolute;inset:0;background:none}
.copy{position:absolute;left:92px;top:92px;z-index:2}.copy h1{font-size:148px;line-height:.86;margin-top:22px}.copy h1 span{display:block;color:${tokens.colors.acid};font-size:78px;letter-spacing:-.02em;margin-top:16px}.copy p{max-width:620px;color:rgba(255,253,248,.64);font-size:21px;line-height:1.55;margin-top:34px}.meta{position:absolute;left:96px;bottom:72px;display:flex;gap:12px}.meta b{font-family:${tokens.font.mono};font-size:12px;font-weight:500;padding:10px 14px;border:1px solid rgba(255,253,248,.22);border-radius:999px;color:rgba(255,253,248,.72)}
.radar{position:absolute;right:70px;top:90px;width:720px;height:720px;border-radius:50%;border:2px solid ${tokens.colors.signal}
.radar:before,.radar:after{content:"";position:absolute;border-radius:50%;border:1px solid rgba(255,253,248,.18)}.radar:before{inset:112px}.radar:after{inset:224px}
.axis-x{position:absolute;right:70px;top:450px;width:720px;height:1px;background:rgba(255,253,248,.18)}.axis-y{position:absolute;right:430px;top:90px;width:1px;height:720px;background:rgba(255,253,248,.18)}
.node{position:absolute;width:28px;height:28px;border-radius:50%;background:${tokens.colors.signal};outline:9px solid rgba(255,90,54,.14)}.node.a{right:160px;top:172px}.node.b{right:594px;top:274px}.node.c{right:240px;top:650px}.node.d{right:674px;top:610px}.node.e{right:440px;top:438px;background:${tokens.colors.acid};outline:9px solid rgba(200,244,90,.14)}
.center{position:absolute;right:378px;top:378px;width:144px;height:144px;border-radius:50%;background:${tokens.colors.surface};color:${tokens.colors.ink};display:grid;place-items:center;text-align:center;font-size:15px;font-weight:700}.center span{display:block;font-family:${tokens.font.mono};font-size:11px;font-weight:400;color:${tokens.colors.muted};margin-top:5px}
</style></head><body><div class="scene"><div class="grid"></div><div class="copy"><div class="kicker">UI/UX Case Study · Simulation only</div><h1>续费侦探<span>Renew</span></h1><p>把分散在账单、邮件和截图里的订阅，整理成一张可读、可信、可行动的续费地图。</p></div><div class="radar"></div><div class="axis-x"></div><div class="axis-y"></div><div class="node a"></div><div class="node b"></div><div class="node c"></div><div class="node d"></div><div class="node e"></div><div class="center">今天<span>10.02</span></div><div class="meta"><b>识别线索</b><b>续费雷达</b><b>取消助手</b></div></div></body></html>`;

const radarOrbit = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${BASE}
.scene{background:${tokens.colors.ink};color:${tokens.colors.surface}}
.head{position:absolute;left:76px;top:70px}.head h1{font-size:68px;margin-top:10px}.head p{max-width:580px;color:rgba(255,253,248,.64);font-size:18px;line-height:1.55;margin-top:18px}
.stage{position:absolute;right:60px;top:80px;width:820px;height:820px}.ring{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(255,253,248,.18)}.ring.two{inset:120px}.ring.three{inset:240px}
.rotor{position:absolute;inset:0;animation:rotate 18s linear infinite}.node{position:absolute;width:34px;height:34px;border-radius:50%;background:${tokens.colors.signal};outline:12px solid rgba(255,90,54,.14)}.node.a{left:390px;top:12px}.node.b{left:86px;top:346px;background:${tokens.colors.warning};outline:12px solid rgba(243,181,68,.14)}.node.c{left:628px;top:612px;background:${tokens.colors.muted};outline:12px solid rgba(139,135,126,.14)}
.center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:176px;height:176px;border-radius:50%;background:${tokens.colors.surface};color:${tokens.colors.ink};display:grid;place-items:center;text-align:center;font-size:17px;font-weight:700}.center span{display:block;font-family:${tokens.font.mono};font-size:12px;font-weight:400;color:${tokens.colors.muted};margin-top:5px}
.legend{position:absolute;left:78px;bottom:70px;display:grid;gap:10px}.legend b{font-family:${tokens.font.mono};font-size:12px;font-weight:500;color:rgba(255,253,248,.7)}.legend i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:8px}.legend .r{background:${tokens.colors.signal}}.legend .y{background:${tokens.colors.warning}}.legend .g{background:${tokens.colors.muted}}
@keyframes rotate{from{transform:rotate(0)}to{transform:rotate(360deg)}}
</style></head><body><div class="scene"><div class="head"><div class="kicker">Renewal Radar · Simulated data</div><h1>续费雷达</h1><p>临近续费的节点进入内圈。用户先看到金额、来源和日期，再决定是否继续。</p></div><div class="stage"><div class="ring"></div><div class="ring two"></div><div class="ring three"></div><div class="rotor"><div class="node a"></div><div class="node b"></div><div class="node c"></div></div><div class="center">今天<span>即将扣费 3 笔</span></div></div><div class="legend"><b><i class="r"></i>7 天内高风险</b><b><i class="y"></i>30 天内需关注</b><b><i class="g"></i>已处理或暂停</b></div></div></body></html>`;

const scanDetect = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${BASE}
.scene{background:${tokens.colors.paper}}
.head{position:absolute;left:76px;top:70px}.head h1{font-size:68px;margin-top:10px}.head p{max-width:700px;color:rgba(21,21,21,.62);font-size:18px;line-height:1.55;margin-top:18px}
.stage{position:absolute;left:76px;right:76px;top:270px;bottom:70px;display:grid;grid-template-columns:1fr 1fr;gap:34px}
.panel{background:${tokens.colors.surface};border:1px solid ${tokens.colors.line};border-radius:24px;padding:28px;position:relative;overflow:hidden}.panel h2{font-family:${tokens.font.display};font-size:28px;font-weight:500}.bill{position:absolute;left:34px;right:34px;top:98px;bottom:34px;background:#EDE7DC;border:1px solid rgba(21,21,21,.18);padding:28px;font-family:${tokens.font.mono};font-size:14px;line-height:2.05}.scanline{position:absolute;left:0;right:0;top:0;height:4px;background:${tokens.colors.signal};animation:scan 3.2s ${tokens.motion.easing} infinite}
.field{border:1px solid ${tokens.colors.line};border-radius:14px;padding:15px;margin-top:12px}.field span{display:block;font-size:11px;color:${tokens.colors.muted};letter-spacing:.08em;text-transform:uppercase}.field b{display:block;font-family:${tokens.font.mono};font-size:22px;margin-top:6px}.field.warn{border-color:${tokens.colors.warning};background:rgba(243,181,68,.1)}.field.acid{border-color:${tokens.colors.acid};background:rgba(200,244,90,.12)}.tag{display:inline-flex;align-items:center;height:30px;padding:0 11px;border-radius:999px;background:rgba(255,90,54,.12);color:#B83A22;font-size:11px;font-weight:700}
@keyframes scan{0%{transform:translateY(0)}50%{transform:translateY(430px)}100%{transform:translateY(0)}}
</style></head><body><div class="scene"><div class="head"><div class="kicker">Detection · Human in the loop</div><h1>识别，但不替用户确认</h1><p>扫描结果保留来源和置信度。低置信度字段必须由用户检查后才能进入续费雷达。</p></div><div class="stage"><div class="panel"><span class="tag">账单截图</span><h2 style="margin-top:14px">CloudBox Invoice</h2><div class="bill"><div>CloudBox Pro</div><div>Billing cycle: annual</div><div>Amount: USD 12.99</div><div>Next charge: 2026-10-20</div><div style="margin-top:70px;color:${tokens.colors.muted}">source · simulated bill</div></div><div class="scanline"></div></div><div class="panel"><span class="tag">识别结果</span><h2 style="margin-top:14px">确认字段</h2><div class="field"><span>商户</span><b>CloudBox</b></div><div class="field acid"><span>金额</span><b>$12.99</b></div><div class="field warn"><span>周期 · 低置信度</span><b>年付 / 月付？</b></div><div class="field warn"><span>下次续费日 · 低置信度</span><b>2026-10-20</b></div></div></div></div></body></html>`;

const motionAssets = [
  { id: 'key-visual', label: '项目主视觉', html: keyVisual, poster: 'kv/key-visual.png', animated: false },
  { id: 'radar-orbit', label: '续费雷达轨道', html: radarOrbit, poster: 'motion/radar-orbit.png', animated: true },
  { id: 'scan-detect', label: '识别扫描演示', html: scanDetect, poster: 'motion/scan-detect.png', animated: true }
];

module.exports = { motionAssets };