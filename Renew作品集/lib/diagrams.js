const tokens = require('./tokens');

const CSS = `
*{box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased}
body{font-family:${tokens.font.body};background:${tokens.colors.paper};color:${tokens.colors.ink}}
.canvas{width:1240px;height:760px;padding:54px 58px 44px;background:${tokens.colors.paper};position:relative;overflow:hidden}
.head{display:flex;justify-content:space-between;gap:30px;align-items:flex-end;border-bottom:1px solid ${tokens.colors.line};padding-bottom:22px}
.kicker{font-family:${tokens.font.mono};font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:${tokens.colors.signal}}
.title{font-family:${tokens.font.display};font-size:42px;letter-spacing:-.04em;margin-top:7px}.sub{max-width:560px;font-size:14px;line-height:1.6;color:${tokens.colors.muted}}
.grid{display:grid;gap:14px;margin-top:24px}.card{background:${tokens.colors.surface};border:1px solid ${tokens.colors.line};border-radius:18px;padding:18px}
.card h3{font-family:${tokens.font.display};font-size:18px;font-weight:500}.card p,.card li{font-size:13px;line-height:1.55;color:${tokens.colors.muted}}.card ul{padding-left:17px;margin-top:8px}.tag{display:inline-flex;align-items:center;height:25px;padding:0 9px;border-radius:999px;background:rgba(255,90,54,.12);color:#B83A22;font-size:10px;font-weight:700}.tag.acid{background:rgba(200,244,90,.18);color:#465B00}.tag.warn{background:rgba(243,181,68,.18);color:#7A5200}
.node{min-height:86px;border-radius:16px;background:${tokens.colors.surface};border:1px solid ${tokens.colors.line};padding:15px;text-align:center;display:flex;flex-direction:column;justify-content:center}.node b{font-size:15px}.node span{display:block;font-size:11px;color:${tokens.colors.muted};margin-top:5px}.arrow{font-family:${tokens.font.mono};color:${tokens.colors.signal};font-size:24px;display:flex;align-items:center;justify-content:center}.footer{position:absolute;left:58px;right:58px;bottom:26px;display:flex;justify-content:space-between;font-family:${tokens.font.mono};font-size:10px;color:${tokens.colors.muted};letter-spacing:.12em;text-transform:uppercase}
.risk{border-radius:16px;padding:18px;min-height:250px;border:1px solid ${tokens.colors.line};background:${tokens.colors.surface}}.risk.high{border-color:${tokens.colors.signal}}.risk.mid{border-color:${tokens.colors.warning}}.risk.low{border-color:${tokens.colors.acid}}.risk b{font-family:${tokens.font.display};font-size:25px;display:block}.risk p{margin-top:8px}.risk ul{margin-top:14px}
`;

