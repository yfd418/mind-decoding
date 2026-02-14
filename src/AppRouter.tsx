import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KnowledgeSection from './components/KnowledgeSection';
import SelfHelpToolkit from './components/SelfHelpToolkit';
import RedFlagChecker from './components/RedFlagChecker';
import CommunitySection from './components/CommunitySection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import EmergencyButton from './components/EmergencyButton';
import CommunityPage from './pages/CommunityPage';
import PostDetailPage from './pages/PostDetailPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

interface HomePageProps {
  isDarkMode: boolean;
}

function HomePage({ isDarkMode }: HomePageProps) {
  return (
    <>
      <Hero isDarkMode={isDarkMode} />
      <KnowledgeSection isDarkMode={isDarkMode} />
      <SelfHelpToolkit isDarkMode={isDarkMode} />
      <RedFlagChecker isDarkMode={isDarkMode} />
      <CommunitySection isDarkMode={isDarkMode} />
    </>
  );
}

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isAuthModalOpen, closeAuthModal, authModalMode } = useAuth();

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
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
      <Routes>
        <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
        <Route path="/community" element={<CommunityPage isDarkMode={isDarkMode} />} />
        <Route path="/post/:id" element={<PostDetailPage isDarkMode={isDarkMode} />} />
      </Routes>
      <Footer isDarkMode={isDarkMode} />
      <EmergencyButton isDarkMode={isDarkMode} />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authModalMode}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
