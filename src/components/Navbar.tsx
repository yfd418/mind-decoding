import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, User, LogOut, TreeDeciduous } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

function Logo({ isDarkMode }: { isDarkMode: boolean }) {
  const textColor = isDarkMode ? '#E0E6E2' : '#2C3E33';
  const sloganColor = isDarkMode ? '#A5B5AD' : '#5F7066';
  const bgColor = isDarkMode ? '#1B2B22' : '#FDFBF7';
  const leafColor = isDarkMode ? '#6B8E7B' : '#6B8E7B';
  const goldColor = isDarkMode ? '#D4B675' : '#C9A050';

  return (
    <svg
      viewBox="0 0 320 60"
      className="h-10 w-auto md:h-12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="navLeafGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={isDarkMode ? '#4A6658' : '#4A6658'} />
          <stop offset="100%" stopColor={isDarkMode ? '#6B8E7B' : '#6B8E7B'} />
        </linearGradient>
        <linearGradient id="navGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={goldColor} />
          <stop offset="100%" stopColor={goldColor} />
        </linearGradient>
      </defs>

      <g transform="translate(5, 5)">
        <circle cx="25" cy="25" r="23" fill={bgColor} stroke={isDarkMode ? '#4A6658' : '#1B2B22'} strokeWidth="1.5"/>
        
        <path
          d="M24 8 Q14 14 12 22 Q10 30 16 38 Q22 34 24 28 Q24 18 24 8"
          fill="url(#navLeafGradient)"
          opacity="0.85"
        />
        <path
          d="M26 8 Q36 14 38 22 Q40 30 34 38 Q28 34 26 28 Q26 18 26 8"
          fill="url(#navLeafGradient)"
          opacity="0.85"
        />
        
        <path
          d="M25 6 Q26 15 25 25 Q24 35 25 42"
          fill="none"
          stroke={isDarkMode ? '#1B2B22' : '#1B2B22'}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        <circle cx="25" cy="22" r="5" fill="url(#navGoldGradient)"/>
        <circle cx="25" cy="22" r="2" fill={bgColor}/>
        
        <circle cx="12" cy="18" r="1" fill={goldColor} opacity="0.6"/>
        <circle cx="38" cy="18" r="1" fill={goldColor} opacity="0.6"/>
        <circle cx="25" cy="44" r="1" fill={goldColor} opacity="0.5"/>
      </g>

      <text
        x="65"
        y="26"
        fontFamily="system-ui, 'PingFang SC', 'Noto Sans SC', sans-serif"
        fontSize="20"
        fontWeight="bold"
        fill={textColor}
      >
        心理解码
      </text>

      <text
        x="65"
        y="42"
        fontFamily="system-ui, 'PingFang SC', 'Noto Sans SC', sans-serif"
        fontSize="9"
        fill={sloganColor}
      >
        解码人格迷雾 找回真实自我
      </text>
    </svg>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: '首页', anchor: 'hero' },
    { href: '/#knowledge', label: '科普板块', anchor: 'knowledge' },
    { href: '/#toolkit', label: '自救工具箱', anchor: 'toolkit' },
    { href: '/#redflag', label: '红旗自测', anchor: 'redflag' },
    { href: '/community', label: '迷雾森林', anchor: null },
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const renderNavLink = (link: typeof navLinks[0]) => {
    if (link.href === '/community') {
      return (
        <Link
          key={link.href}
          to={link.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`text-sm font-medium transition-colors duration-300 hover:text-sunshine ${
            isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
          }`}
        >
          {link.label}
        </Link>
      );
    }

    if (isHomePage && link.anchor) {
      return (
        <a
          key={link.href}
          href={`#${link.anchor}`}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`text-sm font-medium transition-colors duration-300 hover:text-sunshine ${
            isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
          }`}
        >
          {link.label}
        </a>
      );
    }

    return (
      <a
        key={link.href}
        href={link.href}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`text-sm font-medium transition-colors duration-300 hover:text-sunshine ${
          isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
        }`}
      >
        {link.label}
      </a>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDarkMode 
            ? 'bg-forest/70 backdrop-blur-md shadow-lg' 
            : 'bg-cream/70 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo isDarkMode={isDarkMode} />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(renderNavLink)}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 hover:bg-primary/20 ${
                isDarkMode ? 'text-sunshine-light' : 'text-sage-dark'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-sage-dark/20 text-soft-green' 
                      : 'hover:bg-sage/10 text-foreground'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-sage-dark/30' : 'bg-sage/20'
                  }`}>
                    <TreeDeciduous className={`w-4 h-4 ${
                      isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
                    }`} />
                  </div>
                  <span className="text-sm font-medium hidden sm:block">
                    {user.forestName}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div 
                    className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg overflow-hidden ${
                      isDarkMode 
                        ? 'bg-forest border border-sage-dark/30' 
                        : 'bg-white border border-sage/20'
                    }`}
                  >
                    <div className={`px-4 py-3 border-b ${
                      isDarkMode ? 'border-sage-dark/30' : 'border-sage/20'
                    }`}>
                      <p className={`text-sm font-medium ${
                        isDarkMode ? 'text-soft-green' : 'text-foreground'
                      }`}>
                        {user.forestName}
                      </p>
                      <p className={`text-xs truncate ${
                        isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                      }`}>
                        {user.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                          isDarkMode 
                            ? 'text-gray-green hover:bg-sage-dark/20 hover:text-soft-green' 
                            : 'text-muted-foreground hover:bg-sage/10 hover:text-foreground'
                        }`}
                      >
                        <LogOut className="w-4 h-4" />
                        退出登录
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'text-gray-green hover:text-soft-green hover:bg-sage-dark/20' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-sage/10'
                  }`}
                >
                  登录
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-sunshine-light text-forest hover:bg-sunshine' 
                      : 'bg-sunshine text-white hover:bg-sunshine-dark'
                  }`}
                >
                  注册
                </button>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-lg hover:bg-primary/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isDarkMode ? 'text-soft-green' : 'text-foreground'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isDarkMode ? 'text-soft-green' : 'text-foreground'}`} />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map(renderNavLink)}
              {!isAuthenticated && (
                <div className="flex gap-2 pt-2 border-t border-border">
                  <button
                    onClick={() => {
                      openAuthModal('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg ${
                      isDarkMode 
                        ? 'text-gray-green hover:bg-sage-dark/20' 
                        : 'text-muted-foreground hover:bg-sage/10'
                    }`}
                  >
                    登录
                  </button>
                  <button
                    onClick={() => {
                      openAuthModal('register');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg ${
                      isDarkMode 
                        ? 'bg-sunshine-light text-forest' 
                        : 'bg-sunshine text-white'
                    }`}
                  >
                    注册
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
