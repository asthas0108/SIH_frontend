import React, { useState } from "react";

const initialNotifications = [
  { id: 1, message: "Your soil analysis report is ready", time: "10 mins ago", unread: true },
  { id: 2, message: "New crop recommendations available", time: "1 hour ago", unread: true },
  { id: 3, message: "Weather alert: Rain expected tomorrow", time: "2 hours ago", unread: false },
  { id: 4, message: "Your subscription will renew in 3 days", time: "1 day ago", unread: false },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-green-800 mb-8">Notifications</h1>

        <div className="space-y-4">
          {notifications.length === 0 && (
            <div className="text-center text-gray-500 font-medium py-10">
              No notifications yet
            </div>
          )}

          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex justify-between items-center p-4 bg-white rounded-xl shadow-md transform transition-all duration-200 hover:scale-[1.01] hover:shadow-lg cursor-pointer ${
                notification.unread ? "border-l-4 border-green-500" : "border-l-4 border-transparent"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Unread Badge */}
                {notification.unread && (
                  <span className="w-3 h-3 mt-1 bg-green-500 rounded-full animate-pulse"></span>
                )}
                <div>
                  <p className={`text-gray-800 ${notification.unread ? "font-semibold" : "font-normal"}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-green-600 mt-1">{notification.time}</p>
                </div>
              </div>
              {/* Mark as Read Button */}
              {notification.unread && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-sm text-green-700 hover:text-green-900 font-medium"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}