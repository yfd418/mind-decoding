export interface User {
  id: string;
  email: string;
  forestName: string;
  avatar?: string;
  createdAt: Date;
  agreedToTerms: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type CommunityZone = 'recognition' | 'practice' | 'recovery' | 'emotion';

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  zone: CommunityZone;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  resonanceCount: number;
  commentCount: number;
  isResolved?: boolean;
  needsDecoding?: boolean;
  tags?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
  resonanceCount: number;
  isAuthorReply?: boolean;
}

export interface Report {
  id: string;
  reporterId: string;
  targetType: 'post' | 'comment';
  targetId: string;
  reason: string;
  createdAt: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}

export type NotificationType = 'comment' | 'resonance' | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  data?: {
    postId?: string;
    commentId?: string;
    authorName?: string;
    postTitle?: string;
  };
  isRead: boolean;
  createdAt: Date;
}

export interface NotificationSettings {
  id: string;
  userId: string;
  commentNotify: boolean;
  resonanceNotify: boolean;
  systemNotify: boolean;
  emailNotify: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultZone?: CommunityZone;
}

export interface TriggerWarningProps {
  onConfirm: () => void;
  onCancel?: () => void;
  warningType?: 'content' | 'community';
}
