// Comprehensive Audio & Environment Preferences State Manager for Vintage Rides

const STORAGE_KEY = 'vintage_rides_all_prefs';

class AmbientAudioManager {
  constructor() {
    this.prefs = this.loadPrefs();
    this.audioElements = {
      garage: null,
      rain: null,
      fan: null
    };
    this.synthContexts = {
      garage: null,
      rain: null,
      fan: null
    };
    this.synthGains = {
      garage: null,
      rain: null,
      fan: null
    };
    this.isPlaying = false;
  }

  loadPrefs() {
    const defaults = {
      radioEnabled: false,
      selectedTrack: 0,
      musicVolume: 75,
      shuffleEnabled: false,
      fanEnabled: true,
      fanSpeed: 2,
      fanVolume: 40,
      lampEnabled: true,
      lampBrightness: 3,
      rainEnabled: false,
      rainVolume: 60,
      garageVolume: 35,
      garageEnabled: true,
      dayNightMode: 'night',
      isMuted: false
    };
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch (e) {
      return defaults;
    }
  }

  savePrefs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.prefs));
    } catch (e) {}
  }

  updatePref(key, value) {
    this.prefs[key] = value;
    this.savePrefs();
    this.syncVolumes();
  }

  initChannel(channel, filePath) {
    if (!this.audioElements[channel]) {
      const audio = new Audio(filePath);
      audio.loop = true;
      audio.volume = this.getEffectiveVolume(channel);
      this.audioElements[channel] = audio;
    }
  }

  getEffectiveVolume(channel) {
    if (this.prefs.isMuted) return 0;

    let baseVol = (this.prefs[`${channel}Volume`] || 0) / 100;

    // Scale fan audio volume independently based on fan speed level
    if (channel === 'fan') {
      if (!this.prefs.fanEnabled || this.prefs.fanSpeed === 0) return 0;
      const speedMultipliers = [0, 0.25, 0.5, 0.75, 1.0];
      baseVol *= speedMultipliers[this.prefs.fanSpeed] || 0.5;
    }

    return Math.max(0, Math.min(1, baseVol));
  }

  initSynthFallback(channel) {
    if (this.synthContexts[channel]) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      this.synthContexts[channel] = ctx;

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      if (channel === 'fan') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, ctx.currentTime);
      } else if (channel === 'garage') {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(250, ctx.currentTime);
      } else {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, ctx.currentTime);
      }

      gain.gain.setValueAtTime(this.getEffectiveVolume(channel) * 0.12, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();

      this.synthGains[channel] = gain;
    } catch (e) {
      console.warn(`Synth fallback error for ${channel}:`, e);
    }
  }

  playChannel(channel, filePath) {
    const enabledKey = `${channel}Enabled`;
    if (!this.prefs[enabledKey]) {
      this.stopChannel(channel);
      return;
    }

    this.initChannel(channel, filePath);
    const audio = this.audioElements[channel];

    audio.volume = this.getEffectiveVolume(channel);
    audio.play().catch(() => {
      this.initSynthFallback(channel);
      if (this.synthGains[channel] && this.synthContexts[channel]) {
        this.synthGains[channel].gain.setValueAtTime(
          this.getEffectiveVolume(channel) * 0.12,
          this.synthContexts[channel].currentTime
        );
      }
    });
  }

  stopChannel(channel) {
    if (this.audioElements[channel]) {
      this.audioElements[channel].pause();
      this.audioElements[channel].currentTime = 0;
    }
    if (this.synthContexts[channel]) {
      try {
        this.synthContexts[channel].close();
      } catch (e) {}
      this.synthContexts[channel] = null;
      this.synthGains[channel] = null;
    }
  }

  setVolume(channel, vol) {
    this.prefs[`${channel}Volume`] = Math.max(0, Math.min(100, vol));
    this.savePrefs();
    this.syncVolumes();
  }

  toggleChannel(channel, state) {
    const key = `${channel}Enabled`;
    this.prefs[key] = state !== undefined ? state : !this.prefs[key];
    this.savePrefs();
    const filePaths = {
      garage: '/audio/garage.mp3',
      rain: '/audio/rain.mp3',
      fan: '/audio/fan.mp3'
    };
    if (this.prefs[key]) {
      this.playChannel(channel, filePaths[channel]);
    } else {
      this.stopChannel(channel);
    }
  }

  toggleMuteAll() {
    this.prefs.isMuted = !this.prefs.isMuted;
    this.savePrefs();
    this.syncVolumes();
  }

  syncVolumes() {
    ['garage', 'rain', 'fan'].forEach((ch) => {
      const effVol = this.getEffectiveVolume(ch);
      if (this.audioElements[ch]) {
        this.audioElements[ch].volume = effVol;
      }
      if (this.synthGains[ch] && this.synthContexts[ch]) {
        this.synthGains[ch].gain.setValueAtTime(effVol * 0.12, this.synthContexts[ch].currentTime);
      }
    });
  }

  startAll() {
    this.playChannel('garage', '/audio/garage.mp3');
    if (this.prefs.fanEnabled && this.prefs.fanSpeed > 0) {
      this.playChannel('fan', '/audio/fan.mp3');
    }
    if (this.prefs.rainEnabled) {
      this.playChannel('rain', '/audio/rain.mp3');
    }
  }

  stopAll() {
    ['garage', 'rain', 'fan'].forEach((ch) => this.stopChannel(ch));
  }
}

export const ambientAudio = new AmbientAudioManager();
