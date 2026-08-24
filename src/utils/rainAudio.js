// Web Audio API fallback & HTML5 Audio manager for Rain Ambience

class RainAudioManager {
  constructor() {
    this.audioElement = null;
    this.audioCtx = null;
    this.noiseNode = null;
    this.gainNode = null;
    this.filterNode = null;
    this.isPlaying = false;
    this.volume = 0.5;
    this.usingSynthFallback = false;
  }

  initAudioElement() {
    if (!this.audioElement) {
      this.audioElement = new Audio('/audio/rain.mp3');
      this.audioElement.loop = true;
      this.audioElement.volume = this.volume;
    }
  }

  // Synthesizes realistic ambient rain sound using Web Audio API if rain.mp3 is absent
  initSynthFallback() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.audioCtx = new AudioCtx();

      // Create 2-second buffer of white noise
      const bufferSize = this.audioCtx.sampleRate * 2;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      this.noiseNode = this.audioCtx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      // Lowpass filter to shape white noise into soft rain patter
      this.filterNode = this.audioCtx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(1000, this.audioCtx.currentTime);

      // Volume Gain Node
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume * 0.15, this.audioCtx.currentTime);

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      this.noiseNode.start();
      this.usingSynthFallback = true;
    } catch (e) {
      console.warn('Web Audio Rain synth fallback error:', e);
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement && !this.usingSynthFallback) {
      this.audioElement.volume = this.volume;
    }
    if (this.gainNode && this.usingSynthFallback) {
      this.gainNode.gain.setValueAtTime(this.volume * 0.15, this.audioCtx ? this.audioCtx.currentTime : 0);
    }
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.initAudioElement();

    this.audioElement
      .play()
      .then(() => {
        this.usingSynthFallback = false;
      })
      .catch((err) => {
        console.warn('public/audio/rain.mp3 not found or blocked, initializing ambient Web Audio synth fallback');
        this.initSynthFallback();
      });
  }

  stop() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch (e) {}
      this.audioCtx = null;
      this.noiseNode = null;
    }
    this.usingSynthFallback = false;
  }
}

export const rainAudio = new RainAudioManager();
