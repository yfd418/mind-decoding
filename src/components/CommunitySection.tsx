import { Search, Shield, Heart, Waves, Trees, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CommunitySectionProps {
  isDarkMode: boolean;
}

export default function CommunitySection({ isDarkMode }: CommunitySectionProps) {
  const zones = [
    {
      id: 'recognition',
      icon: <Search className="w-8 h-8" />,
      title: '识别区',
      subtitle: '信号确认',
      description: '分享具体的困惑经历，由幸存者们帮你辨析真相',
      color: isDarkMode ? 'bg-sage-dark/20' : 'bg-sage/20',
    },
    {
      id: 'practice',
      icon: <Shield className="w-8 h-8" />,
      title: '实操区',
      subtitle: '边界实验室',
      description: '讨论如何拒绝、如何执行断联规则的实战技巧',
      color: isDarkMode ? 'bg-sunshine-light/20' : 'bg-sunshine/20',
    },
    {
      id: 'recovery',
      icon: <Heart className="w-8 h-8" />,
      title: '康复区',
      subtitle: '重生广场',
      description: '分享走出阴影后的生活点滴，互相提供希望',
      color: isDarkMode ? 'bg-sage-dark/20' : 'bg-sage/20',
    },
    {
      id: 'emotion',
      icon: <Waves className="w-8 h-8" />,
      title: '情绪区',
      subtitle: '互助树洞',
      description: '安全、不被评判的情绪释放空间',
      color: isDarkMode ? 'bg-gray-green/20' : 'bg-muted',
    },
  ];

  return (
    <section
      id="community"
      className={`py-24 transition-colors duration-700 ${
        isDarkMode ? 'bg-forest-green' : 'bg-[#E8F0EB]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Trees
              className={`w-12 h-12 ${
                isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
              }`}
            />
          </div>
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-700 ${
              isDarkMode ? 'text-soft-green' : 'text-foreground'
            }`}
          >
            迷雾森林互助社区
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto mb-6 transition-colors duration-700 ${
              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
            }`}
          >
            "愿你在迷雾中，找回属于自己的光。这里是一个"事实确认站"，也是一个"边界练习场"。"
          </p>
          <p
            className={`text-sm transition-colors duration-700 ${
              isDarkMode ? 'text-gray-green/80' : 'text-muted-foreground/80'
            }`}
          >
            我们聚集在此，不是为了复仇，而是为了重生。无论你经历过什么，请相信：这不是你的错，你也不再是一个人。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {zones.map((zone, index) => (
            <Link
              key={zone.id}
              to={`/community?zone=${zone.id}`}
              className={`group p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer block ${
                isDarkMode
                  ? 'bg-forest border border-forest-green hover:border-sage-dark/50'
                  : 'bg-white shadow-md hover:shadow-lg'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${zone.color}`}
              >
                <span
                  className={
                    isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
                  }
                >
                  {zone.icon}
                </span>
              </div>
              <h3
                className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-soft-green' : 'text-foreground'
                }`}
              >
                {zone.title}
              </h3>
              <p
                className={`text-xs mb-3 ${
                  isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                }`}
              >
                {zone.subtitle}
              </p>
              <p
                className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-green/80' : 'text-muted-foreground/80'
                }`}
              >
                {zone.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/community"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              isDarkMode
                ? 'bg-sunshine-light text-forest hover:bg-sunshine'
                : 'bg-sunshine text-white hover:bg-sunshine-dark'
            }`}
          >
            进入森林
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p
            className={`mt-4 text-sm ${
              isDarkMode ? 'text-gray-green/80' : 'text-muted-foreground/80'
            }`}
          >
            登录后即可参与讨论
          </p>
        </div>
      </div>
    </section>
  );
}
