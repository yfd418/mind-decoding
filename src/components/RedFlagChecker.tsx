import { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Download, Shield, Heart, AlertCircle } from 'lucide-react';

interface RedFlagCheckerProps {
  isDarkMode: boolean;
}

interface RedFlagItem {
  id: string;
  category: string;
  text: string;
  severity: 'low' | 'medium' | 'high';
  weight: number;
}

const redFlagItems: RedFlagItem[] = [
  { id: '1', category: '情感操控', text: '经常让我怀疑自己的记忆或判断（"我没说过那话"、"你太敏感了"）', severity: 'high', weight: 3 },
  { id: '2', category: '情感操控', text: '会突然冷落我，让我不知道自己做错了什么', severity: 'medium', weight: 2 },
  { id: '3', category: '情感操控', text: '用"如果你爱我，你就会..."来要求我做事', severity: 'medium', weight: 2 },
  { id: '4', category: '情感操控', text: '经常让我感到内疚，即使我没有做错任何事', severity: 'medium', weight: 2 },
  
  { id: '5', category: '控制行为', text: '查看我的手机、社交媒体或邮件', severity: 'high', weight: 3 },
  { id: '6', category: '控制行为', text: '限制我与朋友或家人见面', severity: 'high', weight: 3 },
  { id: '7', category: '控制行为', text: '对我穿什么、去哪里、见谁有很多意见', severity: 'medium', weight: 2 },
  { id: '8', category: '控制行为', text: '需要知道我每时每刻在哪里', severity: 'medium', weight: 2 },
  
  { id: '9', category: '情绪不稳定', text: '情绪变化极快，我永远不知道下一秒会发生什么', severity: 'high', weight: 3 },
  { id: '10', category: '情绪不稳定', text: '会因为小事大发雷霆', severity: 'medium', weight: 2 },
  { id: '11', category: '情绪不稳定', text: '生气时会摔东西、威胁或做出让我害怕的行为', severity: 'high', weight: 3 },
  { id: '12', category: '情绪不稳定', text: '经常威胁要伤害自己，如果我想离开的话', severity: 'high', weight: 3 },
  
  { id: '13', category: '自我中心', text: '从不认错，即使证据确凿也会甩锅给我', severity: 'high', weight: 3 },
  { id: '14', category: '自我中心', text: '对我的感受漠不关心，只在乎自己的需求', severity: 'medium', weight: 2 },
  { id: '15', category: '自我中心', text: '对外人很好，对我却完全不同', severity: 'medium', weight: 2 },
  { id: '16', category: '自我中心', text: '需要持续的关注和赞美', severity: 'low', weight: 1 },
  
  { id: '17', category: '边界侵犯', text: '不尊重我的"不"，会一直纠缠直到我同意', severity: 'high', weight: 3 },
  { id: '18', category: '边界侵犯', text: '把我付出的一切当作理所当然', severity: 'medium', weight: 2 },
  { id: '19', category: '边界侵犯', text: '贬低我的能力，让我觉得离开ta就活不下去', severity: 'high', weight: 3 },
  { id: '20', category: '边界侵犯', text: '翻旧账，把很久以前的事反复拿出来说', severity: 'low', weight: 1 },
];

const categoryLabels: Record<string, { label: string; color: string }> = {
  '情感操控': { label: '情感操控', color: 'red' },
  '控制行为': { label: '控制行为', color: 'orange' },
  '情绪不稳定': { label: '情绪不稳定', color: 'yellow' },
  '自我中心': { label: '自我中心', color: 'purple' },
  '边界侵犯': { label: '边界侵犯', color: 'pink' },
};

