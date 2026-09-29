const tokens = require('./tokens');

const base = `
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}body{font-family:${tokens.font.body};background:#080B16;color:${tokens.colors.moon};overflow:hidden}.scene{position:relative;width:100%;height:100vh;min-height:420px;overflow:hidden;background:linear-gradient(180deg,#202B46,#10162F 48%,#080B16)}
`;

const keyVisual = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${base}
.scene{background:radial-gradient(circle at 63% 38%,rgba(244,212,138,.22),transparent 18%),linear-gradient(135deg,#2A2339 0%,#11162B 44%,#080B16 100%)}
.room{position:absolute;inset:8% 7%;border-radius:54px;border:1px solid rgba(236,226,198,.12);background:linear-gradient(120deg,rgba(255,253,248,.035),rgba(255,253,248,.01))}
.window{position:absolute;left:8%;top:10%;width:42%;height:72%;border-radius:160px 160px 34px 34px;border:1px solid rgba(236,226,198,.16);overflow:hidden;background:linear-gradient(180deg,#7B6C9D,#202B46 55%,#080B16)}
.city{position:absolute;left:0;right:0;bottom:0;height:36%;background:linear-gradient(90deg,#070A12 0 8%,#141D36 8% 17%,#090D18 17% 27%,#1B2440 27% 39%,#090D18 39% 54%,#11182D 54% 66%,#070A12 66% 80%,#18213B 80% 91%,#080B13 91%);opacity:.84}
.city:after{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,#F4D48A 0 1px,transparent 1px);background-size:38px 30px;opacity:.32}
.desk{position:absolute;right:8%;bottom:13%;width:35%;height:9%;border-radius:12px;background:linear-gradient(180deg,#523E34,#211A1A);box-shadow:0 30px 60px rgba(0,0,0,.32)}
.lamp{position:absolute;right:24%;bottom:20%;width:2px;height:24%;background:#7D6A5E}.lamp:before{content:"";position:absolute;left:-44px;top:-42px;width:88px;height:58px;border-radius:50% 50% 16px 16px;background:linear-gradient(180deg,#F4D48A,#C98F52);box-shadow:0 0 62px rgba(244,212,138,.54)}
.seed{position:absolute;left:58%;top:37%;width:88px;height:88px;border-radius:50%;background:radial-gradient(circle,#FFF7D8 0 6%,#F4D48A 20%,rgba(216,161,94,.2) 52%,transparent 72%);box-shadow:0 0 60px rgba(244,212,138,.55)}
.seed:after{content:"";position:absolute;left:41px;top:21px;width:9px;height:43px;border-radius:99px;background:#FFF4CE;box-shadow:0 0 20px rgba(255,244,206,.72)}
.copy{position:absolute;left:8%;bottom:7%;max-width:760px}.eyebrow{font-size:15px;letter-spacing:.26em;text-transform:uppercase;color:#D8A15E}.title{font-family:${tokens.font.display};font-size:118px;line-height:.9;letter-spacing:-.06em;margin-top:18px}.sub{font-size:24px;color:rgba(236,226,198,.68);margin-top:24px;max-width:700px;line-height:1.55}
.brand{position:absolute;right:7%;top:7%;font-size:17px;letter-spacing:.34em;text-transform:uppercase;color:rgba(236,226,198,.68)}
</style></head><body><div class="scene"><div class="room"></div><div class="window"><div class="city"></div></div><div class="desk"></div><div class="lamp"></div><div class="seed"></div><div class="brand">Lumen</div><div class="copy"><div class="eyebrow">Sleep companion · 夜猫族</div><div class="title">光合<br>Lumen</div><div class="sub">不要求你今晚想明白，只陪你，把这一夜分成更小、更轻的部分。</div></div></div></body></html>`;

const breath = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${base}
.scene{display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 46%,rgba(216,161,94,.14),transparent 32%),linear-gradient(180deg,#151A31,#080B16)}
.orbit{position:relative;width:min(68vw,520px);aspect-ratio:1;border-radius:50%;border:1px solid rgba(236,226,198,.16);display:flex;align-items:center;justify-content:center;animation:breathe 10s ${tokens.easing.sleep} infinite}
.orbit:before,.orbit:after{content:"";position:absolute;border-radius:50%;border:1px solid rgba(236,226,198,.1)}.orbit:before{inset:10%}.orbit:after{inset:22%}
.glow{position:absolute;inset:33%;border-radius:50%;background:radial-gradient(circle,#FFF5D2 0 7%,#D8A15E 31%,rgba(216,161,94,.1) 68%,transparent 75%);box-shadow:0 0 90px rgba(216,161,94,.34);animation:glow 10s ${tokens.easing.sleep} infinite}
.label{position:absolute;text-align:center}.label b{font-family:${tokens.font.display};display:block;font-size:52px;font-weight:500}.label span{display:block;font-size:14px;color:rgba(236,226,198,.58);margin-top:10px;letter-spacing:.14em}
.copy{position:absolute;bottom:8%;left:50%;transform:translateX(-50%);text-align:center;width:80%}.copy h1{font-size:28px;font-weight:500}.copy p{font-size:14px;color:rgba(236,226,198,.62);margin-top:10px}
@keyframes breathe{0%{transform:scale(.84);opacity:.66}40%{transform:scale(1);opacity:1}100%{transform:scale(.84);opacity:.66}}
@keyframes glow{0%{transform:scale(.78);opacity:.58}40%{transform:scale(1.08);opacity:1}100%{transform:scale(.78);opacity:.58}}
@media(prefers-reduced-motion:reduce){.orbit,.glow{animation:none}.orbit{transform:scale(.92)}.glow{transform:scale(.94)}}
</style></head><body><div class="scene"><div class="orbit"><div class="glow"></div><div class="label"><b>4s</b><span>吸气 · 6s 呼气</span></div></div><div class="copy"><h1>听一会儿，慢慢呼吸</h1><p>默认陪伴不生成内容，梦境由你主动展开。</p></div></div></body></html>`;

const nightBus = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${base}
.scene{background:linear-gradient(180deg,#263253,#10172A 58%,#080B16)}
.sky{position:absolute;inset:0;background:radial-gradient(circle at 72% 18%,rgba(201,214,255,.16),transparent 18%)}
.city{position:absolute;left:-8%;right:-8%;bottom:24%;height:34%;background:linear-gradient(90deg,#080B13 0 7%,#151E39 7% 15%,#090D18 15% 23%,#1A2442 23% 33%,#080B13 33% 44%,#121A31 44% 56%,#090D18 56% 66%,#18213C 66% 78%,#070A12 78% 88%,#121B34 88%);animation:city 26s linear infinite alternate}
.window-frame{position:absolute;left:8%;right:8%;top:13%;bottom:22%;border-radius:60px;border:1px solid rgba(236,226,198,.18);overflow:hidden;background:linear-gradient(180deg,rgba(123,108,157,.24),rgba(8,11,22,.7))}
.rain{position:absolute;inset:-20%;background-image:linear-gradient(120deg,transparent 0 46%,rgba(201,214,255,.16) 47% 48%,transparent 49% 100%);background-size:38px 54px;animation:rain 7s linear infinite;opacity:.46}
.cabin{position:absolute;left:0;right:0;bottom:0;height:22%;background:linear-gradient(180deg,#1C2338,#090C15);border-top:1px solid rgba(236,226,198,.12)}
.seat{position:absolute;bottom:5%;width:14%;height:16%;border-radius:26px 26px 8px 8px;background:linear-gradient(180deg,#26304E,#11182B);border:1px solid rgba(236,226,198,.08)}.seat.a{left:10%}.seat.b{left:42%}.seat.c{right:10%}
.light-seed{position:absolute;left:50%;top:48%;width:58px;height:58px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,#FFF5D2,#D8A15E 36%,transparent 72%);box-shadow:0 0 58px rgba(216,161,94,.6);animation:seedDim 10s ${tokens.easing.sleep} infinite}
.copy{position:absolute;left:9%;bottom:5%;max-width:75%}.copy .eyebrow{color:#D8A15E;font-size:13px;letter-spacing:.2em;text-transform:uppercase}.copy h1{font-family:${tokens.font.display};font-size:54px;line-height:1.08;font-weight:500;margin-top:10px}.copy p{font-size:16px;color:rgba(236,226,198,.64);margin-top:12px}
@keyframes city{from{transform:translateX(0)}to{transform:translateX(-5%)}}
@keyframes rain{from{transform:translateY(-12%)}to{transform:translateY(12%)}}
@keyframes seedDim{0%{opacity:.78;transform:translateX(-50%) scale(.88)}55%{opacity:1;transform:translateX(-50%) scale(1)}100%{opacity:.72;transform:translateX(-50%) scale(.8)}}
@media(prefers-reduced-motion:reduce){.city,.rain,.light-seed{animation:none}.light-seed{opacity:.82}.rain{opacity:.24}}
</style></head><body><div class="scene"><div class="sky"></div><div class="window-frame"><div class="city"></div><div class="rain"></div></div><div class="cabin"><div class="seat a"></div><div class="seat b"></div><div class="seat c"></div></div><div class="light-seed"></div><div class="copy"><div class="eyebrow">Dreamweaver · 夜行公交</div><h1>它们没有消失，<br>只是不再贴着你。</h1><p>插画 + 旁白 + 三层视差，不自动播放。</p></div></div></body></html>`;

const motionAssets = [
  { id: 'key-visual', label: '项目主视觉', html: keyVisual, poster: 'kv/key-visual.png', animated: false },
  { id: 'breath', label: '4-6 呼吸引导', html: breath, poster: 'motion/breath-poster.png', animated: true },
  { id: 'night-bus', label: '夜行公交视差', html: nightBus, poster: 'motion/night-bus-poster.png', animated: true }
];

module.exports = { motionAssets };