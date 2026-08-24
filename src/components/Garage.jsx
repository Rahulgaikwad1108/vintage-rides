import React, { useState, useEffect } from 'react';
import EnvironmentEffects from './EnvironmentEffects';
import Lighting from './Lighting';
import GarageObjects from './GarageObjects';
import Motorcycle from './Motorcycle';
import Radio from './Radio';
import RadioPlayer from './RadioPlayer';
import YouTubePlayer from './YouTubePlayer';
import InspectModal from './InspectModal';
import AmbientSoundModal from './AmbientSoundModal';
import playlist from '../data/playlist';
import { Zap, Sun, Moon, Sparkles, Radio as RadioIcon, CloudRain, Sliders, Music, Info } from 'lucide-react';
import { ambientAudio } from '../utils/ambientAudio';

export default function Garage() {
  // Load saved 12-state preferences from ambientAudio manager & localStorage
  const [isRadioOn, setIsRadioOn] = useState(ambientAudio.prefs.radioEnabled);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(ambientAudio.prefs.selectedTrack);
  const [musicVolume, setMusicVolume] = useState(ambientAudio.prefs.musicVolume);
  const [isShuffle, setIsShuffle] = useState(ambientAudio.prefs.shuffleEnabled);
  const [playerState, setPlayerState] = useState(ambientAudio.prefs.radioEnabled ? 'loading' : 'stopped');
  const [isMuted, setIsMuted] = useState(false);

  const [isFanOn, setIsFanOn] = useState(ambientAudio.prefs.fanEnabled);
  const [fanSpeed, setFanSpeed] = useState(ambientAudio.prefs.fanSpeed);

  const [isLampOn, setIsLampOn] = useState(ambientAudio.prefs.lampEnabled);
  const [lampBrightness, setLampBrightness] = useState(ambientAudio.prefs.lampBrightness);

  const [isRainMode, setIsRainMode] = useState(ambientAudio.prefs.rainEnabled);
  const [themeMode, setThemeMode] = useState(ambientAudio.prefs.dayNightMode || 'night');

  const [isRadioDeckOpen, setIsRadioDeckOpen] = useState(false);
  const [isAmbienceModalOpen, setIsAmbienceModalOpen] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [toastFeedback, setToastFeedback] = useState(null);

  const isDaytime = themeMode === 'day';
  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  // Initialize Ambient Audio & restored localStorage preferences on mount / user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      ambientAudio.startAll();
      window.removeEventListener('click', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      ambientAudio.stopAll();
    };
  }, []);

  // Helper trigger for click feedback toasts
  const triggerToast = (msg) => {
    setToastFeedback(msg);
    setTimeout(() => setToastFeedback(null), 2500);
  };

  // Radio Power Toggle Handler (Clicking Physical Radio in Garage)
  const handleToggleRadioPower = () => {
    setIsRadioOn((prev) => {
      const nextState = !prev;
      ambientAudio.updatePref('radioEnabled', nextState);
      if (nextState) {
        setPlayerState('loading');
        triggerToast('📻 Radio Activated — Background Music Playing');
      } else {
        setPlayerState('paused');
        triggerToast('Radio Powered OFF');
      }
      return nextState;
    });
  };

  // Fan Power & Speed Regulator Handlers
  const handleToggleFanPower = () => {
    setIsFanOn((prev) => {
      const nextState = !prev;
      ambientAudio.updatePref('fanEnabled', nextState);
      triggerToast(nextState ? `Fan Powered ON (Speed ${fanSpeed})` : 'Fan Powered OFF');
      return nextState;
    });
  };

  const handleFanSpeedChange = (newSpeed) => {
    setFanSpeed(newSpeed);
    if (newSpeed > 0 && !isFanOn) {
      setIsFanOn(true);
      ambientAudio.updatePref('fanEnabled', true);
    }
    ambientAudio.updatePref('fanSpeed', newSpeed);
    const speedNames = ['OFF', 'LOW (1)', 'MEDIUM (2)', 'HIGH (3)', 'MAX (4)'];
    triggerToast(`Fan Regulator Set to ${speedNames[newSpeed]}`);
  };

  // Lamp Power & Brightness Handlers
  const handleToggleLampPower = () => {
    setIsLampOn((prev) => {
      const nextState = !prev;
      ambientAudio.updatePref('lampEnabled', nextState);
      triggerToast(nextState ? `Lamp Powered ON (Level ${lampBrightness})` : 'Lamp Powered OFF');
      return nextState;
    });
  };

  const handleLampBrightnessChange = (newLevel) => {
    setLampBrightness(newLevel);
    if (!isLampOn) {
      setIsLampOn(true);
      ambientAudio.updatePref('lampEnabled', true);
    }
    ambientAudio.updatePref('lampBrightness', newLevel);
    const brightnessNames = ['OFF', 'LOW (1)', 'MEDIUM (2)', 'HIGH (3)'];
    triggerToast(`Lamp Brightness Set to ${brightnessNames[newLevel]}`);
  };

  // Rain Mode Toggle Handler
  const handleToggleRainMode = () => {
    setIsRainMode((prev) => {
      const nextState = !prev;
      ambientAudio.toggleChannel('rain', nextState);
      ambientAudio.updatePref('rainEnabled', nextState);
      triggerToast(nextState ? '🌧️ Rain Mode Active — Window Rain Streaks Outside' : 'Rain Mode Disabled — Clear Window Glass');
      return nextState;
    });
  };

  // Day/Night Theme Toggle Handler
  const handleToggleTheme = () => {
    const nextTheme = themeMode === 'day' ? 'night' : 'day';
    setThemeMode(nextTheme);
    ambientAudio.updatePref('dayNightMode', nextTheme);
    triggerToast(nextTheme === 'day' ? '☀️ Warm Natural Daylight Active' : '🌙 Cozy Night Garage Atmosphere Active');
  };

  // Radio Track Handlers
  const handleSelectTrack = (index) => {
    setCurrentTrackIndex(index);
    ambientAudio.updatePref('selectedTrack', index);
    setIsRadioOn(true);
    ambientAudio.updatePref('radioEnabled', true);
    setPlayerState('loading');
  };

  const handlePlayPause = () => {
    if (playerState === 'playing') {
      setPlayerState('paused');
    } else {
      setIsRadioOn(true);
      ambientAudio.updatePref('radioEnabled', true);
      setPlayerState('loading');
    }
  };

  const handleNextTrack = () => {
    setPlayerState('loading');
    if (isShuffle) {
      let randomIndex = Math.floor(Math.random() * playlist.length);
      if (randomIndex === currentTrackIndex && playlist.length > 1) {
        randomIndex = (currentTrackIndex + 1) % playlist.length;
      }
      setCurrentTrackIndex(randomIndex);
      ambientAudio.updatePref('selectedTrack', randomIndex);
    } else {
      const nextIdx = (currentTrackIndex + 1) % playlist.length;
      setCurrentTrackIndex(nextIdx);
      ambientAudio.updatePref('selectedTrack', nextIdx);
    }
  };

  const handlePrevTrack = () => {
    setPlayerState('loading');
    const prevIdx = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIdx);
    ambientAudio.updatePref('selectedTrack', prevIdx);
  };

  const handleToggleShuffle = () => {
    setIsShuffle((prev) => {
      const nextState = !prev;
      ambientAudio.updatePref('shuffleEnabled', nextState);
      return nextState;
    });
  };

  const handleVolumeChange = (newVol) => {
    setMusicVolume(newVol);
    ambientAudio.updatePref('musicVolume', newVol);
  };

  // YouTube Callbacks
  const handleYouTubePlay = () => {
    setPlayerState('playing');
  };

  const handleYouTubePause = () => {
    setPlayerState('paused');
  };

  const handleYouTubeEnd = () => {
    handleNextTrack();
  };

  const handleYouTubeError = () => {
    setPlayerState('error');
    triggerToast('⚠️ YouTube Track Unavailable — Try another track');
  };

  return (
    <div className={`garage-viewport theme-${themeMode} ${isRainMode ? 'rain-mode-active' : ''}`}>
      {/* 1. Atmospheric Dust, Rain Particles & Visual Filters Overlay */}
      <EnvironmentEffects isLightOn={isLampOn} isDaytime={isDaytime} isRainMode={isRainMode} />

      {/* 2. Top Header Navigation Bar */}
      <header
        className="header-container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          padding: '1.2rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 30,
          pointerEvents: 'auto',
          background: 'linear-gradient(180deg, rgba(11, 9, 7, 0.92) 0%, rgba(11, 9, 7, 0) 100%)'
        }}
      >
        {/* Brand Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#d97706',
              color: '#0b0907',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontFamily: 'Cinzel, serif',
              fontSize: '1.2rem',
              boxShadow: '0 0 15px rgba(217, 119, 6, 0.5)'
            }}
          >
            VR
          </div>
          <div>
            <h1
              className="header-title"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '1.35rem',
                fontWeight: 900,
                color: '#f5eedc',
                letterSpacing: '1px',
                lineHeight: 1
              }}
            >
              VINTAGE RIDES
            </h1>
            <span className="header-brand-desc" style={{ fontSize: '0.7rem', color: '#a39580', fontFamily: 'JetBrains Mono, monospace' }}>
              Retro Indian Motorcycle Garage
            </span>
          </div>
        </div>

        {/* Floating Master Control System */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          
          {/* Radio Deck Launcher */}
          <button
            onClick={() => setIsRadioDeckOpen(true)}
            aria-label="Open Radio Player Deck"
            className="interactive-hover"
            style={{
              backgroundColor: isRadioOn ? 'rgba(34, 197, 94, 0.22)' : 'rgba(217, 119, 6, 0.22)',
              border: `1px solid ${isRadioOn ? '#22c55e' : '#d97706'}`,
              borderRadius: '20px',
              padding: '6px 14px',
              color: isRadioOn ? '#86efac' : '#fbbf24',
              fontSize: '0.8rem',
              fontFamily: 'JetBrains Mono, monospace',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)'
            }}
            title="🎵 Open Radio & YouTube Music Deck"
          >
            <Music size={14} />
            <span>{isRadioOn ? 'Radio Deck ●' : 'Radio Deck'}</span>
          </button>

          {/* Rain Mode Toggle */}
          <button
            onClick={handleToggleRainMode}
            aria-label={isRainMode ? "Disable Rain Mode" : "Enable Rain Mode"}
            className="interactive-hover"
            style={{
              backgroundColor: isRainMode ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 24, 18, 0.8)',
              border: `1px solid ${isRainMode ? '#38bdf8' : '#3d3226'}`,
              borderRadius: '20px',
              padding: '6px 14px',
              color: isRainMode ? '#38bdf8' : '#a39580',
              fontSize: '0.8rem',
              fontFamily: 'JetBrains Mono, monospace',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              boxShadow: isRainMode ? '0 0 15px rgba(56, 189, 248, 0.3)' : 'none'
            }}
            title="🌧️ Toggle Rain Mode & Ambient Audio"
          >
            <CloudRain size={14} />
            <span>{isRainMode ? 'Rain ON' : 'Rain OFF'}</span>
          </button>

          {/* Ambient Sound Deck */}
          <button
            onClick={() => setIsAmbienceModalOpen(true)}
            aria-label="Configure Sound Volumes"
            className="interactive-hover"
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.18)',
              border: '1px solid #d97706',
              borderRadius: '20px',
              padding: '6px 14px',
              color: '#fbbf24',
              fontSize: '0.8rem',
              fontFamily: 'JetBrains Mono, monospace',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)'
            }}
            title="🔊 Configure Ambient Audio Volumes"
          >
            <Sliders size={14} />
            <span>Ambience</span>
          </button>

          {/* Day / Night Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            aria-label={isDaytime ? "Switch to Night Atmosphere" : "Switch to Day Atmosphere"}
            className="interactive-hover"
            style={{
              backgroundColor: isDaytime ? 'rgba(251, 191, 36, 0.25)' : 'rgba(30, 27, 75, 0.8)',
              border: `1px solid ${isDaytime ? '#f59e0b' : '#6366f1'}`,
              borderRadius: '20px',
              padding: '6px 14px',
              color: isDaytime ? '#fbbf24' : '#a5b4fc',
              fontSize: '0.8rem',
              fontFamily: 'JetBrains Mono, monospace',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              boxShadow: isDaytime ? '0 0 15px rgba(245, 158, 11, 0.3)' : '0 0 15px rgba(99, 102, 241, 0.3)'
            }}
            title="☀️ / 🌙 Toggle Day / Night Atmosphere"
          >
            {isDaytime ? <Sun size={14} /> : <Moon size={14} />}
            <span>{isDaytime ? 'Day' : 'Night'}</span>
          </button>

          {/* Garage Info & Specs Button */}
          <button
            onClick={() => setActiveModalItem('workbench')}
            aria-label="Garage Information and Specs"
            className="interactive-hover"
            style={{
              backgroundColor: 'rgba(42, 32, 24, 0.8)',
              border: '1px solid #4a3c2c',
              borderRadius: '20px',
              padding: '6px 12px',
              color: '#a39580',
              fontSize: '0.8rem',
              fontFamily: 'JetBrains Mono, monospace',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)'
            }}
            title="ℹ️ Garage Info & Specs"
          >
            <Info size={14} />
          </button>
        </div>
      </header>

      {/* 3. Hanging Light Fixture & Pull Chain */}
      <Lighting
        isLightOn={isLampOn}
        brightness={lampBrightness}
        onToggleLight={handleToggleLampPower}
        onInspectLight={() => setActiveModalItem('lamp')}
      />

      {/* 4. Garage Wall & Furniture Background Objects */}
      <GarageObjects
        isDaytime={isDaytime}
        isRainMode={isRainMode}
        isFanOn={isFanOn}
        fanSpeed={fanSpeed}
        isLampOn={isLampOn}
        lampBrightness={lampBrightness}
        playerState={isRadioOn ? playerState : 'stopped'}
        currentTrackTitle={currentTrack.title}
        currentTrackIndex={currentTrackIndex}
        totalTracks={playlist.length}
        onToggleFanPower={handleToggleFanPower}
        onFanSpeedChange={handleFanSpeedChange}
        onToggleLampPower={handleToggleLampPower}
        onLampBrightnessChange={handleLampBrightnessChange}
        onToggleWindow={handleToggleRainMode}
        onInspectPosters={() => {
          triggerToast('Inspecting Vintage Rallies Poster');
          setActiveModalItem('posters');
        }}
        onInspectTools={() => {
          triggerToast('Inspecting Workshop Tools Pegboard');
          setActiveModalItem('tools');
        }}
        onInspectWorkbench={() => {
          triggerToast('Inspecting Hardwood Workbench');
          setActiveModalItem('workbench');
        }}
        onOpenRadio={() => setIsRadioDeckOpen(true)}
      />

      {/* 5. Centerpiece: Retro Motorcycle (Focal Point) */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 12,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Motorcycle
          onInspectMotorcycle={() => {
            triggerToast('Bullet 350 Ignition & Spec Sheet Triggered');
            setActiveModalItem('motorcycle');
          }}
        />
      </div>

      {/* 6. Workbench Object: Vintage Tabletop Valve Radio */}
      <div
        style={{
          position: 'absolute',
          bottom: '24%',
          left: '12%',
          zIndex: 14
        }}
      >
        <Radio
          isRadioOn={isRadioOn}
          playerState={playerState}
          currentTrackTitle={currentTrack.title}
          activeFrequency="98.3 FM"
          onToggleRadioPower={handleToggleRadioPower}
          onOpenDeck={() => setIsRadioDeckOpen(true)}
        />
      </div>

      {/* 7. Visually Minimized Embedded YouTube Player Container */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          width: '180px',
          height: '100px',
          zIndex: 2,
          opacity: 0.05,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        <YouTubePlayer
          youtubeId={currentTrack.youtubeId}
          isPlaying={isRadioOn && (playerState === 'playing' || playerState === 'loading')}
          volume={musicVolume}
          isMuted={isMuted}
          onPlay={handleYouTubePlay}
          onPause={handleYouTubePause}
          onEnd={handleYouTubeEnd}
          onError={handleYouTubeError}
        />
      </div>

      {/* 8. Bottom Compact Helper Bar */}
      <div
        className="helper-bar"
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(18, 14, 10, 0.88)',
          border: '1px solid #3d3226',
          borderRadius: '30px',
          padding: '8px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#a39580',
          fontSize: '0.8rem',
          zIndex: 25,
          boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <Sparkles size={14} style={{ color: '#f59e0b' }} />
        <span>Click <strong>Radio</strong> to toggle power, or use <strong>Fan Regulator</strong> & <strong>Lamp Switches</strong> on the wall</span>
      </div>

      {/* 9. Toast Feedback Message */}
      {toastFeedback && (
        <div
          style={{
            position: 'absolute',
            top: '5.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(217, 119, 6, 0.95)',
            color: '#0f0d0b',
            padding: '8px 18px',
            borderRadius: '20px',
            fontWeight: 700,
            fontSize: '0.85rem',
            fontFamily: 'JetBrains Mono, monospace',
            zIndex: 40,
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.7)',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          {toastFeedback}
        </div>
      )}

      {/* 10. Interactive Details Modal */}
      <InspectModal
        activeItem={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />

      {/* 11. Expandable Vintage Radio Player Deck */}
      {isRadioDeckOpen && (
        <RadioPlayer
          currentTrackIndex={currentTrackIndex}
          playerState={isRadioOn ? playerState : 'stopped'}
          isShuffle={isShuffle}
          volume={musicVolume}
          isMuted={isMuted}
          onSelectTrack={handleSelectTrack}
          onPlayPause={handlePlayPause}
          onNext={handleNextTrack}
          onPrevious={handlePrevTrack}
          onToggleShuffle={handleToggleShuffle}
          onVolumeChange={handleVolumeChange}
          onToggleMute={() => setIsMuted((prev) => !prev)}
          onClose={() => setIsRadioDeckOpen(false)}
        />
      )}

      {/* 12. Ambient Sound Control Deck Modal */}
      {isAmbienceModalOpen && (
        <AmbientSoundModal
          onClose={() => setIsAmbienceModalOpen(false)}
          isRainMode={isRainMode}
          onToggleRainMode={handleToggleRainMode}
        />
      )}
    </div>
  );
}
