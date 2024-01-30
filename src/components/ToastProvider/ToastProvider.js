import React from 'react';
import Toast from '../Toast/Toast';

export const ToastContext = React.createContext();

function ToastProvider({children}) {
    const [toasts, setToasts] = React.useState([
        {
            id: crypto.randomUUID(),
            message: 'Oh noooo!',
            variant: 'error',
        },
        {
            id: crypto.randomUUID(),
            message: 'This is a notice.',
            variant: 'notice',
        },
    ]);

    function createToast(message, variant) {
        const nextToasts = [
            ...toasts,
            {
                id: crypto.randomUUID(),
                message,
                variant,
            },
        ];

        setToasts(nextToasts);
    }

    function dismissToast(id) {
        const nextToasts = toasts.filter(toast => {
            return toast.id !== id;
        })

        setToasts(nextToasts)
    }
  return <ToastContext.Provider value={{toasts, createToast, dismissToast}}>
{children}
  </ToastContext.Provider>
}

export default ToastProvider;
