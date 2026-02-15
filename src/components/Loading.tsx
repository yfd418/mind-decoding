import { TreeDeciduous } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`animate-spin ${sizeClasses[size]} ${className}`}>
      <TreeDeciduous className="w-full h-full" />
    </div>
  );
}

interface LoadingOverlayProps {
  message?: string;
  isDarkMode?: boolean;
}

export function LoadingOverlay({ 
  message = '加载中...', 
  isDarkMode = false 
}: LoadingOverlayProps) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${
      isDarkMode ? 'bg-forest/80' : 'bg-cream/80'
    } backdrop-blur-sm`}>
      <div className="text-center">
        <LoadingSpinner size="lg" className={`mx-auto mb-4 ${
          isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
        }`} />
        <p className={`text-sm ${isDarkMode ? 'text-gray-green' : 'text-muted-foreground'}`}>
          {message}
        </p>
      </div>
    </div>
  );
}

interface PageLoadingProps {
  isDarkMode?: boolean;
}

export function PageLoading({ isDarkMode = false }: PageLoadingProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? 'bg-forest' : 'bg-cream'
    }`}>
      <div className="text-center">
        <div className="relative">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-sage-dark/20' : 'bg-sage/20'
          }`}>
            <TreeDeciduous className={`w-10 h-10 ${
              isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
            } animate-pulse`} />
          </div>
          <div className={`absolute inset-0 w-20 h-20 rounded-full border-2 border-t-transparent animate-spin ${
            isDarkMode ? 'border-sunshine-light' : 'border-sunshine'
          }`} />
        </div>
        <p className={`mt-6 text-sm ${isDarkMode ? 'text-gray-green' : 'text-muted-foreground'}`}>
          正在加载...
        </p>
      </div>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  isDarkMode?: boolean;
}

export function Skeleton({ className = '', isDarkMode = false }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded ${
      isDarkMode ? 'bg-sage-dark/20' : 'bg-sage/20'
    } ${className}`} />
  );
}

export function PostCardSkeleton({ isDarkMode = false }: { isDarkMode?: boolean }) {
  return (
    <div className={`p-6 rounded-xl ${
      isDarkMode ? 'bg-card border border-border' : 'bg-white shadow-md'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="w-16 h-5 rounded-full" isDarkMode={isDarkMode} />
        <Skeleton className="w-24 h-4" isDarkMode={isDarkMode} />
      </div>
      <Skeleton className="w-3/4 h-6 mb-3" isDarkMode={isDarkMode} />
      <Skeleton className="w-full h-4 mb-2" isDarkMode={isDarkMode} />
      <Skeleton className="w-2/3 h-4 mb-4" isDarkMode={isDarkMode} />
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-4" isDarkMode={isDarkMode} />
        <Skeleton className="w-16 h-4" isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
