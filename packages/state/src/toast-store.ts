import { create } from 'zustand';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface Toast {
  /** Unique ID */
  id: string;
  /** Toast title */
  title: string;
  /** Optional description */
  description?: string;
  /** Variant/type */
  variant: ToastVariant;
  /** Duration in ms (0 = persistent) */
  duration: number;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Created timestamp */
  createdAt: number;
}

export interface ToastState {
  /** Active toasts */
  toasts: Toast[];
  /** Maximum toasts to show */
  maxToasts: number;
}

export interface ToastActions {
  /** Add a toast */
  addToast: (toast: Omit<Toast, 'id' | 'createdAt'>) => string;
  /** Remove a toast by ID */
  removeToast: (id: string) => void;
  /** Clear all toasts */
  clearToasts: () => void;
  /** Update a toast */
  updateToast: (id: string, updates: Partial<Omit<Toast, 'id' | 'createdAt'>>) => void;
}

export type ToastStore = ToastState & ToastActions;

let toastId = 0;
const generateId = () => `toast-${++toastId}`;

// Track timeout IDs to clear them when toasts are manually dismissed
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Clear a timeout for a specific toast ID
 */
function clearToastTimeout(id: string): void {
  const timeoutId = toastTimeouts.get(id);
  if (timeoutId) {
    clearTimeout(timeoutId);
    toastTimeouts.delete(id);
  }
}

/**
 * Clear all toast timeouts
 */
function clearAllToastTimeouts(): void {
  toastTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  toastTimeouts.clear();
}

/**
 * Toast notification store
 * Manages toast notifications
 */
export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  maxToasts: 5,

  addToast: (toast) => {
    const id = generateId();
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
      createdAt: Date.now(),
    };

    set((state) => {
      const toasts = [newToast, ...state.toasts].slice(0, state.maxToasts);
      return { toasts };
    });

    // Auto-dismiss if duration > 0
    if (newToast.duration > 0) {
      const timeoutId = setTimeout(() => {
        toastTimeouts.delete(id);
        get().removeToast(id);
      }, newToast.duration);
      
      toastTimeouts.set(id, timeoutId);
    }

    return id;
  },

  removeToast: (id) => {
    // Clear any pending timeout for this toast
    clearToastTimeout(id);
    
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearToasts: () => {
    // Clear all pending timeouts
    clearAllToastTimeouts();
    
    set({ toasts: [] });
  },

  updateToast: (id, updates) => {
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
  },
}));

/**
 * Convenience functions for creating toasts
 */
export const toast = {
  default: (title: string, options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'variant'>>) =>
    useToastStore.getState().addToast({ title, variant: 'default', duration: 5000, ...options }),

  success: (title: string, options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'variant'>>) =>
    useToastStore.getState().addToast({ title, variant: 'success', duration: 5000, ...options }),

  warning: (title: string, options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'variant'>>) =>
    useToastStore.getState().addToast({ title, variant: 'warning', duration: 6000, ...options }),

  error: (title: string, options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'variant'>>) =>
    useToastStore.getState().addToast({ title, variant: 'error', duration: 8000, ...options }),

  info: (title: string, options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'variant'>>) =>
    useToastStore.getState().addToast({ title, variant: 'info', duration: 5000, ...options }),

  dismiss: (id: string) => useToastStore.getState().removeToast(id),

  dismissAll: () => useToastStore.getState().clearToasts(),
};
