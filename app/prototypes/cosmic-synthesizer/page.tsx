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

export default function CosmicSynthesizer() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<Map<string, OscillatorNode>>(new Map());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const waveformCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioDataRef = useRef<Float32Array>(new Float32Array(1024));

  // Define the cosmic scale (pentatonic for a more ethereal sound)
  const keys: Key[] = [
    { note: 'C', frequency: 261.63, color: '#C5BFFF', isBlack: false },
    { note: 'C#', frequency: 277.18, color: '#2D1B69', isBlack: true },
    { note: 'D', frequency: 293.66, color: '#B8A9FF', isBlack: false },
    { note: 'D#', frequency: 311.13, color: '#2D1B69', isBlack: true },
    { note: 'E', frequency: 329.63, color: '#AB93FF', isBlack: false },
    { note: 'F', frequency: 349.23, color: '#9E7DFF', isBlack: false },
    { note: 'F#', frequency: 369.99, color: '#2D1B69', isBlack: true },
    { note: 'G', frequency: 392.00, color: '#9167FF', isBlack: false },
    { note: 'G#', frequency: 415.30, color: '#2D1B69', isBlack: true },
    { note: 'A', frequency: 440.00, color: '#8451FF', isBlack: false },
    { note: 'A#', frequency: 466.16, color: '#2D1B69', isBlack: true },
    { note: 'B', frequency: 493.88, color: '#773BFF', isBlack: false },
    { note: 'C2', frequency: 523.25, color: '#6A25FF', isBlack: false },
  ];

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
    // Map each black key to its proper position between white keys
    const blackKeyPositions: { [key: number]: string } = {
      1: 'calc(1 * var(--white-key-width) - var(--black-key-width) / 2)',   // C# between C and D
      3: 'calc(2 * var(--white-key-width) - var(--black-key-width) / 2)',   // D# between D and E
      6: 'calc(4 * var(--white-key-width) - var(--black-key-width) / 2)',   // F# between F and G
      8: 'calc(5 * var(--white-key-width) - var(--black-key-width) / 2)',   // G# between G and A
      10: 'calc(6 * var(--white-key-width) - var(--black-key-width) / 2)', // A# between A and B
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
    
    oscillator.connect(gainNode);
    gainNode.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(key.frequency, audioContextRef.current.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContextRef.current.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 2);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 2);
    
    oscillatorsRef.current.set(key.note, oscillator);
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
    if (oscillator) {
      oscillator.stop();
      oscillatorsRef.current.delete(key.note);
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

  // Keyboard controls
  useEffect(() => {
    const keyMap: { [key: string]: Key } = {
      'a': keys[0], 'w': keys[1], 's': keys[2], 'e': keys[3], 'd': keys[4],
      'f': keys[5], 't': keys[6], 'g': keys[7], 'y': keys[8], 'h': keys[9],
      'u': keys[10], 'j': keys[11], 'k': keys[12]
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
      
      <div className={styles.header}>
        <h1>Cosmic Synthesizer</h1>
        <p>Press keys or use A-K and W-U on your keyboard to create ethereal sounds</p>
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
      </div>

      <div className={styles.instructions}>
        <h3>How to play:</h3>
        <ul>
          <li>Click or tap the floating keys</li>
          <li>Use your keyboard: A, W, S, E, D, F, T, G, Y, H, U, J, K</li>
          <li>Watch the cosmic particles dance</li>
          <li>See the waveform visualization above</li>
          <li>Create your own ethereal melodies</li>
        </ul>
      </div>
    </div>
  );
} 