'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

interface Key {
  note: string;
  frequency: number;
  color: string;
  isBlack: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

interface AudioData {
  data: Float32Array;
  timestamp: number;
}

interface SoundSettings {
  waveform: OscillatorType;
  filterType: BiquadFilterType;
  filterFrequency: number;
  filterQ: number;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

interface SongNote {
  note: string;
  duration: number; // in seconds
  startTime: number; // when to start this note
}

interface Song {
  name: string;
  notes: SongNote[];
  tempo: number; // beats per minute
}

export default function CosmicSynthesizer() {
  // Define the cosmic scale with two octaves for more song versatility
  const keys: Key[] = [
    // Lower octave (C3-B3) - deeper, richer sounds for bass and accompaniment
    { note: 'C3', frequency: 130.81, color: '#4A3B8A', isBlack: false },
    { note: 'C#3', frequency: 138.59, color: '#1A0F3A', isBlack: true },
    { note: 'D3', frequency: 146.83, color: '#5A4B9A', isBlack: false },
    { note: 'D#3', frequency: 155.56, color: '#1A0F3A', isBlack: true },
    { note: 'E3', frequency: 164.81, color: '#6A5BAA', isBlack: false },
    { note: 'F3', frequency: 174.61, color: '#7A6BBA', isBlack: false },
    { note: 'F#3', frequency: 185.00, color: '#1A0F3A', isBlack: true },
    { note: 'G3', frequency: 196.00, color: '#8A7BCA', isBlack: false },
    { note: 'G#3', frequency: 207.65, color: '#1A0F3A', isBlack: true },
    { note: 'A3', frequency: 220.00, color: '#9A8BDA', isBlack: false },
    { note: 'A#3', frequency: 233.08, color: '#1A0F3A', isBlack: true },
    { note: 'B3', frequency: 246.94, color: '#AA9BEA', isBlack: false },
    // Middle octave (C4-B4) - original keys, renamed for clarity
    { note: 'C4', frequency: 261.63, color: '#C5BFFF', isBlack: false },
    { note: 'C#4', frequency: 277.18, color: '#2D1B69', isBlack: true },
    { note: 'D4', frequency: 293.66, color: '#B8A9FF', isBlack: false },
    { note: 'D#4', frequency: 311.13, color: '#2D1B69', isBlack: true },
    { note: 'E4', frequency: 329.63, color: '#AB93FF', isBlack: false },
    { note: 'F4', frequency: 349.23, color: '#9E7DFF', isBlack: false },
    { note: 'F#4', frequency: 369.99, color: '#2D1B69', isBlack: true },
    { note: 'G4', frequency: 392.00, color: '#9167FF', isBlack: false },
    { note: 'G#4', frequency: 415.30, color: '#2D1B69', isBlack: true },
    { note: 'A4', frequency: 440.00, color: '#8451FF', isBlack: false },
    { note: 'A#4', frequency: 466.16, color: '#2D1B69', isBlack: true },
    { note: 'B4', frequency: 493.88, color: '#773BFF', isBlack: false },
    { note: 'C5', frequency: 523.25, color: '#6A25FF', isBlack: false },
  ];

  // Für Elise song data (simplified version)
  const furElise: Song = {
    name: "Für Elise",
    tempo: 120,
    notes: [
      // Main theme (simplified)
      { note: 'E4', duration: 0.5, startTime: 0 },
      { note: 'D#4', duration: 0.5, startTime: 0.5 },
      { note: 'E4', duration: 0.5, startTime: 1.0 },
      { note: 'D#4', duration: 0.5, startTime: 1.5 },
      { note: 'E4', duration: 0.5, startTime: 2.0 },
      { note: 'B3', duration: 0.5, startTime: 2.5 },
      { note: 'D4', duration: 0.5, startTime: 3.0 },
      { note: 'C4', duration: 0.5, startTime: 3.5 },
      { note: 'A3', duration: 1.0, startTime: 4.0 },
      
      // Second phrase
      { note: 'C3', duration: 0.5, startTime: 5.0 },
      { note: 'E3', duration: 0.5, startTime: 5.5 },
      { note: 'A3', duration: 0.5, startTime: 6.0 },
      { note: 'B3', duration: 1.0, startTime: 6.5 },
      
      { note: 'E3', duration: 0.5, startTime: 7.5 },
      { note: 'G#3', duration: 0.5, startTime: 8.0 },
      { note: 'B3', duration: 0.5, startTime: 8.5 },
      { note: 'C4', duration: 1.0, startTime: 9.0 },
      
      // Third phrase
      { note: 'E4', duration: 0.5, startTime: 10.0 },
      { note: 'D#4', duration: 0.5, startTime: 10.5 },
      { note: 'E4', duration: 0.5, startTime: 11.0 },
      { note: 'D#4', duration: 0.5, startTime: 11.5 },
      { note: 'E4', duration: 0.5, startTime: 12.0 },
      { note: 'B3', duration: 0.5, startTime: 12.5 },
      { note: 'D4', duration: 0.5, startTime: 13.0 },
      { note: 'C4', duration: 0.5, startTime: 13.5 },
      { note: 'A3', duration: 1.0, startTime: 14.0 },
      
      // Final phrase
      { note: 'C3', duration: 0.5, startTime: 15.0 },
      { note: 'E3', duration: 0.5, startTime: 15.5 },
      { note: 'A3', duration: 0.5, startTime: 16.0 },
      { note: 'B3', duration: 0.5, startTime: 16.5 },
      { note: 'E3', duration: 0.5, startTime: 17.0 },
      { note: 'C4', duration: 0.5, startTime: 17.5 },
      { note: 'B3', duration: 0.5, startTime: 18.0 },
      { note: 'A3', duration: 1.0, startTime: 18.5 },
    ]
  };

  // Moonlight Sonata song data (first movement, simplified)
  const moonlightSonata: Song = {
    name: "Moonlight Sonata",
    tempo: 60,
    notes: [
      // Opening arpeggio pattern (simplified)
      { note: 'C#3', duration: 0.5, startTime: 0 },
      { note: 'G#3', duration: 0.5, startTime: 0.5 },
      { note: 'C#4', duration: 0.5, startTime: 1.0 },
      { note: 'E4', duration: 0.5, startTime: 1.5 },
      
      { note: 'C#3', duration: 0.5, startTime: 2.0 },
      { note: 'G#3', duration: 0.5, startTime: 2.5 },
      { note: 'C#4', duration: 0.5, startTime: 3.0 },
      { note: 'E4', duration: 0.5, startTime: 3.5 },
      
      { note: 'C#3', duration: 0.5, startTime: 4.0 },
      { note: 'G#3', duration: 0.5, startTime: 4.5 },
      { note: 'C#4', duration: 0.5, startTime: 5.0 },
      { note: 'E4', duration: 0.5, startTime: 5.5 },
      
      { note: 'C#3', duration: 0.5, startTime: 6.0 },
      { note: 'G#3', duration: 0.5, startTime: 6.5 },
      { note: 'C#4', duration: 0.5, startTime: 7.0 },
      { note: 'E4', duration: 0.5, startTime: 7.5 },
      
      // Main melody begins
      { note: 'G#4', duration: 1.0, startTime: 8.0 },
      { note: 'F#4', duration: 1.0, startTime: 9.0 },
      { note: 'E4', duration: 1.0, startTime: 10.0 },
      { note: 'D#4', duration: 1.0, startTime: 11.0 },
      
      { note: 'C#4', duration: 1.0, startTime: 12.0 },
      { note: 'B3', duration: 1.0, startTime: 13.0 },
      { note: 'A#3', duration: 1.0, startTime: 14.0 },
      { note: 'G#3', duration: 1.0, startTime: 15.0 },
      
      // Second phrase
      { note: 'G#4', duration: 1.0, startTime: 16.0 },
      { note: 'F#4', duration: 1.0, startTime: 17.0 },
      { note: 'E4', duration: 1.0, startTime: 18.0 },
      { note: 'D#4', duration: 1.0, startTime: 19.0 },
      
      { note: 'C#4', duration: 1.0, startTime: 20.0 },
      { note: 'B3', duration: 1.0, startTime: 21.0 },
      { note: 'A#3', duration: 1.0, startTime: 22.0 },
      { note: 'G#3', duration: 1.0, startTime: 23.0 },
      
      // Final arpeggio
      { note: 'C#3', duration: 0.5, startTime: 24.0 },
      { note: 'G#3', duration: 0.5, startTime: 24.5 },
      { note: 'C#4', duration: 0.5, startTime: 25.0 },
      { note: 'E4', duration: 0.5, startTime: 25.5 },
      
      { note: 'C#3', duration: 0.5, startTime: 26.0 },
      { note: 'G#3', duration: 0.5, startTime: 26.5 },
      { note: 'C#4', duration: 0.5, startTime: 27.0 },
      { note: 'E4', duration: 0.5, startTime: 27.5 },
    ]
  };

  // Canon in D (Pachelbel) - simplified version
  const canonInD: Song = {
    name: "Canon in D",
    tempo: 80,
    notes: [
      // Main theme
      { note: 'D4', duration: 0.5, startTime: 0 },
      { note: 'A3', duration: 0.5, startTime: 0.5 },
      { note: 'B3', duration: 0.5, startTime: 1.0 },
      { note: 'F#3', duration: 0.5, startTime: 1.5 },
      { note: 'G3', duration: 0.5, startTime: 2.0 },
      { note: 'D3', duration: 0.5, startTime: 2.5 },
      { note: 'G3', duration: 0.5, startTime: 3.0 },
      { note: 'A3', duration: 0.5, startTime: 3.5 },
      
      { note: 'F#3', duration: 0.5, startTime: 4.0 },
      { note: 'D3', duration: 0.5, startTime: 4.5 },
      { note: 'E3', duration: 0.5, startTime: 5.0 },
      { note: 'A3', duration: 0.5, startTime: 5.5 },
      { note: 'D4', duration: 0.5, startTime: 6.0 },
      { note: 'A3', duration: 0.5, startTime: 6.5 },
      { note: 'B3', duration: 0.5, startTime: 7.0 },
      { note: 'F#3', duration: 0.5, startTime: 7.5 },
      
      { note: 'G3', duration: 0.5, startTime: 8.0 },
      { note: 'D3', duration: 0.5, startTime: 8.5 },
      { note: 'G3', duration: 0.5, startTime: 9.0 },
      { note: 'A3', duration: 0.5, startTime: 9.5 },
      { note: 'F#3', duration: 0.5, startTime: 10.0 },
      { note: 'D3', duration: 0.5, startTime: 10.5 },
      { note: 'E3', duration: 0.5, startTime: 11.0 },
      { note: 'A3', duration: 0.5, startTime: 11.5 },
      
      { note: 'D4', duration: 1.0, startTime: 12.0 },
      { note: 'A3', duration: 1.0, startTime: 13.0 },
      { note: 'B3', duration: 1.0, startTime: 14.0 },
      { note: 'F#3', duration: 1.0, startTime: 15.0 },
    ]
  };

  // Twinkle Twinkle Little Star
  const twinkleStar: Song = {
    name: "Twinkle Twinkle",
    tempo: 100,
    notes: [
      { note: 'C4', duration: 0.5, startTime: 0 },
      { note: 'C4', duration: 0.5, startTime: 0.5 },
      { note: 'G4', duration: 0.5, startTime: 1.0 },
      { note: 'G4', duration: 0.5, startTime: 1.5 },
      { note: 'A4', duration: 0.5, startTime: 2.0 },
      { note: 'A4', duration: 0.5, startTime: 2.5 },
      { note: 'G4', duration: 1.0, startTime: 3.0 },
      
      { note: 'F4', duration: 0.5, startTime: 4.0 },
      { note: 'F4', duration: 0.5, startTime: 4.5 },
      { note: 'E4', duration: 0.5, startTime: 5.0 },
      { note: 'E4', duration: 0.5, startTime: 5.5 },
      { note: 'D4', duration: 0.5, startTime: 6.0 },
      { note: 'D4', duration: 0.5, startTime: 6.5 },
      { note: 'C4', duration: 1.0, startTime: 7.0 },
      
      { note: 'G4', duration: 0.5, startTime: 8.0 },
      { note: 'G4', duration: 0.5, startTime: 8.5 },
      { note: 'F4', duration: 0.5, startTime: 9.0 },
      { note: 'F4', duration: 0.5, startTime: 9.5 },
      { note: 'E4', duration: 0.5, startTime: 10.0 },
      { note: 'E4', duration: 0.5, startTime: 10.5 },
      { note: 'D4', duration: 1.0, startTime: 11.0 },
      
      { note: 'G4', duration: 0.5, startTime: 12.0 },
      { note: 'G4', duration: 0.5, startTime: 12.5 },
      { note: 'F4', duration: 0.5, startTime: 13.0 },
      { note: 'F4', duration: 0.5, startTime: 13.5 },
      { note: 'E4', duration: 0.5, startTime: 14.0 },
      { note: 'E4', duration: 0.5, startTime: 14.5 },
      { note: 'D4', duration: 1.0, startTime: 15.0 },
      
      { note: 'C4', duration: 0.5, startTime: 16.0 },
      { note: 'C4', duration: 0.5, startTime: 16.5 },
      { note: 'G4', duration: 0.5, startTime: 17.0 },
      { note: 'G4', duration: 0.5, startTime: 17.5 },
      { note: 'A4', duration: 0.5, startTime: 18.0 },
      { note: 'A4', duration: 0.5, startTime: 18.5 },
      { note: 'G4', duration: 1.0, startTime: 19.0 },
      
      { note: 'F4', duration: 0.5, startTime: 20.0 },
      { note: 'F4', duration: 0.5, startTime: 20.5 },
      { note: 'E4', duration: 0.5, startTime: 21.0 },
      { note: 'E4', duration: 0.5, startTime: 21.5 },
      { note: 'D4', duration: 0.5, startTime: 22.0 },
      { note: 'D4', duration: 0.5, startTime: 22.5 },
      { note: 'C4', duration: 1.0, startTime: 23.0 },
    ]
  };

  // Ode to Joy (Beethoven) - main theme
  const odeToJoy: Song = {
    name: "Ode to Joy",
    tempo: 120,
    notes: [
      { note: 'E4', duration: 0.5, startTime: 0 },
      { note: 'E4', duration: 0.5, startTime: 0.5 },
      { note: 'F4', duration: 0.5, startTime: 1.0 },
      { note: 'G4', duration: 0.5, startTime: 1.5 },
      { note: 'G4', duration: 0.5, startTime: 2.0 },
      { note: 'F4', duration: 0.5, startTime: 2.5 },
      { note: 'E4', duration: 0.5, startTime: 3.0 },
      { note: 'D4', duration: 0.5, startTime: 3.5 },
      { note: 'C4', duration: 0.5, startTime: 4.0 },
      { note: 'C4', duration: 0.5, startTime: 4.5 },
      { note: 'D4', duration: 0.5, startTime: 5.0 },
      { note: 'E4', duration: 0.5, startTime: 5.5 },
      { note: 'E4', duration: 0.5, startTime: 6.0 },
      { note: 'D4', duration: 0.5, startTime: 6.5 },
      { note: 'D4', duration: 1.0, startTime: 7.0 },
      
      { note: 'E4', duration: 0.5, startTime: 8.0 },
      { note: 'E4', duration: 0.5, startTime: 8.5 },
      { note: 'F4', duration: 0.5, startTime: 9.0 },
      { note: 'G4', duration: 0.5, startTime: 9.5 },
      { note: 'G4', duration: 0.5, startTime: 10.0 },
      { note: 'F4', duration: 0.5, startTime: 10.5 },
      { note: 'E4', duration: 0.5, startTime: 11.0 },
      { note: 'D4', duration: 0.5, startTime: 11.5 },
      { note: 'C4', duration: 0.5, startTime: 12.0 },
      { note: 'C4', duration: 0.5, startTime: 12.5 },
      { note: 'D4', duration: 0.5, startTime: 13.0 },
      { note: 'E4', duration: 0.5, startTime: 13.5 },
      { note: 'D4', duration: 0.5, startTime: 14.0 },
      { note: 'C4', duration: 0.5, startTime: 14.5 },
      { note: 'C4', duration: 1.0, startTime: 15.0 },
    ]
  };

  // Greensleeves - traditional melody
  const greensleeves: Song = {
    name: "Greensleeves",
    tempo: 80,
    notes: [
      { note: 'A3', duration: 0.5, startTime: 0 },
      { note: 'B3', duration: 0.5, startTime: 0.5 },
      { note: 'C4', duration: 0.5, startTime: 1.0 },
      { note: 'D4', duration: 0.5, startTime: 1.5 },
      { note: 'E4', duration: 0.5, startTime: 2.0 },
      { note: 'F4', duration: 0.5, startTime: 2.5 },
      { note: 'E4', duration: 0.5, startTime: 3.0 },
      { note: 'D4', duration: 0.5, startTime: 3.5 },
      
      { note: 'C4', duration: 0.5, startTime: 4.0 },
      { note: 'B3', duration: 0.5, startTime: 4.5 },
      { note: 'A3', duration: 0.5, startTime: 5.0 },
      { note: 'G3', duration: 0.5, startTime: 5.5 },
      { note: 'A3', duration: 0.5, startTime: 6.0 },
      { note: 'B3', duration: 0.5, startTime: 6.5 },
      { note: 'C4', duration: 0.5, startTime: 7.0 },
      { note: 'D4', duration: 0.5, startTime: 7.5 },
      
      { note: 'E4', duration: 0.5, startTime: 8.0 },
      { note: 'F4', duration: 0.5, startTime: 8.5 },
      { note: 'E4', duration: 0.5, startTime: 9.0 },
      { note: 'D4', duration: 0.5, startTime: 9.5 },
      { note: 'C4', duration: 0.5, startTime: 10.0 },
      { note: 'B3', duration: 0.5, startTime: 10.5 },
      { note: 'A3', duration: 0.5, startTime: 11.0 },
      { note: 'G3', duration: 0.5, startTime: 11.5 },
      
      { note: 'A3', duration: 1.0, startTime: 12.0 },
      { note: 'G3', duration: 1.0, startTime: 13.0 },
      { note: 'A3', duration: 1.0, startTime: 14.0 },
      { note: 'B3', duration: 1.0, startTime: 15.0 },
    ]
  };

  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song>(furElise);
  const [soundSettings, setSoundSettings] = useState<SoundSettings>({
    waveform: 'sine',
    filterType: 'lowpass',
    filterFrequency: 2000,
    filterQ: 1,
    attack: 0.01,
    decay: 0.5,
    sustain: 0.3,
    release: 2
  });
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<Map<string, OscillatorNode>>(new Map());
  const filtersRef = useRef<Map<string, BiquadFilterNode>>(new Map());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const waveformCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioDataRef = useRef<Float32Array>(new Float32Array(1024));
  const songTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  // Initialize audio context and canvas
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create audio analyzer
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048;
    analyserRef.current.smoothingTimeConstant = 0.8;
    
    // Set canvas dimensions
    const canvas = canvasRef.current;
    const waveformCanvas = waveformCanvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    if (waveformCanvas) {
      waveformCanvas.width = window.innerWidth;
      waveformCanvas.height = 200;
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      if (waveformCanvas) {
        waveformCanvas.width = window.innerWidth;
        waveformCanvas.height = 200;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      audioContextRef.current?.close();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let isActive = true;

    const animate = () => {
      if (!isActive) return;
      
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        setParticles(prevParticles => {
          const updatedParticles = prevParticles
            .map(particle => ({
              ...particle,
              x: particle.x + particle.vx,
              y: particle.y + particle.vy,
              life: particle.life - 1,
              vy: particle.vy + 0.1, // gravity
            }))
            .filter(particle => particle.life > 0);

          // Draw particles
          updatedParticles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });

          return updatedParticles;
        });

        animationId = requestAnimationFrame(animate);
      } catch (error) {
        console.warn('Particle animation error:', error);
        // Stop animation on error
        isActive = false;
      }
    };

