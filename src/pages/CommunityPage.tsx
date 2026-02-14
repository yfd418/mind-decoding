import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Shield, Heart, Waves, TreeDeciduous, Plus, HeartHandshake } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { zoneConfig } from '@/data/forestNames';
import { mockPosts, getPostsByZone } from '@/data/mockPosts';
import { CommunityZone, Post } from '@/types';
import PostList from '@/components/PostList';
import CreatePostModal from '@/components/CreatePostModal';

interface CommunityPageProps {
  isDarkMode: boolean;
}

export default function CommunityPage({ isDarkMode }: CommunityPageProps) {
  const [activeZone, setActiveZone] = useState<CommunityZone | 'all'>('all');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const { isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const zones = [
    { id: 'recognition' as CommunityZone, icon: <Search className="w-5 h-5" />, name: zoneConfig.recognition.name, description: zoneConfig.recognition.description },
    { id: 'practice' as CommunityZone, icon: <Shield className="w-5 h-5" />, name: zoneConfig.practice.name, description: zoneConfig.practice.description },
    { id: 'recovery' as CommunityZone, icon: <Heart className="w-5 h-5" />, name: zoneConfig.recovery.name, description: zoneConfig.recovery.description },
    { id: 'emotion' as CommunityZone, icon: <Waves className="w-5 h-5" />, name: zoneConfig.emotion.name, description: zoneConfig.emotion.description },
  ];

  const displayedPosts = activeZone === 'all' ? mockPosts : getPostsByZone(activeZone);

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    setIsCreatePostOpen(true);
  };

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-forest' : 'bg-cream'}`}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <TreeDeciduous
              className={`w-16 h-16 ${
                isDarkMode ? 'text-sunshine-light' : 'text-sunshine'
              }`}
            />
          </div>
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-700 ${
              isDarkMode ? 'text-soft-green' : 'text-foreground'
            }`}
          >
            迷雾森林
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto transition-colors duration-700 ${
              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
            }`}
          >
            "愿你在迷雾中，找回属于自己的光"
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveZone('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeZone === 'all'
                ? isDarkMode
                  ? 'bg-sunshine-light text-forest'
                  : 'bg-sunshine text-white'
                : isDarkMode
                  ? 'bg-sage-dark/20 text-gray-green hover:bg-sage-dark/30'
                  : 'bg-sage/20 text-muted-foreground hover:bg-sage/30'
            }`}
          >
            全部
          </button>
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setActiveZone(zone.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeZone === zone.id
                  ? isDarkMode
                    ? 'bg-sunshine-light text-forest'
                    : 'bg-sunshine text-white'
                  : isDarkMode
                    ? 'bg-sage-dark/20 text-gray-green hover:bg-sage-dark/30'
                    : 'bg-sage/20 text-muted-foreground hover:bg-sage/30'
              }`}
            >
              {zone.icon}
              {zone.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-soft-green' : 'text-foreground'
          }`}>
            {activeZone === 'all' ? '最新帖子' : `${zoneConfig[activeZone].name}帖子`}
            <span className={`ml-2 text-sm font-normal ${
              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
            }`}>
              ({displayedPosts.length})
            </span>
          </h2>
          <button
            onClick={handleCreatePost}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 ${
              isDarkMode
                ? 'bg-sunshine-light text-forest hover:bg-sunshine'
                : 'bg-sunshine text-white hover:bg-sunshine-dark'
            }`}
          >
            <Plus className="w-4 h-4" />
            发布帖子
          </button>
        </div>

        <PostList 
          posts={displayedPosts} 
          isDarkMode={isDarkMode}
          activeZone={activeZone}
        />

        <CreatePostModal
          isOpen={isCreatePostOpen}
          onClose={() => setIsCreatePostOpen(false)}
          defaultZone={activeZone === 'all' ? undefined : activeZone}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}
