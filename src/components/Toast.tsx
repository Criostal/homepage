import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

type ToastProps = {
  message: string | null;
  duration?: number; // ms
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, duration = 4000, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose(), duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        left: '50%',
        bottom: '24px',
        transform: 'translateX(-50%)',
        background: '#ffb74d',
        color: '#201700',
        padding: '12px 18px',
        borderRadius: 10,
        zIndex: 10000,
        boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        minWidth: 320,
        maxWidth: '80%',
        fontSize: '1rem',
        fontWeight: 600
      }}
    >
      <AlertTriangle size={20} color="#201700" />
      <span style={{ lineHeight: 1.1 }}>{message}</span>
    </div>
  );
};

export default Toast;
