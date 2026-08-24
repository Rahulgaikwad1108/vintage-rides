import React, { useState } from 'react';
import { Compass, Flame, Sparkles, ArrowRight } from 'lucide-react';

export default function EntryScreen({ onEnterGarage }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnterClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnterGarage();
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0b0907',
        backgroundImage: 'radial-gradient(circle at 50% 45%, #261e16 0%, #0d0a07 65%, #050403 100%)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isExiting ? 'none' : 'auto',
        overflow: 'hidden'
      }}
    >
      {/* Background Film Grain Overlay */}
      <div className="film-grain" />

      {/* Decorative Vintage Badge Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: 'rgba(26, 20, 14, 0.85)',
          border: '1px solid #d97706',
          borderRadius: '24px',
          padding: '3.5rem 2.5rem',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(217, 119, 6, 0.25)',
          backdropFilter: 'blur(12px)',
          position: 'relative',
          animation: 'fadeInUp 0.8s ease'
        }}
      >
        {/* Top Logo Emblem */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: '#291e14',
            border: '2px solid #f59e0b',
            color: '#fbbf24',
            marginBottom: '1.5rem',
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.4)'
          }}
        >
          <Flame size={36} />
        </div>

        {/* Main Title Branding */}
        <h1
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '3rem',
            fontWeight: 900,
            letterSpacing: '3px',
            background: 'linear-gradient(135deg, #fef3c7 0%, #f59e0b 50%, #d97706 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
            marginBottom: '0.75rem',
            textShadow: '0 10px 20px rgba(0,0,0,0.8)'
          }}
        >
          VINTAGE RIDES
        </h1>

        {/* Nostalgic Tagline */}
        <p
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '1.15rem',
            color: '#a39580',
            letterSpacing: '1px',
            fontStyle: 'italic',
            marginBottom: '2.5rem'
          }}
        >
          "Where every ride has a story."
        </p>

        {/* Enter Garage CTA Button */}
        <button
          onClick={handleEnterClick}
          aria-label="Enter Garage Experience"
          className="interactive-hover"
          style={{
            backgroundColor: '#d97706',
            color: '#0f0d0b',
            border: 'none',
            borderRadius: '30px',
            padding: '1rem 2.5rem',
            fontSize: '1.1rem',
            fontWeight: 800,
            fontFamily: 'Cinzel, serif',
            letterSpacing: '1.5px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(217, 119, 6, 0.5)'
          }}
        >
          <span>ENTER GARAGE</span>
          <ArrowRight size={20} />
        </button>

        {/* Subtitle Badge */}
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            color: '#8c7d6b',
            fontSize: '0.75rem',
            fontFamily: 'JetBrains Mono, monospace'
          }}
        >
          <Sparkles size={12} style={{ color: '#f59e0b' }} />
          <span>Interactive Retro Indian Garage Experience</span>
        </div>
      </div>
    </div>
  );
}
