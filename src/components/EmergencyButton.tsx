import { useState } from 'react';
import { Phone, X, AlertTriangle, Heart, ExternalLink } from 'lucide-react';

interface EmergencyButtonProps {
  isDarkMode: boolean;
}

export default function EmergencyButton({ isDarkMode }: EmergencyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyResources = [
    {
      name: '全国心理援助热线',
      number: '12356',
      description: '国家卫健委统一热线',
      primary: true,
    },
    {
      name: '希望24热线',
      number: '400-161-9995',
      description: '24小时生命危机干预',
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isDarkMode 
            ? 'bg-red-600 hover:bg-red-500' 
            : 'bg-red-500 hover:bg-red-600'
        }`}
        title="紧急求助"
      >
        <Phone className="w-6 h-6 text-white animate-pulse" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className={`relative w-full max-w-md mx-4 mb-6 sm:mb-0 rounded-2xl shadow-2xl overflow-hidden ${
            isDarkMode 
              ? 'bg-forest border border-sage-dark/30' 
              : 'bg-white border border-sage/20'
          }`}>
            <div className={`p-4 flex items-center justify-between border-b ${
              isDarkMode ? 'border-sage-dark/30 bg-red-900/20' : 'border-sage/20 bg-red-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-red-600' : 'bg-red-500'
                }`}>
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    isDarkMode ? 'text-soft-green' : 'text-foreground'
                  }`}>
                    紧急求助
                  </h3>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                  }`}>
                    你不是一个人，我们在这里
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-sage-dark/20 text-gray-green' 
                    : 'hover:bg-sage/10 text-muted-foreground'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <p className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
              }`}>
                如果你正在经历危机或需要立即帮助，请拨打以下热线：
              </p>

              {emergencyResources.map((resource, index) => (
                <a
                  key={index}
                  href={`tel:${resource.number}`}
                  className={`block p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                    resource.primary
                      ? isDarkMode
                        ? 'bg-red-900/30 border border-red-600/50'
                        : 'bg-red-50 border border-red-200'
                      : isDarkMode
                        ? 'bg-sage-dark/10 hover:bg-sage-dark/20'
                        : 'bg-sage/5 hover:bg-sage/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${
                        resource.primary
                          ? isDarkMode ? 'text-red-300' : 'text-red-600'
                          : isDarkMode ? 'text-soft-green' : 'text-foreground'
                      }`}>
                        {resource.name}
                      </p>
                      <p className={`text-xs mt-1 ${
                        isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                      }`}>
                        {resource.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        resource.primary
                          ? isDarkMode ? 'text-red-300' : 'text-red-600'
                          : isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
                      }`}>
                        {resource.number}
                      </p>
                      <ExternalLink className={`w-4 h-4 inline ${
                        isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                      }`} />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className={`p-4 border-t ${
              isDarkMode ? 'border-sage-dark/30' : 'border-sage/20'
            }`}>
              <div className={`flex items-start gap-3 p-3 rounded-lg ${
                isDarkMode ? 'bg-sage-dark/10' : 'bg-sage/5'
              }`}>
                <Heart className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
                }`} />
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                }`}>
                  无论你正在经历什么，请记住：你的感受是真实的，你值得被善待。寻求帮助是勇敢的表现，而不是软弱。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
