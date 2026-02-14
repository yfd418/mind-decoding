import { Post, Comment } from '@/types';

export const mockPosts: Post[] = [
  {
    id: 'post_1',
    authorId: 'user_1',
    authorName: '清醒的小鹿',
    zone: 'recognition',
    title: '他总是说我"太敏感"，但我开始怀疑是不是煤气灯效应',
    content: '在一起三年了，每次我表达不满，他都会说"你想太多了"、"你太敏感了"。最近我发现他手机里和其他女生的暧昧聊天，他却说"只是普通朋友，你又在胡思乱想"。我开始怀疑自己的判断力了...',
    createdAt: new Date('2024-01-15'),
    resonanceCount: 128,
    commentCount: 45,
    needsDecoding: true,
    tags: ['煤气灯效应', '怀疑自我'],
  },
  {
    id: 'post_2',
    authorId: 'user_2',
    authorName: '勇敢的松鼠',
    zone: 'recognition',
    title: '分享我的经历：从被NPD伴侣操控到觉醒',
    content: '我想分享我的故事，希望可以帮助到还在迷雾中的姐妹。刚开始他把我捧成公主，后来却把我贬得一文不值。我终于明白，这不是我的错...',
    createdAt: new Date('2024-01-14'),
    resonanceCount: 256,
    commentCount: 89,
    tags: ['NPD', '觉醒', '康复'],
  },
  {
    id: 'post_3',
    authorId: 'user_3',
    authorName: '向阳的银杏',
    zone: 'practice',
    title: '灰石法实践一个月，效果显著！',
    content: '按照工具箱里的灰石法执行了一个月，他终于开始对我失去兴趣了。分享一些实操心得：最重要的是保持一致性，不要因为他的"甜言蜜语"就破功...',
    createdAt: new Date('2024-01-13'),
    resonanceCount: 189,
    commentCount: 67,
    tags: ['灰石法', '实操经验'],
  },
  {
    id: 'post_4',
    authorId: 'user_4',
    authorName: '温柔的藤蔓',
    zone: 'practice',
    title: '断联第30天，我的感受和变化',
    content: '今天是彻底断联的第30天。前两周几乎崩溃，但现在已经好很多了。分享一下我的心路历程和应对策略...',
    createdAt: new Date('2024-01-12'),
    resonanceCount: 312,
    commentCount: 98,
    tags: ['断联', '康复历程'],
  },
  {
    id: 'post_5',
    authorId: 'user_5',
    authorName: '破茧的蝴蝶',
    zone: 'recovery',
    title: '走出阴霾一年后，我重新找到了自己',
    content: '一年前的今天，我做出了离开的决定。现在回头看，那是我人生中最正确的选择。我想告诉所有还在挣扎的人：你们值得被善待...',
    createdAt: new Date('2024-01-11'),
    resonanceCount: 456,
    commentCount: 134,
    tags: ['康复', '希望', '重生'],
  },
  {
    id: 'post_6',
    authorId: 'user_6',
    authorName: '安静的溪流',
    zone: 'emotion',
    title: '今晚又想联系他了，来发泄一下',
    content: '知道不应该，但深夜真的很难熬。把这里当树洞说说心里话。已经断联两周了，但还是会忍不住想他以前对我的好...',
    createdAt: new Date('2024-01-10'),
    resonanceCount: 234,
    commentCount: 78,
    tags: ['情绪释放', '戒断反应'],
  },
  {
    id: 'post_7',
    authorId: 'user_7',
    authorName: '坚定的橡树',
    zone: 'recognition',
    title: '帮我看看这是不是典型的BPD行为？',
    content: '我的伴侣情绪波动极大，一会儿把我捧上天，一会儿又把我踩入地。她说想自杀如果我要离开的话。我很困惑也很害怕...',
    createdAt: new Date('2024-01-09'),
    resonanceCount: 167,
    commentCount: 52,
    needsDecoding: true,
    tags: ['BPD', '情绪过山车'],
  },
  {
    id: 'post_8',
    authorId: 'user_8',
    authorName: '自由的燕子',
    zone: 'recovery',
    title: '推荐几本帮助我康复的书',
    content: '分享几本对我帮助很大的书：《不被支配》《情感勒索》《煤气灯效应》。希望也能帮助到正在康复路上的你们...',
    createdAt: new Date('2024-01-08'),
    resonanceCount: 289,
    commentCount: 91,
    tags: ['推荐资源', '书籍'],
  },
];

export const mockComments: Comment[] = [
  {
    id: 'comment_1',
    postId: 'post_1',
    authorId: 'user_2',
    authorName: '勇敢的松鼠',
    content: '这是典型的煤气灯效应。相信你的直觉，不要让他定义你的感受。',
    createdAt: new Date('2024-01-15'),
    resonanceCount: 45,
  },
  {
    id: 'comment_2',
    postId: 'post_1',
    authorId: 'user_3',
    authorName: '向阳的银杏',
    content: '我经历过一模一样的情况。请记住：你的感受是真实的，不是"太敏感"。',
    createdAt: new Date('2024-01-15'),
    resonanceCount: 38,
  },
  {
    id: 'comment_3',
    postId: 'post_3',
    authorId: 'user_4',
    authorName: '温柔的藤蔓',
    content: '太棒了！坚持就是胜利。灰石法确实需要很强的定力，你已经做得很好了。',
    createdAt: new Date('2024-01-13'),
    resonanceCount: 23,
  },
  {
    id: 'comment_4',
    postId: 'post_6',
    authorId: 'user_5',
    authorName: '破茧的蝴蝶',
    content: '抱抱你。这种感觉很正常，戒断反应需要时间。你已经很勇敢了，继续加油。',
    createdAt: new Date('2024-01-10'),
    resonanceCount: 56,
  },
];

export function getPostsByZone(zone: string): Post[] {
  return mockPosts.filter(post => post.zone === zone);
}

export function getPostById(id: string): Post | undefined {
  return mockPosts.find(post => post.id === id);
}

export function getCommentsByPostId(postId: string): Comment[] {
  return mockComments.filter(comment => comment.postId === postId);
}
