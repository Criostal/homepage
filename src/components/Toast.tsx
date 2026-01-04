import React, { useEffect } from 'react';

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
    <div style={{
      position: 'fixed',
      left: '50%',
      bottom: '24px',
      transform: 'translateX(-50%)',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px 14px',
      borderRadius: 8,
      zIndex: 10000,
      boxShadow: '0 6px 18px rgba(0,0,0,0.2)'
    }}>
      {message}
    </div>
  );
};

export default Toast;
