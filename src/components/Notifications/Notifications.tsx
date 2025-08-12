import React, { useState, useEffect } from 'react';
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Clock,
  User,
  Heart
} from 'lucide-react';
import './Notifications.css';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
  read: boolean;
  patientName?: string;
  operationType?: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Emergency Operation Scheduled',
      message: 'John Smith has been scheduled for emergency cardiac surgery.',
      type: 'error',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
      patientName: 'John Smith',
      operationType: 'Cardiac Surgery'
    },
    {
      id: '2',
      title: 'Operation Reminder',
      message: 'Emma Wilson\'s orthopedic surgery is scheduled in 2 hours.',
      type: 'warning',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      patientName: 'Emma Wilson',
      operationType: 'Orthopedic Surgery'
    },
    {
      id: '3',
      title: 'Operation Completed',
      message: 'Robert Davis\' neurosurgery was completed successfully.',
      type: 'success',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
      patientName: 'Robert Davis',
      operationType: 'Neurosurgery'
    },
    {
      id: '4',
      title: 'New Doctor Available',
      message: 'Dr. James Wilson is now available for consultations.',
      type: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle size={20} />;
      case 'warning': return <AlertTriangle size={20} />;
      case 'success': return <CheckCircle size={20} />;
      case 'info': return <Info size={20} />;
      default: return <Bell size={20} />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="notifications-container">
      <div className="page-header animate-fadeIn">
        <h1>🔔 Notifications</h1>
        <p>Stay updated with the latest hospital activities</p>
      </div>

      <div className="notifications-header">
        <div className="notifications-count">
          <Bell size={20} />
          <span>{unreadCount} unread notifications</span>
        </div>
        <button
          className="btn btn-secondary"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </button>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <Bell size={48} />
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${!notification.read ? 'unread' : ''} animate-slideIn`}
            >
              <div className={`notification-icon ${notification.type}`}>
                {getIcon(notification.type)}
              </div>

              <div className="notification-content">
                <div className="notification-header">
                  <h3>{notification.title}</h3>
                  <span className="notification-time">
                    <Clock size={14} />
                    {getTimeAgo(notification.timestamp)}
                  </span>
                </div>

                <p className="notification-message">{notification.message}</p>

                {notification.patientName && (
                  <div className="notification-patient">
                    <User size={16} />
                    <span>{notification.patientName}</span>
                    {notification.operationType && (
                      <>
                        <Heart size={16} />
                        <span>{notification.operationType}</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="notification-actions">
                {!notification.read && (
                  <button
                    className="action-button"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </button>
                )}
                <button
                  className="action-button delete"
                  onClick={() => deleteNotification(notification.id)}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;