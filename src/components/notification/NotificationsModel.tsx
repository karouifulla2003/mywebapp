"use client";

import { useEffect } from "react";
import { 
  FiPackage, 
  FiPercent, 
  FiDollarSign, 
  FiMessageSquare,
  FiX,
  FiBell
} from "react-icons/fi";

type NotificationType = "order" | "discount" | "payment" | "message";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: NotificationType;
}

interface NotificationsModelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: NotificationItem[]; // Optional prop for real data
}

const NotificationsModel = ({ isOpen, onClose, notifications = [] }: NotificationsModelProps) => {
  // Default notifications if none provided
  const defaultNotifications: NotificationItem[] = [
    {
      id: "1",
      title: "Order Confirmed",
      message: "Your order #12345 has been shipped",
      time: "2 mins ago",
      isRead: false,
      type: "order"
    },
    {
      id: "2",
      title: "Special Offer",
      message: "Get 20% off on your next purchase",
      time: "1 hour ago",
      isRead: false,
      type: "discount"
    },
    {
      id: "3",
      title: "Payment Received",
      message: "Your payment of $59.99 has been processed",
      time: "3 hours ago",
      isRead: true,
      type: "payment"
    },
    {
      id: "4",
      title: "New Message",
      message: "You have a new message from support team",
      time: "1 day ago",
      isRead: true,
      type: "message"
    },
  ];

  const displayNotifications = notifications.length > 0 ? notifications : defaultNotifications;
  const unreadCount = displayNotifications.filter(n => !n.isRead).length;

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest(".notifications-dialog")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getNotificationIcon = (type: NotificationType) => {
    const iconClass = "w-5 h-5 flex-shrink-0";
    switch(type) {
      case "order": return <FiPackage className={`${iconClass} text-blue-500`} />;
      case "discount": return <FiPercent className={`${iconClass} text-green-500`} />;
      case "payment": return <FiDollarSign className={`${iconClass} text-purple-500`} />;
      case "message": return <FiMessageSquare className={`${iconClass} text-amber-500`} />;
      default: return <FiBell className={`${iconClass} text-gray-500`} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30">
      <div className="absolute right-4 top-16 md:right-6 md:top-20">
        <div className="notifications-dialog bg-white rounded-xl shadow-xl w-full max-w-sm max-h-[80vh] overflow-hidden flex flex-col border border-gray-100">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-gray-800">Notifications</h3>
              <p className="text-sm text-gray-500">
                {unreadCount} new {unreadCount === 1 ? 'notification' : 'notifications'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close notifications"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {displayNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !notification.isRead ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex gap-3 items-start">
                  <div className="mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-medium ${
                        !notification.isRead ? "text-blue-600" : "text-gray-700"
                      }`}>
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="p-3 bg-gray-50 flex justify-between">
            <button 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
              onClick={() => {/* Mark all as read logic */}}
            >
              Mark all as read
            </button>
            <button 
              className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => {/* View all logic */}}
            >
              View all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModel;