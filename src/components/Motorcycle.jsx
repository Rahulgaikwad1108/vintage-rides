import React, { useState } from 'react';
import { Flame } from 'lucide-react';
import { engineAudio } from '../utils/engineAudio';

export default function Motorcycle({ onInspectMotorcycle }) {
  const [isIgnited, setIsIgnited] = useState(false);

  const handleClick = (e) => {
    if (e) e.stopPropagation();
    setIsIgnited(true);
    engineAudio.playEngineRumble();
    setTimeout(() => setIsIgnited(false), 1400);
    if (onInspectMotorcycle) {
      onInspectMotorcycle();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label="1968 Bullet 350 Motorcycle - Press Enter or Space to inspect and ignite engine sound"
      className="interactive-hover motorcycle-idle-anim"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        filter: isIgnited ? 'drop-shadow(0 0 25px rgba(245, 158, 11, 0.85))' : 'none',
        transition: 'filter 0.4s ease'
      }}
      title="Click or press Enter to inspect the Vintage Indian Motorcycle"
    >
      {/* Floating Info Tag Badge */}
      <div
        style={{
          position: 'absolute',
          top: '-45px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(20, 16, 12, 0.9)',
          border: '1px solid #f59e0b',
          borderRadius: '20px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 5
        }}
      >
        <Flame size={14} style={{ color: '#f59e0b', filter: isIgnited ? 'drop-shadow(0 0 5px #f59e0b)' : 'none' }} />
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', fontWeight: 700, color: '#f5eedc', letterSpacing: '0.5px' }}>
          Vintage Bullet 350
        </span>
        <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontFamily: 'JetBrains Mono, monospace' }}>[1968]</span>
      </div>

      {/* SVG Motorcycle Visual Artwork with Subtle Animations */}
      <svg width="680" height="380" viewBox="0 0 680 380" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tankGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b1e10" />
            <stop offset="50%" stopColor="#5c1208" />
            <stop offset="100%" stopColor="#2b0703" />
          </linearGradient>
          <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="50%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#4b5563" />
          </linearGradient>
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6e4726" />
            <stop offset="100%" stopColor="#3b2310" />
          </linearGradient>
        </defs>

        {/* Dynamic Floor Shadow */}
        <ellipse cx="340" cy="355" rx="270" ry="18" fill="rgba(0, 0, 0, 0.75)" />

        {/* Rear Wheel */}
        <g id="rear-wheel">
          {/* Tire */}
          <circle cx="160" cy="270" r="75" fill="#181512" stroke="#0a0806" strokeWidth="16" />
          {/* Rim */}
          <circle cx="160" cy="270" r="67" fill="none" stroke="url(#chromeGrad)" strokeWidth="6" />
          {/* Hub */}
          <circle cx="160" cy="270" r="22" fill="#2d261e" stroke="url(#chromeGrad)" strokeWidth="3" />
          {/* Spokes */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <line
              key={i}
              x1="160"
              y1="270"
              x2={160 + 64 * Math.cos((angle * Math.PI) / 180)}
              y2={270 + 64 * Math.sin((angle * Math.PI) / 180)}
              stroke="#9ca3af"
              strokeWidth="1.5"
              opacity="0.8"
            />
          ))}
        </g>

        {/* Front Wheel */}
        <g id="front-wheel">
          {/* Tire */}
          <circle cx="520" cy="270" r="75" fill="#181512" stroke="#0a0806" strokeWidth="16" />
          {/* Rim */}
          <circle cx="520" cy="270" r="67" fill="none" stroke="url(#chromeGrad)" strokeWidth="6" />
          {/* Hub */}
          <circle cx="520" cy="270" r="22" fill="#2d261e" stroke="url(#chromeGrad)" strokeWidth="3" />
          {/* Spokes */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
            <line
              key={i}
              x1="520"
              y1="270"
              x2={520 + 64 * Math.cos((angle * Math.PI) / 180)}
              y2={270 + 64 * Math.sin((angle * Math.PI) / 180)}
              stroke="#9ca3af"
              strokeWidth="1.5"
              opacity="0.8"
            />
          ))}
        </g>

        {/* Exhaust Pipe System */}
        <path
          d="M 280 280 L 220 280 L 110 280"
          stroke="url(#chromeGrad)"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d="M 280 280 L 220 280 L 110 280"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Frame Structure */}
        <path d="M 160 270 L 240 180 L 370 170 L 460 210 L 520 270" stroke="#1f1a14" strokeWidth="10" strokeLinejoin="round" fill="none" />
        <path d="M 240 180 L 270 290 L 400 290 L 370 170" stroke="#2d241b" strokeWidth="8" strokeLinejoin="round" fill="none" />

        {/* Engine Block & Fins */}
        <g id="engine">
          {/* Crankcase */}
          <rect x="260" y="225" width="120" height="70" rx="10" fill="#374151" stroke="url(#chromeGrad)" strokeWidth="4" />
          <circle cx="320" cy="260" r="22" fill="#1f2937" stroke="url(#brassGrad)" strokeWidth="3" />
          {/* Cylinder Cooling Fins */}
          {[205, 213, 221, 229, 237].map((yPos, idx) => (
            <rect key={idx} x="280" y={yPos} width="70" height="5" rx="2" fill="#d1d5db" />
          ))}
          {/* Spark Plug & Cable */}
          <path d="M 315 200 L 315 190 L 290 190" stroke="#ef4444" strokeWidth="4" fill="none" />
          {/* Carburetor Air Filter Box */}
          <circle cx="250" cy="245" r="16" fill="url(#brassGrad)" stroke="#1a1107" strokeWidth="2" />
        </g>

        {/* Rear Mudguard Fender */}
        <path d="M 95 250 A 78 78 0 0 1 235 220" fill="none" stroke="#6b170c" strokeWidth="16" />
        <path d="M 95 250 A 78 78 0 0 1 235 220" fill="none" stroke="url(#brassGrad)" strokeWidth="2" />

        {/* Front Mudguard Fender */}
        <path d="M 450 220 A 78 78 0 0 1 585 260" fill="none" stroke="#6b170c" strokeWidth="16" />
        <path d="M 450 220 A 78 78 0 0 1 585 260" fill="none" stroke="url(#brassGrad)" strokeWidth="2" />

        {/* Classic Teardrop Fuel Tank */}
        <g id="fuel-tank">
          <path
            d="M 320 165 C 340 135, 430 135, 450 170 C 450 185, 380 195, 320 175 Z"
            fill="url(#tankGrad)"
            stroke="url(#brassGrad)"
            strokeWidth="3"
          />
          {/* Chrome Tank Badge */}
          <ellipse cx="385" cy="162" rx="22" ry="12" fill="url(#chromeGrad)" stroke="#b88339" strokeWidth="1.5" />
          <text x="385" y="165" fill="#111827" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="serif">
            BULLET
          </text>
          {/* Chrome Gas Cap */}
          <rect x="380" y="132" width="16" height="7" rx="3" fill="url(#chromeGrad)" stroke="#374151" strokeWidth="1" />
        </g>

        {/* Handcrafted Leather Saddle Seat */}
        <g id="saddle">
          <path
            d="M 215 175 C 230 165, 310 165, 325 180 C 290 195, 235 195, 215 175 Z"
            fill="url(#leatherGrad)"
            stroke="#1f140a"
            strokeWidth="3"
          />
          {/* Seat Springs */}
          <path d="M 230 192 L 230 210 M 245 192 L 245 210" stroke="url(#chromeGrad)" strokeWidth="4" />
        </g>

        {/* Front Fork & Handlebars */}
        <g id="front-fork">
          <line x1="450" y1="165" x2="520" y2="270" stroke="url(#chromeGrad)" strokeWidth="12" />
          {/* Handlebar Stem */}
          <path d="M 445 160 L 435 110 M 435 110 L 415 105 M 435 110 L 465 105" stroke="url(#chromeGrad)" strokeWidth="6" strokeLinecap="round" />
          {/* Rubber Grips */}
          <rect x="405" y="100" width="15" height="9" rx="2" fill="#1f2937" />
          <rect x="460" y="100" width="15" height="9" rx="2" fill="#1f2937" />
          {/* Speedometer Gauge Instrument */}
          <circle cx="440" cy="115" r="11" fill="#1f2937" stroke="url(#chromeGrad)" strokeWidth="2" />
          <circle cx="440" cy="115" r="8" fill="#fef3c7" />
          <line x1="440" y1="115" x2="444" y2="110" stroke="#ef4444" strokeWidth="2" />
        </g>

        {/* Headlight with Headlight Pulse Animation */}
        <g id="headlight">
          <path d="M 470 140 A 18 18 0 0 1 470 170 Z" fill="url(#chromeGrad)" stroke="#374151" strokeWidth="2" />
          <ellipse
            cx="472"
            cy="155"
            rx="5"
            ry="14"
            className="headlight-pulse-anim"
            fill={isIgnited ? '#fffbeb' : '#fef3c7'}
          />
        </g>

        {/* Kickstand */}
        <line x1="290" y1="285" x2="270" y2="345" stroke="#374151" strokeWidth="7" strokeLinecap="round" />
      </svg>
    </div>
  );
}
