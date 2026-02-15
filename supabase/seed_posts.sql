-- 迷雾森林社区种子帖子
-- 请在 Supabase SQL Editor 中执行此脚本
-- 注意：需要先登录一个真实用户账号，然后使用该用户的ID

-- 方法一：使用当前登录用户的ID
-- 首先查看你的用户ID：SELECT auth.uid();
-- 然后将下面所有的 'YOUR_USER_ID' 替换为你的实际用户ID

-- 方法二：直接使用现有用户
-- 查询现有用户：SELECT id, forest_name FROM public.profiles LIMIT 1;
-- 使用查询到的用户ID

-- 识别区帖子
INSERT INTO public.posts (author_id, author_name, zone, title, content, tags, needs_decoding) 
SELECT 
  id,
  forest_name,
  'recognition',
  '如何区分"关心"和"控制"？我的一些观察',
  '最近在整理自己的经历时，发现有一些模式想和大家分享。

"关心"和"控制"有时候真的很像，但仔细观察还是能发现区别：

**关心会给你空间，控制会压缩你的空间**
- 关心：你今天怎么回家？需要我去接你吗？（可以拒绝）
- 控制：你今天必须让我去接你，不然我不放心

**关心会尊重你的感受，控制会否定你的感受**
- 关心：你看起来不太开心，想聊聊吗？
- 控制：你有什么不开心的？我对你这么好

**关心是双向的，控制是单向的**
- 关心会倾听你的想法，也会分享自己的
- 控制只关注对方的想法是否符合自己的预期

这些都是我慢慢意识到的，希望对正在困惑中的你有帮助。欢迎大家一起补充。',
  ARRAY['识别信号', '关系边界', '经验分享'],
  false
FROM public.profiles LIMIT 1;

INSERT INTO public.posts (author_id, author_name, zone, title, content, tags, needs_decoding) 
SELECT 
  id,
  forest_name,
  'recognition',
  '求助：这种情况下我该怎么判断？',
  '第一次发帖，有点紧张。

情况是这样的：我伴侣经常会查看我的手机，说是"关心我"。每次我问为什么，ta都会说"因为我们之间没有秘密啊，你怕我看什么？"

我其实不太舒服，但ta说得好像也有道理...我确实没什么要隐瞒的，但就是觉得怪怪的。

想问问大家：
1. 这种情况正常吗？
2. 我该怎么表达我的不舒服？
3. 如果ta说"你不给我看就是有鬼"，我该怎么回应？

谢谢大家...',
  ARRAY['求助', '手机隐私', '关系困惑'],
  true
FROM public.profiles LIMIT 1;

INSERT INTO public.posts (author_id, author_name, zone, title, content, tags, needs_decoding) 
SELECT 
  id,
  forest_name,
  'recognition',
  '整理了一份"红灯信号清单"，欢迎补充',
  '走出那段关系后，我整理了一些当时忽略的信号，希望可以帮助到更多人：

**情感层面**
- 经常让你感到"不够好"
- 你说的话总是被曲解
- 道歉的人永远是你
- 你的情绪被说成"太敏感"

**行为层面**
- 逐渐与朋友家人疏远
- 重大决定都是对方做主
- 你的时间表要配合对方
- "我们"取代了"你"和"我"

**语言模式**
- "我这样做都是为你好"
- "你太敏感了/想太多"
- "别人都不会这样"
- "如果你爱我，你就应该..."

这些都是警示信号。如果你正在经历这些，请相信自己的感受。',
  ARRAY['红灯信号', '自我保护', '经验总结'],
  false
FROM public.profiles LIMIT 1;

-- 实操区帖子
INSERT INTO public.posts (author_id, author_name, zone, title, content, tags, needs_decoding) 
SELECT 
  id,
  forest_name,
  'practice',
  '学会说"不"：我的边界练习日记',
  '从小到大我都是个"老好人"，不懂得拒绝。今年开始练习设立边界，分享一些小进步：

**第一周：小事开始**
- 同事问能不能帮忙加班，我第一次说了"今天不行"
- 结果：天没塌，同事也理解

**第二周：不解释**
- 以前拒绝总要编一堆理由
- 现在练习：简单说"不方便"就够了
- 发现：真正尊重你的人不会追问

