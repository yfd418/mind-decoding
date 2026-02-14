export const forestAdjectives = [
  '清醒的',
  '坚定的',
  '向阳的',
  '温柔的',
  '破茧的',
  '勇敢的',
  '安静的',
  '自由的',
  '坚韧的',
  '温暖的',
  '明亮的',
  '沉静的',
  '新生的',
  '宁静的',
  '淡然的',
  '从容的',
  '释然的',
  '重生的',
  '绽放的',
  '独立的',
  '睿智的',
  '平和的',
  '治愈的',
  '坚强的',
  '希望的',
  '晨曦的',
  '暮光的',
  '星光的',
  '月影的',
  '露珠的',
];

export const forestNouns = [
  '小鹿',
  '橡树',
  '藤蔓',
  '松鼠',
  '萤火',
  '银杏',
  '蝴蝶',
  '蒲公英',
  '山雀',
  '白桦',
  '青苔',
  '溪流',
  '山风',
  '晨露',
  '月光',
  '星尘',
  '云雀',
  '野花',
  '竹林',
  '清泉',
  '松针',
  '枫叶',
  '梅花',
  '燕子',
  '海鸥',
  '蜻蜓',
  '蜜蜂',
  '蜗牛',
  '刺猬',
  '狐狸',
  '兔子',
  '天鹅',
  '海豚',
  '鲸鱼',
  '海星',
  '珊瑚',
];

export function generateForestName(): string {
  const adjective = forestAdjectives[Math.floor(Math.random() * forestAdjectives.length)];
  const noun = forestNouns[Math.floor(Math.random() * forestNouns.length)];
  return `${adjective}${noun}`;
}

export function generateUniqueForestName(existingNames: string[]): string {
  let name = generateForestName();
  let attempts = 0;
  const maxAttempts = 100;

  while (existingNames.includes(name) && attempts < maxAttempts) {
    name = generateForestName();
    attempts++;
  }

  if (attempts >= maxAttempts) {
    const timestamp = Date.now().toString(36);
    name = `${name}_${timestamp}`;
  }

  return name;
}

export const communityProtocols = [
  {
    id: 'no-attack',
    label: '禁止人身攻击',
    description: '我承诺不攻击、侮辱或贬低任何社区成员，无论对方观点如何。',
  },
  {
    id: 'no-diagnosis',
    label: '不进行医疗诊断',
    description: '我理解本站内容仅供科普参考，不会对他人的情况进行诊断或建议治疗方案。',
  },
  {
    id: 'respect-privacy',
    label: '尊重隐私边界',
    description: '我承诺不追问他人不愿分享的私人信息，不传播他人的真实身份。',
  },
  {
    id: 'supportive',
    label: '保持支持性态度',
    description: '我将以理解和支持的态度对待每一位分享经历的成员。',
  },
];

export const zoneConfig = {
  recognition: {
    name: '识别区',
    subtitle: '信号确认',
    description: '分享具体的困惑经历，由幸存者们帮你辨析真相',
    icon: 'Search',
    color: 'sage',
  },
  practice: {
    name: '实操区',
    subtitle: '边界实验室',
    description: '讨论如何拒绝、如何执行断联规则的实战技巧',
    icon: 'Shield',
    color: 'sunshine',
  },
  recovery: {
    name: '康复区',
    subtitle: '重生广场',
    description: '分享走出阴影后的生活点滴，互相提供希望',
    icon: 'Heart',
    color: 'sage',
  },
  emotion: {
    name: '情绪区',
    subtitle: '互助树洞',
    description: '安全、不被评判的情绪释放空间',
    icon: 'Waves',
    color: 'muted',
  },
};
