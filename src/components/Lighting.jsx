import React from 'react';
import { Zap } from 'lucide-react';

export default function Lighting({ isLightOn, onToggleLight, onInspectLight }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggleLight();
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none'
      }}
    >
      {/* Dynamic Cone Glow Light Beam with Subtle Flickering */}
      {isLightOn && (
        <div
          className="flickering-light"
          style={{
            position: 'absolute',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80vw',
            height: '85vh',
            background: 'radial-gradient(ellipse at top, rgba(255, 185, 80, 0.28) 0%, rgba(217, 119, 6, 0.12) 45%, rgba(0, 0, 0, 0) 80%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}

      {/* SVG Hanging Pendant Lamp with Swaying Animation */}
      <div className="swaying-lamp" style={{ pointerEvents: 'auto', zIndex: 12 }}>
        <svg width="180" height="220" viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wire */}
          <line x1="90" y1="0" x2="90" y2="80" stroke="#332a20" strokeWidth="4" />
          
          {/* Brass Fixture Top */}
          <rect x="80" y="75" width="20" height="15" rx="3" fill="#8c622b" stroke="#523916" strokeWidth="2" />
          <rect x="75" y="88" width="30" height="8" rx="2" fill="#b88339" />

          {/* Enamel Lamp Shade */}
          <path
            d="M 20 130 Q 90 95 160 130 L 145 140 Q 90 120 35 140 Z"
            fill="#261e16"
            stroke="#b88339"
            strokeWidth="3"
          />
          <path
            d="M 25 132 L 155 132 L 145 139 L 35 139 Z"
            fill="#473626"
          />

          {/* Light Bulb with Subtle Filament Flickering */}
          <circle
            cx="90"
            cy="145"
            r="16"
            className={isLightOn ? 'flickering-light' : ''}
            fill={isLightOn ? '#fff2b3' : '#4a3d2c'}
            stroke={isLightOn ? '#f59e0b' : '#33291d'}
            strokeWidth="3"
            style={{
              transition: 'fill 0.4s ease, stroke 0.4s ease'
            }}
          />
          {/* Filament Detail */}
          {isLightOn && (
            <path
              d="M 85 145 Q 90 138 95 145"
              stroke="#d97706"
              strokeWidth="2"
              fill="none"
            />
          )}

          {/* Pull Chain Switch (Clickable Interactive Target) */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Tungsten Pendant Lamp Pull Chain - Press Enter or Space to toggle garage lighting"
            className="interactive-hover"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLight();
            }}
            onKeyDown={handleKeyDown}
            style={{ cursor: 'pointer' }}
          >
            <line x1="125" y1="130" x2="125" y2="185" stroke="#a38550" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="125" cy="190" r="6" fill="#f59e0b" stroke="#8c622b" strokeWidth="2" />
          </g>
        </svg>

        {/* Lamp Control Badge */}
        <div
          onClick={onInspectLight}
          className="interactive-hover"
          style={{
            marginTop: '-15px',
            backgroundColor: isLightOn ? 'rgba(245, 158, 11, 0.2)' : 'rgba(40, 32, 24, 0.8)',
            border: `1px solid ${isLightOn ? '#f59e0b' : '#47392b'}`,
            borderRadius: '12px',
            padding: '4px 10px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: isLightOn ? '#fbbf24' : '#a39580',
            fontSize: '0.75rem',
            fontFamily: 'JetBrains Mono, monospace',
            backdropFilter: 'blur(6px)',
            boxShadow: isLightOn ? '0 0 12px rgba(245, 158, 11, 0.3)' : 'none'
          }}
        >
          <Zap size={12} fill={isLightOn ? '#fbbf24' : 'none'} />
          <span>{isLightOn ? 'Tungsten Lamp ON' : 'Tungsten Lamp OFF'}</span>
        </div>
      </div>
    </div>
  );
}
