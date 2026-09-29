const tokens = require('./tokens');

const CSS = `
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}body{font-family:${tokens.font.body};background:#F7F1E8;color:#18151A}.canvas{width:1240px;min-height:760px;background:radial-gradient(circle at 84% 8%,rgba(216,161,94,.13),transparent 28%),linear-gradient(135deg,#FBF5EC,#EFE2D4);padding:54px 58px 46px}.head{display:flex;justify-content:space-between;gap:30px;align-items:flex-end;border-bottom:1px solid rgba(33,30,37,.12);padding-bottom:24px}.kicker{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#A36F3A}.title{font-family:${tokens.font.display};font-size:44px;letter-spacing:-.04em;margin-top:8px}.sub{max-width:520px;font-size:15px;line-height:1.65;color:#6F655E}.grid{display:grid;gap:14px;margin-top:24px}.card{background:rgba(255,253,248,.72);border:1px solid rgba(33,30,37,.08);border-radius:20px;padding:20px;box-shadow:0 14px 36px rgba(70,50,30,.07)}.card h3{font-family:${tokens.font.display};font-size:18px;font-weight:500}.card p,.card li{font-size:13px;line-height:1.58;color:#665D57}.card ul{padding-left:16px;margin-top:8px}.tag{display:inline-flex;align-items:center;height:28px;padding:0 10px;border-radius:99px;background:rgba(216,161,94,.14);color:#8D5D31;font-size:11px}.node{border-radius:18px;background:#FFFDF8;border:1px solid rgba(33,30,37,.1);padding:16px;text-align:center;box-shadow:0 10px 26px rgba(70,50,30,.06)}.node b{display:block;font-size:14px}.node span{display:block;font-size:11px;color:#81766D;margin-top:5px}.arrow{color:#B79B7D;font-size:24px;display:flex;align-items:center;justify-content:center}.footer{display:flex;justify-content:space-between;margin-top:22px;color:#9B8C80;font-size:11px;letter-spacing:.08em;text-transform:uppercase}
`;

