import React from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    showToast: (message: string, type?: ToastType, duration?: number) => void;
    toasts: Toast[];
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const showToast = React.useCallback(
        (message: string, type: ToastType = 'info', duration = 1000) => {
            const id = Date.now();
            const newToast: Toast = { id, message, type };

            setToasts((prev) => [...prev, newToast]);

            setTimeout(() => {
                setToasts((prev) => prev.filter((toast) => toast.id !== id));
            }, duration);
        },
        []
    );

    const styleMap = {
        success: 'bg-emerald-700',
        error: 'bg-rose-500',
        info: 'bg-sky-500',
    };

    return (
        <ToastContext.Provider value={{ showToast, toasts }}>
            {children}
            {toasts?.length ? (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 space-y-3">
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            className={`text-white px-4 py-2 rounded shadow ${styleMap[toast.type]} animate-fade-in-out`}
                        >
                            {toast.message}
                        </div>
                    ))}
                </div>
            ): <></>}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};