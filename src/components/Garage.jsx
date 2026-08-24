import React, { useState, useEffect } from 'react';
import EnvironmentEffects from './EnvironmentEffects';
import Lighting from './Lighting';
import GarageObjects from './GarageObjects';
import Motorcycle from './Motorcycle';
import Radio from './Radio';
import RadioPlayer from './RadioPlayer';
import InspectModal from './InspectModal';
import AmbientSoundModal from './AmbientSoundModal';
import {
  Zap,
  Sun,
  Moon,
  Sparkles,
  Radio as RadioIcon,
  CloudRain,
  Sliders,
  Info,
  Volume2,
  Music
} from 'lucide-react';
import { ambientAudio } from '../utils/ambientAudio';

const THEME_STORAGE_KEY = 'vintage_rides_theme_mode';
const RAIN_PREF_KEY = 'vintage_rides_rain_pref';

export default function Garage() {
  const [isLightOn, setIsLightOn] = useState(true);
  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) || 'night';
    } catch (e) {
      return 'night';
    }
  });

  const isDaytime = themeMode === 'day';

  const [isRainMode, setIsRainMode] = useState(() => {
    try {
      const saved = localStorage.getItem(RAIN_PREF_KEY);
      return saved !== null ? JSON.parse(saved) : ambientAudio.prefs.rainEnabled;
    } catch (e) {
      return false;
    }
  });

  const [isFanSpinning, setIsFanSpinning] = useState(ambientAudio.prefs.fanEnabled);
  const [isAmbienceModalOpen, setIsAmbienceModalOpen] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [isRadioOpen, setIsRadioOpen] = useState(false);
  const [toastFeedback, setToastFeedback] = useState(null);

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

  // Save Day/Night theme preference to localStorage
  const handleToggleTheme = () => {
    const nextTheme = themeMode === 'day' ? 'night' : 'day';
    setThemeMode(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (e) {}
    triggerToast(nextTheme === 'day' ? '☀️ Warm Natural Daylight Active' : '🌙 Cozy Night Garage Atmosphere Active');
  };

  // Helper trigger for click feedback toasts
  const triggerToast = (msg) => {
    setToastFeedback(msg);
    setTimeout(() => setToastFeedback(null), 2500);
  };

  const handleToggleLight = () => {
    setIsLightOn((prev) => {
      const nextState = !prev;
      triggerToast(nextState ? 'Tungsten Lamp On — Ambient Glow Active' : 'Tungsten Lamp Off — Dim Garage Mood');
      return nextState;
    });
  };

  const handleToggleWindow = () => {
    setIsRainMode((prev) => {
      const nextState = !prev;
      ambientAudio.toggleChannel('rain', nextState);
      try {
        localStorage.setItem(RAIN_PREF_KEY, JSON.stringify(nextState));
      } catch (e) {}
      triggerToast(nextState ? '🌧️ Rain Mode Active — Window Rain Streaks Outside' : 'Rain Mode Disabled — Clear Window Glass');
      return nextState;
    });
  };

  const handleToggleFan = () => {
    setIsFanSpinning((prev) => {
      const nextState = !prev;
      ambientAudio.toggleChannel('fan', nextState);
      triggerToast(nextState ? 'Ceiling Fan Spinning ON' : 'Ceiling Fan Paused OFF');
      return nextState;
    });
  };

  const handleToggleRainMode = () => {
    setIsRainMode((prev) => {
      const nextState = !prev;
      ambientAudio.toggleChannel('rain', nextState);
      try {
        localStorage.setItem(RAIN_PREF_KEY, JSON.stringify(nextState));
      } catch (e) {}
      triggerToast(nextState ? '🌧️ Rain Mode Active — Ambience Audio Started' : 'Rain Mode Disabled — Normal Lighting Restored');
      return nextState;
    });
  };

  const handleOpenRadioPlayer = () => {
    triggerToast('Tuning Airwave 1998 Vintage Radio Player');
    setIsRadioOpen(true);
  };

  return (
    <div className={`garage-viewport theme-${themeMode} ${isRainMode ? 'rain-mode-active' : ''}`}>
      {/* 1. Atmospheric Dust, Rain Particles & Visual Filters Overlay */}
      <EnvironmentEffects isLightOn={isLightOn} isDaytime={isDaytime} isRainMode={isRainMode} />

      {/* 2. Top Navigation & Floating Control Bar Header */}
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

        {/* Floating Desktop & Responsive Master Control System */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          
          {/* 🎵 / 📻 Radio & Music Player Control */}
          <button
            onClick={handleOpenRadioPlayer}
            aria-label="Open Radio Music Player"
            className="interactive-hover"
            style={{
              backgroundColor: 'rgba(217, 119, 6, 0.22)',
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
            title="🎵 Open Radio & YouTube Music Player"
          >
            <Music size={14} />
            <span>Radio</span>
          </button>

          {/* 🌧️ Rain Mode Toggle Control */}
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
            title="🌧️ Toggle Rain Mode & Atmospheric Audio"
          >
            <CloudRain size={14} />
            <span>{isRainMode ? 'Rain ON' : 'Rain OFF'}</span>
          </button>

          {/* 🔊 Ambient Sound Control Deck */}
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

          {/* 🌙 / ☀️ Day & Night Atmosphere Toggle */}
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

          {/* ℹ️ Garage Info & Specs Button */}
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
        isLightOn={isLightOn}
        onToggleLight={handleToggleLight}
        onInspectLight={() => setActiveModalItem('lamp')}
      />

      {/* 4. Garage Wall & Furniture Background Objects */}
      <GarageObjects
        isDaytime={isDaytime}
        isRainMode={isRainMode}
        isFanSpinning={isFanSpinning}
        onToggleFan={handleToggleFan}
        onToggleWindow={handleToggleWindow}
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

      {/* 6. Workbench Object: Vintage Valve Radio */}
      <div
        style={{
          position: 'absolute',
          bottom: '24%',
          left: '12%',
          zIndex: 14
        }}
      >
        <Radio
          activeFrequency="104.2 FM"
          onInspectRadio={handleOpenRadioPlayer}
        />
      </div>

      {/* 7. Bottom Compact Helper Bar */}
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
        <span>Click <strong>Motorcycle</strong>, <strong>Radio</strong>, <strong>Window</strong>, or <strong>Controls</strong> above to interact</span>
      </div>

      {/* 8. Toast Feedback Message */}
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

      {/* 9. Interactive Details Modal */}
      <InspectModal
        activeItem={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />

      {/* 10. Vintage Radio Player Deck Modal */}
      {isRadioOpen && (
        <RadioPlayer onClose={() => setIsRadioOpen(false)} />
      )}

      {/* 11. Ambient Sound Control Deck Modal */}
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