export default function RedFlagChecker({ isDarkMode }: RedFlagCheckerProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const calculateResult = () => {
    let totalScore = 0;
    let highCount = 0;
    let mediumCount = 0;
    let lowCount = 0;

    checkedItems.forEach(id => {
      const item = redFlagItems.find(i => i.id === id);
      if (item) {
        totalScore += item.weight;
        if (item.severity === 'high') highCount++;
        else if (item.severity === 'medium') mediumCount++;
        else lowCount++;
      }
    });

    let riskLevel: 'low' | 'moderate' | 'high' | 'critical';
    let riskColor: string;
    let riskBg: string;
    let recommendations: string[];

    if (totalScore >= 15 || highCount >= 3) {
      riskLevel = 'critical';
      riskColor = isDarkMode ? 'text-red-400' : 'text-red-600';
      riskBg = isDarkMode ? 'bg-red-900/30 border-red-600/50' : 'bg-red-50 border-red-200';
      recommendations = [
        '⚠️ 你的情况可能涉及严重的关系虐待，请认真考虑寻求专业帮助',
        '建议联系心理援助热线：400-161-9995',
        '如果存在人身安全威胁，请考虑安全计划并联系当地支持机构',
        '不要单独面对，寻找信任的朋友或家人支持',
      ];
    } else if (totalScore >= 8 || highCount >= 1) {
      riskLevel = 'high';
      riskColor = isDarkMode ? 'text-orange-400' : 'text-orange-600';
      riskBg = isDarkMode ? 'bg-orange-900/30 border-orange-600/50' : 'bg-orange-50 border-orange-200';
      recommendations = [
        '这段关系可能存在较多不健康的模式',
        '建议学习并实践"灰石法"和"边界设置"技巧',
        '考虑寻求心理咨询师的帮助',
        '与信任的朋友或家人分享你的经历',
      ];
    } else if (totalScore >= 4) {
      riskLevel = 'moderate';
      riskColor = isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
      riskBg = isDarkMode ? 'bg-yellow-900/30 border-yellow-600/50' : 'bg-yellow-50 border-yellow-200';
      recommendations = [
        '这段关系存在一些需要注意的信号',
        '建议观察这些行为是否持续存在',
        '学习识别健康关系的特征',
        '保持对自己感受的关注',
      ];
    } else {
      riskLevel = 'low';
      riskColor = isDarkMode ? 'text-green-400' : 'text-green-600';
      riskBg = isDarkMode ? 'bg-green-900/30 border-green-600/50' : 'bg-green-50 border-green-200';
      recommendations = [
        '目前检测到的红旗信号较少',
        '继续保持对自己感受的关注',
        '如果情况有变化，可以重新评估',
        '学习健康关系的边界和沟通技巧',
      ];
    }

    return {
      totalScore,
      riskLevel,
      riskColor,
      riskBg,
      highCount,
      mediumCount,
      lowCount,
      recommendations,
      checkedCount: checkedItems.size,
    };
  };

  const reset = () => {
    setCheckedItems(new Set());
    setShowResult(false);
  };

  const result = calculateResult();

  const groupedItems = redFlagItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, RedFlagItem[]>);

  return (
    <section
      id="redflag"
      className={`py-24 transition-colors duration-700 ${
        isDarkMode ? 'bg-forest-green' : 'bg-[#E8F0EB]'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <AlertTriangle className={`w-12 h-12 ${
              isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
            }`} />
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-soft-green' : 'text-foreground'
          }`}>
            红旗信号自测表
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
          }`}>
            勾选你在当前关系中经历过的行为，系统将生成一份边界健康评估报告
          </p>
        </div>

        <div className={`mb-8 p-4 rounded-lg ${
          isDarkMode ? 'bg-sage-dark/20' : 'bg-sage/10'
        }`}>
          <div className="flex items-start gap-3">
            <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
            }`} />
            <p className={`text-sm ${isDarkMode ? 'text-gray-green' : 'text-muted-foreground'}`}>
              本测试仅供参考，不能作为诊断依据。如果你正在经历危险情况，请立即寻求专业帮助。
            </p>
          </div>
        </div>

        {!showResult ? (
          <>
            <div className="space-y-6 mb-8">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div
                  key={category}
                  className={`rounded-xl overflow-hidden ${
                    isDarkMode 
                      ? 'bg-card border border-border' 
                      : 'bg-white shadow-md'
                  }`}
                >
                  <div className={`px-6 py-4 ${
                    isDarkMode ? 'bg-sage-dark/20' : 'bg-sage/10'
                  }`}>
                    <h3 className={`font-semibold ${
                      isDarkMode ? 'text-soft-green' : 'text-foreground'
                    }`}>
                      {categoryLabels[category]?.label || category}
                    </h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {items.map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          checkedItems.has(item.id)
                            ? isDarkMode
                              ? 'bg-sunshine-light/10'
                              : 'bg-sunshine/10'
                            : isDarkMode
                              ? 'hover:bg-sage-dark/10'
                              : 'hover:bg-sage/5'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 transition-colors ${
                          checkedItems.has(item.id)
                            ? isDarkMode
                              ? 'bg-sunshine-light border-sunshine-light'
                              : 'bg-sunshine border-sunshine'
                            : isDarkMode
                              ? 'border-sage-dark/50'
                              : 'border-sage/50'
                        }`}>
                          {checkedItems.has(item.id) && (
                            <CheckCircle className="w-full h-full p-0.5 text-white" />
                          )}
                        </div>
                        <input
                          type="checkbox"
                          checked={checkedItems.has(item.id)}
                          onChange={() => toggleItem(item.id)}
                          className="sr-only"
                        />
                        <span className={`text-sm flex-1 ${
                          isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                        }`}>
                          {item.text}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          item.severity === 'high'
                            ? 'bg-red-100 text-red-600'
                            : item.severity === 'medium'
                              ? 'bg-orange-100 text-orange-600'
                              : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {item.severity === 'high' ? '高危' : item.severity === 'medium' ? '中危' : '低危'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={reset}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-sage-dark/20 text-gray-green hover:bg-sage-dark/30' 
                    : 'bg-sage/10 text-muted-foreground hover:bg-sage/20'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                重置
              </button>
              <button
                onClick={() => setShowResult(true)}
                disabled={checkedItems.size === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  checkedItems.size > 0
                    ? isDarkMode
                      ? 'bg-sunshine-light text-forest hover:bg-sunshine'
                      : 'bg-sunshine text-white hover:bg-sunshine-dark'
                    : 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
                }`}
              >
                <Shield className="w-4 h-4" />
                生成评估报告
              </button>
            </div>
          </>
        ) : (
          <div className={`rounded-xl overflow-hidden ${
            isDarkMode 
              ? 'bg-card border border-border' 
              : 'bg-white shadow-lg'
          }`}>
            <div className={`p-6 ${result.riskBg} border-b`}>
              <div className="text-center">
                <h3 className={`text-2xl font-bold mb-2 ${result.riskColor}`}>
                  边界健康评估报告
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-green' : 'text-muted-foreground'}`}>
                  你勾选了 {result.checkedCount} 项红旗信号
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className={`text-center p-4 rounded-lg ${
                  isDarkMode ? 'bg-red-900/20' : 'bg-red-50'
                }`}>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                    {result.highCount}
                  </p>
                  <p className="text-xs text-red-500">高危信号</p>
                </div>
                <div className={`text-center p-4 rounded-lg ${
                  isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50'
                }`}>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    {result.mediumCount}
                  </p>
                  <p className="text-xs text-orange-500">中危信号</p>
                </div>
                <div className={`text-center p-4 rounded-lg ${
                  isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
                }`}>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    {result.lowCount}
                  </p>
                  <p className="text-xs text-yellow-500">低危信号</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg mb-6 ${result.riskBg} border`}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className={`w-5 h-5 ${result.riskColor}`} />
                  <span className={`font-semibold ${result.riskColor}`}>
                    风险等级：{
                      result.riskLevel === 'critical' ? '需要紧急关注' :
                      result.riskLevel === 'high' ? '较高风险' :
                      result.riskLevel === 'moderate' ? '中等风险' : '较低风险'
                    }
                  </span>
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-green' : 'text-muted-foreground'}`}>
                  综合评分：{result.totalScore} 分
                </p>
              </div>

              <div className="mb-6">
                <h4 className={`font-semibold mb-3 flex items-center gap-2 ${
                  isDarkMode ? 'text-soft-green' : 'text-foreground'
                }`}>
                  <Heart className={`w-4 h-4 ${isDarkMode ? 'text-sunshine-light' : 'text-sunshine'}`} />
                  建议与指导
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-sm ${
                      isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                    }`}>
                      <span className={isDarkMode ? 'text-sunshine-light' : 'text-sunshine'}>•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 rounded-lg mb-6 ${
                isDarkMode ? 'bg-sage-dark/10' : 'bg-sage/5'
              }`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-green' : 'text-muted-foreground'}`}>
                  <strong>免责声明：</strong>本评估仅供参考，不能替代专业诊断。如果你正在经历危机或人身安全受到威胁，请立即联系专业机构或报警。
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={reset}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-sage-dark/20 text-gray-green hover:bg-sage-dark/30' 
                      : 'bg-sage/10 text-muted-foreground hover:bg-sage/20'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  重新测试
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
