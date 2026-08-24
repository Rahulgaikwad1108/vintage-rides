import React, { useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Volume2,
  VolumeX,
  Radio as RadioIcon,
  X,
  AlertCircle,
  ListMusic
} from 'lucide-react';
import playlist from '../data/playlist';

export default function RadioPlayer({
  currentTrackIndex = 0,
  playerState = 'stopped',
  isShuffle = false,
  volume = 75,
  isMuted = false,
  onSelectTrack,
  onPlayPause,
  onNext,
  onPrevious,
  onToggleShuffle,
  onVolumeChange,
  onToggleMute,
  onClose
}) {
  const deckRef = useRef(null);
  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Formatted track number (e.g. "01 / 14")
  const formattedTrackNumber = (index) => {
    const num = index + 1;
    return `${num < 10 ? '0' + num : num} / ${playlist.length}`;
  };

  const getStatusBadge = () => {
    switch (playerState) {
      case 'playing':
        return { text: '● PLAYING', color: '#22c55e' };
      case 'paused':
        return { text: 'Ⅱ PAUSED', color: '#f59e0b' };
      case 'loading':
        return { text: 'TUNING...', color: '#fbbf24' };
      case 'error':
        return { text: 'SIGNAL LOST', color: '#ef4444' };
      case 'stopped':
      default:
        return { text: 'STANDBY', color: '#a39580' };
    }
  };

  const status = getStatusBadge();

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 4, 3, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeIn 0.2s ease'
      }}
    >
      {/* Expandable Retro Deck Box */}
      <div
        ref={deckRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#2b1b10',
          border: '3px solid #140b05',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.95), 0 0 25px rgba(217, 119, 6, 0.3)',
          position: 'relative',
          color: '#f5eedc',
          backgroundImage: 'linear-gradient(145deg, #382315 0%, #1a0f07 100%)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        className="modal-scroll"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Radio Controls Panel"
          className="interactive-hover"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#190e06',
            border: '1px solid #52371e',
            color: '#a39580',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>

        {/* Radio Header Brand & Power Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <RadioIcon size={22} style={{ color: '#f59e0b' }} />
            <div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2rem', fontWeight: 900, color: '#f5eedc', lineHeight: 1 }}>
                VINTAGE RADIO DECK
              </h3>
              <span style={{ fontSize: '0.65rem', color: '#b88947', fontFamily: 'JetBrains Mono, monospace' }}>
                Background Player Controls
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: status.color,
                boxShadow: `0 0 8px ${status.color}`
              }}
            />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: status.color, fontWeight: 700 }}>
              {status.text}
            </span>
          </div>
        </div>

        {/* Display Banner Screen */}
        <div
          style={{
            backgroundColor: '#120b06',
            border: '2px solid #b88947',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '1rem',
            boxShadow: 'inset 0 0 12px rgba(0,0,0,0.9)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.65rem', color: '#8c6a3b', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
              NOW PLAYING
            </span>
            <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
              {formattedTrackNumber(currentTrackIndex)}
            </span>
          </div>

          <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'Cinzel, serif', color: '#f5eedc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '2px' }}>
            {currentTrack.title}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#d97706', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {currentTrack.artist}
          </div>
        </div>

        {/* Compact Scrollable 14-Track Playlist Panel */}
        <div
          style={{
            backgroundColor: '#160e08',
            border: '1px solid #4a341e',
            borderRadius: '10px',
            padding: '0.75rem',
            marginBottom: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', color: '#b88947' }}>
            <ListMusic size={14} />
            <span style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
              VINTAGE CLASSICS PLAYLIST (14 TRACKS)
            </span>
          </div>

          <div
            className="modal-scroll"
            style={{
              maxHeight: '160px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              paddingRight: '4px'
            }}
          >
            {playlist.map((track, idx) => {
              const isSelected = idx === currentTrackIndex;
              return (
                <div
                  key={track.id}
                  onClick={() => onSelectTrack(idx)}
                  className="interactive-hover"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    backgroundColor: isSelected ? 'rgba(217, 119, 6, 0.25)' : '#1f150d',
                    border: `1px solid ${isSelected ? '#d97706' : '#332314'}`,
                    cursor: 'pointer',
                    color: isSelected ? '#fbbf24' : '#a39580',
                    fontSize: '0.75rem',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', marginRight: '8px' }}>
                    <span style={{ color: isSelected ? '#ef4444' : '#6b7280', flexShrink: 0 }}>
                      {isSelected ? '●' : ' '}
                    </span>
                    <span style={{ fontWeight: isSelected ? 700 : 500, color: isSelected ? '#f5eedc' : '#d1c7b7', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {track.title} <span style={{ color: isSelected ? '#f59e0b' : '#6b5a47', fontWeight: 400 }}>— {track.artist}</span>
                    </span>
                  </div>
                  <span style={{ fontSize: '0.65rem', color: isSelected ? '#f59e0b' : '#6b5a47', flexShrink: 0 }}>
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls & Volume Slider */}
        <div
          style={{
            backgroundColor: '#170d07',
            border: '1px solid #472d17',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          {/* Track Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={onToggleShuffle}
              aria-label="Toggle Shuffle"
              className="interactive-hover"
              style={{
                backgroundColor: isShuffle ? 'rgba(245, 158, 11, 0.25)' : '#2b1a0d',
                border: `1px solid ${isShuffle ? '#f59e0b' : '#472d17'}`,
                color: isShuffle ? '#fbbf24' : '#a39580',
                padding: '7px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
              title={isShuffle ? 'Shuffle ON' : 'Shuffle OFF'}
            >
              <Shuffle size={16} />
            </button>

            <button
              onClick={onPrevious}
              aria-label="Previous Track"
              className="interactive-hover"
              style={{
                backgroundColor: '#2b1a0d',
                border: '1px solid #472d17',
                color: '#f5eedc',
                padding: '9px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
            >
              <SkipBack size={18} />
            </button>

            <button
              onClick={onPlayPause}
              aria-label={playerState === 'playing' ? 'Pause Radio Music' : 'Play Radio Music'}
              className="interactive-hover"
              style={{
                backgroundColor: '#d97706',
                border: 'none',
                color: '#0f0d0b',
                padding: '12px',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 0 16px rgba(217, 119, 6, 0.6)'
              }}
            >
              {playerState === 'playing' ? <Pause size={20} fill="#0f0d0b" /> : <Play size={20} fill="#0f0d0b" />}
            </button>

            <button
              onClick={onNext}
              aria-label="Next Track"
              className="interactive-hover"
              style={{
                backgroundColor: '#2b1a0d',
                border: '1px solid #472d17',
                color: '#f5eedc',
                padding: '9px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Volume Control Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={onToggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              style={{
                background: 'none',
                border: 'none',
                color: isMuted ? '#ef4444' : '#f59e0b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              style={{
                width: '90px',
                accentColor: '#d97706',
                cursor: 'pointer'
              }}
            />
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#a39580',
                width: '30px'
              }}
            >
              {isMuted ? '0%' : `${volume}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
