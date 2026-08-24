import React from 'react';
import { Radio as RadioIcon, Volume2, Sparkles } from 'lucide-react';

export default function Radio({
  isRadioOn = false,
  playerState = 'stopped',
  currentTrackTitle = 'Track 01',
  activeFrequency = "98.3 FM",
  onToggleRadioPower,
  onOpenDeck
}) {
  const isPlaying = isRadioOn && playerState === 'playing';

  const handleClick = (e) => {
    e.stopPropagation();
    if (onToggleRadioPower) {
      onToggleRadioPower();
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
      aria-label={`Vintage Airwave Tabletop Radio - Power is ${isRadioOn ? 'ON' : 'OFF'}. Press Enter to toggle radio power.`}
      className="interactive-hover"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '8px',
        filter: isRadioOn ? 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.45))' : 'none',
        transition: 'filter 0.4s ease'
      }}
      title="Click physical radio to toggle Radio Power ON / OFF"
    >
      {/* Visual Indicator Badge */}
      <div
        style={{
          marginBottom: '6px',
          padding: '3px 10px',
          borderRadius: '12px',
          backgroundColor: isRadioOn ? 'rgba(25, 20, 15, 0.95)' : 'rgba(15, 12, 9, 0.85)',
          border: `1px solid ${isRadioOn ? '#22c55e' : '#6b7280'}`,
          color: isRadioOn ? '#86efac' : '#a39580',
          fontSize: '0.7rem',
          fontFamily: 'JetBrains Mono, monospace',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: isRadioOn ? '0 0 10px rgba(34, 197, 94, 0.4)' : '0 4px 12px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)'
        }}
      >
        <RadioIcon size={12} className={isPlaying ? 'rotating-fan' : ''} />
        <span>RADIO: {isRadioOn ? 'ON ●' : 'OFF ○'}</span>
        {isRadioOn && <Volume2 size={12} style={{ color: '#f59e0b' }} />}
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
        {/* Speaker Grill Animated Slots when Playing */}
        {[30, 38, 46, 54, 62, 70].map((yVal, i) => (
          <line
            key={i}
            x1="25"
            y1={yVal}
            x2="75"
            y2={yVal}
            stroke={isPlaying ? '#f59e0b' : '#8c6a3b'}
            strokeWidth={isPlaying && i % 2 === 0 ? "2.5" : "2"}
            strokeDasharray="4 2"
            style={{ transition: 'stroke 0.3s ease' }}
          />
        ))}

        {/* Right Side: Frequency Dial Glass */}
        <rect x="86" y="24" width="45" height="30" rx="2" fill="#140e08" stroke="#b88947" strokeWidth="1.5" />
        {/* Glowing Dial Background when Radio is ON */}
        <rect
          x="88"
          y="26"
          width="41"
          height="26"
          rx="1"
          className={isPlaying ? 'radio-dial-anim' : ''}
          fill={isRadioOn ? '#6b430e' : '#26190a'}
          opacity={isRadioOn ? '0.9' : '0.4'}
          style={{ transition: 'fill 0.4s ease, opacity 0.4s ease' }}
        />
        {/* Frequency Numbers */}
        <line x1="92" y1="34" x2="125" y2="34" stroke={isRadioOn ? '#fbbf24' : '#6b5a47'} strokeWidth="1" strokeDasharray="2 3" />
        <line x1="92" y1="42" x2="125" y2="42" stroke={isRadioOn ? '#d97706' : '#6b5a47'} strokeWidth="1" strokeDasharray="3 2" />
        
        {/* Red Tuning Needle */}
        <line
          x1="106"
          y1="28"
          x2="106"
          y2="50"
          stroke="#ef4444"
          strokeWidth="2"
        />

        {/* Radio Power Tube LED Indicator */}
        <circle
          cx="124"
          cy="22"
          r="4"
          className={isRadioOn ? 'radio-indicator-glow' : ''}
          fill={isRadioOn ? '#22c55e' : '#4b5563'}
          stroke={isRadioOn ? '#15803d' : '#1f2937'}
          strokeWidth="1.5"
          style={{ transition: 'fill 0.3s ease' }}
        />

        {/* Knobs Area (Clickable to open Radio Controls Deck) */}
        <g
          className="interactive-hover"
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenDeck) onOpenDeck();
          }}
          title="Click knob to open Radio Controls Panel"
        >
          <circle cx="96" cy="67" r="8" fill="#8c6a3b" stroke="#3d2a13" strokeWidth="2" />
          <circle cx="96" cy="67" r="3" fill="#1a1107" />
          <circle cx="120" cy="67" r="8" fill="#8c6a3b" stroke="#3d2a13" strokeWidth="2" />
          <circle cx="120" cy="67" r="3" fill="#1a1107" />
        </g>

        {/* Radio Brand Badge */}
        <rect x="35" y="73" width="30" height="6" rx="1" fill="#b88947" />
        <text x="50" y="78" fill="#1f140a" fontSize="4.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          VINTAGE
        </text>
      </svg>
    </div>
  );
}
