import { Phone, AlertTriangle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface FooterProps {
  isDarkMode: boolean;
}

function FooterLogo({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <svg
      viewBox="0 0 320 60"
      className="h-10 w-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="footerLeafGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#4A6658" />
          <stop offset="100%" stopColor="#6B8E7B" />
        </linearGradient>
      </defs>

      <g transform="translate(5, 8)">
        <path
          d="M18 35 Q10 30 8 20 Q6 10 15 5 Q20 2 22 8 Q25 15 22 22 Q20 28 18 35"
          fill="none"
          stroke="#6B8E7B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M26 35 Q34 30 36 20 Q38 10 29 5 Q24 2 22 8 Q19 15 22 22 Q24 28 26 35"
          fill="none"
          stroke="#6B8E7B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22 22 Q22 15 22 8 Q22 2 25 0"
          fill="none"
          stroke="#6B8E7B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22 12 Q18 10 16 14 Q18 16 22 14"
          fill="#6B8E7B"
          stroke="none"
        />
        <path
          d="M22 38 Q18 35 18 32 Q18 29 22 29 Q26 29 26 32 Q26 35 22 38"
          fill={isDarkMode ? '#D4B675' : '#C9A050'}
          stroke="none"
        />
      </g>

      <text
        x="55"
        y="28"
        fontFamily="system-ui, 'PingFang SC', 'Noto Sans SC', sans-serif"
        fontSize="22"
        fontWeight="bold"
        fill="#FFFFFF"
      >
        心理解码
      </text>

      <text
        x="55"
        y="46"
        fontFamily="system-ui, 'PingFang SC', 'Noto Sans SC', sans-serif"
        fontSize="10"
        fill="#A5B5AD"
      >
        解码人格迷雾 找回真实自我
      </text>
    </svg>
  );
}

export default function Footer({ isDarkMode }: FooterProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const quickLinks = [
    { href: '/#knowledge', label: '人格障碍科普', anchor: 'knowledge' },
    { href: '/#toolkit', label: '自救工具箱', anchor: 'toolkit' },
    { href: '/community', label: '迷雾森林社区', anchor: null },
  ];

  const renderLink = (link: typeof quickLinks[0]) => {
    if (link.href === '/community') {
      return (
        <Link
          to={link.href}
          className={`text-sm transition-colors ${
            isDarkMode ? 'text-gray-green hover:text-sunshine-light' : 'text-white/70 hover:text-sunshine'
          }`}
        >
          {link.label}
        </Link>
      );
    }

    if (isHomePage && link.anchor) {
      return (
        <a
          href={`#${link.anchor}`}
          className={`text-sm transition-colors ${
            isDarkMode ? 'text-gray-green hover:text-sunshine-light' : 'text-white/70 hover:text-sunshine'
          }`}
        >
          {link.label}
        </a>
      );
    }

    return (
      <a
        href={link.href}
        className={`text-sm transition-colors ${
          isDarkMode ? 'text-gray-green hover:text-sunshine-light' : 'text-white/70 hover:text-sunshine'
        }`}
      >
        {link.label}
      </a>
    );
  };

  return (
    <footer
      className={`py-12 transition-colors duration-700 ${
        isDarkMode ? 'bg-[#152419]' : 'bg-[#2C3E33]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`mb-10 p-6 rounded-xl ${
            isDarkMode ? 'bg-sage-dark/20' : 'bg-white/10'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <Phone
                className={`w-6 h-6 ${
                  isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
                }`}
              />
              <span
                className={`text-lg font-semibold ${
                  isDarkMode ? 'text-soft-green' : 'text-white'
                }`}
              >
                24小时求助热线
              </span>
            </div>
            <a
              href="tel:400-161-9995"
              className={`text-2xl md:text-3xl font-bold ${
                isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
              } hover:underline`}
            >
              400-161-9995
            </a>
          </div>
          <p
            className={`text-center mt-4 text-sm ${
              isDarkMode ? 'text-gray-green/80' : 'text-white/70'
            }`}
          >
            全国24小时免费心理援助热线
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="mb-4">
              <FooterLogo isDarkMode={isDarkMode} />
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-green/80' : 'text-white/70'
              }`}
            >
              致力于帮助更多人看清人际关系中的真相，停止内耗，找回属于自己的人生主动权。
            </p>
          </div>

          <div>
            <h4
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-soft-green' : 'text-white'
              }`}
            >
              快速链接
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {renderLink(link)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle
                className={`w-5 h-5 ${
                  isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
                }`}
              />
              <span
                className={`text-lg font-semibold ${
                  isDarkMode ? 'text-soft-green' : 'text-white'
                }`}
              >
                重要提示
              </span>
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-green/80' : 'text-white/70'
              }`}
            >
              本站所有内容及用户分享仅供参考，不具有医疗诊断建议效力。如遇严重心理危机或人身安全威胁，请务必联系专业机构或报警。
            </p>
          </div>
        </div>

        <div
          className={`pt-8 border-t ${
            isDarkMode ? 'border-forest-green' : 'border-white/20'
          }`}
        >
          <p
            className={`text-center text-sm ${
              isDarkMode ? 'text-gray-green/60' : 'text-white/50'
            }`}
          >
            © 2024 心理解码. All rights reserved. | 你值得所有温柔和美好，从看清真相、找回自我开始
          </p>
        </div>
      </div>
    </footer>
  );
}