function canvas(title, sub, body) {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="canvas"><div class="head"><div><div class="kicker">Renew · Evidence</div><div class="title">${title}</div></div><div class="sub">${sub}</div></div>${body}<div class="footer"><span>续费侦探 Renew · UI/UX Case Study</span><span>Simulation only</span></div></div></body></html>`;
}

const flowNode = (title, copy) => `<div class="node"><b>${title}</b><span>${copy}</span></div>`;

const detectionFlow = canvas(
  '从线索到决定',
  '识别不是终点。每条线索都要经过用户确认，才能进入续费雷达。',
  `<div class="grid" style="grid-template-columns:repeat(9,1fr)">${[
    ['导入线索', '账单 / 邮件 / 截图'],
    ['解析字段', '商户 / 金额 / 周期'],
    ['置信度', '高置信度直接确认'],
    ['用户确认', '低置信度字段修正'],
    ['加入雷达', '生成续费节点'],
    ['风险分级', '7 天 / 30 天 / 已处理'],
    ['作出决定', '保留 / 暂停 / 取消'],
    ['执行行动', '步骤 / 话术 / 凭证'],
    ['验证结果', '续费日再次检查']
  ].map(([title, copy], index, list) => `${flowNode(title, copy)}${index < list.length - 1 ? '<div class="arrow">→</div>' : ''}`).join('')}</div><div class="card" style="margin-top:22px"><span class="tag">关键原则</span><p style="margin-top:10px">AI 只提供识别结果和风险解释。取消仍然由用户执行，系统只负责把复杂流程拆开。</p></div>`
);

const informationArchitecture = canvas(
  '信息架构',
  '首页负责回答“最近会发生什么”，识别中心负责建立信任，订阅库负责长期管理。',
  `<div class="grid" style="grid-template-columns:repeat(4,1fr)"><div class="card"><span class="tag">01</span><h3 style="margin-top:10px">首页</h3><p>续费雷达、未来 7 天扣费、待确认线索。</p></div><div class="card"><span class="tag">02</span><h3 style="margin-top:10px">日历</h3><p>周、月、年视图，展示扣费节奏和支出冲突。</p></div><div class="card"><span class="tag">03</span><h3 style="margin-top:10px">订阅</h3><p>订阅库、分类、搜索、状态筛选和详情。</p></div><div class="card"><span class="tag">04</span><h3 style="margin-top:10px">节省</h3><p>已取消项目、预计节省和下一次验证。</p></div></div><div class="grid" style="grid-template-columns:repeat(3,1fr);margin-top:18px"><div class="card"><h3>识别中心</h3><p>从首页中央入口进入，承载导入、解析、确认和失败重试。</p></div><div class="card"><h3>订阅详情</h3><p>价格历史、使用记录、识别来源和取消入口。</p></div><div class="card"><h3>设置与隐私</h3><p>数据来源、隐藏规则、导出、删除和关闭智能识别。</p></div></div>`
);

const riskModel = canvas(
  '续费风险模型',
  '风险不是价值判断，而是帮助用户优先处理最紧迫决定。',
  `<div class="grid" style="grid-template-columns:repeat(3,1fr)"><div class="risk high"><span class="tag">高风险</span><b style="margin-top:12px">7 天内</b><p>金额较高、使用频率低或刚刚涨价。</p><ul><li>进入首页最高优先级</li><li>显示原价、现价和生效日期</li><li>提供取消入口</li></ul></div><div class="risk mid"><span class="tag warn">中风险</span><b style="margin-top:12px">30 天内</b><p>需要关注，但不一定马上行动。</p><ul><li>显示在日历中圈</li><li>允许延后提醒</li><li>建议比较使用频率</li></ul></div><div class="risk low"><span class="tag acid">低风险</span><b style="margin-top:12px">已处理</b><p>用户已确认保留、暂停或取消成功。</p><ul><li>不继续打扰</li><li>保留历史来源</li><li>续费日前再次验证</li></ul></div></div>`
);

const cancellationFlow = canvas(
  '取消不是一次按钮点击',
  '把取消拆成准备、操作、确认和验证四个阶段，让用户知道自己在哪一步。',
  `<div class="grid" style="grid-template-columns:repeat(7,1fr)">${[
    ['检查权益', '还剩多少时间'],
    ['导出内容', '避免丢失文件'],
    ['打开入口', '找到管理订阅'],
    ['执行取消', '复制客服话术'],
    ['保存凭证', '记录确认编号'],
    ['等待生效', '显示生效日期'],
    ['再次验证', '续费日检查扣费']
  ].map(([title, copy], index, list) => `${flowNode(title, copy)}${index < list.length - 1 ? '<div class="arrow">→</div>' : ''}`).join('')}</div><div class="card" style="margin-top:22px;background:rgba(200,244,90,.12)"><p><b>成功定义：</b>用户完成明确决策，而不是被产品说服继续付费。</p></div>`
);

const trustBoundary = canvas(
  '信任边界',
  '作品集原型不碰真实支付和隐私数据，所有智能能力都必须可解释、可修改、可撤回。',
  `<div class="grid" style="grid-template-columns:repeat(3,1fr)"><div class="card"><span class="tag">可解释</span><h3 style="margin-top:12px">不接入银行卡密码</h3><p>只处理用户主动提供的账单、邮件或截图。</p></div><div class="card"><span class="tag acid">可修改</span><h3 style="margin-top:12px">每个字段都可修正</h3><p>低置信度字段必须高亮，识别结果不能自动写入永久记录。</p></div><div class="card"><span class="tag warn">可撤回</span><h3 style="margin-top:12px">不保存完整邮件</h3><p>用户可以删除单条线索、清除全部数据或关闭智能识别。</p></div></div><div class="card" style="margin-top:20px"><h3>作品集边界</h3><p style="margin-top:8px">本案例使用模拟账单、模拟邮件和模拟识别结果，不连接真实邮箱、支付平台或订阅账号。</p></div>`
);

const diagrams = [
  { id: 'detection-flow', label: '从线索到决定', width: 1240, height: 760, html: detectionFlow },
  { id: 'information-architecture', label: '信息架构', width: 1240, height: 760, html: informationArchitecture },
  { id: 'risk-model', label: '续费风险模型', width: 1240, height: 760, html: riskModel },
  { id: 'cancellation-flow', label: '取消流程', width: 1240, height: 760, html: cancellationFlow },
  { id: 'trust-boundary', label: '信任边界', width: 1240, height: 760, html: trustBoundary }
];

module.exports = { diagrams };