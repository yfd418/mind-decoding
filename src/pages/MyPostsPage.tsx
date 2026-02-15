import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, MessageCircle, Heart, Clock, TreeDeciduous, Loader2, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { postsService } from '@/services/api';
import { zoneConfig } from '@/data/forestNames';
import { Post } from '@/types';

export default function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, user, openAuthModal } = useAuth();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!user) return;

      setIsLoading(true);
      setError(null);

      try {
        const myPosts = await postsService.getByAuthorId(user.id);
        setPosts(myPosts);
      } catch (err) {
        console.error('Error fetching my posts:', err);
        setError('加载失败，请稍后重试');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && user) {
      fetchMyPosts();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center ${
        isDarkMode ? 'bg-forest' : 'bg-cream'
      }`}>
        <div className="text-center">
          <TreeDeciduous className={`w-16 h-16 mx-auto mb-4 ${
            isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
          }`} />
          <h2 className={`text-2xl font-bold mb-4 ${
            isDarkMode ? 'text-soft-green' : 'text-foreground'
          }`}>
            请先登录
          </h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-green' : 'text-muted-foreground'}`}>
            登录后即可查看你发布的帖子
          </p>
          <button
            onClick={() => openAuthModal('login')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 ${
              isDarkMode
                ? 'bg-sunshine-light text-forest hover:bg-sunshine'
                : 'bg-sunshine text-white hover:bg-sunshine-dark'
            }`}
          >
            立即登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-forest' : 'bg-cream'}`}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${
              isDarkMode ? 'text-soft-green' : 'text-foreground'
            }`}>
              我的帖子
            </h1>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-green' : 'text-muted-foreground'}`}>
              共发布 {posts.length} 篇帖子
            </p>
          </div>
          <Link
            to="/community"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 ${
              isDarkMode
                ? 'bg-sunshine-light text-forest hover:bg-sunshine'
                : 'bg-sunshine text-white hover:bg-sunshine-dark'
            }`}
          >
            <Plus className="w-4 h-4" />
            发布新帖
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className={`w-8 h-8 animate-spin ${
              isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
            }`} />
          </div>
        ) : error ? (
          <div className={`text-center py-12 ${
            isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
          }`}>
            <p>{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className={`text-center py-16 rounded-2xl ${
            isDarkMode ? 'bg-card border border-border' : 'bg-white shadow-lg'
          }`}>
            <FileText className={`w-16 h-16 mx-auto mb-4 ${
              isDarkMode ? 'text-gray-green/50' : 'text-muted-foreground/50'
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDarkMode ? 'text-soft-green' : 'text-foreground'
            }`}>
              还没有发布过帖子
            </h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-green' : 'text-muted-foreground'}`}>
              去社区分享你的故事或困惑吧
            </p>
            <Link
              to="/community"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                isDarkMode
                  ? 'bg-sunshine-light text-forest hover:bg-sunshine'
                  : 'bg-sunshine text-white hover:bg-sunshine-dark'
              }`}
            >
              前往社区
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                className={`block p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-card border border-border hover:border-sage-dark/50'
                    : 'bg-white shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        isDarkMode
                          ? 'bg-sage-dark/30 text-sage-light'
                          : 'bg-sage/20 text-sage-dark'
                      }`}>
                        {zoneConfig[post.zone].name}
                      </span>
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                      }`}>
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 line-clamp-1 ${
                      isDarkMode ? 'text-soft-green' : 'text-foreground'
                    }`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm line-clamp-2 ${
                      isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                    }`}>
                      {post.content}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className={`px-2 py-0.5 rounded text-xs ${
                              isDarkMode
                                ? 'bg-sage-dark/10 text-gray-green'
                                : 'bg-sage/10 text-muted-foreground'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className={`text-xs ${
                            isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                          }`}>
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className={`flex items-center gap-1.5 ${
                      isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                    }`}>
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.resonanceCount}</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${
                      isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                    }`}>
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.commentCount}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
