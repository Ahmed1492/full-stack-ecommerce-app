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
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  markAllSeen: () => void;
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  isLoading: false, // fix: was true, causing skeleton flash on every open
  counter: 0,

  getNotifications: () => {
    // Already loaded — don't re-read localStorage unnecessarily
    if (get().notifications.length > 0) return;

    const stored = localStorage.getItem("notifications");
    const parsed: Notification[] = stored ? JSON.parse(stored) : [];
    set({ notifications: parsed, counter: parsed.length, isLoading: false });
  },

  addNotification: (notification) => {
    const current = get().notifications;

    // Deduplicate — don't add if same id already exists
    if (current.some((n) => n.id === notification.id)) return;

    const updated = [notification, ...current];
    set({ notifications: updated, counter: updated.length });
    localStorage.setItem("notifications", JSON.stringify(updated));
  },

  removeNotification: (id) => {
    const updated = get().notifications.filter((n) => n.id !== id);
    set({ notifications: updated, counter: updated.length });
    localStorage.setItem("notifications", JSON.stringify(updated));
  },

  clearNotifications: () => {
    set({ notifications: [], counter: 0 });
    localStorage.removeItem("notifications");
  },

  markAllSeen: () => {
    set({ counter: 0 });
  },
}));
