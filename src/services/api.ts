import { supabase } from '@/lib/supabase';
import { Post, Comment, CommunityZone, Notification, NotificationSettings } from '@/types';

export interface CreatePostData {
  title: string;
  content: string;
  zone: CommunityZone;
  tags?: string[];
  needsDecoding?: boolean;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  tags?: string[];
  isResolved?: boolean;
}

export interface CreateCommentData {
  postId: string;
  content: string;
}

export const postsService = {
  async getAll(page: number = 1, limit: number = 20): Promise<Post[]> {
    const offset = (page - 1) * limit;
    
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }

    return data.map(this.mapPostFromDb);
  },

  async getByZone(zone: CommunityZone, page: number = 1, limit: number = 20): Promise<Post[]> {
    const offset = (page - 1) * limit;
    
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('zone', zone)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching posts by zone:', error);
      throw error;
    }

    return data.map(this.mapPostFromDb);
  },

  async getByAuthorId(authorId: string): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('author_id', authorId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts by author:', error);
      throw error;
    }

    return data.map(this.mapPostFromDb);
  },

  async getById(id: string): Promise<Post | null> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      console.error('Error fetching post:', error);
      throw error;
    }

    return data ? this.mapPostFromDb(data) : null;
  },

  async create(postData: CreatePostData, authorId: string, authorName: string): Promise<Post> {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        author_id: authorId,
        author_name: authorName,
        zone: postData.zone,
        title: postData.title,
        content: postData.content,
        tags: postData.tags || null,
        needs_decoding: postData.needsDecoding || false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      throw error;
    }

    return this.mapPostFromDb(data);
  },

  async update(id: string, updateData: UpdatePostData): Promise<Post> {
    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (updateData.title !== undefined) updatePayload.title = updateData.title;
    if (updateData.content !== undefined) updatePayload.content = updateData.content;
    if (updateData.tags !== undefined) updatePayload.tags = updateData.tags;
    if (updateData.isResolved !== undefined) updatePayload.is_resolved = updateData.isResolved;

    const { data, error } = await supabase
      .from('posts')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating post:', error);
      throw error;
    }

    return this.mapPostFromDb(data);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  async toggleResonance(postId: string, userId: string): Promise<{ hasResonated: boolean; resonanceCount: number }> {
    const { data: existing } = await supabase
      .from('post_resonances')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      const { error } = await supabase
        .from('post_resonances')
        .delete()
        .eq('id', existing.id);

      if (error) {
        console.error('Error removing resonance:', error);
        throw error;
      }

      const { data: post } = await supabase
        .from('posts')
        .select('resonance_count')
        .eq('id', postId)
        .single();

      return { hasResonated: false, resonanceCount: post?.resonance_count || 0 };
    } else {
      const { error } = await supabase
        .from('post_resonances')
        .insert({ post_id: postId, user_id: userId });

      if (error) {
        console.error('Error adding resonance:', error);
        throw error;
      }

      const { data: post } = await supabase
        .from('posts')
        .select('resonance_count')
        .eq('id', postId)
        .single();

      return { hasResonated: true, resonanceCount: post?.resonance_count || 0 };
    }
  },

  async hasResonated(postId: string, userId: string): Promise<boolean> {
    const { data } = await supabase
      .from('post_resonances')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    return !!data;
  },

  async search(query: string): Promise<Post[]> {
    const sanitizedQuery = query.trim().slice(0, 100);
    if (!sanitizedQuery) return [];

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .or(`title.ilike.%${sanitizedQuery}%,content.ilike.%${sanitizedQuery}%`)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error searching posts:', error);
      throw error;
    }

    return data.map(this.mapPostFromDb);
  },

  mapPostFromDb(data: Record<string, unknown>): Post {
    return {
      id: data.id as string,
      authorId: data.author_id as string,
      authorName: data.author_name as string,
      zone: data.zone as CommunityZone,
      title: data.title as string,
      content: data.content as string,
      createdAt: new Date(data.created_at as string),
      updatedAt: data.updated_at ? new Date(data.updated_at as string) : undefined,
      resonanceCount: data.resonance_count as number,
      commentCount: data.comment_count as number,
      isResolved: data.is_resolved as boolean,
      needsDecoding: data.needs_decoding as boolean,
      tags: data.tags as string[] | undefined,
    };
  },
};

