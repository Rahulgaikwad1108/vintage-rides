// Web Audio API engine sound thumper rumble generator

class EngineSoundManager {
  constructor() {
    this.audioCtx = null;
  }

  playEngineRumble() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.audioCtx = new AudioCtx();

      // Create low frequency oscillator for thumper idle cadence
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(45, this.audioCtx.currentTime); // 45 Hz low thumper
      osc.frequency.exponentialRampToValueAtTime(80, this.audioCtx.currentTime + 0.3);
      osc.frequency.exponentialRampToValueAtTime(35, this.audioCtx.currentTime + 1.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, this.audioCtx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 1.4);
    } catch (e) {
      console.warn('Engine sound error:', e);
    }
  }
}

export const engineAudio = new EngineSoundManager();
