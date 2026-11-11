import { ROMANTIC_CHORDS, REVEAL_CHIME_NOTES, CELEBRATION_FANFARE_CHORDS } from './storyLogic';

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private masterGain: GainNode | null = null;
  private isPlayingAmbience: boolean = false;
  private ambientTimer: number | null = null;
  private currentChordIdx: number = 0;
  private customAudioEl: HTMLAudioElement | null = null;
  private customAudioFailed: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    if (this.customAudioEl) {
      this.customAudioEl.volume = this.isMuted ? 0 : this.volume;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public playGentleClick() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {}
  }

  public playRevealChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const notes = REVEAL_CHIME_NOTES;
    notes.forEach((freq, idx) => {
      const startTime = (this.ctx?.currentTime || 0) + idx * 0.14;
      this.playBellNote(freq, startTime, 1.8, 0.22);
    });
  }

  public playCelebration() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Cascade triumphant fanfare
    CELEBRATION_FANFARE_CHORDS.forEach((chord, chordIdx) => {
      const chordStart = (this.ctx?.currentTime || 0) + chordIdx * 0.38;
      chord.forEach((freq, noteIdx) => {
        this.playPianoNote(freq, chordStart + noteIdx * 0.04, 2.2, 0.18);
        this.playBellNote(freq * 2, chordStart + noteIdx * 0.04, 2.8, 0.12);
      });
    });
  }

  private playBellNote(frequency: number, startTime: number, duration: number, peakGain: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(frequency * 3.5, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(peakGain * this.volume, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch {}
  }

  private playPianoNote(frequency: number, startTime: number, duration: number, peakGain: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      // Dual oscillator for rich acoustic harmonic warmth
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(frequency, startTime);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(frequency * 1.002, startTime); // subtle natural chorus

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(frequency * 2.8, startTime);
      filter.frequency.exponentialRampToValueAtTime(frequency * 1.2, startTime + duration);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(peakGain * this.volume, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration + 0.05);
      osc2.stop(startTime + duration + 0.05);
    } catch {}
  }

  public startRomanticSoundtrack(customUrl?: string) {
    this.initContext();

    if (customUrl && customUrl.trim().length > 0 && !this.customAudioFailed) {
      if (!this.customAudioEl) {
        this.customAudioEl = new Audio(customUrl);
        this.customAudioEl.loop = true;
        this.customAudioEl.volume = this.isMuted ? 0 : this.volume;
        this.customAudioEl.onerror = () => {
          this.customAudioFailed = true;
          this.startProceduralPiano();
        };
      }
      this.customAudioEl.play().catch(() => {
        this.startProceduralPiano();
      });
      return;
    }

    this.startProceduralPiano();
  }

  private startProceduralPiano() {
    if (this.isPlayingAmbience) return;
    this.isPlayingAmbience = true;

    const playNextBar = () => {
      if (!this.isPlayingAmbience || !this.ctx) return;

      const chord = ROMANTIC_CHORDS[this.currentChordIdx % ROMANTIC_CHORDS.length];
      this.currentChordIdx++;

      // Play soft arpeggiated piano notes across 4 seconds
      const now = this.ctx.currentTime;
      // Bass note
      this.playPianoNote(chord[0], now, 3.8, 0.16);

      // Delicate ascending and descending arpeggio pattern
      const arpeggioOrder = [1, 2, 3, 4, 3, 2];
      arpeggioOrder.forEach((chordDegree, stepIdx) => {
        const noteFreq = chord[chordDegree % chord.length];
        this.playPianoNote(noteFreq, now + 0.35 + stepIdx * 0.48, 2.2, 0.11);
      });

      // Schedule next bar
      this.ambientTimer = window.setTimeout(playNextBar, 3600);
    };

    playNextBar();
  }

  public stopRomanticSoundtrack() {
    this.isPlayingAmbience = false;
    if (this.ambientTimer !== null) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
    if (this.customAudioEl) {
      this.customAudioEl.pause();
    }
  }
}

export const audioEngine = new RomanticAudioEngine();
