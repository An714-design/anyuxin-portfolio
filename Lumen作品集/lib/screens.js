const tokens = require('./tokens');

const FONT = tokens.font.body;
const DISPLAY = tokens.font.display;

const CSS = `
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}
body{font-family:${FONT};background:#0A0D18;color:${tokens.colors.moon}}
.screen{position:relative;width:390px;height:844px;overflow:hidden;background:linear-gradient(180deg,#151A31 0%,#0A0D18 62%,#070910 100%);color:${tokens.colors.moon}}
.screen.dawn{color:#211E25;background:linear-gradient(180deg,#F8E8D3 0%,#E9A57D 35%,#7B6C9D 72%,#202B46 100%)}
.screen.paper{color:#211E25;background:linear-gradient(180deg,#FFF8ED 0%,#F7F1E8 60%,#EDE0D1 100%)}
.screen.deep{background:linear-gradient(180deg,#13182B 0%,#090C16 74%,#05060A 100%)}
.status{height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;font-size:12px;letter-spacing:.03em;opacity:.78}
.status .icons{display:flex;gap:7px;align-items:center}
.status .dot{width:4px;height:4px;border-radius:50%;background:currentColor;opacity:.55}
.body{padding:12px 24px 0}
.kicker{font-size:10px;letter-spacing:.2em;text-transform:uppercase;opacity:.5}
h1,h2,h3{font-family:${DISPLAY};font-weight:500}
h1{font-size:34px;line-height:1.18;letter-spacing:-.04em}
h2{font-size:25px;line-height:1.2;letter-spacing:-.03em}
h3{font-size:17px;line-height:1.25;letter-spacing:-.02em}
p{font-size:13px;line-height:1.65;color:rgba(236,226,198,.68)}
.dawn p,.paper p{color:rgba(33,30,37,.66)}
.muted{opacity:.55}
.seed{position:relative;width:104px;height:104px;border-radius:50%;margin:28px auto 18px;background:radial-gradient(circle at 35% 35%,#FFF4CE 0 4%,#F4D48A 18%,rgba(216,161,94,.45) 40%,rgba(216,161,94,0) 72%);filter:drop-shadow(0 0 28px rgba(216,161,94,.42))}
.seed:before{content:"";position:absolute;inset:29px;border:1px solid rgba(236,226,198,.48);border-radius:50%}
.seed:after{content:"";position:absolute;left:47px;top:32px;width:10px;height:40px;border-radius:50% 50% 44% 44%;background:linear-gradient(180deg,#FFF6D8,#D8A15E);box-shadow:0 0 18px rgba(216,161,94,.7)}
.card{background:rgba(255,253,248,.055);border:1px solid rgba(236,226,198,.12);border-radius:22px;padding:18px;backdrop-filter:blur(14px)}
.dawn .card,.paper .card{background:rgba(255,253,248,.62);border-color:rgba(33,30,37,.08);box-shadow:0 12px 34px rgba(66,48,34,.08)}
.chip{display:inline-flex;align-items:center;min-height:39px;padding:0 14px;border-radius:999px;border:1px solid rgba(236,226,198,.14);background:rgba(255,253,248,.055);font-size:12px;color:rgba(236,226,198,.9)}
.dawn .chip,.paper .chip{border-color:rgba(33,30,37,.12);background:rgba(255,255,255,.66);color:rgba(33,30,37,.82)}
.chips{display:flex;flex-wrap:wrap;gap:9px}
.btn{margin-top:18px;height:52px;border-radius:18px;display:flex;align-items:center;justify-content:center;gap:9px;background:linear-gradient(135deg,#E7BD7B,#C98F52);color:#17141A;font-weight:700;font-size:14px}
.btn.ghost{background:rgba(255,253,248,.06);color:${tokens.colors.moon};border:1px solid rgba(236,226,198,.15)}
.paper .btn.ghost,.dawn .btn.ghost{background:rgba(255,255,255,.5);color:#211E25;border-color:rgba(33,30,37,.12)}
.phone{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);width:134px;height:5px;border-radius:99px;background:currentColor;opacity:.72}
.controls{height:26px;display:flex;align-items:center;justify-content:space-between;margin-top:14px;color:rgba(236,226,198,.62)}
.bar{height:3px;border-radius:99px;background:rgba(236,226,198,.16);overflow:hidden}.bar i{display:block;height:100%;border-radius:99px;background:#D8A15E}
.window{position:absolute;left:22px;right:22px;top:145px;height:290px;border-radius:110px 110px 28px 28px;overflow:hidden;background:linear-gradient(180deg,#202B46,#10162F);border:1px solid rgba(236,226,198,.13)}
.window:before{content:"";position:absolute;left:0;right:0;bottom:0;height:140px;background:linear-gradient(180deg,transparent,#080B14 80%)}
.city{position:absolute;left:0;right:0;bottom:0;height:110px;background:linear-gradient(90deg,#070A12 0 9%,#101830 9% 17%,#080C16 17% 29%,#151E39 29% 37%,#090D18 37% 52%,#10182E 52% 63%,#070A12 63% 79%,#141D36 79% 87%,#080B13 87%)}
.city:after{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,#D8A15E 0 1px,transparent 1px);background-size:22px 18px;opacity:.32;mask-image:linear-gradient(to top,black,transparent)}
.light{position:absolute;left:50%;top:100px;width:34px;height:34px;transform:translateX(-50%);border-radius:50%;background:#F4D48A;box-shadow:0 0 34px rgba(244,212,138,.9),0 0 90px rgba(216,161,94,.48)}
.dawn .window{background:linear-gradient(180deg,#F9E5D0,#E9A57D 48%,#7B6C9D);border-color:rgba(33,30,37,.08)}
.dawn .city{opacity:.7}.dawn .light{background:#FFF6D8;box-shadow:0 0 32px rgba(255,255,255,.9)}
.bus{position:absolute;left:18px;right:18px;top:130px;height:330px;border-radius:30px;overflow:hidden;background:linear-gradient(180deg,#2A3454 0%,#10172A 72%);border:1px solid rgba(236,226,198,.12)}
.bus .win{position:absolute;left:22px;right:22px;top:26px;height:150px;border:1px solid rgba(236,226,198,.12);background:linear-gradient(180deg,rgba(123,108,157,.35),rgba(16,22,47,.85));border-radius:20px 20px 12px 12px}
.bus .seat{position:absolute;bottom:24px;width:70px;height:78px;border-radius:18px 18px 8px 8px;background:linear-gradient(180deg,#26304e,#12192d);border:1px solid rgba(236,226,198,.08)}
.bus .seat:nth-child(2){left:34px}.bus .seat:nth-child(3){left:128px}.bus .seat:nth-child(4){right:34px}
.bus .glow{position:absolute;left:48%;top:150px;width:44px;height:44px;border-radius:50%;background:radial-gradient(circle,#FFF2C8,#D8A15E 45%,transparent 72%);filter:blur(.2px);box-shadow:0 0 42px rgba(216,161,94,.55)}
.envelope{position:relative;height:160px;border-radius:20px;background:linear-gradient(140deg,#E8D3B3,#C99D66);margin-top:20px;box-shadow:0 20px 50px rgba(0,0,0,.2)}
.envelope:before{content:"";position:absolute;inset:0;clip-path:polygon(0 0,50% 47%,100% 0);background:rgba(255,255,255,.19)}
.envelope .note{position:absolute;left:26px;right:26px;top:56px;height:70px;border-radius:10px;background:#FFF8ED;padding:14px;color:#3D342D;font-family:${DISPLAY};font-size:15px;line-height:1.5}
.breath{position:absolute;left:50%;top:220px;width:188px;height:188px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(244,212,138,.44),rgba(216,161,94,.1) 45%,transparent 72%);box-shadow:0 0 80px rgba(216,161,94,.24);display:flex;align-items:center;justify-content:center}
.breath:after{content:"";width:86px;height:86px;border-radius:50%;background:#10162F;border:1px solid rgba(236,226,198,.25)}
.wave{display:flex;align-items:end;gap:3px;height:34px}.wave i{width:3px;border-radius:99px;background:#D8A15E;opacity:.8}
.spread{margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:10px}.page{min-height:280px;border-radius:18px;background:rgba(255,253,248,.78);color:#312A28;padding:15px;border:1px solid rgba(33,30,37,.08)}
.trace{position:relative;height:108px}.trace svg{width:100%;height:100%;overflow:visible}.trace .node{fill:#F7F1E8;stroke:#D8A15E;stroke-width:2}.trace .node.on{fill:#D8A15E}
.row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid rgba(236,226,198,.1)}.paper .row,.dawn .row{border-color:rgba(33,30,37,.1)}
.orb{width:82px;height:82px;border-radius:50%;margin:14px auto 0;background:radial-gradient(circle,#F4D48A,#C98F52 38%,rgba(216,161,94,.1) 72%);box-shadow:0 0 40px rgba(216,161,94,.36)}
.mini{font-size:10px;letter-spacing:.12em;text-transform:uppercase;opacity:.48}
`;

