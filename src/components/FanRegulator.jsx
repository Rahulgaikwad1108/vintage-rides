import React from 'react';
import { Wind, Power } from 'lucide-react';

export default function FanRegulator({
  fanSpeed = 2,
  isFanOn = true,
  onSpeedChange,
  onTogglePower
}) {
  // Speed labels: 0=OFF, 1=LOW, 2=MEDIUM, 3=HIGH, 4=MAX
  const speedLabels = ['OFF', '1', '2', '3', '4'];
  const displaySpeed = isFanOn ? fanSpeed : 0;

  const handleKnobClick = (e) => {
    e.stopPropagation();
    // Cycle through speeds 0 -> 1 -> 2 -> 3 -> 4 -> 0
    const nextSpeed = (fanSpeed + 1) % 5;
    if (onSpeedChange) {
      onSpeedChange(nextSpeed);
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
      aria-label={`Indian Electrical Fan Regulator - Current speed ${displaySpeed}, Power ${isFanOn ? 'ON' : 'OFF'}`}
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
      title="Indian Electrical Fan Speed Regulator"
    >
      {/* Box Header Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px', borderBottom: '1px solid #3d2d1e', width: '100%', justifyContent: 'center', paddingBottom: '4px' }}>
        <Wind size={13} style={{ color: isFanOn && displaySpeed > 0 ? '#f59e0b' : '#8c7d6b' }} />
        <span style={{ fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: '#f5eedc', letterSpacing: '0.5px' }}>
          REGULATOR
        </span>
      </div>

      {/* Rotary Knob Component */}
      <div
        tabIndex={0}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={displaySpeed}
        aria-label={`Rotary Fan Knob - Speed ${displaySpeed}`}
        onClick={handleKnobClick}
        onKeyDown={handleKeyDown}
        className="interactive-hover"
        style={{
          position: 'relative',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#19120b',
          border: '3px solid #8c6a3b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.1)',
          cursor: 'pointer',
          marginBottom: '8px'
        }}
      >
        {/* Outer Speed Marker Dots */}
        {[0, 1, 2, 3, 4].map((spd) => {
          const angles = [-135, -67.5, 0, 67.5, 135];
          const rad = (angles[spd] * Math.PI) / 180;
          const rx = 24 * Math.sin(rad);
          const ry = -24 * Math.cos(rad);
          const isActive = displaySpeed === spd;
          return (
            <div
              key={spd}
              style={{
                position: 'absolute',
                top: `calc(50% + ${ry}px - 4px)`,
                left: `calc(50% + ${rx}px - 4px)`,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#f59e0b' : '#4a3826',
                boxShadow: isActive ? '0 0 6px #f59e0b' : 'none'
              }}
            />
          );
        })}

        {/* Inner Bakelite Knob Center Pointer */}
        <div
          className={`knob-rot-${displaySpeed}`}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#38291a',
            border: '2px solid #523b24',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* White Pointer Line */}
          <div
            style={{
              position: 'absolute',
              top: '4px',
              width: '3px',
              height: '14px',
              backgroundColor: isFanOn && displaySpeed > 0 ? '#fbbf24' : '#9ca3af',
              borderRadius: '2px'
            }}
          />
        </div>
      </div>

      {/* Speed Display Readout */}
      <div style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: isFanOn && displaySpeed > 0 ? '#fbbf24' : '#8c7d6b', marginBottom: '8px', fontWeight: 700 }}>
        SPEED: {speedLabels[displaySpeed]}
      </div>

      {/* Dedicated Physical ON/OFF Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onTogglePower();
        }}
        aria-label={isFanOn ? "Turn Fan Power OFF" : "Turn Fan Power ON"}
        className="interactive-hover"
        style={{
          width: '100%',
          backgroundColor: isFanOn ? '#991b1b' : '#166534',
          border: `1px solid ${isFanOn ? '#ef4444' : '#22c55e'}`,
          borderRadius: '6px',
          padding: '4px 8px',
          color: '#fff',
          fontSize: '0.65rem',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          cursor: 'pointer',
          boxShadow: isFanOn ? '0 0 8px rgba(239, 68, 68, 0.4)' : '0 0 8px rgba(34, 197, 94, 0.4)'
        }}
      >
        <Power size={11} />
        <span>FAN {isFanOn ? 'POWER ON' : 'POWER OFF'}</span>
      </button>
    </div>
  );
}
