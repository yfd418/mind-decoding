import { useState } from 'react';
import { ChevronDown, Users, AlertTriangle, HeartHandshake, Info, Eye, Lightbulb } from 'lucide-react';

interface KnowledgeSectionProps {
  isDarkMode: boolean;
}

interface DisorderDetail {
  name: string;
  description: string;
  dailyScene: string;
  victimPerspective: string;
  warningSigns: string[];
}

interface PersonalityCategory {
  id: 'A' | 'B' | 'C';
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  disorders: DisorderDetail[];
}

export default function KnowledgeSection({ isDarkMode }: KnowledgeSectionProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedDetail, setExpandedDetail] = useState<string | null>(null);

  const categories: PersonalityCategory[] = [
    {
      id: 'A',
      title: 'A 类',
      subtitle: '古怪/奇异型',
      description: '活在自己的逻辑世界中',
      icon: <Users className="w-8 h-8" />,
      color: isDarkMode ? 'bg-sage-dark/30' : 'bg-sage/20',
      disorders: [
        {
          name: '偏执型 (PPD)',
          description: '过度怀疑他人的动机，总觉得别人在害自己、骗自己或背叛自己',
          dailyScene: '你送他一份礼物，他却反复追问"你为什么要送我这个？你是不是有什么目的？"你解释只是想表达心意，他却说"不可能，没有人会无缘无故对别人好"。每次你晚回家，他都要查你的手机，质问你是否在和别人见面。',
          victimPerspective: '与偏执型人格相处，你会感到永远被怀疑、永远需要证明自己的清白。你的善意被曲解，你的解释被否定。久而久之，你开始怀疑自己是否真的有问题，甚至不敢再表达关心。',
          warningSigns: ['无端怀疑伴侣不忠', '把善意解读为别有用心', '记仇、难以原谅', '对批评极度敏感'],
        },
        {
          name: '分裂样 (SzPD)',
          description: '情感极度淡漠，对社交和亲密关系毫无兴趣，像个"冷漠的独行侠"',
          dailyScene: '你们结婚五年，他从不主动和你说话。你生病时，他只是淡淡地说"多喝水"。你想分享一天的见闻，他只是"嗯"一声继续看手机。他不需要朋友，也不理解你为什么需要陪伴。',
          victimPerspective: '与分裂样人格相处，你会感到极度的孤独。你付出所有的爱和关心，却得不到任何回应。不是他故意伤害你，而是他真的无法理解和回应情感需求。你开始怀疑自己是否不值得被爱。',
          warningSigns: ['对亲密关系毫无兴趣', '情感表达极度有限', '独来独往，不需要他人', '对表扬和批评都无动于衷'],
        },
        {
          name: '分裂型 (StPD)',
          description: '想法古怪，伴有奇异的信念或超自然幻想，在社交中感到极度不适',
          dailyScene: '她坚信自己能感知他人的"能量场"，经常说"我觉得那个人不怀好意，我的直觉从不会错"。她会在公共场合自言自语，或突然说出一些让你摸不着头脑的话。她相信一些你完全无法理解的"理论"，并要求你必须认同。',
          victimPerspective: '与分裂型人格相处，你会感到困惑和疲惫。你无法理解她的思维逻辑，也无法说服她接受现实。她的怪异行为可能让你在社交场合感到尴尬，而你却无法改变她。',
          warningSigns: ['有奇异的信念或魔法思维', '言语奇怪、难以理解', '行为举止怪异', '社交焦虑严重'],
        },
      ],
    },
    {
      id: 'B',
      title: 'B 类',
      subtitle: '戏剧/不稳定型',
      description: '情绪过山车与关系黑洞',
      icon: <AlertTriangle className="w-8 h-8" />,
      color: isDarkMode ? 'bg-sunshine-light/20' : 'bg-sunshine/20',
      disorders: [
        {
          name: '自恋型 (NPD)',
          description: '极度自我中心、需要持续赞美，通过贬低操控他人维持优越感',
          dailyScene: '刚开始他把你捧成公主，说你是他见过最完美的人。但渐渐地，他开始挑剔你的一切："你怎么这么笨？""你穿这个真难看。"当你想分享自己的成就时，他会说"那有什么了不起的"。他永远是对的，你永远是错的。',
          victimPerspective: '与自恋型人格相处，你会经历"理想化-贬低"的循环。一开始你觉得自己是世界上最特别的人，后来却觉得自己一文不值。你不断努力想找回最初的美好，却不知道那只是他设下的陷阱。',
          warningSigns: ['夸大自我重要性', '需要过度赞美', '缺乏共情能力', '利用他人达到目的'],
        },
        {
          name: '边缘型 (BPD)',
          description: '极度恐惧被抛弃，情绪波动极大（过山车），对人评价极端化',
          dailyScene: '早上她还说"你是我生命中最重要的人"，晚上因为你回复消息晚了十分钟，她就崩溃大哭"你根本不爱我！你要抛弃我！"她会在极度依赖和极度排斥之间反复切换，让你永远不知道下一秒会发生什么。',
          victimPerspective: '与边缘型人格相处，你会感到如履薄冰。你永远不知道什么会触发ta的情绪风暴。你可能会被ta的强烈情感所淹没，同时又为ta的痛苦感到心疼。你想要帮助ta，却发现自己也在被消耗。',
          warningSigns: ['极度害怕被抛弃', '人际关系不稳定', '情绪波动剧烈', '自我形象不稳定'],
        },
        {
          name: '表演型 (HPD)',
          description: '渴望成为注意力焦点，言行夸张做作，情绪外露且易受煽动',
          dailyScene: '每次你们一起出门，她都要打扮得极其夸张，并且一定要成为所有人关注的中心。如果有人没注意到她，她会大吵大闹或者故意制造戏剧性场面。她的情绪表达总是过度戏剧化，让你觉得像在看一场永不落幕的表演。',
          victimPerspective: '与表演型人格相处，你会感到自己永远是她舞台上的配角。你的感受、你的需求都不重要，重要的是她是否得到了足够的关注。你可能会因为她的戏剧化行为感到疲惫和尴尬。',
          warningSigns: ['过度追求关注', '情绪表达夸张', '易受他人影响', '过度关注外表'],
        },
        {
          name: '反社会型 (ASPD)',
          description: '无视规则与法律，欺骗利用他人，完全没有共情能力与愧疚感',
          dailyScene: '他可以面不改色地对你撒谎，即使被揭穿也不会有任何愧疚。他会利用你的善良达到自己的目的，却从不考虑你的感受。当你受伤时，他只会觉得你"太脆弱"。他可能会做出一些让你感到不安的事情，却完全不觉得自己有问题。',
          victimPerspective: '与反社会型人格相处，你可能会经历被操控、被欺骗、被利用。他们善于伪装，一开始可能非常迷人。但当你发现真相时，可能已经深陷其中。最重要的是保护自己，不要试图改变他们。',
          warningSigns: ['无视社会规则', '习惯性说谎', '缺乏悔意', '冲动且不负责任'],
        },
      ],
    },
    {
      id: 'C',
      title: 'C 类',
      subtitle: '焦虑/恐惧型',
      description: '被恐惧支配的行动',
      icon: <HeartHandshake className="w-8 h-8" />,
      color: isDarkMode ? 'bg-gray-green/20' : 'bg-muted',
      disorders: [
        {
          name: '回避型 (AvPD)',
          description: '极度自卑，渴望联结却因极度害怕被否定、被拒绝而刻意回避社交',
          dailyScene: '她渴望交朋友，却总是找借口拒绝你的社交邀请。她觉得自己不够好，不配被爱。每次你夸她，她都会说"你只是在安慰我"。她想靠近你，却又害怕被你拒绝，这种矛盾让她（和你）都很痛苦。',
          victimPerspective: '与回避型人格相处，你需要付出大量的耐心和鼓励。她们的自我否定可能会让你感到无力和沮丧。你想要帮助她们看到自己的价值，但她们似乎永远无法相信。',
          warningSigns: ['回避社交活动', '害怕被批评或拒绝', '觉得自己不够好', '不愿尝试新事物'],
        },
        {
          name: '依赖型 (DPD)',
          description: '极度缺乏自信，大事小事都要别人代为决定，为了不被抛弃可以无底线讨好',
          dailyScene: '她连今天穿什么衣服都要问你。她无法独自做任何决定，哪怕是点外卖这样的小事。她害怕你离开她，所以会不断讨好你，甚至牺牲自己的需求。她把自己的全部生活都依附在你身上。',
          victimPerspective: '与依赖型人格相处，你可能会感到沉重的责任感。她们的需求似乎永无止境，而你的空间被不断压缩。你可能会感到窒息，却又因为她们的脆弱而不忍心离开。',
          warningSigns: ['无法独自做决定', '害怕被抛弃', '过度讨好他人', '难以表达不同意见'],
        },
        {
          name: '强迫型 (OCPD)',
          description: '过度追求细节、秩序和完美，用僵化刻板的标准要求自己和身边人',
          dailyScene: '他要求家里每样东西都必须放在固定位置，你稍微移动一下他就会大发雷霆。他用严格的标准要求你，你做的任何事都不够"正确"。他花大量时间整理、检查，却忽略了真正重要的——你们的感情。',
          victimPerspective: '与强迫型人格相处，你会感到被控制、被评判。你的方式永远"不对"，他的方式才是唯一"正确"的。你可能会为了迎合他的标准而失去自我，或者为了反抗而不断争吵。',
          warningSigns: ['过度追求完美', '固执己见', '无法委托他人', '过度关注规则和细节'],
        },
      ],
    },
  ];

  return (
    <section
      id="knowledge"
      className={`py-24 transition-colors duration-700 ${
        isDarkMode ? 'bg-forest' : 'bg-cream'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-700 ${
              isDarkMode ? 'text-soft-green' : 'text-foreground'
            }`}
          >
            科普板块
          </h2>
          <p
            className={`text-lg transition-colors duration-700 ${
              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
            }`}
          >
            了解 A、B、C 三类人格障碍，走出认知迷雾
          </p>
        </div>

        <div
          className={`mb-12 p-6 rounded-lg transition-colors duration-700 ${
            isDarkMode ? 'bg-sage-dark/20 border border-sage-dark/30' : 'bg-sage/10 border border-sage/20'
          }`}
        >
          <div className="flex items-start gap-3">
            <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDarkMode ? 'text-sunshine-light' : 'text-sunshine'}`} />
            <div className={`text-sm ${isDarkMode ? 'text-gray-green' : 'text-muted-foreground'}`}>
              <p className="font-medium mb-1">重要提醒</p>
              <p>本站内容仅用于"识别、理解、自救"，严禁用于自我确诊或随意攻击他人。所有的人格障碍诊断均需由专业精神科医生或临床心理学家经过长期观察后作出。</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isDarkMode
                  ? 'bg-card border border-border hover:border-sage-dark/50'
                  : 'bg-white shadow-md hover:shadow-lg'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`p-6 ${category.color}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`text-2xl font-bold ${
                      isDarkMode ? 'text-soft-green' : 'text-foreground'
                    }`}
                  >
                    {category.title}
                  </span>
                  <span
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                    }`}
                  >
                    {category.subtitle}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                  }`}
                >
                  {category.description}
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  {category.disorders.map((disorder, idx) => (
                    <div key={idx}>
                      <button
                        onClick={() =>
                          setExpandedCard(
                            expandedCard === `${category.id}-${idx}` ? null : `${category.id}-${idx}`
                          )
                        }
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-300 ${
                          isDarkMode
                            ? 'hover:bg-sage-dark/20 bg-sage-dark/10'
                            : 'hover:bg-sage/10 bg-sage/5'
                        }`}
                      >
                        <span
                          className={`font-medium text-sm ${
                            isDarkMode ? 'text-soft-green' : 'text-foreground'
                          }`}
                        >
                          {disorder.name}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            expandedCard === `${category.id}-${idx}` ? 'rotate-180' : ''
                          } ${
                            isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                      
                      {expandedCard === `${category.id}-${idx}` && (
                        <div
                          className={`mt-2 p-4 rounded-lg text-sm animate-fade-in ${
                            isDarkMode ? 'bg-sage-dark/10' : 'bg-sage/5'
                          }`}
                        >
                          <p
                            className={`mb-3 ${
                              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                            }`}
                          >
                            {disorder.description}
                          </p>

                          <button
                            onClick={() =>
                              setExpandedDetail(
                                expandedDetail === `${category.id}-${idx}-detail` 
                                  ? null 
                                  : `${category.id}-${idx}-detail`
                              )
                            }
                            className={`flex items-center gap-2 text-xs font-medium mb-3 ${
                              isDarkMode 
                                ? 'text-sunshine-light hover:text-sunshine' 
                                : 'text-sunshine hover:text-sunshine-dark'
                            }`}
                          >
                            <Eye className="w-3 h-3" />
                            查看日常场景与受害者视角
                          </button>

                          {expandedDetail === `${category.id}-${idx}-detail` && (
                            <div className="space-y-3 mt-3 animate-fade-in">
                              <div className={`p-3 rounded-lg ${
                                isDarkMode ? 'bg-forest' : 'bg-white'
                              }`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <Lightbulb className={`w-4 h-4 ${
                                    isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
                                  }`} />
                                  <span className={`font-medium ${
                                    isDarkMode ? 'text-soft-green' : 'text-foreground'
                                  }`}>
                                    日常场景
                                  </span>
                                </div>
                                <p className={`text-xs leading-relaxed ${
                                  isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                                }`}>
                                  {disorder.dailyScene}
                                </p>
                              </div>

                              <div className={`p-3 rounded-lg ${
                                isDarkMode ? 'bg-forest' : 'bg-white'
                              }`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <HeartHandshake className={`w-4 h-4 ${
                                    isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
                                  }`} />
                                  <span className={`font-medium ${
                                    isDarkMode ? 'text-soft-green' : 'text-foreground'
                                  }`}>
                                    受害者视角
                                  </span>
                                </div>
                                <p className={`text-xs leading-relaxed ${
                                  isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                                }`}>
                                  {disorder.victimPerspective}
                                </p>
                              </div>

                              <div className={`p-3 rounded-lg ${
                                isDarkMode ? 'bg-forest' : 'bg-white'
                              }`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <AlertTriangle className={`w-4 h-4 ${
                                    isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
                                  }`} />
                                  <span className={`font-medium ${
                                    isDarkMode ? 'text-soft-green' : 'text-foreground'
                                  }`}>
                                    警示信号
                                  </span>
                                </div>
                                <ul className="space-y-1">
                                  {disorder.warningSigns.map((sign, signIdx) => (
                                    <li key={signIdx} className={`flex items-start gap-2 text-xs ${
                                      isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                                    }`}>
                                      <span className={isDarkMode ? 'text-sunshine-light' : 'text-sunshine'}>•</span>
                                      {sign}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
