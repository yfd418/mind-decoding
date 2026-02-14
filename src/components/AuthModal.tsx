import { useState, useEffect } from 'react';
import { X, Mail, Lock, TreeDeciduous, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { communityProtocols, generateForestName } from '@/data/forestNames';
import { AuthModalProps } from '@/types';

interface ExtendedAuthModalProps extends AuthModalProps {
  isDarkMode: boolean;
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login', isDarkMode }: ExtendedAuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState<string[]>([]);
  const [previewForestName, setPreviewForestName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      if (initialMode === 'register') {
        setPreviewForestName(generateForestName());
      }
    }
  }, [isOpen, initialMode]);

  const handleModeSwitch = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setError('');
    if (newMode === 'register') {
      setPreviewForestName(generateForestName());
    }
  };

  const handleTermToggle = (termId: string) => {
    setAgreedTerms(prev => 
      prev.includes(termId) 
        ? prev.filter(id => id !== termId)
        : [...prev, termId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const success = await login(email, password);
        if (success) {
          onClose();
          resetForm();
        } else {
          setError('邮箱或密码错误，请重试');
        }
      } else {
        if (password !== confirmPassword) {
          setError('两次输入的密码不一致');
          setIsLoading(false);
          return;
        }

        if (password.length < 6) {
          setError('密码长度至少为6位');
          setIsLoading(false);
          return;
        }

        if (agreedTerms.length < 2) {
          setError('请至少同意前两项社区协议');
          setIsLoading(false);
          return;
        }

        const success = await register(email, password, agreedTerms);
        if (success) {
          onClose();
          resetForm();
        } else {
          setError('该邮箱已被注册');
        }
      }
    } catch (err) {
      setError('操作失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAgreedTerms([]);
    setPreviewForestName('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div 
        className={`relative w-full max-w-md my-8 rounded-2xl shadow-2xl transition-colors duration-700 ${
          isDarkMode 
            ? 'bg-forest border border-sage-dark/30' 
            : 'bg-white border border-sage/20'
        }`}
      >
        <button
          onClick={handleClose}
          className={`absolute top-3 right-3 z-10 p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'hover:bg-sage-dark/20 text-gray-green' 
              : 'hover:bg-sage/10 text-muted-foreground'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="text-center mb-4">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
              isDarkMode ? 'bg-sage-dark/30' : 'bg-sage/20'
            }`}>
              <TreeDeciduous className={`w-6 h-6 ${
                isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
              }`} />
            </div>
            <h2 className={`text-xl font-bold ${
              isDarkMode ? 'text-soft-green' : 'text-foreground'
            }`}>
              {mode === 'login' ? '欢迎回来' : '加入森林'}
            </h2>
            <p className={`mt-1 text-sm ${
              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
            }`}>
              {mode === 'login' 
                ? '用你的森林代号继续探索' 
                : '获得专属森林代号，开启治愈之旅'}
            </p>
          </div>

          {mode === 'register' && previewForestName && (
            <div className={`mb-4 p-3 rounded-xl text-center ${
              isDarkMode ? 'bg-sage-dark/20' : 'bg-sage/10'
            }`}>
              <p className={`text-xs mb-1 ${
                isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
              }`}>
                你的森林代号
              </p>
              <p className={`text-lg font-bold ${
                isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
              }`}>
                {previewForestName}
              </p>
              <button
                type="button"
                onClick={() => setPreviewForestName(generateForestName())}
                className={`mt-1 text-xs underline ${
                  isDarkMode ? 'text-gray-green hover:text-soft-green' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                换一个
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${
                isDarkMode ? 'text-gray-green' : 'text-foreground'
              }`}>
                邮箱
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                }`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className={`w-full pl-9 pr-4 py-2.5 rounded-lg border transition-colors text-sm ${
                    isDarkMode 
                      ? 'bg-forest border-sage-dark/30 text-soft-green placeholder:text-gray-green/50 focus:border-sunshine-light' 
                      : 'bg-white border-sage/30 text-foreground placeholder:text-muted-foreground/50 focus:border-sunshine'
                  } outline-none focus:ring-2 focus:ring-sunshine/20`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1.5 ${
                isDarkMode ? 'text-gray-green' : 'text-foreground'
              }`}>
                密码
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                }`} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-9 pr-4 py-2.5 rounded-lg border transition-colors text-sm ${
                    isDarkMode 
                      ? 'bg-forest border-sage-dark/30 text-soft-green placeholder:text-gray-green/50 focus:border-sunshine-light' 
                      : 'bg-white border-sage/30 text-foreground placeholder:text-muted-foreground/50 focus:border-sunshine'
                  } outline-none focus:ring-2 focus:ring-sunshine/20`}
                />
              </div>
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${
                    isDarkMode ? 'text-gray-green' : 'text-foreground'
                  }`}>
                    确认密码
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                      isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                    }`} />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className={`w-full pl-9 pr-4 py-2.5 rounded-lg border transition-colors text-sm ${
                        isDarkMode 
                          ? 'bg-forest border-sage-dark/30 text-soft-green placeholder:text-gray-green/50 focus:border-sunshine-light' 
                          : 'bg-white border-sage/30 text-foreground placeholder:text-muted-foreground/50 focus:border-sunshine'
                      } outline-none focus:ring-2 focus:ring-sunshine/20`}
                    />
                  </div>
                </div>

                <div className={`p-3 rounded-xl ${
                  isDarkMode ? 'bg-sage-dark/10' : 'bg-sage/5'
                }`}>
                  <p className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-soft-green' : 'text-foreground'
                  }`}>
                    社区净土协议
                  </p>
                  <div className="space-y-2">
                    {communityProtocols.map((protocol) => (
                      <label
                        key={protocol.id}
                        className={`flex items-start gap-2 cursor-pointer group ${
                          isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-4 h-4 mt-0.5 rounded border-2 transition-colors ${
                          agreedTerms.includes(protocol.id)
                            ? isDarkMode 
                              ? 'bg-sunshine-light border-sunshine-light' 
                              : 'bg-sunshine border-sunshine'
                            : isDarkMode
                              ? 'border-sage-dark/50 group-hover:border-sage-dark'
                              : 'border-sage/50 group-hover:border-sage'
                        }`}>
                          {agreedTerms.includes(protocol.id) && (
                            <Check className={`w-full h-full p-0.5 ${
                              isDarkMode ? 'text-forest' : 'text-white'
                            }`} />
                          )}
                        </div>
                        <input
                          type="checkbox"
                          checked={agreedTerms.includes(protocol.id)}
                          onChange={() => handleTermToggle(protocol.id)}
                          className="sr-only"
                        />
                        <div>
                          <p className={`text-xs font-medium ${
                            isDarkMode ? 'text-soft-green' : 'text-foreground'
                          }`}>
                            {protocol.label}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {error && (
              <div className={`flex items-center gap-2 p-2.5 rounded-lg text-sm ${
                isDarkMode ? 'bg-red-900/20 text-red-300' : 'bg-red-50 text-red-600'
              }`}>
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-lg'
              } ${
                isDarkMode 
                  ? 'bg-sunshine-light text-forest hover:bg-sunshine' 
                  : 'bg-sunshine text-white hover:bg-sunshine-dark'
              }`}
            >
              {isLoading ? '处理中...' : mode === 'login' ? '登录' : '注册'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
            }`}>
              {mode === 'login' ? '还没有账号？' : '已有账号？'}
              <button
                type="button"
                onClick={() => handleModeSwitch(mode === 'login' ? 'register' : 'login')}
                className={`ml-1 font-medium ${
                  isDarkMode 
                    ? 'text-sunshine-light hover:text-sunshine' 
                    : 'text-sunshine hover:text-sunshine-dark'
                }`}
              >
                {mode === 'login' ? '立即注册' : '立即登录'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
