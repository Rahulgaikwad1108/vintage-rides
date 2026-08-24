import React from 'react';
import { Radio as RadioIcon, Music, AlertCircle } from 'lucide-react';

export default function MusicStatus({
  playerState = 'stopped',
  currentTrackTitle = 'Track 01',
  currentTrackIndex = 0,
  totalTracks = 14,
  onOpenRadio
}) {
  const getStatusText = () => {
    switch (playerState) {
      case 'playing':
        return { dot: '●', text: 'NOW PLAYING', color: '#22c55e' };
      case 'paused':
        return { dot: '○', text: 'RADIO PAUSED', color: '#f59e0b' };
      case 'loading':
        return { dot: '◌', text: 'TUNING...', color: '#fbbf24' };
      case 'error':
        return { dot: '⚠️', text: 'SIGNAL LOST', color: '#ef4444' };
      case 'stopped':
      default:
        return { dot: '○', text: 'RADIO STANDBY', color: '#8c7d6b' };
    }
  };

  const status = getStatusText();
  const formattedIndex = `${currentTrackIndex + 1 < 10 ? '0' + (currentTrackIndex + 1) : currentTrackIndex + 1} / ${totalTracks}`;

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`Mini Radio Status Indicator - ${status.text} ${currentTrackTitle}`}
      onClick={(e) => {
        e.stopPropagation();
        if (onOpenRadio) onOpenRadio();
      }}
      className="interactive-hover"
      style={{
        backgroundColor: 'rgba(18, 14, 10, 0.92)',
        border: `1px solid ${playerState === 'playing' ? '#f59e0b' : '#3d3226'}`,
        borderRadius: '12px',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#f5eedc',
        boxShadow: playerState === 'playing' ? '0 0 15px rgba(245, 158, 11, 0.25)' : '0 4px 12px rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        userSelect: 'none',
        maxWidth: '260px'
      }}
      title="Click to open full Radio Deck"
    >
      <RadioIcon size={18} style={{ color: status.color, filter: playerState === 'playing' ? 'drop-shadow(0 0 4px #22c55e)' : 'none' }} />
      
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace', color: status.color, fontWeight: 700 }}>
            {status.dot} FM 98.3
          </span>
          <span style={{ fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace', color: '#a39580' }}>
            {formattedIndex}
          </span>
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            fontFamily: 'Cinzel, serif',
            fontWeight: 700,
            color: '#f5eedc',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {playerState === 'playing' ? currentTrackTitle : status.text}
        </div>
      </div>
    </div>
  );
}
