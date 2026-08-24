import React, { useState, useEffect } from 'react';
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
import YouTubePlayer from './YouTubePlayer';

const TRACK_KEY = 'vintage_rides_last_track';
const VOL_KEY = 'vintage_rides_music_volume';
const SHUFFLE_KEY = 'vintage_rides_shuffle_state';

export default function RadioPlayer({ onClose }) {
  // Load saved preferences from localStorage
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    try {
      const saved = localStorage.getItem(TRACK_KEY);
      const parsed = parseInt(saved, 10);
      return !isNaN(parsed) && parsed >= 0 && parsed < playlist.length ? parsed : 0;
    } catch (e) {
      return 0;
    }
  });

  const [volume, setVolume] = useState(() => {
    try {
      const saved = localStorage.getItem(VOL_KEY);
      const parsed = parseInt(saved, 10);
      return !isNaN(parsed) && parsed >= 0 && parsed <= 100 ? parsed : 75;
    } catch (e) {
      return 75;
    }
  });

  const [isShuffle, setIsShuffle] = useState(() => {
    try {
      const saved = localStorage.getItem(SHUFFLE_KEY);
      return saved !== null ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });

  const [playerState, setPlayerState] = useState('stopped'); // 'stopped' | 'loading' | 'playing' | 'paused' | 'error'
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  // Save state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(TRACK_KEY, currentTrackIndex.toString());
    } catch (e) {}
  }, [currentTrackIndex]);

  useEffect(() => {
    try {
      localStorage.setItem(VOL_KEY, volume.toString());
    } catch (e) {}
  }, [volume]);

  useEffect(() => {
    try {
      localStorage.setItem(SHUFFLE_KEY, JSON.stringify(isShuffle));
    } catch (e) {}
  }, [isShuffle]);

  // Control Handlers
  const handleSelectTrack = (index) => {
    setErrorMessage(null);
    setCurrentTrackIndex(index);
    setPlayerState('loading');
  };

  const handlePlayPause = () => {
    setErrorMessage(null);
    if (playerState === 'playing') {
      setPlayerState('paused');
    } else {
      setPlayerState('loading');
    }
  };

  const handleNext = () => {
    setErrorMessage(null);
    setPlayerState('loading');
    if (isShuffle) {
      let randomIndex = Math.floor(Math.random() * playlist.length);
      if (randomIndex === currentTrackIndex && playlist.length > 1) {
        randomIndex = (currentTrackIndex + 1) % playlist.length;
      }
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    }
  };

  const handlePrevious = () => {
    setErrorMessage(null);
    setPlayerState('loading');
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleToggleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
    }
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // YouTube Event Callbacks
  const handleYouTubePlay = () => {
    setPlayerState('playing');
    setErrorMessage(null);
  };

  const handleYouTubePause = () => {
    setPlayerState('paused');
  };

  const handleYouTubeEnd = () => {
    handleNext();
  };

  const handleYouTubeError = () => {
    setPlayerState('error');
    setErrorMessage('PLAYBACK ERROR — Try another track');
  };

  // Formatting helper for 2-digit track numbers (e.g. "01 / 14")
  const formattedTrackNumber = (index) => {
    const num = index + 1;
    return `${num < 10 ? '0' + num : num} / ${playlist.length}`;
  };

  // Status Badge Info
  const getStatusBadge = () => {
    switch (playerState) {
      case 'playing':
        return { text: '● PLAYING', color: '#22c55e' };
      case 'paused':
        return { text: 'Ⅱ PAUSED', color: '#f59e0b' };
      case 'loading':
        return { text: 'LOADING...', color: '#fbbf24' };
      case 'error':
        return { text: 'PLAYBACK ERROR', color: '#ef4444' };
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
        backgroundColor: 'rgba(5, 4, 3, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      {/* Tabletop Retro Radio Container Chassis */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '720px',
          backgroundColor: '#2e1c10',
          border: '4px solid #140b05',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 30px 60px rgba(0,0,0,0.95), 0 0 30px rgba(217, 119, 6, 0.3)',
          position: 'relative',
          color: '#f5eedc',
          backgroundImage: 'linear-gradient(145deg, #3d2616 0%, #1e1108 100%)',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
        className="modal-scroll"
      >
        {/* Top Handle Accent */}
        <div
          style={{
            position: 'absolute',
            top: '-18px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '180px',
            height: '14px',
            backgroundColor: '#8c6a3b',
            border: '2px solid #3b2817',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.8)'
          }}
        />

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close Radio Player"
            className="interactive-hover"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: '#190e06',
              border: '1px solid #52371e',
              color: '#a39580',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        )}

        {/* Radio Header Brand & Power Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <RadioIcon size={26} style={{ color: '#f59e0b' }} />
            <div>
              <h2
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  color: '#f5eedc',
                  letterSpacing: '1px',
                  lineHeight: 1
                }}
              >
                VINTAGE RADIO
              </h2>
              <span style={{ fontSize: '0.7rem', color: '#b88947', fontFamily: 'JetBrains Mono, monospace' }}>
                14-Track Retro Playlist System
              </span>
            </div>
          </div>

          {/* Power LED & Status Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: status.color,
                boxShadow: `0 0 8px ${status.color}`
              }}
            />
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                color: status.color,
                fontWeight: 700
              }}
            >
              {status.text}
            </span>
          </div>
        </div>

        {/* Middle Section: Display & Embedded YouTube Player */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
          
          {/* Glowing Analog Frequency & Now Playing Display */}
          <div
            style={{
              backgroundColor: '#120b06',
              border: '2px solid #b88947',
              borderRadius: '12px',
              padding: '1.2rem',
              position: 'relative',
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9)',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}
          >
            {/* Dial Backlight */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: playerState === 'playing' ? 'rgba(245, 158, 11, 0.18)' : 'rgba(180, 83, 9, 0.08)',
                borderRadius: '10px',
                pointerEvents: 'none',
                transition: 'all 0.4s ease'
              }}
            />

            {/* Now Playing Header & Track Counter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.7rem', color: '#8c6a3b', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
                NOW PLAYING
              </span>
              <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>
                {formattedTrackNumber(currentTrackIndex)}
              </span>
            </div>

            {/* Track Title */}
            <div style={{ margin: '8px 0' }}>
              <div
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 900,
                  fontFamily: 'Cinzel, serif',
                  color: '#f5eedc',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {currentTrack.title}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#d97706', fontFamily: 'sans-serif' }}>
                {currentTrack.artist}
              </div>
            </div>

            {/* Error Notice */}
            {errorMessage && (
              <div
                style={{
                  color: '#ef4444',
                  fontSize: '0.75rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  margin: '4px 0'
                }}
              >
                <AlertCircle size={12} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Tuning Needle */}
            <div
              style={{
                height: '4px',
                backgroundColor: '#3b2310',
                borderRadius: '2px',
                position: 'relative',
                marginTop: '10px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-6px',
                  left: `${((currentTrackIndex + 1) / playlist.length) * 85}%`,
                  width: '4px',
                  height: '16px',
                  backgroundColor: '#ef4444',
                  boxShadow: '0 0 6px #ef4444',
                  transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              />
            </div>
          </div>

          {/* Supported Embedded YouTube Player Window */}
          <div>
            <YouTubePlayer
              youtubeId={currentTrack.youtubeId}
              isPlaying={playerState === 'playing' || playerState === 'loading'}
              volume={volume}
              isMuted={isMuted}
              onPlay={handleYouTubePlay}
              onPause={handleYouTubePause}
              onEnd={handleYouTubeEnd}
              onError={handleYouTubeError}
            />
          </div>
        </div>

        {/* Compact Scrollable Playlist Panel */}
        <div
          style={{
            backgroundColor: '#160e08',
            border: '1px solid #4a341e',
            borderRadius: '12px',
            padding: '0.85rem 1rem',
            marginBottom: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#b88947' }}>
            <ListMusic size={16} />
            <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, letterSpacing: '0.5px' }}>
              VINTAGE RIDES PLAYLIST (14 TRACKS)
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
              paddingRight: '6px'
            }}
          >
            {playlist.map((track, idx) => {
              const isSelected = idx === currentTrackIndex;
              return (
                <div
                  key={track.id}
                  onClick={() => handleSelectTrack(idx)}
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
                    fontSize: '0.8rem',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: isSelected ? '#ef4444' : '#6b7280', width: '12px' }}>
                      {isSelected ? '●' : ' '}
                    </span>
                    <span style={{ fontWeight: isSelected ? 700 : 500, color: isSelected ? '#f5eedc' : '#d1c7b7' }}>
                      {track.title}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: isSelected ? '#f59e0b' : '#6b5a47' }}>
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Controls & Volume Slider */}
        <div
          style={{
            backgroundColor: '#170d07',
            border: '1px solid #472d17',
            borderRadius: '14px',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          {/* Track Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Shuffle Button */}
            <button
              onClick={handleToggleShuffle}
              aria-label="Toggle Shuffle Mode"
              className="interactive-hover"
              style={{
                backgroundColor: isShuffle ? 'rgba(245, 158, 11, 0.25)' : '#2b1a0d',
                border: `1px solid ${isShuffle ? '#f59e0b' : '#472d17'}`,
                color: isShuffle ? '#fbbf24' : '#a39580',
                padding: '8px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
              title={isShuffle ? 'Shuffle ON' : 'Shuffle OFF'}
            >
              <Shuffle size={18} />
            </button>

            {/* Previous Track */}
            <button
              onClick={handlePrevious}
              aria-label="Previous Song"
              className="interactive-hover"
              style={{
                backgroundColor: '#2b1a0d',
                border: '1px solid #472d17',
                color: '#f5eedc',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
              title="Previous Track"
            >
              <SkipBack size={20} />
            </button>

            {/* Main Play / Pause Button */}
            <button
              onClick={handlePlayPause}
              aria-label={playerState === 'playing' ? 'Pause Music' : 'Play Music'}
              className="interactive-hover"
              style={{
                backgroundColor: '#d97706',
                border: 'none',
                color: '#0f0d0b',
                padding: '14px',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(217, 119, 6, 0.6)'
              }}
              title={playerState === 'playing' ? 'Pause' : 'Play'}
            >
              {playerState === 'playing' ? <Pause size={24} fill="#0f0d0b" /> : <Play size={24} fill="#0f0d0b" />}
            </button>

            {/* Next Track */}
            <button
              onClick={handleNext}
              aria-label="Next Song"
              className="interactive-hover"
              style={{
                backgroundColor: '#2b1a0d',
                border: '1px solid #472d17',
                color: '#f5eedc',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
              title="Next Track"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Volume Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handleToggleMute}
              aria-label={isMuted ? 'Unmute Volume' : 'Mute Volume'}
              style={{
                background: 'none',
                border: 'none',
                color: isMuted ? '#ef4444' : '#f59e0b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              style={{
                width: '110px',
                accentColor: '#d97706',
                cursor: 'pointer'
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#a39580',
                width: '32px'
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
