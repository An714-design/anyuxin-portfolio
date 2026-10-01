window.PORTFOLIO = {
  "profile": {
    "name": "安雨鑫",
    "role": "UI / UX / Product Designer",
    "specialty": "AIGC-oriented product and interface design",
    "email": "18939807980@163.com",
    "location": "上海",
    "education": {
      "school": "上海理工大学",
      "major": "产品设计",
      "gpa": "GPA 3.6",
      "ranking": "专业排名前 10%",
      "summary": "产品设计、用户研究与人因工程理论基础"
    },
    "experience": [
      {
        "company": "居然设计家 Homestyler",
        "role": "3D 数字资产运营（AIGC 向）",
        "summary": "搭建素材到上架的全流程 SOP，推进模型、参考图和 Banner 生产自动化，并以 Token 成本与准确率划定 AI 与人工边界。"
      }
    ],
    "projectEvidence": [
      "Badcase 博物馆：Prompt Diff、轮次收敛、根因筛选与统计",
      "SCI 期刊论文可视化：示意图、数据图表与信息叙事",
      "迪卡侬折叠自行车 CMF：趋势研究、用户问卷、双画像与材料方案"
    ],
    "capabilities": [
      "用户研究",
      "信息架构",
      "产品逻辑",
      "交互设计",
      "UI 系统",
      "动效原型",
      "Prompt 设计",
      "Agent 工作流",
      "3D 设计",
      "视觉排版"
    ],
    "certificates": [
      "CET-6",
      "CET-4"
    ],
    "availability": "Open to full-time and internship opportunities"
  },
  "projects": [
    {
      "slug": "soundscape",
      "title": "声场 Soundscape",
      "thesis": "让空间音频成为看得见的界面语言。",
      "role": "独立完成 UI/UX、视觉系统、用户旅程与高保真界面",
      "duration": "6 周 · 3 轮迭代",
      "domain": "空间音频 · 音乐体验",
      "cover": "assets/covers/soundscape.png",
      "capabilities": [
        "用户旅程",
        "信息架构",
        "视觉系统",
        "高保真 UI"
      ],
      "projectPath": "public/projects/soundscape/index.html",
      "accent": "#7e74a2"
    },
    {
      "slug": "renew",
      "title": "续费侦探 Renew",
      "thesis": "把分散的续费线索，转化为可确认、可行动的订阅决策。",
      "role": "独立完成产品逻辑、UX 流程、视觉系统与 10 张核心界面",
      "duration": "概念项目 · 端到端设计",
      "domain": "订阅管理 · AI 决策辅助",
      "cover": "assets/covers/renew.png",
      "capabilities": [
        "产品逻辑",
        "信息架构",
        "AI 信任边界",
        "核心界面"
      ],
      "projectPath": "public/projects/renew/index.html",
      "accent": "#c8f45a"
    },
    {
      "slug": "lightmap",
      "title": "拾光 LIGHTMAP",
      "thesis": "用编号把侦察、拍摄、上传与复盘串成一段完整的城市光影游戏。",
      "role": "独立完成世界观、游戏循环、UX 流程、UI 与设计系统",
      "duration": "概念项目 · 完整设计系统",
      "domain": "沉浸式游戏 · 光影侦察",
      "cover": "assets/covers/lightmap.png",
      "capabilities": [
        "游戏化",
        "跨屏串联",
        "设计系统",
        "战术 UI"
      ],
      "projectPath": "public/projects/lightmap/index.html",
      "accent": "#e0a93e"
    },
    {
      "slug": "lumen",
      "title": "光合 Lumen",
      "thesis": "睡眠陪伴不是让用户依赖产品，而是逐步获得对夜晚的控制感。",
      "role": "独立完成用户研究、产品叙事、AI 边界、视觉系统与 12 张界面",
      "duration": "概念项目 · AIGC 辅助视觉",
      "domain": "睡眠陪伴 · 情绪设计",
      "cover": "assets/covers/lumen.png",
      "capabilities": [
        "用户研究",
        "情绪设计",
        "AI 边界",
        "夜行叙事"
      ],
      "projectPath": "public/projects/lumen/index.html",
      "accent": "#d8a15e"
    },
    {
      "slug": "flow",
      "title": "Flow 流",
      "thesis": "把专注、日程与睡前清空组织成一组可以完成的流。",
      "role": "独立完成信息架构、Bento UI、10 张界面与 15 秒演示",
      "duration": "概念项目 · UI 系统与动效",
      "domain": "效率工具 · Calm 生产力",
      "cover": "assets/covers/flow.png",
      "capabilities": [
        "Bento 系统",
        "信息架构",
        "动效",
        "完整流程"
      ],
      "projectPath": "public/projects/flow/index.html",
      "accent": "#8faf88"
    }
  ],
  "decisions": [
    {
      "slug": "soundscape",
      "problem": "空间音频缺少可理解、可操作的界面语言。",
      "tension": "沉浸感与信息可读性容易互相冲突。",
      "decision": "用同心波场和波形条表达空间方位。",
      "rejected": "只把空间音频做成普通歌单入口。",
      "rationale": "可视化让用户先理解声音方位，再决定操作。",
      "unresolved": "真实空间音频设备与不同听力条件下的可用性仍需验证。"
    },
    {
      "slug": "renew",
      "problem": "用户不知道未来会被扣什么钱，也不清楚如何取消。",
      "tension": "AI 识别能力越强，财务决策的信任风险越高。",
      "decision": "AI 提供识别建议，用户负责确认和触发行动。",
      "rejected": "让系统自动取消订阅。",
      "rationale": "低置信度修正、来源保留和凭证保存降低了误操作风险。",
      "unresolved": "OCR 准确率、支付平台规则和合规边界需要真实接入后验证。"
    },
    {
      "slug": "lightmap",
      "problem": "城市光影玩法容易在不同页面之间失去目标和连续性。",
      "tension": "游戏感和系统清晰度必须同时成立。",
      "decision": "用同一编号贯穿地图、详情、拍摄和复盘。",
      "rejected": "每页独立使用不同的信息结构。",
      "rationale": "编号形成稳定的任务锚点，让玩家始终知道自己追踪什么。",
      "unresolved": "长期游戏循环和真实玩家留存需要后续测试。"
    },
    {
      "slug": "lumen",
      "problem": "夜猫族想睡，但不想结束今天，直接劝睡会制造对抗。",
      "tension": "陪伴感与依赖风险同时存在。",
      "decision": "先接住噪声，再提供微行动，把睡眠选择权交还用户。",
      "rejected": "用连续提醒和强刺激推动用户立即入睡。",
      "rationale": "低刺激、可退出、可控制的体验更符合夜间心理状态。",
      "unresolved": "睡眠效果、语音识别和长期行为改善不能由作品集演示代替。"
    },
    {
      "slug": "flow",
      "problem": "专注工具容易同时制造更多任务和更多打断。",
      "tension": "功能完整性与 Calm 体验之间需要取舍。",
      "decision": "以 Bento 模块承载单个动作，并以一条完整的流串联。",
      "rejected": "把首页设计成密集的任务仪表盘。",
      "rationale": "每一屏只有一个主要动作，减少切换和认知负担。",
      "unresolved": "不同工作节奏下的个性化提醒需要真实使用验证。"
    }
  ]
};
