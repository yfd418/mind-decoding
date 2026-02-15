import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, FileText, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import NotificationCenter from './NotificationCenter';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, openAuthModal } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDarkMode 
            ? 'bg-forest/70 backdrop-blur-md shadow-lg' 
            : 'bg-cream/70 backdrop-blur-md shadow-lg'
          : isDarkMode 
            ? 'bg-forest/60 backdrop-blur-sm' 
            : 'bg-cream/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg
              viewBox="0 0 60 60"
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="navLeafGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#4A6658" />
                  <stop offset="100%" stopColor="#6B8E7B" />
                </linearGradient>
              </defs>
              <circle cx="30" cy="30" r="28" fill={isDarkMode ? "#1B2B22" : "#2C3E33"} stroke="#4A6658" strokeWidth="1"/>
              <path
                d="M29 12 Q18 18 16 27 Q14 36 21 45 Q28 40 29 33 Q29 22 29 12"
                fill="url(#navLeafGradient)"
                opacity="0.85"
              />
              <path
                d="M31 12 Q42 18 44 27 Q46 36 39 45 Q32 40 31 33 Q31 22 31 12"
                fill="url(#navLeafGradient)"
                opacity="0.85"
              />
              <path
                d="M30 10 Q31 20 30 30 Q29 40 30 50"
                fill="none"
                stroke={isDarkMode ? "#1B2B22" : "#2C3E33"}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="30" cy="26" r="5" fill="#C9A050"/>
              <circle cx="30" cy="26" r="2" fill={isDarkMode ? "#1B2B22" : "#2C3E33"}/>
            </svg>
            <span className={`font-bold text-lg ${isDarkMode ? 'text-soft-green' : 'text-foreground'}`}>
              心理解码
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/#knowledge"
              className={`text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-green hover:text-soft-green'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              知识库
            </Link>
            <Link
              to="/#toolkit"
              className={`text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-green hover:text-soft-green'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              自助工具
            </Link>
            <Link
              to="/community"
              className={`text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-green hover:text-soft-green'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              迷雾森林
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-gray-green hover:text-soft-green hover:bg-sage-dark/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-sage/20'
              }`}
              title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notification Center */}
            <NotificationCenter isDarkMode={isDarkMode} />

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'text-gray-green hover:text-soft-green hover:bg-sage-dark/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-sage/20'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">
                    {user?.forestName}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div 
                      className={`frosted-glass fixed left-4 right-4 sm:left-auto sm:right-0 sm:absolute top-20 sm:top-full sm:mt-2 w-auto sm:w-48 rounded-xl shadow-lg overflow-hidden z-50 border ${
                        isDarkMode 
                          ? 'border-sage-dark/30' 
                          : 'border-sage/20'
                      }`}
                    >
                      <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-sage-dark/30' : 'border-sage/20'}`}>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-soft-green' : 'text-foreground'}`}>
                          {user?.forestName}
                        </p>
                        <p className={`text-xs truncate ${isDarkMode ? 'text-gray-green' : 'text-muted-foreground'}`}>
                          {user?.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/my-posts"
                          onClick={() => setIsUserMenuOpen(false)}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                            isDarkMode
                              ? 'text-gray-green hover:text-soft-green hover:bg-sage-dark/20'
                              : 'text-muted-foreground hover:text-foreground hover:bg-sage/20'
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                          我的帖子
                        </Link>
                        <button
                          onClick={handleLogout}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                            isDarkMode
                              ? 'text-gray-green hover:text-red-400 hover:bg-red-400/10'
                              : 'text-muted-foreground hover:text-red-500 hover:bg-red-500/10'
                          }`}
                        >
                          <LogOut className="w-4 h-4" />
                          退出登录
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-sage-dark/20 text-soft-green hover:bg-sage-dark/30'
                    : 'bg-sage/20 text-foreground hover:bg-sage/30'
                }`}
              >
                登录
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-gray-green hover:text-soft-green hover:bg-sage-dark/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-sage/20'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${isDarkMode ? 'border-sage-dark/30' : 'border-sage/20'}`}>
            <div className="flex flex-col gap-2">
              <Link
                to="/#knowledge"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode
                    ? 'text-gray-green hover:text-soft-green hover:bg-sage-dark/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-sage/20'
                }`}
              >
                知识库
              </Link>
              <Link
                to="/#toolkit"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode
                    ? 'text-gray-green hover:text-soft-green hover:bg-sage-dark/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-sage/20'
                }`}
              >
                自助工具
              </Link>
              <Link
                to="/community"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode
                    ? 'text-gray-green hover:text-soft-green hover:bg-sage-dark/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-sage/20'
                }`}
              >
                社区
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
