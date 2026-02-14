import { useState } from 'react';
import { ChevronDown, Shield, XCircle, GitBranch, CheckCircle } from 'lucide-react';

interface SelfHelpToolkitProps {
  isDarkMode: boolean;
}

interface Tool {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: {
    description: string;
    steps: string[];
    tips?: string[];
  };
}

export default function SelfHelpToolkit({ isDarkMode }: SelfHelpToolkitProps) {
  const [expandedTool, setExpandedTool] = useState<string | null>('grey-rock');

  const tools: Tool[] = [
    {
      id: 'grey-rock',
      title: '灰石法',
      subtitle: 'Grey Rock Method',
      icon: <Shield className="w-6 h-6" />,
      content: {
        description:
          '面对情感操控时，像石头一样保持无趣、冷淡，不给予任何情绪回馈。目的是让对方失去继续纠缠的动力。',
        steps: [
          '保持面部表情平淡，避免流露情绪',
          '回复简短、客观，不带感情色彩',
          '避免眼神接触过多，不要显得紧张或在意',
          '对于挑衅性问题，用"嗯"、"好的"、"随便"等简短回应',
          '不要解释自己的行为，不要试图让对方理解',
        ],
        tips: [
          '练习在镜子前保持中性表情',
          '准备一些万能回复语',
          '允许自己内心保持坚定，外在表现平静',
        ],
      },
    },
    {
      id: 'jade',
      title: 'JADE 原则',
      subtitle: 'Justify, Argue, Defend, Explain',
      icon: <XCircle className="w-6 h-6" />,
      content: {
        description:
          '不辩解（Justify）、不争论（Argue）、不辩护（Defend）、不解释（Explain）。每一次解释都可能成为新的争吵导火索。',
        steps: [
          'J - 不辩解：不需要为自己的决定或行为找借口',
          'A - 不争论：避免陷入无意义的辩论',
          'D - 不辩护：不需要向对方证明自己是对的',
          'E - 不解释：尤其是对于不重要的事情',
        ],
        tips: [
          '记住：你的解释改变不了对方的看法',
          '简洁的"好的"、"我知道了"比长篇大论更有效',
          '如果必须回应，只说事实，不说感受',
        ],
      },
    },
    {
      id: 'no-contact',
      title: '不接触原则',
      subtitle: 'No Contact',
      icon: <GitBranch className="w-6 h-6" />,
      content: {
        description:
          '如果可能，彻底物理断联。若无法完全断联（如同事/亲属），则保持最低限度的表面礼貌，不投入情感。',
        steps: [
          '删除或隐藏所有联系方式',
          '取关社交媒体，避免关注对方动态',
          '如果有共同群组，考虑暂时退出',
          '告诉信任的人你的决定，请他们协助监督',
          '制定一份"不联系"的承诺书，必要时可找心理咨询师见证',
        ],
        tips: [
          '初期会很难受，这是正常的戒断反应',
          '写下你想联系对方时可以做的其他事',
          '记住：断联不是惩罚对方，而是保护自己',
        ],
      },
    },
    {
      id: 'self-care',
      title: '停止自我归因',
      subtitle: '心理排毒',
      icon: <CheckCircle className="w-6 h-6" />,
      content: {
        description:
          '对方的病态行为是他的人格缺陷导致的，与你是否优秀、是否努力无关。你无法通过"做得更好"来改变一个不认为自己有问题的人。',
        steps: [
          '写下对方让你感到内疚的所有话语',
          '逐一审视：这些话有事实依据吗？',
          '提醒自己：你的价值不取决于他人的认可',
          '每天对自己说三遍："这不是我的错"',
          '记录下自己的优点和成就',
        ],
        tips: [
          '不要试图改变对方，那不是你的责任',
          '你已经做得足够多了',
          '专业的事交给专业的人——考虑寻求心理咨询',
        ],
      },
    },
  ];

  return (
    <section
      id="toolkit"
      className={`py-24 transition-colors duration-700 ${
        isDarkMode ? 'bg-forest' : 'bg-cream'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-700 ${
              isDarkMode ? 'text-soft-green' : 'text-foreground'
            }`}
          >
            自救工具箱
          </h2>
          <p
            className={`text-lg transition-colors duration-700 ${
              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
            }`}
          >
            实用的心理自救助手，帮你建立边界，找回力量
          </p>
        </div>

        {/* Tools List */}
        <div className="space-y-4">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`rounded-xl overflow-hidden transition-all duration-300 ${
                isDarkMode
                  ? 'bg-card border border-border'
                  : 'bg-white shadow-md'
              }`}
            >
              {/* Tool Header */}
              <button
                onClick={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
                className={`w-full flex items-center justify-between p-6 transition-colors duration-300 ${
                  isDarkMode
                    ? 'hover:bg-sage-dark/20'
                    : 'hover:bg-sage/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-sage-dark/30' : 'bg-sage/20'
                    }`}
                  >
                    <span
                      className={
                        isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
                      }
                    >
                      {tool.icon}
                    </span>
                  </div>
                  <div className="text-left">
                    <h3
                      className={`text-lg font-semibold ${
                        isDarkMode ? 'text-soft-green' : 'text-foreground'
                      }`}
                    >
                      {tool.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                      }`}
                    >
                      {tool.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    expandedTool === tool.id ? 'rotate-180' : ''
                  } ${isDarkMode ? 'text-gray-green' : 'text-muted-foreground'}`}
                />
              </button>

              {/* Tool Content */}
              {expandedTool === tool.id && (
                <div
                  className={`px-6 pb-6 animate-fade-in ${
                    isDarkMode ? 'border-t border-border' : 'border-t border-border'
                  }`}
                >
                  <div className="pt-6">
                    <p
                      className={`mb-6 ${
                        isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                      }`}
                    >
                      {tool.content.description}
                    </p>

                    {/* Steps */}
                    <div className="mb-6">
                      <h4
                        className={`font-semibold mb-3 ${
                          isDarkMode ? 'text-soft-green' : 'text-foreground'
                        }`}
                      >
                        操作步骤
                      </h4>
                      <ol className="space-y-2">
                        {tool.content.steps.map((step, idx) => (
                          <li
                            key={idx}
                            className={`flex items-start gap-3 ${
                              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                            }`}
                          >
                            <span
                              className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-sm ${
                                isDarkMode
                                  ? 'bg-sage-dark/30 text-soft-green'
                                  : 'bg-sage/20 text-foreground'
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Tips */}
                    {tool.content.tips && (
                      <div>
                        <h4
                          className={`font-semibold mb-3 ${
                            isDarkMode ? 'text-soft-green' : 'text-foreground'
                          }`}
                        >
                          小贴士
                        </h4>
                        <ul className="space-y-2">
                          {tool.content.tips.map((tip, idx) => (
                            <li
                              key={idx}
                              className={`flex items-start gap-2 ${
                                isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                              }`}
                            >
                              <span
                                className={
                                  isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
                                }
                              >
                                •
                              </span>
                              <span className="text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
