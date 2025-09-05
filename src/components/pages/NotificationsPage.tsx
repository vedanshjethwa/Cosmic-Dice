import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bell, 
  ArrowLeft, 
  Menu, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Gift, 
  X,
  MarkAsRead,
  Trash2
} from 'lucide-react';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'promotion';
  isRead: boolean;
  timestamp: string;
}

export function NotificationsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Welcome Bonus Available!',
      message: 'Claim your ₹100 welcome bonus and start your cosmic journey.',
      type: 'promotion',
      isRead: false,
      timestamp: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Game Win Notification',
      message: 'Congratulations! You won ₹250 in Cosmic Dice.',
      type: 'success',
      isRead: false,
      timestamp: '2024-03-15T09:15:00Z'
    },
    {
      id: '3',
      title: 'Deposit Successful',
      message: 'Your deposit of ₹1000 has been processed successfully.',
      type: 'success',
      isRead: true,
      timestamp: '2024-03-14T16:45:00Z'
    },
    {
      id: '4',
      title: 'New Game Alert',
      message: 'Cosmic Balloon is now available! Try the new balloon popping game.',
      type: 'info',
      isRead: true,
      timestamp: '2024-03-14T12:00:00Z'
    },
    {
      id: '5',
      title: 'Withdrawal Processing',
      message: 'Your withdrawal request of ₹500 is being processed.',
      type: 'warning',
      isRead: false,
      timestamp: '2024-03-13T14:20:00Z'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'promotion':
        return <Gift className="w-5 h-5 text-purple-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onWalletClick={() => navigate('/wallet')}
        onWithdrawalClick={() => navigate('/withdrawal')}
        onDepositClick={() => navigate('/deposit')}
        currentPath="/notifications"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0A1929]/95 backdrop-blur-sm border-b border-blue-500/20">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Menu size={24} />
              </button>
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
              <h1
                className="text-xl sm:text-2xl font-bold text-white transition-all duration-300"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Cosmic - Notifications
              </h1>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          {/* Actions Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8 text-blue-400" />
              <h2 className="text-3xl font-bold text-white">Notifications</h2>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Mark All Read
              </button>
            )}
          </motion.div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">No notifications</h3>
                <p className="text-gray-500">You're all caught up!</p>
              </motion.div>
            ) : (
              notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-[#132F4C] rounded-xl p-6 border transition-all ${
                    notification.isRead 
                      ? 'border-blue-500/20 opacity-75' 
                      : 'border-blue-500/40 shadow-lg'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-bold mb-2 ${
                            notification.isRead ? 'text-gray-300' : 'text-white'
                          }`}>
                            {notification.title}
                          </h3>
                          <p className={`mb-3 ${
                            notification.isRead ? 'text-gray-400' : 'text-gray-300'
                          }`}>
                            {notification.message}
                          </p>
                          <div className="text-sm text-gray-500">
                            {new Date(notification.timestamp).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <CheckCircle size={16} className="text-blue-400" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Delete notification"
                          >
                            <Trash2 size={16} className="text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}