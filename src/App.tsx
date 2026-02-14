import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KnowledgeSection from './components/KnowledgeSection';
import SelfHelpToolkit from './components/SelfHelpToolkit';
import CommunitySection from './components/CommunitySection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isAuthModalOpen, closeAuthModal, authModalMode } = useAuth();

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Hero isDarkMode={isDarkMode} />
      <KnowledgeSection isDarkMode={isDarkMode} />
      <SelfHelpToolkit isDarkMode={isDarkMode} />
      <CommunitySection isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authModalMode}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
