import React, { useState } from 'react';
import { Radio as RadioIcon, Volume2 } from 'lucide-react';

export default function Radio({ onInspectRadio, activeFrequency = "104.2 FM" }) {
  const [isTuning, setIsTuning] = useState(false);

  const handleTuneClick = (e) => {
    if (e) e.stopPropagation();
    setIsTuning(true);
    setTimeout(() => setIsTuning(false), 800);
    if (onInspectRadio) {
      onInspectRadio();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTuneClick();
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label="Vintage Airwave Tabletop Radio - Press Enter or Space to open radio player deck"
      className="interactive-hover"
      onClick={handleTuneClick}
      onKeyDown={handleKeyDown}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '8px'
      }}
      title="Click or press Enter to open radio player"
    >
      {/* Visual Indicator Floating Badge */}
      <div
        style={{
          marginBottom: '6px',
          padding: '3px 8px',
          borderRadius: '10px',
          backgroundColor: 'rgba(25, 20, 15, 0.85)',
          border: '1px solid #d97706',
          color: '#fbbf24',
          fontSize: '0.7rem',
          fontFamily: 'JetBrains Mono, monospace',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)'
        }}
      >
        <RadioIcon size={12} className={isTuning ? 'rotating-fan' : ''} />
        <span>{activeFrequency}</span>
        <Volume2 size={12} style={{ color: '#d97706' }} />
      </div>

      {/* SVG Retro Valve Radio */}
      <svg width="150" height="105" viewBox="0 0 150 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <ellipse cx="75" cy="100" rx="65" ry="5" fill="rgba(0,0,0,0.6)" />

        {/* Outer Wooden Cabinet */}
        <rect x="5" y="10" width="140" height="85" rx="8" fill="#3b2817" stroke="#1f140a" strokeWidth="4" />
        <rect x="9" y="14" width="132" height="77" rx="5" fill="#523821" stroke="#805934" strokeWidth="2" />

        {/* Brass Frame Accent */}
        <rect x="14" y="19" width="122" height="67" rx="3" fill="#291b0f" stroke="#b88947" strokeWidth="2" />

        {/* Left Side: Woven Speaker Grill */}
        <rect x="20" y="24" width="60" height="57" rx="2" fill="#1f160e" />
        {/* Grill Slots */}
        <line x1="25" y1="30" x2="75" y2="30" stroke="#8c6a3b" strokeWidth="2" strokeDasharray="4 2" />
        <line x1="25" y1="38" x2="75" y2="38" stroke="#8c6a3b" strokeWidth="2" strokeDasharray="4 2" />
        <line x1="25" y1="46" x2="75" y2="46" stroke="#8c6a3b" strokeWidth="2" strokeDasharray="4 2" />
        <line x1="25" y1="54" x2="75" y2="54" stroke="#8c6a3b" strokeWidth="2" strokeDasharray="4 2" />
        <line x1="25" y1="62" x2="75" y2="62" stroke="#8c6a3b" strokeWidth="2" strokeDasharray="4 2" />
        <line x1="25" y1="70" x2="75" y2="70" stroke="#8c6a3b" strokeWidth="2" strokeDasharray="4 2" />

        {/* Right Side: Frequency Dial Glass */}
        <rect x="86" y="24" width="45" height="30" rx="2" fill="#140e08" stroke="#b88947" strokeWidth="1.5" />
        {/* Glowing Dial Background with Animation */}
        <rect x="88" y="26" width="41" height="26" rx="1" className="radio-dial-anim" fill="#4d320a" opacity="0.85" />
        {/* Frequency Numbers / Lines */}
        <line x1="92" y1="34" x2="125" y2="34" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 3" />
        <line x1="92" y1="42" x2="125" y2="42" stroke="#d97706" strokeWidth="1" strokeDasharray="3 2" />
        {/* Red Tuning Needle */}
        <line
          x1={isTuning ? "115" : "106"}
          y1="28"
          x2={isTuning ? "115" : "106"}
          y2="50"
          stroke="#ef4444"
          strokeWidth="2"
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Valve Radio Red Power Tube Indicator Light */}
        <circle cx="124" cy="22" r="3.5" className="radio-indicator-glow" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />

        {/* Knobs Area */}
        <circle cx="96" cy="67" r="8" fill="#8c6a3b" stroke="#3d2a13" strokeWidth="2" />
        <circle cx="96" cy="67" r="3" fill="#1a1107" />
        <circle cx="120" cy="67" r="8" fill="#8c6a3b" stroke="#3d2a13" strokeWidth="2" />
        <circle cx="120" cy="67" r="3" fill="#1a1107" />

        {/* Radio Brand Badge */}
        <rect x="35" y="73" width="30" height="6" rx="1" fill="#b88947" />
        <text x="50" y="78" fill="#1f140a" fontSize="4.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          VINTAGE
        </text>
      </svg>
    </div>
  );
}
