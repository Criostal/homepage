import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import '../styles/happy2026.css';
import Confetti from './Confetti';

type Spark = { left: number; top: number; size: number; delay: number; duration: number; color: string };

const HappyNewYear2026: React.FC = () => {
    const sparkles: Spark[] = useMemo(() => {
        const colors = ['#fff', '#ffe082', '#ffeb3b', '#fff9c4'];
        return Array.from({ length: 36 }).map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 60,
            size: 6 + Math.random() * 18,
            delay: -(Math.random() * 2),
            duration: 0.9 + Math.random() * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
    }, []);

    return (
        <div className="happy-page">
            <Confetti duration={4200} count={160} />
            <div className="glitter-container" aria-hidden>
                {sparkles.map((s, i) => (
                    <span
                        key={i}
                        className="glitter"
                        style={{
                            left: `${s.left}%`,
                            top: `${s.top}%`,
                            width: `${s.size}px`,
                            height: `${s.size}px`,
                            animationDuration: `${s.duration}s`,
                            animationDelay: `${s.delay}s`,
                            background: s.color,
                        }}
                    />
                ))}
            </div>

            <div className="happy-content" style={{ textAlign: 'center', padding: '48px 16px' }}>
                <h1 className="happy-title">Happy New Year 2026!</h1>
                <p className="happy-sub">Wishing you a joyful, healthy and successful 2026 🎉</p>
                <div style={{ marginTop: 24 }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <button className="happy-btn">Zurück zur Startseite</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HappyNewYear2026;
