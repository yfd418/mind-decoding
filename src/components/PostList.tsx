import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Sparkles, Clock } from 'lucide-react';
import { Post, CommunityZone } from '@/types';
import { zoneConfig } from '@/data/forestNames';

interface PostListProps {
  posts: Post[];
  isDarkMode: boolean;
  activeZone?: CommunityZone | 'all';
}

export default function PostList({ posts, isDarkMode, activeZone = 'all' }: PostListProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return '今天';
    if (days === 1) return '昨天';
    if (days < 7) return `${days}天前`;
    return new Date(date).toLocaleDateString('zh-CN');
  };

  const getZoneBadgeColor = (zone: CommunityZone) => {
    switch (zone) {
      case 'recognition':
        return isDarkMode ? 'bg-sage-dark/30 text-sage-light' : 'bg-sage/20 text-sage-dark';
      case 'practice':
        return isDarkMode ? 'bg-sunshine-light/20 text-sunshine-light' : 'bg-sunshine/20 text-sunshine-dark';
      case 'recovery':
        return isDarkMode ? 'bg-sage-dark/30 text-sage-light' : 'bg-sage/20 text-sage-dark';
      case 'emotion':
        return isDarkMode ? 'bg-gray-green/20 text-gray-green' : 'bg-muted text-muted-foreground';
      default:
        return '';
    }
  };

  if (posts.length === 0) {
    return (
      <div className={`text-center py-16 ${
        isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
      }`}>
        <p className="text-lg mb-2">暂无帖子</p>
        <p className="text-sm">成为第一个分享的人吧</p>
      </div>
    );
  }

  return (
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
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getZoneBadgeColor(post.zone)}`}>
                {zoneConfig[post.zone].name}
              </span>
              {post.needsDecoding && (
                <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                  isDarkMode 
                    ? 'bg-sunshine-light/20 text-sunshine-light' 
                    : 'bg-sunshine/20 text-sunshine-dark'
                }`}>
                  <Sparkles className="w-3 h-3" />
                  请求解码
                </span>
              )}
            </div>
            <div className={`flex items-center gap-1 text-xs ${
              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
            }`}>
              <Clock className="w-3 h-3" />
              {formatDate(post.createdAt)}
            </div>
          </div>

          <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${
            isDarkMode ? 'text-soft-green' : 'text-foreground'
          }`}>
            {post.title}
          </h3>

          <p className={`text-sm mb-4 line-clamp-2 ${
            isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
          }`}>
            {post.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-sage-dark/30' : 'bg-sage/20'
              }`}>
                <span className="text-xs">🌲</span>
              </div>
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
              }`}>
                {post.authorName}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-1 text-sm ${
                isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
              }`}>
                <Heart className="w-4 h-4" />
                {post.resonanceCount}
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
              }`}>
                <MessageCircle className="w-4 h-4" />
                {post.commentCount}
              </div>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
              {post.tags.map((tag, index) => (
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
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
