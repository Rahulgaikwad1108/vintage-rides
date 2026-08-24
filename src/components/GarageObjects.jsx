import React from 'react';
import { Sun, Moon, CloudRain, Hammer, Wrench, Shield, FileText, Package, Wind } from 'lucide-react';

export default function GarageObjects({
  isDaytime,
  isRainMode,
  isFanSpinning = true,
  onToggleFan,
  onToggleWindow,
  onInspectPosters,
  onInspectTools,
  onInspectWorkbench
}) {
  const handleKeyClick = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  };

  return (
    <>
      {/* 1. Interactive Ceiling Fan (Top Center Background) */}
      <div
        tabIndex={0}
        role="button"
        aria-label={isFanSpinning ? "Ceiling Fan Spinning - Press Enter to toggle fan off" : "Ceiling Fan Stopped - Press Enter to toggle fan on"}
        className="interactive-hover"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFan();
        }}
        onKeyDown={(e) => handleKeyClick(e, onToggleFan)}
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 6,
          cursor: 'pointer',
          opacity: 0.9,
          padding: '8px',
          borderRadius: '50%'
        }}
        title="Click or press Enter to toggle ceiling fan speed"
      >
        <svg width="260" height="70" viewBox="0 0 260 70" fill="none" stroke="none">
          <g className={`rotating-fan ${isFanSpinning ? '' : 'fan-paused'}`}>
            {/* Center Motor Hub */}
            <circle cx="130" cy="35" r="18" fill="#3b2b1b" stroke="#8c6a3b" strokeWidth="3" />
            <circle cx="130" cy="35" r="8" fill="#140e08" />
            {/* 3 Blades */}
            <path d="M 130 35 L 250 25 C 260 35, 250 45, 240 45 Z" fill="#4d3722" stroke="#261b0f" strokeWidth="2" />
            <path d="M 130 35 L 20 15 C 10 25, 15 35, 25 38 Z" fill="#4d3722" stroke="#261b0f" strokeWidth="2" />
            <path d="M 130 35 L 135 65 C 125 70, 115 65, 120 55 Z" fill="#4d3722" stroke="#261b0f" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* 2. Slatted Garage Window (Top Left Wall) with Rain Effects */}
      <div
        tabIndex={0}
        role="button"
        aria-label="Garage Window - Press Enter or Space to toggle Rain Mode"
        className="interactive-hover"
        onClick={(e) => {
          e.stopPropagation();
          onToggleWindow();
        }}
        onKeyDown={(e) => handleKeyClick(e, onToggleWindow)}
        style={{
          position: 'absolute',
          top: '6%',
          left: '5%',
          width: '180px',
          height: '140px',
          zIndex: 6,
          cursor: 'pointer',
          borderRadius: '8px',
          border: '4px solid #3b2c1d',
          backgroundColor: isRainMode ? '#0f172a' : isDaytime ? '#7dd3fc' : '#1e1b4b',
          boxShadow: isRainMode
            ? '0 0 25px rgba(56, 189, 248, 0.4)'
            : isDaytime
            ? '0 0 30px rgba(125, 211, 252, 0.4)'
            : '0 0 20px rgba(30, 27, 75, 0.6)',
          overflow: 'hidden',
          transition: 'all 0.5s ease'
        }}
        title="Click window to toggle Rain Mode & outdoor atmosphere"
      >
        {/* Slatted Glass Panes & Rain Streaks */}
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Sky Gradient Overlay */}
          <div
            className="window-ray-anim"
            style={{
              position: 'absolute',
              inset: 0,
              background: isRainMode
                ? 'linear-gradient(180deg, #020617 0%, #0f172a 60%, #1e293b 100%)'
                : isDaytime
                ? 'linear-gradient(180deg, #38bdf8 0%, #bae6fd 60%, #fde68a 100%)'
                : 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)'
            }}
          />

          {/* Animated Water Droplets on Window Glass when Rain Mode is ON */}
          {isRainMode && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {[15, 45, 80, 115, 145].map((xPos, idx) => (
                <div
                  key={idx}
                  className="rain-streak"
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    left: `${xPos}px`,
                    width: '2px',
                    height: '28px',
                    backgroundColor: '#bae6fd',
                    borderRadius: '2px',
                    boxShadow: '0 0 4px #7dd3fc',
                    animationDelay: `${idx * 0.35}s`
                  }}
                />
              ))}
            </div>
          )}

          {/* Window Slats Frame */}
          <svg width="100%" height="100%" viewBox="0 0 180 140" fill="none">
            <rect x="87" y="0" width="6" height="140" fill="#2d2013" />
            <rect x="0" y="67" width="180" height="6" fill="#2d2013" />
            {/* Celestial Body / Rain Cloud */}
            {isRainMode ? (
              <circle cx="90" cy="35" r="22" fill="#334155" opacity="0.8" style={{ filter: 'drop-shadow(0 0 10px #020617)' }} />
            ) : isDaytime ? (
              <circle cx="50" cy="40" r="16" fill="#fef08a" style={{ filter: 'drop-shadow(0 0 10px #fde047)' }} />
            ) : (
              <circle cx="130" cy="35" r="14" fill="#e2e8f0" style={{ filter: 'drop-shadow(0 0 8px #94a3b8)' }} />
            )}
          </svg>

          {/* Badge Label */}
          <div
            style={{
              position: 'absolute',
              bottom: '6px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(15, 12, 9, 0.85)',
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '0.65rem',
              color: isRainMode ? '#38bdf8' : isDaytime ? '#fde047' : '#818cf8',
              fontFamily: 'JetBrains Mono, monospace',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {isRainMode ? <CloudRain size={10} /> : isDaytime ? <Sun size={10} /> : <Moon size={10} />}
            <span>{isRainMode ? 'Rain Outside' : isDaytime ? 'Daylight' : 'Dusk Ambient'}</span>
          </div>
        </div>
      </div>

      {/* 3. Retro Indian Wall Posters (Top Right Wall) */}
      <div
        tabIndex={0}
        role="button"
        aria-label="Vintage Motorcycle Wall Posters - Press Enter to inspect memorabilia"
        className="interactive-hover"
        onClick={(e) => {
          e.stopPropagation();
          onInspectPosters();
        }}
        onKeyDown={(e) => handleKeyClick(e, onInspectPosters)}
        style={{
          position: 'absolute',
          top: '7%',
          right: '6%',
          display: 'flex',
          gap: '12px',
          zIndex: 6,
          cursor: 'pointer',
          padding: '4px',
          borderRadius: '6px'
        }}
        title="Click to view nostalgic vintage motorcycle posters"
      >
        {/* Poster 1: Grand Prix Rally */}
        <div
          style={{
            width: '100px',
            height: '140px',
            backgroundColor: '#f5ebd6',
            border: '2px solid #8c6a3b',
            borderRadius: '4px',
            padding: '6px',
            boxShadow: '0 6px 16px rgba(0,0,0,0.6)',
            transform: 'rotate(-2deg)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            color: '#3b2310'
          }}
        >
          <div style={{ borderBottom: '1px solid #b88947', paddingBottom: '3px', textAlign: 'center' }}>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', fontWeight: 900, color: '#8b1e10' }}>
              INDIAN RALLY
            </span>
          </div>
          <div style={{ textAlign: 'center', margin: '4px 0' }}>
            <FileText size={28} style={{ color: '#b45309', margin: '0 auto' }} />
            <div style={{ fontSize: '0.55rem', fontWeight: 'bold', fontFamily: 'sans-serif' }}>1968 CHAMPIONSHIP</div>
          </div>
          <div style={{ backgroundColor: '#3b2310', color: '#f5ebd6', fontSize: '0.5rem', textAlign: 'center', padding: '2px 0' }}>
            BOMBAY TO GOA
          </div>
        </div>

        {/* Poster 2: Maintenance Blueprint */}
        <div
          style={{
            width: '90px',
            height: '130px',
            backgroundColor: '#1e293b',
            border: '2px solid #64748b',
            borderRadius: '4px',
            padding: '6px',
            boxShadow: '0 6px 16px rgba(0,0,0,0.6)',
            transform: 'rotate(3deg)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            color: '#94a3b8'
          }}
        >
          <div style={{ textAlign: 'center', fontSize: '0.55rem', fontWeight: 'bold', color: '#38bdf8' }}>
            SPEC BLUEPRINT
          </div>
          <Shield size={24} style={{ color: '#38bdf8', margin: '0 auto' }} />
          <div style={{ fontSize: '0.45rem', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace' }}>
            350cc SINGLE CYLINDER
          </div>
        </div>
      </div>

      {/* 4. Pegboard & Hanging Toolset (Mid Left Wall) */}
      <div
        tabIndex={0}
        role="button"
        aria-label="Workshop Tools Pegboard - Press Enter to inspect tools"
        className="interactive-hover"
        onClick={(e) => {
          e.stopPropagation();
          onInspectTools();
        }}
        onKeyDown={(e) => handleKeyClick(e, onInspectTools)}
        style={{
          position: 'absolute',
          top: '32%',
          left: '4%',
          width: '160px',
          height: '180px',
          backgroundColor: '#271f18',
          border: '3px solid #4a3c2c',
          borderRadius: '6px',
          padding: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          zIndex: 6,
          cursor: 'pointer'
        }}
        title="Click to inspect workshop toolset"
      >
        {/* Pegboard Holes Pattern */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'radial-gradient(#140f0b 20%, transparent 20%)',
            backgroundSize: '12px 12px',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-around',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', gap: '15px' }}>
            <Wrench size={24} style={{ color: '#d1d5db', transform: 'rotate(-45deg)', filter: 'drop-shadow(0 2px 4px black)' }} />
            <Hammer size={24} style={{ color: '#f59e0b', transform: 'rotate(15deg)', filter: 'drop-shadow(0 2px 4px black)' }} />
          </div>
          <div style={{ display: 'flex', gap: '12px', color: '#9ca3af' }}>
            <div style={{ width: '6px', height: '40px', backgroundColor: '#d97706', borderRadius: '2px' }} />
            <div style={{ width: '8px', height: '45px', backgroundColor: '#9ca3af', borderRadius: '2px' }} />
            <div style={{ width: '6px', height: '35px', backgroundColor: '#ef4444', borderRadius: '2px' }} />
          </div>
          <div style={{ fontSize: '0.65rem', color: '#fbbf24', fontFamily: 'JetBrains Mono, monospace' }}>
            TOOLKIT #04
          </div>
        </div>
      </div>

      {/* 5. Storage Shelves (Mid Right Wall) */}
      <div
        style={{
          position: 'absolute',
          top: '32%',
          right: '4%',
          width: '160px',
          height: '170px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          zIndex: 6
        }}
      >
        {/* Top Shelf */}
        <div style={{ borderBottom: '6px solid #4a3c2c', paddingBottom: '4px', display: 'flex', gap: '8px', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ width: '28px', height: '36px', backgroundColor: '#dc2626', border: '1px solid #7f1d1d', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={14} style={{ color: '#fef08a' }} />
          </div>
          <div style={{ width: '32px', height: '42px', backgroundColor: '#d97706', border: '1px solid #78350f', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.45rem', fontWeight: 'bold', color: '#fff' }}>OIL</span>
          </div>
        </div>
        {/* Bottom Shelf */}
        <div style={{ borderBottom: '6px solid #4a3c2c', paddingBottom: '4px', display: 'flex', gap: '6px', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ width: '45px', height: '24px', backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '2px', color: '#f59e0b', fontSize: '0.45rem', textAlign: 'center', lineHeight: '24px' }}>
            SPARK PLUG
          </div>
          <div style={{ width: '22px', height: '30px', backgroundColor: '#15803d', border: '1px solid #14532d', borderRadius: '2px' }} />
        </div>
      </div>

      {/* 6. Heavy Wooden Workbench (Bottom Left/Center Floor) */}
      <div
        tabIndex={0}
        role="button"
        aria-label="Wooden Workbench - Press Enter to inspect engine craftstation"
        className="interactive-hover"
        onClick={(e) => {
          e.stopPropagation();
          onInspectWorkbench();
        }}
        onKeyDown={(e) => handleKeyClick(e, onInspectWorkbench)}
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '6%',
          width: '320px',
          height: '110px',
          zIndex: 8,
          cursor: 'pointer'
        }}
        title="Click to inspect workshop bench"
      >
        <svg width="320" height="110" viewBox="0 0 320 110" fill="none">
          {/* Top Surface */}
          <path d="M 0 20 L 320 20 L 300 45 L 0 45 Z" fill="#523821" stroke="#261b0f" strokeWidth="2" />
          <path d="M 0 20 L 320 20" stroke="#805934" strokeWidth="3" />
          {/* Bench Front Face */}
          <rect x="0" y="45" width="300" height="60" fill="#3b2817" stroke="#1f140a" strokeWidth="3" />
          {/* Leg Support Columns */}
          <rect x="15" y="45" width="25" height="65" fill="#24180d" />
          <rect x="260" y="45" width="25" height="65" fill="#24180d" />
          {/* Vice Clamp Mounted on Edge */}
          <rect x="10" y="5" width="35" height="20" rx="3" fill="#4b5563" stroke="#1f2937" strokeWidth="2" />
          <circle cx="27" cy="15" r="5" fill="#9ca3af" />
        </svg>
      </div>
    </>
  );
}
