import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

      return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${
          isDarkMode ? 'bg-forest' : 'bg-cream'
        }`}>
          <div className={`max-w-md w-full rounded-2xl p-8 text-center ${
            isDarkMode 
              ? 'bg-card border border-border' 
              : 'bg-white shadow-lg'
          }`}>
            <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-red-900/30' : 'bg-red-50'
            }`}>
              <AlertTriangle className={`w-8 h-8 ${
                isDarkMode ? 'text-red-400' : 'text-red-500'
              }`} />
            </div>
            
            <h1 className={`text-2xl font-bold mb-2 ${
              isDarkMode ? 'text-soft-green' : 'text-foreground'
            }`}>
              出错了
            </h1>
            
            <p className={`mb-6 ${
              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
            }`}>
              页面遇到了一些问题，请尝试刷新或返回首页。
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className={`mb-6 p-4 rounded-lg text-left overflow-auto max-h-40 ${
                isDarkMode ? 'bg-sage-dark/10' : 'bg-sage/5'
              }`}>
                <p className={`text-xs font-mono ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleGoHome}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-sage-dark/20 text-gray-green hover:bg-sage-dark/30'
                    : 'bg-sage/10 text-muted-foreground hover:bg-sage/20'
                }`}
              >
                <Home className="w-4 h-4" />
                返回首页
              </button>
              <button
                onClick={this.handleRetry}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  isDarkMode
                    ? 'bg-sunshine-light text-forest hover:bg-sunshine'
                    : 'bg-sunshine text-white hover:bg-sunshine-dark'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                重试
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}
