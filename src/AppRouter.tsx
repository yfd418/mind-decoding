import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { QueryProvider } from './lib/queryClient';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PageLoading } from './components/Loading';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KnowledgeSection from './components/KnowledgeSection';
import SelfHelpToolkit from './components/SelfHelpToolkit';
import CommunitySection from './components/CommunitySection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import EmergencyButton from './components/EmergencyButton';

const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage'));
const MyPostsPage = lazy(() => import('./pages/MyPostsPage'));

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
      <CommunitySection isDarkMode={isDarkMode} />
    </>
  );
}

function AppContent() {
  const { isDarkMode } = useTheme();
  const { isAuthModalOpen, closeAuthModal, authModalMode } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ErrorBoundary>
        <Suspense fallback={<PageLoading isDarkMode={isDarkMode} />}>
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
            <Route path="/community" element={<CommunityPage isDarkMode={isDarkMode} />} />
            <Route path="/post/:id" element={<PostDetailPage isDarkMode={isDarkMode} />} />
            <Route path="/my-posts" element={<MyPostsPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
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
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>
            <ErrorBoundary>
              <ScrollToTop />
              <AppContent />
            </ErrorBoundary>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
