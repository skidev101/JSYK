import { create } from "zustand";

export interface Topic {
  _id: string;
  url: string;
  createdAt: string;
  topic: string;
  messageCount: number;
}

export interface Message {
  _id: string;
  topicId?: string;
  topicSlug?: string;
  topic?: string;
  content: string;
  isRead: boolean;
  themeColor: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNextPage: boolean;
}

export interface DashboardData {
  topics: Topic[];
  messages: Message[];
  pagination: Pagination | null;
  unreadCount: string;
}

interface DashboardState {
  data: DashboardData;
  loadingData: boolean;
  error: string | null;
  lastFetched: number | null;
  setData: (data: DashboardData) => void;
  setLoadingData: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLastFetched: (timestamp: number) => void;
  reset: () => void;
  removeMessage: (id: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  data: {
    topics: [],
    messages: [],
    pagination: null,
    unreadCount: "0",
  },
  loadingData: false,
  error: null,
  lastFetched: null,
  setData: (data) => set({ data }),
  setLoadingData: (loadingData) => set({ loadingData }),
  setError: (error) => set({ error }),
  setLastFetched: (timestamp) => set({ lastFetched: timestamp }),
  reset: () =>
    set({
      data: { topics: [], messages: [], pagination: null, unreadCount: "0" },
      loadingData: false,
      error: null,
      lastFetched: null,
    }),
  removeMessage: (id: string) =>
    set((state) => ({
      data: {
        ...state.data,
        messages: state.data.messages.filter((m) => m._id !== id),
      },
    })),
  markMessageRead: (id: string) =>
    set((state) => ({
      data: {
        ...state.data,
        messages: state.data.messages.map((m) =>
          m._id === id ? { ...m, isRead: true } : m
        ),
      },
    })),
}));