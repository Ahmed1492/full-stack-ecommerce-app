import { create } from "zustand";

type Notification = {
  id: string;
  productName: string;
  productImage: string;
  message: string;
  date: string;
};

type NotificationState = {
  notifications: Notification[];
  isLoading: boolean;
  counter: number;

  getNotifications: () => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void; // ✅ new method
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  isLoading: true,
  counter: 0,

  getNotifications: () => {
    set({ isLoading: true });

    const stored = localStorage.getItem("notifications");
    const parsed = stored ? JSON.parse(stored) : [];

    set({
      notifications: parsed,
      counter: parsed.length,
      isLoading: false,
    });
  },

  addNotification: (notification) => {
    const current = get().notifications;
    const updated = [notification, ...current];

    set({
      notifications: updated,
      counter: updated.length,
    });
    localStorage.setItem("notifications", JSON.stringify(updated));
  },

  removeNotification: (id) => {
    const current = get().notifications;
    const updated = current.filter((n) => n.id !== id);

    set({
      notifications: updated,
      counter: updated.length,
    });
    localStorage.setItem("notifications", JSON.stringify(updated));
  },

  clearNotifications: () => {
    set({
      notifications: [],
      counter: 0,
    });
    localStorage.removeItem("notifications");
  },
}));
