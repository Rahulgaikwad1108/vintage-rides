import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, X, Sliders, CloudRain, Wind, Disc, Sparkles } from 'lucide-react';
import { ambientAudio } from '../utils/ambientAudio';

export default function AmbientSoundModal({ onClose, isRainMode, onToggleRainMode }) {
  const [prefs, setPrefs] = useState(ambientAudio.prefs);

  const updateVolume = (channel, vol) => {
    ambientAudio.setVolume(channel, vol);
    setPrefs({ ...ambientAudio.prefs });
  };

  const toggleChannel = (channel) => {
    if (channel === 'rain') {
      onToggleRainMode();
    } else {
      ambientAudio.toggleChannel(channel);
    }
    setPrefs({ ...ambientAudio.prefs });
  };

  const toggleMuteAll = () => {
    ambientAudio.toggleMuteAll();
    setPrefs({ ...ambientAudio.prefs });
  };

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
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#1b1611',
          border: '1px solid #d97706',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9), 0 0 25px rgba(217, 119, 6, 0.25)',
          position: 'relative',
          color: '#f5eedc'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="interactive-hover"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#2a2018',
            border: '1px solid #4a3c2c',
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

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ padding: '10px', backgroundColor: '#271e16', borderRadius: '10px', color: '#f59e0b' }}>
            <Sliders size={24} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.3rem', color: '#f5eedc' }}>
              Garage Ambient Sound Deck
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#a39580', fontFamily: 'JetBrains Mono, monospace' }}>
              Independent Sound Channels & Saved Preferences
            </span>
          </div>
        </div>

        {/* Global Mute Ambience Button */}
        <div
          style={{
            backgroundColor: '#140f0a',
            border: '1px solid #362d22',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {prefs.isMuted ? <VolumeX size={20} style={{ color: '#ef4444' }} /> : <Volume2 size={20} style={{ color: '#22c55e' }} />}
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {prefs.isMuted ? 'Ambience Channels Muted' : 'Ambience Channels Active'}
            </span>
          </div>
          <button
            onClick={toggleMuteAll}
            className="interactive-hover"
            style={{
              backgroundColor: prefs.isMuted ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
              border: `1px solid ${prefs.isMuted ? '#ef4444' : '#22c55e'}`,
              color: prefs.isMuted ? '#fca5a5' : '#86efac',
              borderRadius: '8px',
              padding: '4px 12px',
              fontSize: '0.75rem',
              fontFamily: 'JetBrains Mono, monospace',
              cursor: 'pointer'
            }}
          >
            {prefs.isMuted ? 'Unmute Ambience' : 'Mute Ambience'}
          </button>
        </div>

        {/* Audio Channels List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
          
          {/* 1. Garage Ambience */}
          <div style={{ backgroundColor: '#221a13', border: '1px solid #423425', borderRadius: '10px', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Disc size={18} style={{ color: '#f59e0b' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Garage Ambience</span>
                <span style={{ fontSize: '0.7rem', color: '#a39580', fontFamily: 'JetBrains Mono, monospace' }}>(garage.mp3)</span>
              </div>
              <button
                onClick={() => toggleChannel('garage')}
                style={{
                  backgroundColor: prefs.garageEnabled ? '#d97706' : '#33281c',
                  color: prefs.garageEnabled ? '#0f0d0b' : '#a39580',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '2px 10px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {prefs.garageEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="range"
                min="0"
                max="100"
                value={prefs.garageVolume}
                onChange={(e) => updateVolume('garage', Number(e.target.value))}
                style={{ flex: 1, accentColor: '#d97706', cursor: 'pointer' }}
              />
              <span style={{ width: '35px', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#fbbf24' }}>
                {prefs.garageVolume}%
              </span>
            </div>
          </div>

          {/* 2. Rain Ambience */}
          <div style={{ backgroundColor: '#141e2e', border: '1px solid #233854', borderRadius: '10px', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CloudRain size={18} style={{ color: '#38bdf8' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Rain Ambience</span>
                <span style={{ fontSize: '0.7rem', color: '#7dd3fc', fontFamily: 'JetBrains Mono, monospace' }}>(rain.mp3)</span>
              </div>
              <button
                onClick={() => toggleChannel('rain')}
                style={{
                  backgroundColor: isRainMode ? '#0284c7' : '#1e293b',
                  color: isRainMode ? '#fff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '2px 10px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {isRainMode ? 'ON' : 'OFF'}
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="range"
                min="0"
                max="100"
                value={prefs.rainVolume}
                onChange={(e) => updateVolume('rain', Number(e.target.value))}
                style={{ flex: 1, accentColor: '#38bdf8', cursor: 'pointer' }}
              />
              <span style={{ width: '35px', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#7dd3fc' }}>
                {prefs.rainVolume}%
              </span>
            </div>
          </div>

          {/* 3. Ceiling Fan Ambience */}
          <div style={{ backgroundColor: '#221a13', border: '1px solid #423425', borderRadius: '10px', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wind size={18} style={{ color: '#b45309' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Ceiling Fan Ambience</span>
                <span style={{ fontSize: '0.7rem', color: '#a39580', fontFamily: 'JetBrains Mono, monospace' }}>(fan.mp3)</span>
              </div>
              <button
                onClick={() => toggleChannel('fan')}
                style={{
                  backgroundColor: prefs.fanEnabled ? '#d97706' : '#33281c',
                  color: prefs.fanEnabled ? '#0f0d0b' : '#a39580',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '2px 10px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {prefs.fanEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="range"
                min="0"
                max="100"
                value={prefs.fanVolume}
                onChange={(e) => updateVolume('fan', Number(e.target.value))}
                style={{ flex: 1, accentColor: '#d97706', cursor: 'pointer' }}
              />
              <span style={{ width: '35px', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#fbbf24' }}>
                {prefs.fanVolume}%
              </span>
            </div>
          </div>

        </div>

        {/* Independence Info Note */}
        <div
          style={{
            backgroundColor: 'rgba(217, 119, 6, 0.1)',
            border: '1px solid rgba(217, 119, 6, 0.3)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            fontSize: '0.75rem',
            color: '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={16} />
          <span>
            <strong>Independent Volumes</strong>: Muting ambience does not stop YouTube music. All preferences are saved in your browser storage.
          </span>
        </div>
      </div>
    </div>
  );
}
