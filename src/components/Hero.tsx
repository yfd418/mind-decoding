import { ArrowDown } from 'lucide-react';

interface HeroProps {
  isDarkMode: boolean;
}

export default function Hero({ isDarkMode }: HeroProps) {
  const scrollToKnowledge = () => {
    document.getElementById('knowledge')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDarkMode
            ? 'bg-gradient-to-b from-forest via-forest to-forest'
            : 'bg-gradient-to-b from-cream via-cream to-cream'
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute top-0 left-1/4 w-96 h-full transition-colors duration-700 ${
              isDarkMode
                ? 'bg-gradient-to-b from-sage-dark/10 to-transparent'
                : 'bg-gradient-to-b from-sage/20 to-transparent'
            }`}
            style={{ transform: 'rotate(15deg)' }}
          />
          <div
            className={`absolute top-0 right-1/4 w-96 h-full transition-colors duration-700 ${
              isDarkMode
                ? 'bg-gradient-to-b from-sage-dark/10 to-transparent'
                : 'bg-gradient-to-b from-sage/15 to-transparent'
            }`}
            style={{ transform: 'rotate(-15deg)' }}
          />
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-sunshine/30 animate-float" />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-sunshine/20 animate-float delay-200" />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-sunshine/25 animate-float delay-400" />
          <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-sunshine/20 animate-float delay-300" />
        </div>

        <div
          className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full transition-colors duration-700 ${
            isDarkMode ? 'bg-sage-dark/5' : 'bg-sage/10'
          }`}
        />
        <div
          className={`absolute -top-20 -right-20 w-96 h-96 rounded-full transition-colors duration-700 ${
            isDarkMode ? 'bg-sage-dark/5' : 'bg-sage/10'
          }`}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1
          className={`text-5xl md:text-7xl font-bold mb-6 transition-colors duration-700 ${
            isDarkMode ? 'text-soft-green' : 'text-foreground'
          }`}
          style={{ opacity: 0, animation: 'fade-in 0.8s ease-out forwards' }}
        >
          心理解码
        </h1>

        <p
          className={`text-xl md:text-2xl mb-10 transition-colors duration-700 ${
            isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
          }`}
          style={{ opacity: 0, animation: 'fade-in 0.8s ease-out 0.2s forwards' }}
        >
          解码人格迷雾，找回真实自我
        </p>

        <p
          className={`text-base md:text-lg max-w-2xl mx-auto mb-12 transition-colors duration-700 ${
            isDarkMode ? 'text-gray-green/80' : 'text-muted-foreground/80'
          }`}
          style={{ opacity: 0, animation: 'fade-in 0.8s ease-out 0.4s forwards' }}
        >
          如果你正身处一段让你感到身心俱疲、怀疑人生的关系，
          <br />
          这里有最真实的科普、最实用的指引、最温暖的陪伴
        </p>

        <button
          onClick={scrollToKnowledge}
          className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
            isDarkMode
              ? 'bg-sunshine-light text-forest hover:bg-sunshine'
              : 'bg-sunshine text-white hover:bg-sunshine-dark'
          }`}
          style={{ opacity: 0, animation: 'fade-in 0.8s ease-out 0.6s forwards' }}
        >
          开始探索
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown
          className={`w-6 h-6 transition-colors duration-700 ${
            isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
          }`}
        />
      </div>
    </section>
  );
}
