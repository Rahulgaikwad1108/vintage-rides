import React, { useState } from 'react';

export default function FanRegulator({
  fanSpeed = 2,
  isFanOn = true,
  onSpeedChange,
  onTogglePower
}) {
  const [tooltip, setTooltip] = useState(null);

  const speedLabels = ['OFF', '1 LOW', '2 MED', '3 HIGH', '4 MAX'];
  const displaySpeed = isFanOn ? fanSpeed : 0;

  const showTemporaryTooltip = (text) => {
    setTooltip(text);
    setTimeout(() => setTooltip(null), 1800);
  };

  const handleKnobClick = (e) => {
    e.stopPropagation();
    const nextSpeed = (fanSpeed + 1) % 5;
    if (onSpeedChange) {
      onSpeedChange(nextSpeed);
    }
    showTemporaryTooltip(`Fan Speed: ${speedLabels[nextSpeed]}`);
  };

  const handleToggleClick = (e) => {
    e.stopPropagation();
    if (onTogglePower) {
      onTogglePower();
    }
    showTemporaryTooltip(`Fan Power: ${!isFanOn ? 'ON' : 'OFF'}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleKnobClick(e);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px'
      }}
    >
      {/* Wall Electrical Bakelite Plate */}
      <div
        tabIndex={0}
        role="region"
        aria-label={`Wall Fan Regulator & Power Switch - Speed ${speedLabels[displaySpeed]}, Power ${isFanOn ? 'ON' : 'OFF'}`}
        className="interactive-hover"
        onClick={handleKnobClick}
        onMouseEnter={() => showTemporaryTooltip(`Fan Speed: ${speedLabels[displaySpeed]}`)}
        style={{
          backgroundColor: '#1c1611',
          border: '2px solid #3b2c1d',
          borderRadius: '6px',
          padding: '6px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.8), inset 0 0 4px rgba(0,0,0,0.7)',
          cursor: 'pointer',
          userSelect: 'none'
        }}
        title="Click knob to cycle fan speed (OFF → 1 → 2 → 3 → 4)"
      >
        {/* Tiny Rotary Regulator Knob Column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <span style={{ fontSize: '0.45rem', fontFamily: 'JetBrains Mono, monospace', color: '#8c7d6b', letterSpacing: '0.5px', fontWeight: 700 }}>
            FAN
          </span>

          <div
            tabIndex={0}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={4}
            aria-valuenow={displaySpeed}
            aria-label={`Rotary Regulator Knob - Level ${displaySpeed}`}
            onKeyDown={handleKeyDown}
            style={{
              position: 'relative',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#120d08',
              border: '2px solid #6e5233',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.9)'
            }}
          >
            {/* Center Pointer */}
            <div
              className={`knob-rot-${displaySpeed}`}
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: '#2e2114',
                border: '1px solid #4a3824',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Pointer Marker */}
              <div
                style={{
                  position: 'absolute',
                  top: '2px',
                  width: '2px',
                  height: '7px',
                  backgroundColor: isFanOn && displaySpeed > 0 ? '#fbbf24' : '#6b7280',
                  borderRadius: '1px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Small Physical Electrical Toggle Switch */}
        <div
          tabIndex={0}
          role="switch"
          aria-checked={isFanOn}
          aria-label={isFanOn ? "Turn Fan Power OFF" : "Turn Fan Power ON"}
          onClick={handleToggleClick}
          className="interactive-hover"
          style={{
            width: '18px',
            height: '32px',
            backgroundColor: '#120d08',
            border: '1px solid #3d2d1e',
            borderRadius: '4px',
            padding: '2px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isFanOn ? 'flex-start' : 'flex-end',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)'
          }}
          title={isFanOn ? 'Fan Power ON (Click to turn OFF)' : 'Fan Power OFF (Click to turn ON)'}
        >
          {/* Switch Toggle Knob */}
          <div
            style={{
              width: '12px',
              height: '14px',
              borderRadius: '2px',
              backgroundColor: isFanOn ? '#22c55e' : '#4b5563',
              border: `1px solid ${isFanOn ? '#15803d' : '#1f2937'}`,
              boxShadow: isFanOn ? '0 0 6px rgba(34, 197, 94, 0.6)' : 'none',
              transition: 'all 0.2s ease'
            }}
          />
        </div>
      </div>

      {/* Temporary Tooltip Overlay */}
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            top: '-28px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(217, 119, 6, 0.95)',
            color: '#0f0d0b',
            padding: '3px 8px',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '0.65rem',
            fontFamily: 'JetBrains Mono, monospace',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
            pointerEvents: 'none',
            animation: 'fadeIn 0.15s ease',
            zIndex: 30
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}
