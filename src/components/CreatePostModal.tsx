import { useState, useEffect } from 'react';
import { X, TreeDeciduous, AlertCircle, Save } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { zoneConfig } from '@/data/forestNames';
import { CommunityZone, CreatePostModalProps } from '@/types';

interface ExtendedCreatePostModalProps extends CreatePostModalProps {
  isDarkMode: boolean;
}

const DRAFT_KEY = 'mind_decoding_draft';

export default function CreatePostModal({ 
  isOpen, 
  onClose, 
  defaultZone,
  isDarkMode 
}: ExtendedCreatePostModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedZone, setSelectedZone] = useState<CommunityZone>(defaultZone || 'recognition');
  const [tags, setTags] = useState('');
  const [needsDecoding, setNeedsDecoding] = useState(false);
  const [error, setError] = useState('');
  const [hasDraft, setHasDraft] = useState(false);

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setTitle(draft.title || '');
        setContent(draft.content || '');
        setSelectedZone(draft.zone || 'recognition');
        setTags(draft.tags || '');
        setNeedsDecoding(draft.needsDecoding || false);
        setHasDraft(true);
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }
  }, [isOpen]);

  const saveDraft = () => {
    const draft = { title, content, zone: selectedZone, tags, needsDecoding };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    setHasDraft(true);
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setHasDraft(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated || !user) {
      setError('请先登录');
      return;
    }

    if (title.trim().length < 5) {
      setError('标题至少需要5个字符');
      return;
    }

    if (content.trim().length < 20) {
      setError('内容至少需要20个字符');
      return;
    }

    clearDraft();
    onClose();
  };

  const handleClose = () => {
    if (title || content) {
      if (confirm('是否保存草稿？')) {
        saveDraft();
      }
    }
    onClose();
  };

  const zones = [
    { id: 'recognition' as CommunityZone, ...zoneConfig.recognition },
    { id: 'practice' as CommunityZone, ...zoneConfig.practice },
    { id: 'recovery' as CommunityZone, ...zoneConfig.recovery },
    { id: 'emotion' as CommunityZone, ...zoneConfig.emotion },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div 
        className={`relative w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl transition-colors duration-700 ${
          isDarkMode 
            ? 'bg-forest border border-sage-dark/30' 
            : 'bg-white border border-sage/20'
        }`}
      >
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-inherit">
          <h2 className={`text-xl font-bold ${
            isDarkMode ? 'text-soft-green' : 'text-foreground'
          }`}>
            发布新帖子
          </h2>
          <div className="flex items-center gap-2">
            {(title || content) && (
              <button
                type="button"
                onClick={saveDraft}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  isDarkMode 
                    ? 'bg-sage-dark/20 text-gray-green hover:bg-sage-dark/30' 
                    : 'bg-sage/10 text-muted-foreground hover:bg-sage/20'
                }`}
              >
                <Save className="w-4 h-4" />
                保存草稿
              </button>
            )}
            <button
              onClick={handleClose}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-sage-dark/20 text-gray-green' 
                  : 'hover:bg-sage/10 text-muted-foreground'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {hasDraft && (
            <div className={`flex items-center justify-between p-3 rounded-lg ${
              isDarkMode ? 'bg-sage-dark/10' : 'bg-sage/5'
            }`}>
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
              }`}>
                已加载上次保存的草稿
              </span>
              <button
                type="button"
                onClick={clearDraft}
                className="text-sm text-red-500 hover:text-red-600"
              >
                清除草稿
              </button>
            </div>
          )}

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-green' : 'text-foreground'
            }`}>
              发布区域
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setSelectedZone(zone.id)}
                  className={`p-3 rounded-lg text-left transition-all duration-300 ${
                    selectedZone === zone.id
                      ? isDarkMode
                        ? 'bg-sunshine-light/20 border-2 border-sunshine-light'
                        : 'bg-sunshine/20 border-2 border-sunshine'
                      : isDarkMode
                        ? 'bg-sage-dark/10 border-2 border-transparent hover:border-sage-dark/50'
                        : 'bg-sage/5 border-2 border-transparent hover:border-sage/50'
                  }`}
                >
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-soft-green' : 'text-foreground'
                  }`}>
                    {zone.name}
                  </p>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                  }`}>
                    {zone.subtitle}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-green' : 'text-foreground'
            }`}>
              标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="给你的帖子起一个标题..."
              required
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-forest border-sage-dark/30 text-soft-green placeholder:text-gray-green/50 focus:border-sunshine-light' 
                  : 'bg-white border-sage/30 text-foreground placeholder:text-muted-foreground/50 focus:border-sunshine'
              } outline-none focus:ring-2 focus:ring-sunshine/20`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-green' : 'text-foreground'
            }`}>
              内容
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="分享你的故事、困惑或经验..."
              required
              rows={6}
              className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                isDarkMode 
                  ? 'bg-forest border-sage-dark/30 text-soft-green placeholder:text-gray-green/50 focus:border-sunshine-light' 
                  : 'bg-white border-sage/30 text-foreground placeholder:text-muted-foreground/50 focus:border-sunshine'
              } outline-none focus:ring-2 focus:ring-sunshine/20`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-green' : 'text-foreground'
            }`}>
              标签（用逗号分隔）
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="例如：煤气灯效应, 自我怀疑"
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-forest border-sage-dark/30 text-soft-green placeholder:text-gray-green/50 focus:border-sunshine-light' 
                  : 'bg-white border-sage/30 text-foreground placeholder:text-muted-foreground/50 focus:border-sunshine'
              } outline-none focus:ring-2 focus:ring-sunshine/20`}
            />
          </div>

          {selectedZone === 'recognition' && (
            <label className={`flex items-center gap-3 cursor-pointer ${
              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
            }`}>
              <input
                type="checkbox"
                checked={needsDecoding}
                onChange={(e) => setNeedsDecoding(e.target.checked)}
                className="sr-only"
              />
              <div className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-colors ${
                needsDecoding
                  ? isDarkMode 
                    ? 'bg-sunshine-light border-sunshine-light' 
                    : 'bg-sunshine border-sunshine'
                  : isDarkMode
                    ? 'border-sage-dark/50'
                    : 'border-sage/50'
              }`}>
                {needsDecoding && (
                  <span className={`w-full h-full flex items-center justify-center text-xs ${
                    isDarkMode ? 'text-forest' : 'text-white'
                  }`}>✓</span>
                )}
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-soft-green' : 'text-foreground'
                }`}>
                  请求合力解码
                </p>
                <p className="text-xs">
                  标记此贴需要社区成员帮助分析
                </p>
              </div>
            </label>
          )}

          {error && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              isDarkMode ? 'bg-red-900/20 text-red-300' : 'bg-red-50 text-red-600'
            }`}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-sage-dark/20 text-gray-green hover:bg-sage-dark/30' 
                  : 'bg-sage/10 text-muted-foreground hover:bg-sage/20'
              }`}
            >
              取消
            </button>
            <button
              type="submit"
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                isDarkMode 
                  ? 'bg-sunshine-light text-forest hover:bg-sunshine' 
                  : 'bg-sunshine text-white hover:bg-sunshine-dark'
              }`}
            >
              发布
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