function shell(content, tone = '') {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="screen ${tone}">${content}<div class="phone"></div></div></body></html>`;
}

function status() {
  return `<div class="status"><span>23:47</span><span class="icons"><span class="dot"></span><span class="dot"></span><span>◒</span></span></div>`;
}

const screens = [
  {
    id: '01-onboarding',
    label: '夜晚从哪儿开始',
    html: shell(`${status()}<div class="window"><div class="city"></div><div class="light"></div></div><div class="body" style="position:absolute;left:0;right:0;bottom:34px"><div class="kicker">Lumen · 今晚这一页</div><h1 style="margin-top:8px">你的夜晚<br>通常从哪里开始？</h1><div class="chips" style="margin-top:18px"><span class="chip">舍不得结束今天</span><span class="chip">脑子停不下来</span><span class="chip">身体累但很清醒</span></div><div class="btn">开始，今晚不改变什么</div></div>`)
  },
  {
    id: '02-home',
    label: '今晚这一页',
    html: shell(`${status()}<div class="body"><div class="kicker">Sunday · 23:47</div><h2 style="margin-top:8px">今晚这一页</h2><div class="seed" style="margin:28px auto 20px"></div><h1 style="text-align:center">脑子很吵，<br>停不下来。</h1><p style="text-align:center;margin-top:12px">不用马上睡，也不用今晚想明白。</p><div class="card" style="margin-top:22px;display:flex;gap:14px;align-items:center"><div style="width:44px;height:44px;border-radius:50%;background:#D8A15E;box-shadow:0 0 28px rgba(216,161,94,.34)"></div><div><h3>开始今晚的过渡</h3><p style="margin-top:3px">声音与呼吸默认开启，梦境由你主动展开。</p></div></div><div class="btn ghost" style="margin-top:12px">只想先听一会儿</div></div>`) 
  },
  {
    id: '03-checkin',
    label: '噪声分类',
    html: shell(`${status()}<div class="body"><div class="kicker">脑子很吵 · Check-in · 10 秒</div><h1 style="margin-top:10px">今晚的吵闹，<br>更像哪一种？</h1><p style="margin-top:12px">只选一个就够了。</p><div class="card" style="margin-top:24px;padding:10px 18px"><div class="row"><div><h3>未完成的事</h3><p>还有一件事没有收尾</p></div><span>○</span></div><div class="row"><div><h3>反复想的话</h3><p>那句话还在循环</p></div><span>●</span></div><div class="row" style="border-bottom:0"><div><h3>明天的担心</h3><p>你在提前经历明天</p></div><span>○</span></div></div><div class="chips" style="margin-top:16px"><span class="chip">说不清的杂音</span><span class="chip">不想说</span></div><div class="btn">说给夜晚听</div></div>`)
  },
  {
    id: '04-listener',
    label: '说给夜晚听',
    html: shell(`${status()}<div class="body"><div class="kicker">Listener · 只留三分钟</div><h2 style="margin-top:9px">说给夜晚听</h2><p style="margin-top:8px">语音或文字都可以，先给今晚一个落点。</p><div class="card" style="margin-top:22px;padding:20px"><div class="mini">最吵的一句</div><p style="font-family:${DISPLAY};font-size:19px;color:#ECE2C6;line-height:1.55;margin-top:12px">明天的方案还没做完，我一直在想如果又被否定怎么办。</p><div style="height:1px;background:rgba(236,226,198,.12);margin:18px 0"></div><p>那句“如果又被否定”，今晚已经重复很多次了。</p></div><div class="orb"></div><p style="text-align:center;margin-top:8px">按住说话 · 或点下方输入文字</p><div class="card" style="margin-top:14px;height:48px;display:flex;align-items:center;padding:0 16px;color:rgba(236,226,198,.46)">把最吵的一句话放在这里…</div></div>`)
  },
  {
    id: '05-micro-action',
    label: '放进明早的信封',
    html: shell(`${status()}<div class="body"><div class="kicker">一个微行动 · 30 秒</div><h2 style="margin-top:9px">放进明早的信封</h2><p style="margin-top:10px">不需要现在解决，只把它交给明早。</p><div class="envelope"><div class="note">“如果又被否定…”<br><span style="font-size:12px;color:#8A7665">明早 09:30 再打开</span></div></div><div class="btn">封好，放到明天</div><div class="btn ghost">今晚不留下</div><p style="text-align:center;margin-top:14px">今晚不用想清楚，明早再回来。</p></div>`) 
  },
  {
    id: '06-audio-player',
    label: '默认声音与呼吸',
    html: shell(`${status()}<div class="body"><div class="kicker">默认陪伴 · 无需生成</div><h2 style="margin-top:9px">听一会儿，慢慢呼吸</h2><div class="breath"><span style="font-family:${DISPLAY};font-size:19px;color:#F7F1E8;position:relative;z-index:2">4 · 6</span></div><p style="text-align:center;margin-top:16px">吸气 4 秒 · 呼气 6 秒</p><div class="chips" style="justify-content:center;margin-top:24px"><span class="chip">窗边夜雨</span><span class="chip">城市远处</span><span class="chip">深夜车厢</span></div><div class="card" style="margin-top:22px"><div style="display:flex;justify-content:space-between;align-items:center"><div><h3>窗边夜雨</h3><p style="margin-top:3px">剩余 05:00</p></div><span style="font-size:24px">Ⅱ</span></div><div class="bar" style="margin-top:16px"><i style="width:42%"></i></div></div><p style="text-align:center;margin-top:16px">梦境不会自动展开，想走远一点再告诉我。</p></div>`, 'deep')
  },
  {
    id: '07-sleep-mode',
    label: '熄灯',
    html: shell(`${status()}<div class="body" style="padding-top:150px;text-align:center"><div class="seed" style="opacity:.72;transform:scale(.72)"></div><h2 style="margin-top:18px;color:#ECE2C6">光在慢慢变暗</h2><p style="margin-top:12px">音频继续，屏幕暗下。</p><div class="card" style="margin-top:34px;text-align:left"><div class="row"><span>音频</span><b>继续播放</b></div><div class="row" style="border-bottom:0"><span>屏幕</span><b>将在 20 秒后熄灭</b></div></div><p style="margin-top:26px">明早再回来。</p></div>`, 'deep')
  },
  {
    id: '08-dream-bus',
    label: '夜行公交',
    html: shell(`${status()}<div class="bus"><div class="win"><div class="city" style="bottom:0;opacity:.42"></div></div><div class="seat"></div><div class="seat"></div><div class="seat"></div><div class="glow"></div></div><div class="body" style="position:absolute;left:0;right:0;bottom:28px"><div class="kicker">Dreamweaver · 第 2 幕</div><h2 style="margin-top:7px">它们没有消失，<br>只是不再贴着你。</h2><div class="controls"><span>01:18</span><div class="bar" style="width:180px"><i style="width:28%"></i></div><span>04:40</span></div></div>`) 
  },
  {
    id: '09-morning-note',
    label: '晨光留言',
    html: shell(`${status()}<div class="body"><div class="kicker">07:42 · 晨光留言</div><h1 style="margin-top:12px">昨晚留在车上的事，<br>现在要处理吗？</h1><p style="margin-top:14px">不必延续昨晚的情绪，只做今天的决定。</p><div class="card" style="margin-top:22px;padding:10px 18px"><div class="row"><h3>现在处理</h3><span>›</span></div><div class="row"><h3>继续放在那里</h3><span>›</span></div><div class="row" style="border-bottom:0"><h3>已经不需要了</h3><span>›</span></div></div><div class="card" style="margin-top:16px;background:rgba(216,161,94,.14)"><p style="color:#4A3C32">你不需要在深夜解决所有问题。</p></div></div>`, 'paper')
  },
  {
    id: '10-night-book',
    label: '七页夜之书',
    html: shell(`${status()}<div class="body"><div class="kicker">Night Book · 第 7 夜</div><h2 style="margin-top:9px">七页夜之书</h2><div class="spread"><div class="page"><div class="mini" style="color:#8A7665">七夜轨迹</div><div class="trace"><svg viewBox="0 0 240 100"><path d="M12 72 C40 65,52 45,78 54 S124 78,148 52 S190 28,228 38" fill="none" stroke="#D8A15E" stroke-width="2" opacity=".65"/><circle class="node" cx="12" cy="72" r="5"/><circle class="node on" cx="48" cy="58" r="5"/><circle class="node" cx="82" cy="56" r="5"/><circle class="node on" cx="118" cy="62" r="5"/><circle class="node" cx="152" cy="50" r="5"/><circle class="node on" cx="190" cy="38" r="5"/><circle class="node on" cx="228" cy="38" r="5"/></svg></div><p style="color:#4A3C32">你更容易在“事情没有收尾”的夜晚舍不得睡。</p></div><div class="page"><div class="mini" style="color:#8A7665">用户确认的摘要</div><p style="font-family:${DISPLAY};font-size:18px;color:#312A28;line-height:1.55;margin-top:12px">夜雨声和八分钟以内的旅程，让你更容易开始。</p><div style="height:1px;background:rgba(33,30,37,.12);margin:14px 0"></div><p style="color:#4A3C32">下周保留一个小仪式：23:30 后只留一种声音。</p></div></div><p style="text-align:center;margin-top:12px">不打分，不连续打卡，不评判中断。</p></div>`, 'paper')
  },
  {
    id: '11-ai-system',
    label: '光种的三种方式',
    html: shell(`${status()}<div class="body"><div class="kicker">Lumen AI · 一个核心，三种存在</div><h2 style="margin-top:9px">光种的三种方式</h2><div class="card" style="margin-top:20px"><div class="row"><div><h3>Curator</h3><p>默认组织今晚的声音、呼吸与时长。</p></div><span class="chip">隐形</span></div><div class="row"><div><h3>Listener</h3><p>只倾听三到五分钟，一次给一个微行动。</p></div><span class="chip">主动</span></div><div class="row" style="border-bottom:0"><div><h3>Dreamweaver</h3><p>不自动造梦，只在你展开夜晚时出现。</p></div><span class="chip">可选</span></div></div><div class="seed" style="margin:26px auto 8px;transform:scale(.72)"></div><p style="text-align:center">默认陪伴，主动造梦。</p></div>`) 
  },
  {
    id: '12-memory-privacy',
    label: '记忆边界',
    html: shell(`${status()}<div class="body"><div class="kicker">Memory · 你确认过，才留下</div><h2 style="margin-top:9px">默认不保存具体对话</h2><p style="margin-top:12px">今夜原始表达 24 小时后消失，只记住你确认的偏好与本周摘要。</p><div class="card" style="margin-top:20px"><div class="mini">今晚留下什么？</div><div class="row" style="margin-top:10px"><span>什么都不留，明早消失</span><b>○</b></div><div class="row"><span>只留下偏好：适合更短的陪伴</span><b>●</b></div><div class="row" style="border-bottom:0"><span>留下线索：工作未收尾 · 需要被肯定</span><b>○</b></div></div><div class="card" style="margin-top:14px;background:rgba(168,200,160,.12)"><h3>Lumen 只记住足够理解你的部分</h3><p style="margin-top:6px">不保存完整聊天，不推断疾病，不建立长期画像。</p></div></div>`)
  }
];

module.exports = { screens };