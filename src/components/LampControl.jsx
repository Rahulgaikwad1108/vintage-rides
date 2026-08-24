import React from 'react';
import { Zap, SunMedium } from 'lucide-react';

export default function LampControl({
  isLampOn = true,
  brightness = 3,
  onTogglePower,
  onBrightnessChange
}) {
  const brightnessLabels = ['OFF', '1 LOW', '2 MED', '3 HIGH'];
  const effectiveLevel = isLampOn ? brightness : 0;

  const handleKnobClick = (e) => {
    e.stopPropagation();
    const nextLevel = (brightness % 3) + 1; // Cycle 1 -> 2 -> 3 -> 1
    if (onBrightnessChange) {
      onBrightnessChange(nextLevel);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleKnobClick(e);
    }
  };

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`Vintage Lamp Wall Switch Control - Power ${isLampOn ? 'ON' : 'OFF'}, Brightness Level ${effectiveLevel}`}
      className="interactive-hover"
      onClick={(e) => e.stopPropagation()}
      style={{
        backgroundColor: '#261e16',
        border: '3px solid #4a3826',
        borderRadius: '10px',
        padding: '10px 14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 8px 20px rgba(0,0,0,0.8), inset 0 0 10px rgba(0,0,0,0.6)',
        width: '135px',
        userSelect: 'none'
      }}
      title="Vintage Lamp Wall Switch & Brightness Control"
    >
      {/* Box Header Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px', borderBottom: '1px solid #3d2d1e', width: '100%', justifyContent: 'center', paddingBottom: '4px' }}>
        <Zap size={13} style={{ color: isLampOn ? '#fbbf24' : '#8c7d6b' }} />
        <span style={{ fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: '#f5eedc', letterSpacing: '0.5px' }}>
          LAMP CONTROL
        </span>
      </div>

      {/* Rotary Brightness Knob */}
      <div
        tabIndex={0}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={3}
        aria-valuenow={effectiveLevel}
        aria-label={`Lamp Brightness Knob - Level ${effectiveLevel}`}
        onClick={handleKnobClick}
        onKeyDown={handleKeyDown}
        className="interactive-hover"
        style={{
          position: 'relative',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#19120b',
          border: '3px solid #b88339',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.9)',
          cursor: 'pointer',
          marginBottom: '8px'
        }}
      >
        {/* Brightness Marker Indicators */}
        {[1, 2, 3].map((lvl) => {
          const angles = [-60, 0, 60];
          const rad = (angles[lvl - 1] * Math.PI) / 180;
          const rx = 22 * Math.sin(rad);
          const ry = -22 * Math.cos(rad);
          const isActive = isLampOn && brightness >= lvl;
          return (
            <div
              key={lvl}
              style={{
                position: 'absolute',
                top: `calc(50% + ${ry}px - 3.5px)`,
                left: `calc(50% + ${rx}px - 3.5px)`,
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#fbbf24' : '#4a3826',
                boxShadow: isActive ? '0 0 6px #fbbf24' : 'none'
              }}
            />
          );
        })}

        {/* Inner Bakelite Knob Center Pointer */}
        <div
          className={`knob-rot-${effectiveLevel}`}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#38291a',
            border: '2px solid #523b24',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Yellow Pointer Line */}
          <div
            style={{
              position: 'absolute',
              top: '3px',
              width: '3px',
              height: '12px',
              backgroundColor: isLampOn ? '#fbbf24' : '#6b7280',
              borderRadius: '2px'
            }}
          />
        </div>
      </div>

      {/* Brightness Level Label */}
      <div style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: isLampOn ? '#fbbf24' : '#8c7d6b', marginBottom: '8px', fontWeight: 700 }}>
        BRIGHT: {brightnessLabels[effectiveLevel]}
      </div>

      {/* Power Toggle Switch Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onTogglePower();
        }}
        aria-label={isLampOn ? "Turn Lamp Power OFF" : "Turn Lamp Power ON"}
        className="interactive-hover"
        style={{
          width: '100%',
          backgroundColor: isLampOn ? '#d97706' : '#272018',
          border: `1px solid ${isLampOn ? '#f59e0b' : '#47392b'}`,
          borderRadius: '6px',
          padding: '4px 8px',
          color: isLampOn ? '#0f0d0b' : '#a39580',
          fontSize: '0.65rem',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          cursor: 'pointer',
          boxShadow: isLampOn ? '0 0 10px rgba(245, 158, 11, 0.4)' : 'none'
        }}
      >
        <SunMedium size={11} />
        <span>LAMP {isLampOn ? 'POWER ON' : 'POWER OFF'}</span>
      </button>
    </div>
  );
}
