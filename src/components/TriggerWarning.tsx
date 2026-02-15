import { useState } from 'react';
import { AlertTriangle, Heart, ArrowRight, X } from 'lucide-react';
import { triggerWarningContent, TriggerWarningType } from '@/data/triggerWarning';

interface TriggerWarningProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  warningType?: TriggerWarningType;
  isDarkMode: boolean;
}

export default function TriggerWarning({
  isOpen,
  onConfirm,
  onCancel,
  warningType = 'content',
  isDarkMode,
}: TriggerWarningProps) {
  if (!isOpen) return null;

  const currentContent = triggerWarningContent[warningType];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div
        className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden ${
          isDarkMode
            ? 'bg-forest border border-sage-dark/30'
            : 'bg-white border border-sage/20'
        }`}
      >
        <div
          className={`p-6 ${
            isDarkMode ? 'bg-amber-900/30' : 'bg-amber-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-amber-600/30' : 'bg-amber-100'
              }`}
            >
              <AlertTriangle
                className={`w-6 h-6 ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-600'
                }`}
              />
            </div>
            <div>
              <h3
                className={`text-lg font-bold ${
                  isDarkMode ? 'text-soft-green' : 'text-foreground'
                }`}
              >
                {currentContent.title}
              </h3>
              <p
                className={`text-sm ${
                  isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                }`}
              >
                Trigger Warning
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p
            className={`mb-4 ${
              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
            }`}
          >
            {currentContent.description}
          </p>

          <ul className="space-y-2 mb-6">
            {currentContent.details.map((detail, index) => (
              <li
                key={index}
                className={`flex items-start gap-2 text-sm ${
                  isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                }`}
              >
                <span
                  className={isDarkMode ? 'text-amber-400' : 'text-amber-600'}
                >
                  •
                </span>
                {detail}
              </li>
            ))}
          </ul>

          <div
            className={`p-4 rounded-lg mb-6 ${
              isDarkMode ? 'bg-sage-dark/10' : 'bg-sage/5'
            }`}
          >
            <div className="flex items-start gap-3">
              <Heart
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
                }`}
              />
              <p
                className={`text-sm ${
                  isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                }`}
              >
                你的心理健康最重要。如果现在不是合适的时机，可以稍后再来。我们一直在这里等你。
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {onCancel && (
              <button
                onClick={onCancel}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-sage-dark/20 text-gray-green hover:bg-sage-dark/30'
                    : 'bg-sage/10 text-muted-foreground hover:bg-sage/20'
                }`}
              >
                <X className="w-4 h-4" />
                稍后再来
              </button>
            )}
            <button
              onClick={onConfirm}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                isDarkMode
                  ? 'bg-sunshine-light text-forest hover:bg-sunshine'
                  : 'bg-sunshine text-white hover:bg-sunshine-dark'
              }`}
            >
              我准备好了
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useTriggerWarning(
  warningType: TriggerWarningType = 'content'
) {
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const checkAndShow = () => {
    const sessionKey = `trigger_warning_${warningType}_confirmed`;
    const alreadyConfirmed = sessionStorage.getItem(sessionKey) === 'true';
    
    if (alreadyConfirmed) {
      setHasConfirmed(true);
      return true;
    } else {
      setShowWarning(true);
      return false;
    }
  };

  const confirm = () => {
    const sessionKey = `trigger_warning_${warningType}_confirmed`;
    sessionStorage.setItem(sessionKey, 'true');
    setHasConfirmed(true);
    setShowWarning(false);
  };

  const cancel = () => {
    setShowWarning(false);
  };

  return {
    hasConfirmed,
    showWarning,
    checkAndShow,
    confirm,
    cancel,
  };
}