export const commentsService = {
  async getByPostId(postId: string): Promise<Comment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }

    return data.map(this.mapCommentFromDb);
  },

  async create(commentData: CreateCommentData, authorId: string, authorName: string): Promise<Comment> {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: commentData.postId,
        author_id: authorId,
        author_name: authorName,
        content: commentData.content,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating comment:', error);
      throw error;
    }

    return this.mapCommentFromDb(data);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },

  async toggleResonance(commentId: string, userId: string): Promise<{ hasResonated: boolean; resonanceCount: number }> {
    const { data: existing } = await supabase
      .from('comment_resonances')
      .select('id')
      .eq('comment_id', commentId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      const { error } = await supabase
        .from('comment_resonances')
        .delete()
        .eq('id', existing.id);

      if (error) {
        console.error('Error removing comment resonance:', error);
        throw error;
      }

      const { data: comment } = await supabase
        .from('comments')
        .select('resonance_count')
        .eq('id', commentId)
        .single();

      return { hasResonated: false, resonanceCount: comment?.resonance_count || 0 };
    } else {
      const { error } = await supabase
        .from('comment_resonances')
        .insert({ comment_id: commentId, user_id: userId });

      if (error) {
        console.error('Error adding comment resonance:', error);
        throw error;
      }

      const { data: comment } = await supabase
        .from('comments')
        .select('resonance_count')
        .eq('id', commentId)
        .single();

      return { hasResonated: true, resonanceCount: comment?.resonance_count || 0 };
    }
  },

  async hasResonated(commentId: string, userId: string): Promise<boolean> {
    const { data } = await supabase
      .from('comment_resonances')
      .select('id')
      .eq('comment_id', commentId)
      .eq('user_id', userId)
      .single();

    return !!data;
  },

  mapCommentFromDb(data: Record<string, unknown>): Comment {
    return {
      id: data.id as string,
      postId: data.post_id as string,
      authorId: data.author_id as string,
      authorName: data.author_name as string,
      content: data.content as string,
      createdAt: new Date(data.created_at as string),
      resonanceCount: data.resonance_count as number,
      isAuthorReply: data.is_author_reply as boolean,
    };
  },
};

export const profilesService = {
  async getById(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }

    return {
      id: data.id,
      email: data.email,
      forestName: data.forest_name,
      avatar: data.avatar,
      createdAt: new Date(data.created_at),
      agreedToTerms: data.agreed_to_terms,
    };
  },

  async updateForestName(id: string, newName: string) {
    const { error } = await supabase
      .from('profiles')
      .update({ forest_name: newName })
      .eq('id', id);

    if (error) {
      console.error('Error updating forest name:', error);
      throw error;
    }
  },
};

export const notificationsService = {
  async getByUserId(userId: string, limit: number = 20): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }

    return data.map(this.mapNotificationFromDb);
  },

  async getUnreadCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      console.error('Error fetching unread count:', error);
      return 0;
    }

    return count || 0;
  },

  async markAsRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  async markAllAsRead(userId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  async delete(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  async getSettings(userId: string): Promise<NotificationSettings | null> {
    const { data, error } = await supabase
      .from('notification_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      console.error('Error fetching notification settings:', error);
      throw error;
    }

    return {
      id: data.id,
      userId: data.user_id,
      commentNotify: data.comment_notify,
      resonanceNotify: data.resonance_notify,
      systemNotify: data.system_notify,
      emailNotify: data.email_notify,
      createdAt: new Date(data.created_at),
      updatedAt: data.updated_at ? new Date(data.updated_at) : undefined,
    };
  },

  async updateSettings(userId: string, settings: Partial<Omit<NotificationSettings, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<void> {
    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (settings.commentNotify !== undefined) updatePayload.comment_notify = settings.commentNotify;
    if (settings.resonanceNotify !== undefined) updatePayload.resonance_notify = settings.resonanceNotify;
    if (settings.systemNotify !== undefined) updatePayload.system_notify = settings.systemNotify;
    if (settings.emailNotify !== undefined) updatePayload.email_notify = settings.emailNotify;

    const { error } = await supabase
      .from('notification_settings')
      .upsert({
        user_id: userId,
        ...updatePayload,
      });

    if (error) {
      console.error('Error updating notification settings:', error);
      throw error;
    }
  },

  subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
    return supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(this.mapNotificationFromDb(payload.new as Record<string, unknown>));
        }
      )
      .subscribe();
  },

  mapNotificationFromDb(data: Record<string, unknown>): Notification {
    return {
      id: data.id as string,
      userId: data.user_id as string,
      type: data.type as Notification['type'],
      title: data.title as string,
      content: data.content as string,
      data: data.data as Notification['data'],
      isRead: data.is_read as boolean,
      createdAt: new Date(data.created_at as string),
    };
  },
};