**第三周：延迟回复**
- 以前看到消息就秒回，怕对方等
- 现在练习：想清楚再回复
- 好处：减少了冲动答应后的后悔

**第四周：接受被讨厌**
- 有人因为我的边界而不高兴
- 我告诉自己：这不是我的问题
- 真相：设立边界会筛选掉不尊重你的人

还在继续练习中，一起加油！',
  ARRAY['边界练习', '学会拒绝', '成长记录'],
  false
FROM public.profiles LIMIT 1;

INSERT INTO public.posts (author_id, author_name, zone, title, content, tags, needs_decoding) 
SELECT 
  id,
  forest_name,
  'practice',
  '断联第30天：一些实用的应对技巧',
  '断联一个月了，想分享一些帮助我坚持下来的方法：

**冲动想联系时**
1. 打开备忘录，写下想说的话（但不发送）
2. 等24小时再决定要不要发（通常24小时后就不想发了）
3. 找一个支持你的朋友，提前约定"冲动时可以找你"

**被联系时**
1. 不回复，不解释，不争论
2. 如果不小心看了消息，告诉自己：这只是ta想拉你回去的手段
3. 记住你离开的原因，写下来放在显眼的地方

**情绪崩溃时**
1. 允许自己哭，允许自己难过
2. 但不要让情绪主导行动
3. 做一件让自己感觉好的事：散步、听歌、找朋友

断联不是逃避，是给自己疗愈的空间。坚持住，会越来越好的。',
  ARRAY['断联经验', '实用技巧', '自我保护'],
  false
FROM public.profiles LIMIT 1;

INSERT INTO public.posts (author_id, author_name, zone, title, content, tags, needs_decoding) 
SELECT 
  id,
  forest_name,
  'practice',
  '如何应对"情感勒索"？几个话术分享',
  '情感勒索是很多人会遇到的困境，分享一些我学到的话术：

**当对方说"如果你爱我，你就应该..."**
- "我爱你，但这不代表我要放弃自己的需求"
- "爱不是交易，不应该有条件"

**当对方说"你变了/你不像以前那样了"**
- "是的，我在成长，这很正常"
- "以前的我没有保护好自己，现在的我正在学习"

**当对方说"你太自私了"**
- "照顾自己的需求不是自私"
- "我正在学习平衡自己和他人"

**当对方说"你这样做会伤害我"**
- "我理解你的感受，但我需要为自己的选择负责"
- "我们可以讨论，但最终决定权在我"

记住：话术只是工具，重要的是背后的态度——你不欠任何人解释，你的边界值得被尊重！',
  ARRAY['情感勒索', '沟通技巧', '话术分享'],
  false
FROM public.profiles LIMIT 1;

-- 康复区帖子
INSERT INTO public.posts (author_id, author_name, zone, title, content, tags, needs_decoding) 
SELECT 
  id,
  forest_name,
  'recovery',
  '离开一年后：我终于可以自由地呼吸了',
  '今天是一个特别的日子——离开那段关系整整一年了。

想和大家分享这一年的变化：

**第1-3个月**
- 每天都在怀疑自己的决定
- 经常梦见过去，醒来泪流满面
- 觉得自己永远不会好起来

**第4-6个月**
- 开始能够睡个好觉
- 偶尔会想起，但不再那么痛
- 重新联系了一些老朋友

**第7-9个月**
- 发现自己笑得越来越多
- 开始有精力做喜欢的事
- 学会了享受独处

**第10-12个月**
- 回头看，那些"离不开"的恐惧都是假的
- 重新认识了自己
- 开始期待未来

给正在经历困难的你：请相信时间，相信自己。你值得自由和幸福。',
  ARRAY['康复日记', '时间治愈', '希望分享'],
  false
FROM public.profiles LIMIT 1;

INSERT INTO public.posts (author_id, author_name, zone, title, content, tags, needs_decoding) 
SELECT 
  id,
  forest_name,
  'recovery',
  '推荐几本帮助我疗愈的书',
  '在康复过程中，几本书给了我很大帮助，分享给大家：

**《身体从未忘记》**
- 帮助理解创伤如何影响身体
- 学会了觉察自己的身体反应
- 提供了很多实用的疗愈方法

**《情感勒索》**
- 让我看清了关系中的模式
- 学会识别各种操纵手段
- 提供了具体的应对策略