    animate();

    return () => {
      isActive = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []); // Empty dependency array - only run once

  // Real-time waveform animation
  useEffect(() => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isActive = true;

    const animateWaveform = () => {
      if (!isActive) return;

      try {
        // Clear canvas completely
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Get real-time audio data
        if (analyserRef.current) {
          analyserRef.current.getFloatTimeDomainData(audioDataRef.current);
          
          // Check if there's any significant audio activity
          let hasAudio = false;
          let maxAmplitude = 0;
          
          for (let i = 0; i < audioDataRef.current.length; i++) {
            const amplitude = Math.abs(audioDataRef.current[i]);
            maxAmplitude = Math.max(maxAmplitude, amplitude);
            if (amplitude > 0.01) { // Threshold for audio detection
              hasAudio = true;
            }
          }
          
          // Only draw waveform if there's audio
          if (hasAudio && maxAmplitude > 0.005) {
            ctx.save();
            ctx.strokeStyle = '#C5BFFF';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#C5BFFF';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            
            const sliceWidth = canvas.width / audioDataRef.current.length;
            let x = 0;
            
            for (let i = 0; i < audioDataRef.current.length; i++) {
              const v = audioDataRef.current[i] * 100; // Amplify the signal
              const y = canvas.height / 2 + v;
              
              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
              
              x += sliceWidth;
            }
            
            ctx.stroke();
            ctx.restore();
          }
        }

        animationFrameRef.current = requestAnimationFrame(animateWaveform);
      } catch (error) {
        console.warn('Waveform animation error:', error);
        isActive = false;
      }
    };

    animateWaveform();

    return () => {
      isActive = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const getBlackKeyPosition = (index: number) => {
    // Simple approach: position each black key based on its position in the keyboard
    // Each black key should be positioned between two white keys
    
    const blackKeyPositions: { [key: number]: string } = {
      // Lower octave (C3-B3)
      1: 'calc(1 * var(--white-key-width) - var(--black-key-width) / 2)',   // C#3 between C3 and D3
      3: 'calc(2 * var(--white-key-width) - var(--black-key-width) / 2)',   // D#3 between D3 and E3
      6: 'calc(4 * var(--white-key-width) - var(--black-key-width) / 2)',   // F#3 between F3 and G3
      8: 'calc(5 * var(--white-key-width) - var(--black-key-width) / 2)',   // G#3 between G3 and A3
      10: 'calc(6 * var(--white-key-width) - var(--black-key-width) / 2)',  // A#3 between A3 and B3
      // Middle octave (C4-C5) - offset by 7 white keys from lower octave
      13: 'calc(8 * var(--white-key-width) - var(--black-key-width) / 2)',  // C#4 between C4 and D4
      15: 'calc(9 * var(--white-key-width) - var(--black-key-width) / 2)',  // D#4 between D4 and E4
      18: 'calc(11 * var(--white-key-width) - var(--black-key-width) / 2)', // F#4 between F4 and G4
      20: 'calc(12 * var(--white-key-width) - var(--black-key-width) / 2)', // G#4 between G4 and A4
      22: 'calc(13 * var(--white-key-width) - var(--black-key-width) / 2)', // A#4 between A4 and B4
      // Additional black keys for Moonlight Sonata (these will be positioned correctly by the existing logic)
      25: 'calc(1 * var(--white-key-width) - var(--black-key-width) / 2)',  // C#3 (duplicate, will be handled)
      26: 'calc(4 * var(--white-key-width) - var(--black-key-width) / 2)',  // F#3 (duplicate, will be handled)
      27: 'calc(5 * var(--white-key-width) - var(--black-key-width) / 2)',  // G#3 (duplicate, will be handled)
      28: 'calc(6 * var(--white-key-width) - var(--black-key-width) / 2)',  // A#3 (duplicate, will be handled)
      29: 'calc(8 * var(--white-key-width) - var(--black-key-width) / 2)',  // C#4 (duplicate, will be handled)
      30: 'calc(11 * var(--white-key-width) - var(--black-key-width) / 2)', // F#4 (duplicate, will be handled)
      31: 'calc(12 * var(--white-key-width) - var(--black-key-width) / 2)', // G#4 (duplicate, will be handled)
      32: 'calc(13 * var(--white-key-width) - var(--black-key-width) / 2)', // A#4 (duplicate, will be handled)
    };
    
    return blackKeyPositions[index] || '0px';
  };

  const createParticles = (x: number, y: number, color: string) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4 - 2,
        life: 60,
        maxLife: 60,
        color,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  const playNote = (key: Key) => {
    if (!audioContextRef.current || !analyserRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    const filter = audioContextRef.current.createBiquadFilter();
    
    // Configure filter
    filter.type = soundSettings.filterType;
    filter.frequency.setValueAtTime(soundSettings.filterFrequency, audioContextRef.current.currentTime);
    filter.Q.setValueAtTime(soundSettings.filterQ, audioContextRef.current.currentTime);
    
    // Connect audio chain
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);
    
    // Configure oscillator
    oscillator.frequency.setValueAtTime(key.frequency, audioContextRef.current.currentTime);
    oscillator.type = soundSettings.waveform;
    
    // Configure envelope (ADSR)
    const now = audioContextRef.current.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(soundSettings.sustain, now + soundSettings.attack);
    gainNode.gain.linearRampToValueAtTime(soundSettings.sustain * 0.1, now + soundSettings.attack + soundSettings.decay);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + soundSettings.attack + soundSettings.decay + soundSettings.release);
    
    oscillator.start();
    oscillator.stop(now + soundSettings.attack + soundSettings.decay + soundSettings.release);
    
    oscillatorsRef.current.set(key.note, oscillator);
    filtersRef.current.set(key.note, filter);
    setActiveKeys(prev => new Set([...prev, key.note]));
    setIsPlaying(true);
    
    // Create particles at the key position
    const keyElement = document.querySelector(`[data-note="${key.note}"]`) as HTMLElement;
    if (keyElement && keyElement.getBoundingClientRect) {
      try {
        const rect = keyElement.getBoundingClientRect();
        createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, key.color);
      } catch (error) {
        // Fallback: create particles at a default position
        createParticles(window.innerWidth / 2, window.innerHeight / 2, key.color);
      }
    }
  };

