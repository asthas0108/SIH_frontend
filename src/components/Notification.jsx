import React, { useEffect, useState, useMemo } from "react";
import { Bell, Check, Inbox, Trash2, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://localhost:8000/notifications/my_notifications",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch notifications");

        const data = await res.json();
        setNotifications(data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.is_read).length,
    [notifications]
  );

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8000/notifications/mark_as_read/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8000/notifications/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-green-700 text-lg font-medium">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-50 p-6">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-green-800 mb-4 flex items-center gap-3"
        >
          <Bell className="w-8 h-8" /> Notifications
        </motion.h1>

        {/* Show unread count */}
        <p className="text-green-700 font-medium mb-6">
          You have {unreadCount} unread notification
          {unreadCount !== 1 ? "s" : ""}
        </p>

        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-inner border border-green-200"
          >
            <Inbox className="w-12 h-12 mx-auto text-green-500 mb-3" />
            <p className="text-gray-500 font-medium text-lg">
              No notifications yet
            </p>
          </motion.div>
        )}

        <div className="space-y-4">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-5 bg-white rounded-2xl shadow-md transform transition-all hover:scale-[1.01] hover:shadow-xl ${
                  !notification.is_read
                    ? "border-l-4 border-green-500"
                    : "border-l-4 border-transparent"
                }`}
              >
                <div className="flex items-start gap-4 flex-1">
                  {!notification.is_read && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-3 h-3 mt-2 bg-green-500 rounded-full animate-pulse"
                    ></motion.span>
                  )}
                  <div>
                    <p
                      className={`text-gray-800 ${
                        !notification.is_read
                          ? "font-semibold"
                          : "font-normal"
                      }`}
                    >
                      <span className="text-green-700 font-bold">
                        {notification.title}
                      </span>
                      <br />
                      {notification.message}
                    </p>
                    {notification.type && (
                      <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium px-2 py-1 rounded-lg bg-green-100 text-green-800">
                        <Tag className="w-3 h-3" /> {notification.type}
                      </span>
                    )}
                    <p className="text-xs text-green-600 mt-2">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!notification.is_read && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => markAsRead(notification.id)}
                      className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-blue-800 font-medium px-3 py-2 rounded-xl transition cursor-pointer"
                    >
                      <Check className="w-4 h-4" /> Read It
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteNotification(notification.id)}
                    className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium px-3 py-2 rounded-xl transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
