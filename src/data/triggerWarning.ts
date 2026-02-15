export const triggerWarningContent = {
  content: {
    title: '内容预警',
    description: '接下来的内容可能包含一些令人不适的描述，包括情感操控、心理虐待等话题。',
    details: [
      '可能涉及创伤性经历的描述',
      '可能触发你的负面情绪反应',
      '建议在心理稳定的状态下阅读',
    ],
  },
  community: {
    title: '进入社区前提醒',
    description: '迷雾森林社区是幸存者们分享真实经历的空间，部分内容可能引起情感波动。',
    details: [
      '社区成员分享的是真实经历',
      '请以支持和理解的态度对待每一位分享者',
      '如果感到不适，可以随时离开休息',
    ],
  },
};

export type TriggerWarningType = keyof typeof triggerWarningContent;
