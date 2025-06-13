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
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  isLoading: true,
  counter: 0,

  getNotifications: () => {
    set({ isLoading: true });

    // Load from localStorage
    const stored = localStorage.getItem("notifications");
    const parsed = stored ? JSON.parse(stored) : [];

    set({
      notifications: parsed,
      counter: parsed.length,
      isLoading: false,
    });

    // console.log("parse ", parsed);
  },

  addNotification: (notification) => {
    const current = get().notifications;
    const updated = [notification, ...current];

    // Save to state and localStorage
    set({
      notifications: updated,
      counter: updated.length,
    });
    localStorage.setItem("notifications", JSON.stringify(updated));
  },
}));