function canvas(title, sub, body, height = 760) {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="canvas" style="height:${height}px"><div class="head"><div><div class="kicker">Lumen · Evidence</div><div class="title">${title}</div></div><div class="sub">${sub}</div></div>${body}<div class="footer"><span>光合 Lumen · UI/UX Case Study</span><span>Designed for night owls</span></div></div></body></html>`;
}

const empathy = [
  ['说 Says', '“终于没有人找我了。”<br>“我不是不想睡，我是不想结束今天。”'],
  ['想 Thinks', '现在睡了，明天一睁眼又是别人的时间。<br>我知道该睡了，但我不想被安排。'],
  ['做 Does', '明明很累仍继续刷手机。<br>反复说“再看十分钟”。'],
  ['感受 Feels', '舍不得结束一天，也对自己熬夜感到轻微自责。'],
  ['看 Sees', '白天属于工作、家庭和别人。<br>只有夜晚完全属于自己。'],
  ['听 Hears', '早点睡、别熬夜、这样对身体不好。<br>越被说教，越不想服从。'],
  ['痛点 Pains', '脑内循环、未完成感、失去自主感、被评判。'],
  ['收获 Gains', '保留夜间仪式，只提前十五分钟，把独处还给白天。']
].map(([title, copy]) => `<div class="card"><div class="tag">${title.split(' ')[0]}</div><h3 style="margin-top:10px">${title}</h3><p style="margin-top:7px">${copy}</p></div>`).join('');

const empathyMap = canvas('夜猫族移情图', '不是缺乏自律，而是在争夺一天中最后一段自主时间。', `<div class="grid" style="grid-template-columns:repeat(4,1fr)">${empathy}</div>`, 760);

const nights = [
  ['01', '看见你的夜', '只记录，不改变', '被接纳'],
  ['02', '夜晚从哪里开始', '找到最后一小时', '觉察'],
  ['03', '让身体先安静', '身体扫描', '放松'],
  ['04', '替代，而不是禁止', '声音或梦境', '愿意停留'],
  ['05', '只提前十五分钟', '调整睡眠窗口', '可控'],
  ['06', '把独处还给白天', '安排日间自我时间', '满足'],
  ['07', '七页夜之书', '用户确认摘要', '自我理解']
];
const nightCards = nights.map(([n, title, action, mood]) => `<div class="node"><span>第${n}夜</span><b>${title}</b><span>${action}</span><span style="color:#A36F3A;margin-top:10px">${mood}</span></div>`).join('');
const journey = canvas('一周睡眠旅程', '每天不是打卡，而是产品动作、用户感受与系统学习共同推进。', `<div class="grid" style="grid-template-columns:repeat(7,1fr)">${nightCards}</div><div class="card" style="margin-top:20px"><svg viewBox="0 0 1100 170" style="width:100%;height:170px"><path d="M30 120 C120 125,170 82,250 96 S390 142,470 102 S620 48,700 78 S850 118,930 62 S1040 50,1070 45" fill="none" stroke="#D8A15E" stroke-width="3"/><g fill="#F7F1E8" stroke="#D8A15E" stroke-width="3">${[30,190,350,510,670,830,990,1070].map((x,i)=>`<circle cx="${x}" cy="${[120,98,108,95,70,82,62,45][i]}" r="7" fill="${i>0?'#D8A15E':'#F7F1E8'}"/>`).join('')}</g></svg><p>情绪曲线从“被接纳”逐渐走向“可控与自我理解”，不展示优劣，只展示变化。</p></div>`, 720);

const ai = [
  ['Curator', '隐形策展人', ['默认组织声音、呼吸与时长', '推荐可解释、可更换', '不主动占据界面']],
  ['Listener', '有限倾听者', ['一次只问一个问题', '每次只给一个微行动', '不诊断、不假装真人']],
  ['Dreamweaver', '主动造梦者', ['只在用户点击后展开', '受控叙事语法', '在安静中结束']]
].map(([en, cn, items]) => `<div class="card"><div class="tag">${en}</div><h3 style="margin-top:12px">${cn}</h3><ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul></div>`).join('');
const aiSystem = canvas('Lumen AI 系统', '一个 AI 核心，三种存在方式。默认只运行 Curator，梦境由用户主动开启。', `<div class="grid" style="grid-template-columns:repeat(3,1fr)">${ai}</div><div class="card" style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap"><span class="tag">不诊断</span><span class="tag">不无限对话</span><span class="tag">不制造依赖</span><span class="tag">不主动造梦</span><span class="tag">危机时转介专业资源</span></div>`, 650);

const memNodes = ['今夜表达', '用户确认', '偏好 / 周摘要', '下周推荐'];
const memFlow = canvas('记忆流向', '默认不保存具体对话，只记住用户确认过的偏好与本周摘要。', `<div class="grid" style="grid-template-columns:repeat(7,1fr);align-items:center">${memNodes.map((n, i) => `<div class="node"><b>${n}</b><span>${['24 小时后消失','可修改或删除','只保留 1–2 句','不读取完整历史'][i]}</span></div>${i < memNodes.length - 1 ? '<div class="arrow">→</div>' : ''}`).join('')}</div><div class="grid" style="grid-template-columns:1fr 1fr;margin-top:22px"><div class="card"><h3>默认不保存具体对话</h3><p>原始语句不会进入长期记忆。用户可以只留今晚，也可以直接说“别记这句”。</p></div><div class="card"><h3>忘记也是权利</h3><p>某夜、某条线索、本周摘要和偏好都能逐项删除，不需要清空全部数据。</p></div></div>`, 620);

const coreSteps = ['今晚这一页', '噪声分类', '说给夜晚听', '一个微行动', '声音与呼吸', '可选夜行公交', '睡眠模式', '晨光留言'];
const coreFlow = canvas('脑子很吵 · 核心流程', '问题不在深夜解决；先卸载存在感，明早再决定是否处理。', `<div class="grid" style="grid-template-columns:repeat(15,1fr);align-items:center">${coreSteps.map((step, i) => `<div class="node" style="grid-column:span 1"><b>${String(i + 1).padStart(2, '0')}</b><span>${step}</span></div>${i < coreSteps.length - 1 ? '<div class="arrow" style="grid-column:span 1">›</div>' : ''}`).join('')}</div><div class="grid" style="grid-template-columns:repeat(3,1fr);margin-top:22px"><div class="card"><h3>接住</h3><p>复述最有情绪重量的一句，不分析人格。</p></div><div class="card"><h3>命名</h3><p>把混乱变成一句可理解的话。</p></div><div class="card"><h3>延后</h3><p>允许带到明早，不在深夜推动解决问题。</p></div></div>`, 650);

const diagrams = [
  { id: 'empathy-map', label: '夜猫族移情图', width: 1240, height: 760, html: empathyMap },
  { id: 'weekly-journey', label: '一周睡眠旅程', width: 1240, height: 720, html: journey },
  { id: 'ai-system', label: 'Lumen AI 系统', width: 1240, height: 650, html: aiSystem },
  { id: 'memory-flow', label: '记忆流向', width: 1240, height: 620, html: memFlow },
  { id: 'core-flow', label: '脑子很吵核心流程', width: 1240, height: 650, html: coreFlow }
];

module.exports = { diagrams };