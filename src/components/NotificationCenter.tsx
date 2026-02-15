import { useState, useEffect, useCallback } from 'react';
import { Bell, X, Check, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { notificationsService } from '@/services/api';
import { Notification } from '@/types';

interface NotificationCenterProps {
  isDarkMode: boolean;
}

export default function NotificationCenter({ isDarkMode }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const [notifs, count] = await Promise.all([
        notificationsService.getByUserId(user.id),
        notificationsService.getUnreadCount(user.id),
      ]);
      setNotifications(notifs);
      setUnreadCount(count);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchNotifications();
      
      const subscription = notificationsService.subscribeToNotifications(
        user.id,
        (newNotification) => {
          setNotifications((prev) => [newNotification, ...prev]);
          setUnreadCount((prev) => prev + 1);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isAuthenticated, user, fetchNotifications]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationsService.markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!user) return;
    
    try {
      await notificationsService.markAllAsRead(user.id);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await notificationsService.delete(notificationId);
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      const deleted = notifications.find((n) => n.id === notificationId);
      if (deleted && !deleted.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'comment':
        return <span className="text-sunshine">💬</span>;
      case 'resonance':
        return <span className="text-sunshine">❤️</span>;
      case 'system':
        return <span className="text-sunshine">📢</span>;
      default:
        return <span className="text-sunshine">🔔</span>;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-lg transition-colors ${
          isDarkMode
            ? 'text-gray-green hover:text-soft-green hover:bg-sage-dark/20'
            : 'text-muted-foreground hover:text-foreground hover:bg-sage/20'
        }`}
        aria-label="通知"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-sunshine text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            data-testid="notification-panel"
            className={`notification-panel frosted-glass fixed left-4 right-4 sm:left-auto sm:right-0 sm:absolute top-20 sm:top-full sm:mt-2 w-auto sm:w-80 sm:max-w-sm rounded-xl shadow-2xl z-50 overflow-hidden border ${
              isDarkMode
                ? 'border-sage-dark/30'
                : 'border-sage/20'
            }`}
          >
            <div
              className={`flex items-center justify-between px-4 py-3 border-b ${
                isDarkMode ? 'border-sage-dark/30' : 'border-sage/20'
              }`}
            >
              <h3
                className={`font-semibold ${
                  isDarkMode ? 'text-soft-green' : 'text-foreground'
                }`}
              >
                通知
              </h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'text-gray-green hover:text-soft-green hover:bg-sage-dark/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-sage/20'
                    }`}
                    title="全部已读"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'text-gray-green hover:text-soft-green hover:bg-sage-dark/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-sage/20'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className={`w-6 h-6 border-2 border-t-transparent rounded-full animate-spin ${
                    isDarkMode ? 'border-sunshine-light' : 'border-sunshine'
                  }`} />
                </div>
              ) : notifications.length === 0 ? (
                <div className={`flex flex-col items-center justify-center py-8 ${
                  isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                }`}>
                  <Bell className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">暂无通知</p>
                </div>
              ) : (
                <div className="divide-y divide-sage-dark/10">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 transition-colors ${
                        notification.isRead
                          ? isDarkMode
                            ? 'bg-transparent'
                            : 'bg-transparent'
                          : isDarkMode
                            ? 'bg-sage-dark/10'
                            : 'bg-sage/10'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium mb-1 ${
                              isDarkMode ? 'text-soft-green' : 'text-foreground'
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p
                            className={`text-sm mb-1 ${
                              isDarkMode ? 'text-gray-green' : 'text-muted-foreground'
                            }`}
                          >
                            {notification.content}
                          </p>
                          <p
                            className={`text-xs ${
                              isDarkMode ? 'text-gray-green/70' : 'text-muted-foreground/70'
                            }`}
                          >
                            {formatTime(notification.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                isDarkMode
                                  ? 'text-gray-green hover:text-soft-green hover:bg-sage-dark/20'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-sage/20'
                              }`}
                              title="标记为已读"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isDarkMode
                                ? 'text-gray-green hover:text-red-400 hover:bg-red-400/10'
                                : 'text-muted-foreground hover:text-red-500 hover:bg-red-500/10'
                            }`}
                            title="删除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