  const stopNote = (key: Key) => {
    const oscillator = oscillatorsRef.current.get(key.note);
    const filter = filtersRef.current.get(key.note);
    
    if (oscillator) {
      oscillator.stop();
      oscillatorsRef.current.delete(key.note);
    }
    if (filter) {
      filtersRef.current.delete(key.note);
    }
    
    setActiveKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(key.note);
      return newSet;
    });
  };

  const handleKeyDown = (key: Key) => {
    if (!activeKeys.has(key.note)) {
      playNote(key);
    }
  };

  const handleKeyUp = (key: Key) => {
    stopNote(key);
  };

  // Song playback functions
  const playSong = (song: Song) => {
    if (!audioContextRef.current || isSongPlaying) return;
    
    setIsSongPlaying(true);
    const startTime = audioContextRef.current.currentTime;
    
    // Clear any existing timeouts
    songTimeoutRef.current.forEach(timeout => clearTimeout(timeout));
    songTimeoutRef.current = [];
    
    song.notes.forEach(songNote => {
      const key = keys.find(k => k.note === songNote.note);
      if (!key) return;
      
      const timeout = setTimeout(() => {
        playNote(key);
        
        // Stop the note after its duration
        const stopTimeout = setTimeout(() => {
          stopNote(key);
        }, songNote.duration * 1000);
        
        songTimeoutRef.current.push(stopTimeout);
      }, songNote.startTime * 1000);
      
      songTimeoutRef.current.push(timeout);
    });
    
    // Stop song playing state after the last note
    const totalDuration = Math.max(...song.notes.map(n => n.startTime + n.duration));
    const endTimeout = setTimeout(() => {
      setIsSongPlaying(false);
    }, totalDuration * 1000);
    
    songTimeoutRef.current.push(endTimeout);
  };

  const stopSong = () => {
    songTimeoutRef.current.forEach(timeout => clearTimeout(timeout));
    songTimeoutRef.current = [];
    setIsSongPlaying(false);
    
    // Stop all currently playing notes
    activeKeys.forEach(note => {
      const key = keys.find(k => k.note === note);
      if (key) stopNote(key);
    });
  };

  // Keyboard controls
  useEffect(() => {
    const keyMap: { [key: string]: Key } = {
      // Lower octave (C3-B3) - use number keys 1-0 and some symbols
      '1': keys[0], '!': keys[1], '2': keys[2], '@': keys[3], '3': keys[4],
      '4': keys[5], '#': keys[6], '5': keys[7], '$': keys[8], '6': keys[9],
      '%': keys[10], '7': keys[11], '8': keys[12],
      // Middle octave (C4-C5) - use letter keys A-K and W-U
      'a': keys[13], 'w': keys[14], 's': keys[15], 'e': keys[16], 'd': keys[17],
      'f': keys[18], 't': keys[19], 'g': keys[20], 'y': keys[21], 'h': keys[22],
      'u': keys[23], 'j': keys[24], 'k': keys[25], 'l': keys[26]
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = keyMap[e.key.toLowerCase()];
      if (key && !e.repeat) {
        playNote(key);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = keyMap[e.key.toLowerCase()];
      if (key) {
        stopNote(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keys]);

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.particleCanvas}
      />
      
      <a href="/" className={styles.backButton}>
        ← Back to Home
      </a>
      
      <div className={styles.header}>
        <h1>Cosmic Synthesizer</h1>
        <p>Press keys or use your keyboard to create ethereal sounds across two octaves</p>
      </div>

      <div className={styles.synthesizer}>
        <div className={styles.waveformContainer}>
          <canvas
            ref={waveformCanvasRef}
            className={styles.waveformCanvas}
          />
        </div>
        <div className={styles.keysContainer}>
          {keys.map((key, index) => (
            <div
              key={key.note}
              data-note={key.note}
              data-black={key.isBlack}
              className={`${styles.key} ${activeKeys.has(key.note) ? styles.active : ''}`}
              style={{
                '--key-color': key.color,
                '--key-index': index,
                ...(key.isBlack && {
                  '--black-key-left': getBlackKeyPosition(index),
                }),
              } as React.CSSProperties}
              onMouseDown={() => handleKeyDown(key)}
              onMouseUp={() => handleKeyUp(key)}
              onMouseLeave={() => handleKeyUp(key)}
              onTouchStart={(e) => {
                e.preventDefault();
                handleKeyDown(key);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleKeyUp(key);
              }}
            >
              <span className={styles.keyLabel}>{key.note}</span>
              <div className={styles.keyGlow} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.status}>
          {isPlaying ? (
            <div className={styles.playingIndicator}>
              <span className={styles.pulse}></span>
              Playing...
            </div>
          ) : (
            <div className={styles.idleIndicator}>Ready to play</div>
          )}
        </div>
        
        <div className={styles.controlButtons}>
          <button 
            className={styles.settingsButton}
            onClick={() => setShowSettings(!showSettings)}
          >
            {showSettings ? 'Hide' : 'Show'} Sound Settings
          </button>
          
          <button 
            className={styles.instructionsButton}
            onClick={() => setShowInstructions(!showInstructions)}
          >
            {showInstructions ? 'Hide' : 'Show'} How to Play
          </button>
          
          <div className={styles.songSelector}>
            <select 
              value={selectedSong.name}
              onChange={(e) => {
                let song: Song;
                switch(e.target.value) {
                  case "Für Elise":
                    song = furElise;
                    break;
                  case "Moonlight Sonata":
                    song = moonlightSonata;
                    break;
                  case "Canon in D":
                    song = canonInD;
                    break;
                  case "Twinkle Twinkle":
                    song = twinkleStar;
                    break;
                  case "Ode to Joy":
                    song = odeToJoy;
                    break;
                  case "Greensleeves":
                    song = greensleeves;
                    break;
                  default:
                    song = furElise;
                }
                setSelectedSong(song);
              }}
              disabled={isSongPlaying}
            >
              <option value="Für Elise">Für Elise</option>
              <option value="Moonlight Sonata">Moonlight Sonata</option>
              <option value="Canon in D">Canon in D</option>
              <option value="Twinkle Twinkle">Twinkle Twinkle</option>
              <option value="Ode to Joy">Ode to Joy</option>
              <option value="Greensleeves">Greensleeves</option>
            </select>
            
            <button 
              className={`${styles.songButton} ${isSongPlaying ? styles.playing : ''}`}
              onClick={() => isSongPlaying ? stopSong() : playSong(selectedSong)}
              disabled={!audioContextRef.current}
            >
              {isSongPlaying ? 'Stop' : 'Play'} {selectedSong.name}
            </button>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className={styles.settingsPanel}>
          <h3>Sound Settings</h3>
          
          <div className={styles.settingGroup}>
            <label>
              Waveform:
              <select 
                value={soundSettings.waveform}
                onChange={(e) => setSoundSettings(prev => ({ ...prev, waveform: e.target.value as OscillatorType }))}
              >
                <option value="sine">Sine (Smooth)</option>
                <option value="square">Square (Harsh)</option>
                <option value="sawtooth">Sawtooth (Bright)</option>
                <option value="triangle">Triangle (Mellow)</option>
              </select>
            </label>
          </div>

          <div className={styles.settingGroup}>
            <label>
              Filter Type:
              <select 
                value={soundSettings.filterType}
                onChange={(e) => setSoundSettings(prev => ({ ...prev, filterType: e.target.value as BiquadFilterType }))}
              >
                <option value="lowpass">Low Pass (Warm)</option>
                <option value="highpass">High Pass (Bright)</option>
                <option value="bandpass">Band Pass (Focused)</option>
                <option value="notch">Notch (Hollow)</option>
              </select>
            </label>
          </div>

          <div className={styles.settingGroup}>
            <label>
              Filter Frequency: {soundSettings.filterFrequency}Hz
              <input 
                type="range" 
                min="20" 
                max="20000" 
                value={soundSettings.filterFrequency}
                onChange={(e) => setSoundSettings(prev => ({ ...prev, filterFrequency: Number(e.target.value) }))}
              />
            </label>
          </div>

          <div className={styles.settingGroup}>
            <label>
              Filter Resonance: {soundSettings.filterQ}
              <input 
                type="range" 
                min="0.1" 
                max="10" 
                step="0.1"
                value={soundSettings.filterQ}
                onChange={(e) => setSoundSettings(prev => ({ ...prev, filterQ: Number(e.target.value) }))}
              />
            </label>
          </div>

          <div className={styles.settingGroup}>
            <label>
              Attack: {soundSettings.attack}s
              <input 
                type="range" 
                min="0.001" 
                max="2" 
                step="0.01"
                value={soundSettings.attack}
                onChange={(e) => setSoundSettings(prev => ({ ...prev, attack: Number(e.target.value) }))}
              />
            </label>
          </div>

          <div className={styles.settingGroup}>
            <label>
              Decay: {soundSettings.decay}s
              <input 
                type="range" 
                min="0.01" 
                max="2" 
                step="0.01"
                value={soundSettings.decay}
                onChange={(e) => setSoundSettings(prev => ({ ...prev, decay: Number(e.target.value) }))}
              />
            </label>
          </div>

          <div className={styles.settingGroup}>
            <label>
              Sustain: {soundSettings.sustain}
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01"
                value={soundSettings.sustain}
                onChange={(e) => setSoundSettings(prev => ({ ...prev, sustain: Number(e.target.value) }))}
              />
            </label>
          </div>

          <div className={styles.settingGroup}>
            <label>
              Release: {soundSettings.release}s
              <input 
                type="range" 
                min="0.01" 
                max="5" 
                step="0.01"
                value={soundSettings.release}
                onChange={(e) => setSoundSettings(prev => ({ ...prev, release: Number(e.target.value) }))}
              />
            </label>
          </div>
        </div>
      )}

      {showInstructions && (
        <div className={styles.instructionsPanel}>
          <h3>How to Play</h3>
          <ul>
            <li>Click or tap the floating keys</li>
            <li>Lower octave (C3-B3): Use number keys 1-8 and symbols !@#$%</li>
            <li>Middle octave (C4-C5): Use letter keys A-L and W-U</li>
            <li>Watch the cosmic particles dance</li>
            <li>See the waveform visualization above</li>
            <li>Create your own ethereal melodies across two octaves</li>
            <li>Experiment with sound settings for different tones</li>
            <li>Choose from 6 beautiful pieces: Für Elise, Moonlight Sonata, Canon in D, Twinkle Twinkle, Ode to Joy, and Greensleeves</li>
          </ul>
        </div>
      )}
    </div>
  );
} 