**《被讨厌的勇气》**
- 改变了我看待人际关系的方式
- 学会课题分离
- 不再为别人的情绪负责

**《与自己和解》**
- 学会了自我关怀
- 不再苛责过去的自己
- 接纳自己的不完美

读书只是辅助，真正的疗愈来自于实践和时间的积累。希望这些书也能帮助到你。',
  ARRAY['书籍推荐', '疗愈资源', '自我成长'],
  false
FROM public.profiles LIMIT 1;

INSERT INTO public.posts (author_id, author_name, zone, title, content, tags, needs_decoding) 
SELECT 
  id,
  forest_name,
  'recovery',
  '今天我做了第一件"只为自己"的事',
  '以前的我，做任何事都会先想"别人会怎么看"。

今天，我做了一件只为自己开心的事——我报名了一个画画班。

不是因为它有用，不是因为它能赚钱，不是因为别人觉得好。只是因为我想。

报名的时候我还在犹豫，脑子里冒出好多声音：
- "学这个有什么用？"
- "你画不好的"
- "浪费钱"

但我还是报了。因为这是我想做的事。

画得不好又怎样？浪费钱又怎样？我的快乐难道不值得这点投入吗？

走出教室的那一刻，我觉得自己好像活过来了。

原来，为自己而活，是这样的感觉。',
  ARRAY['自我关怀', '小确幸', '成长记录'],
  false
FROM public.profiles LIMIT 1;

-- 情绪区帖子
INSERT INTO public.posts (author_id, author_name, zone, title, content, tags, needs_decoding) 
SELECT 
  id,
  forest_name,
  'emotion',
  '今晚又失眠了，想找个地方说说',
  '凌晨三点，又睡不着。

脑子里反反复复都是那些画面，那些话。明明已经离开了，为什么还是会被困住？

有时候觉得自己已经好了，有时候又觉得永远好不了。

今晚特别想ta。不是想念那段关系，是想念那个我以为存在的ta。那个温柔、体贴、懂我的ta。

但我知道，那个ta可能从来就不存在。只是我太想被爱，所以创造了一个幻象。

现在我要学会爱那个不被爱的自己。

写到这里，好像好一点了。谢谢这个树洞，让我可以不用伪装。',
  ARRAY['失眠', '情绪释放', '树洞'],
  false
FROM public.profiles LIMIT 1;

INSERT INTO public.posts (author_id, author_name, zone, title, content, tags, needs_decoding) 
SELECT 
  id,
  forest_name,
  'emotion',
  '今天被触发了，但我撑过来了',
  '今天在街上看到了一个很像ta的背影。

那一瞬间，心跳加速，手心出汗，整个人都僵住了。

以前的我可能会崩溃，可能会躲起来哭，可能会怀疑自己是不是永远都好不了了。

但今天，我做了不一样的事。

我停下来，深呼吸，告诉自己："你现在安全。那个人不是ta。你已经离开了。"

然后我走进旁边的咖啡店，点了一杯热巧克力，坐了十分钟。

十分钟后，我继续走我的路。

虽然被触发了，但我没有崩溃。我撑过来了。

这是一个小胜利，我要记录下来。

给同样在康复路上的你：被触发不代表你失败了，能够稳住自己就是进步。',
  ARRAY['创伤触发', '自我安抚', '小胜利'],
  false
FROM public.profiles LIMIT 1;

INSERT INTO public.posts (author_id, author_name, zone, title, content, tags, needs_decoding) 
SELECT 
  id,
  forest_name,
  'emotion',
  '写给曾经那个不敢说话的自己',
  '亲爱的过去的我：

我知道你现在很害怕。你觉得如果你说出真实的想法，就不会被爱了。

我知道你在努力地迎合所有人，希望这样可以换来一点点安全感。

我知道你每天都在怀疑自己，是不是自己不够好，才被这样对待。

我想告诉你：

不是你的错。你不需要通过委屈自己来换取爱。真正的爱不会让你感到恐惧。你值得被温柔对待。

我知道你现在听不进去这些话。没关系，慢慢来。

总有一天，你会明白的。总有一天，你会学会爱自己的。

我会在未来等你。',
  ARRAY['自我对话', '疗愈', '自我接纳'],
  false
FROM public.profiles LIMIT 1;
