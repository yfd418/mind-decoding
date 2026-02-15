import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Flag, Send, TreeDeciduous, Clock, Sparkles, Loader2, Trash2, MoreVertical } from 'lucide-react';
import { postsService, commentsService } from '@/services/api';
import { zoneConfig } from '@/data/forestNames';
import { useAuth } from '@/contexts/AuthContext';
import { Post, Comment } from '@/types';

interface PostDetailPageProps {
  isDarkMode: boolean;
}

export default function PostDetailPage({ isDarkMode }: PostDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [hasResonated, setHasResonated] = useState(false);

  const { isAuthenticated, user, openAuthModal } = useAuth();

  const isAuthor = user && post && user.id === post.authorId;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const [postData, commentsData] = await Promise.all([
          postsService.getById(id),
          commentsService.getByPostId(id),
        ]);
        
        if (!postData) {
          setError('帖子不存在');
        } else {
          setPost(postData);
          setComments(commentsData);
          
          if (user) {
            const resonated = await postsService.hasResonated(id, user.id);
            setHasResonated(resonated);
          }
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('加载失败，请稍后重试');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleGoBack = () => {
    if (post) {
      navigate(`/community?zone=${post.zone}`);
    } else {
      navigate('/community');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user || !post) {
      openAuthModal('login');
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      const comment = await commentsService.create(
        { postId: post.id, content: newComment.trim() },
        user.id,
        user.forestName
      );
      setComments(prev => [...prev, comment]);
      setNewComment('');
    } catch (err) {
      console.error('Error creating comment:', err);
      alert('评论失败，请稍后重试');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleResonate = async () => {
    if (!isAuthenticated || !user || !post) {
      openAuthModal('login');
      return;
    }
    
    try {
      const result = await postsService.toggleResonance(post.id, user.id);
      setHasResonated(result.hasResonated);
      setPost(prev => prev ? { ...prev, resonanceCount: result.resonanceCount } : null);
    } catch (err) {
      console.error('Error toggling resonance:', err);
    }
  };

  const handleReport = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    setShowReportModal(true);
  };

  const submitReport = () => {
    setShowReportModal(false);
    setReportReason('');
    alert('感谢您的反馈，我们会尽快处理');
  };

  const handleDelete = async () => {
    if (!post) return;
    
    setIsDeleting(true);
    try {
      await postsService.delete(post.id);
      navigate('/community');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('删除失败，请稍后重试');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const getZoneBadgeColor = () => {
    if (!post) return '';
    switch (post.zone) {
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

  if (isLoading) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center ${
        isDarkMode ? 'bg-forest' : 'bg-cream'
      }`}>
        <Loader2 className={`w-8 h-8 animate-spin ${
          isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
        }`} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center ${
        isDarkMode ? 'bg-forest' : 'bg-cream'
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${
            isDarkMode ? 'text-soft-green' : 'text-foreground'
          }`}>
            {error || '帖子不存在'}
          </h2>
          <button
            onClick={() => navigate('/community')}
            className="text-sunshine hover:underline"
          >
            返回社区
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-forest' : 'bg-cream'}`}>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <button
          onClick={handleGoBack}
          className={`inline-flex items-center gap-2 mb-6 text-sm transition-colors ${
            isDarkMode 
              ? 'text-gray-green hover:text-soft-green' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          返回社区
        </button>

        <article className={`rounded-2xl overflow-hidden ${
          isDarkMode 
            ? 'bg-card border border-border' 
            : 'bg-white shadow-lg'
        }`}>
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getZoneBadgeColor()}`}>
                  {zoneConfig[post.zone].name}
                </span>
                {post.needsDecoding && (
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    isDarkMode 
                      ? 'bg-sunshine-light/20 text-sunshine-light' 
                      : 'bg-sunshine/20 text-sunshine-dark'
                  }`}>
                    <Sparkles className="w-4 h-4" />
                    请求解码
                  </span>
                )}
              </div>
              
              {isAuthor ? (
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-red-900/20 text-gray-green hover:text-red-400' 
                      : 'hover:bg-red-50 text-muted-foreground hover:text-red-500'
                  }`}
                  title="删除帖子"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleReport}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-sage-dark/20 text-gray-green' 
                      : 'hover:bg-sage/10 text-muted-foreground'
                  }`}
                  title="举报/反馈"
                >
                  <Flag className="w-4 h-4" />
                </button>
              )}
            </div>

            <h1 className={`text-2xl md:text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-soft-green' : 'text-foreground'
            }`}>
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-sage-dark/30' : 'bg-sage/20'
                }`}>
                  <TreeDeciduous className={`w-4 h-4 ${
                    isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
                  }`} />
                </div>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-soft-green' : 'text-foreground'
                }`}>
                  {post.authorName}
                  {isAuthor && (
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      isDarkMode ? 'bg-sage-dark/30 text-gray-green' : 'bg-sage/20 text-muted-foreground'
                    }`}>
                      我
                    </span>
                  )}
                </span>
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
              }`}>
                <Clock className="w-4 h-4" />
                {formatDate(post.createdAt)}
              </div>
            </div>

            <div className={`prose max-w-none mb-6 ${
              isDarkMode ? 'prose-invert' : ''
            }`}>
              <p className={`whitespace-pre-wrap ${
                isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
              }`}>
                {post.content}
              </p>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
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

            <div className="flex items-center gap-4 pt-6 border-t border-border">
              <button
                onClick={handleResonate}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  hasResonated
                    ? isDarkMode
                      ? 'bg-sunshine-light/20 text-sunshine-light'
                      : 'bg-sunshine/20 text-sunshine'
                    : isDarkMode
                      ? 'bg-sage-dark/20 text-gray-green hover:bg-sage-dark/30'
                      : 'bg-sage/10 text-muted-foreground hover:bg-sage/20'
                }`}
              >
                <Heart className={`w-5 h-5 ${hasResonated ? 'fill-current' : ''}`} />
                <span>{post.resonanceCount}</span>
                <span className="text-sm">共鸣</span>
              </button>
              <div className={`flex items-center gap-2 ${
                isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
              }`}>
                <MessageCircle className="w-5 h-5" />
                <span>{comments.length}</span>
                <span className="text-sm">评论</span>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-8">
          <h2 className={`text-xl font-semibold mb-4 ${
            isDarkMode ? 'text-soft-green' : 'text-foreground'
          }`}>
            评论区
          </h2>

          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className={`rounded-xl overflow-hidden ${
              isDarkMode 
                ? 'bg-card border border-border' 
                : 'bg-white shadow-md'
            }`}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={isAuthenticated ? "分享你的想法或建议..." : "登录后即可评论..."}
                rows={3}
                disabled={isSubmittingComment}
                className={`w-full px-4 py-3 resize-none transition-colors disabled:opacity-50 ${
                  isDarkMode 
                    ? 'bg-transparent text-soft-green placeholder:text-gray-green/50' 
                    : 'bg-transparent text-foreground placeholder:text-muted-foreground/50'
                } outline-none`}
              />
              <div className={`flex justify-end p-3 border-t ${
                isDarkMode ? 'border-border' : 'border-sage/20'
              }`}>
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmittingComment}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    newComment.trim() && !isSubmittingComment
                      ? isDarkMode
                        ? 'bg-sunshine-light text-forest hover:bg-sunshine'
                        : 'bg-sunshine text-white hover:bg-sunshine-dark'
                      : 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  {isSubmittingComment ? '发送中...' : '发送'}
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`p-4 rounded-xl ${
                  isDarkMode 
                    ? 'bg-card border border-border' 
                    : 'bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-sage-dark/30' : 'bg-sage/20'
                  }`}>
                    <span className="text-xs">🌲</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-soft-green' : 'text-foreground'
                  }`}>
                    {comment.authorName}
                  </span>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                  }`}>
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                }`}>
                  {comment.content}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <button className={`flex items-center gap-1 text-xs transition-colors ${
                    isDarkMode 
                      ? 'text-gray-green hover:text-sunshine-light' 
                      : 'text-muted-foreground hover:text-sunshine'
                  }`}>
                    <Heart className="w-3 h-3" />
                    {comment.resonanceCount}
                  </button>
                </div>
              </div>
            ))}

            {comments.length === 0 && (
              <div className={`text-center py-8 ${
                isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
              }`}>
                <p>暂无评论，成为第一个分享想法的人吧</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl ${
            isDarkMode 
              ? 'bg-forest border border-sage-dark/30' 
              : 'bg-white border border-sage/20'
          }`}>
            <div className="p-6">
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-soft-green' : 'text-foreground'
              }`}>
                确认删除
              </h3>
              <p className={`text-sm mb-6 ${
                isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
              }`}>
                确定要删除这篇帖子吗？删除后将无法恢复，所有评论也会一并删除。
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-sage-dark/20 text-gray-green hover:bg-sage-dark/30' 
                      : 'bg-sage/10 text-muted-foreground hover:bg-sage/20'
                  }`}
                >
                  取消
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-colors ${
                    isDeleting
                      ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
                      : isDarkMode
                        ? 'bg-red-500/80 text-white hover:bg-red-500'
                        : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  {isDeleting ? '删除中...' : '确认删除'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowReportModal(false)}
          />
          <div className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl ${
            isDarkMode 
              ? 'bg-forest border border-sage-dark/30' 
              : 'bg-white border border-sage/20'
          }`}>
            <div className="p-6">
              <h3 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-soft-green' : 'text-foreground'
              }`}>
                举报/反馈
              </h3>
              <p className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
              }`}>
                请告诉我们您认为此内容存在什么问题
              </p>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="描述问题..."
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                  isDarkMode 
                    ? 'bg-forest border-sage-dark/30 text-soft-green placeholder:text-gray-green/50' 
                    : 'bg-white border-sage/30 text-foreground placeholder:text-muted-foreground/50'
                } outline-none`}
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowReportModal(false)}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-sage-dark/20 text-gray-green' 
                      : 'bg-sage/10 text-muted-foreground'
                  }`}
                >
                  取消
                </button>
                <button
                  onClick={submitReport}
                  disabled={!reportReason.trim()}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    reportReason.trim()
                      ? isDarkMode
                        ? 'bg-sunshine-light text-forest'
                        : 'bg-sunshine text-white'
                      : 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
                  }`}
                >
                  提交
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
