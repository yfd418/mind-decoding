import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KnowledgeSection from './components/KnowledgeSection';
import SelfHelpToolkit from './components/SelfHelpToolkit';
import CommunitySection from './components/CommunitySection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

function AppContent() {
  const { isDarkMode } = useTheme();
  const { isAuthModalOpen, closeAuthModal, authModalMode } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
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
  return <AppContent />;
}

export default App;
