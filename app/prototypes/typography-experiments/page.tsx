"use client";

// Template for creating a new prototype
// To use this template:
// 1. Create a new folder in app/prototypes with your prototype name
// 2. Copy this file and styles.module.css into your new folder
// 3. Create an 'images' folder for your prototype's images
// 4. Rename and customize the component and styles as needed

import { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

export default function TypographyExperiments() {
  const [inputText, setInputText] = useState('Type something magical here');
  const [selectedEffect, setSelectedEffect] = useState('neon');
  const [showCSS, setShowCSS] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  // Function to copy CSS to clipboard
  const copyToClipboard = async (cssCode: string) => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      setCopyStatus('Failed to copy');
      setTimeout(() => setCopyStatus(''), 2000);
    }
  };

  const effects = [
    { id: 'neon', name: 'Neon Glow' },
    { id: 'typewriter', name: 'Typewriter' },
    { id: 'skewed', name: '3D Skewed' },
    { id: 'glitch', name: 'Glitch Effect' },
    { id: 'gradient', name: 'Gradient Text' },
    { id: 'wavy', name: 'Wavy Text' },
    { id: 'circular', name: 'Circular Text' },
    { id: 'holographic', name: 'Holographic' },
    { id: 'gradient2', name: 'Gradient #2' },
    { id: '3d', name: '3D Text' },
    { id: 'blurry', name: 'Blurry Text' },
    { id: 'chaos', name: 'Chaos' }
  ];

  // CSS code snippets for each effect
  const cssCode = {
    neon: `.neonText {
  font-size: 4rem;
  font-weight: 900;
  color: white;
  text-shadow: 
    0 0 2px rgba(255, 255, 255, 0.8),
    0 0 4px rgba(255, 255, 255, 0.6),
    0 0 6px rgba(255, 255, 255, 0.4),
    0 0 8px rgba(255, 0, 128, 0.8),
    0 0 12px rgba(255, 0, 128, 0.6),
    0 0 16px rgba(255, 0, 128, 0.4),
    0 0 20px rgba(255, 0, 128, 0.3),
    0 0 24px rgba(255, 0, 128, 0.2);
  font-family: 'Caveat', cursive;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
}

.neonText::before {
  content: attr(data-text);
  position: absolute;
  color: transparent;
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
  z-index: -1;
}`,
    typewriter: `.typewriterText {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  font-family: 'Courier New', monospace;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.typewriterText span {
  opacity: 0;
  animation: typewriter 0.1s ease-in forwards;
}

@keyframes typewriter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
    skewed: `.skewedText {
  font-size: 5rem;
  font-weight: 900;
  color: white;
  text-shadow: 
    2px 2px 0 #ff6b6b,
    4px 4px 0 #4ecdc4,
    6px 6px 0 #45b7d1,
    8px 8px 0 #96ceb4,
    10px 10px 20px rgba(0, 0, 0, 0.5);
  transform: skew(-5deg, 5deg) rotate(-2deg);
  font-family: 'Roboto Flex', sans-serif;
  font-variation-settings: 'wght' 1000;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: skew(-5deg, 5deg) rotate(-2deg) translateY(0);
  }
  50% {
    transform: skew(-5deg, 5deg) rotate(-2deg) translateY(-10px);
  }
}`,
    gradient: `.gradientText {
  font-size: 4.5rem;
  font-weight: 900;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite;
  font-family: 'Inter', sans-serif;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}`,
    wavy: `.wavyText {
  font-size: 4rem;
  font-weight: 400;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.wavyText span {
  display: inline-block;
  animation: wave 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  font-family: 'Roboto Flex', sans-serif;
  font-variation-settings: 'wght' 400;
}

@keyframes wave {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-30px) rotate(8deg) scale(1.05);
  }
  50% {
    transform: translateY(-15px) rotate(-6deg) scale(0.95);
  }
  75% {
    transform: translateY(-25px) rotate(4deg) scale(1.02);
  }
}`,
    circular: `.circularContainer {
  width: 400px;
  height: 400px;
  margin: 0 auto;
  position: relative;
}

.circularText {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  border-radius: 50%;
}

.circularText span {
  position: absolute;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Inter', sans-serif;
  transform-origin: 150px 150px;
  left: 50%;
  top: 0;
  transform: rotate(var(--angle, 0deg)) translateX(150px) rotate(calc(-1 * var(--angle, 0deg)));
}`,
    glitch: `.glitchText {
  position: relative;
  font-size: 4rem;
  font-weight: 900;
  color: white;
  font-family: 'Roboto Flex', sans-serif;
  font-variation-settings: 'wght' 900;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.glitchBase {
  position: relative;
  z-index: 1;
  animation: glitchBase 4s infinite;
}

.glitchLayer1,
.glitchLayer2,
.glitchLayer3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: glitchRGB 3s infinite;
}

.glitchLayer1 {
  color: #ff0000;
  z-index: 2;
  animation-delay: 0.1s;
  mix-blend-mode: screen;
}

.glitchLayer2 {
  color: #00ff00;
  z-index: 3;
  animation-delay: 0.2s;
  mix-blend-mode: screen;
}

.glitchLayer3 {
  color: #0000ff;
  z-index: 4;
  animation-delay: 0.3s;
  mix-blend-mode: screen;
}

/* Scan lines effect */
.glitchText::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.1) 2px,
    rgba(255, 255, 255, 0.1) 4px
  );
  pointer-events: none;
  z-index: 5;
  animation: scanLines 0.1s infinite;
}

@keyframes glitchBase {
  0%, 90%, 100% {
    transform: translate(0);
    opacity: 1;
  }
  91% {
    transform: translate(-10px, 5px) skew(-5deg);
    opacity: 0.8;
  }
  92% {
    transform: translate(8px, -3px) skew(3deg);
    opacity: 0.9;
  }
  93% {
    transform: translate(-5px, 2px) skew(-2deg);
    opacity: 0.7;
  }
  94% {
    transform: translate(3px, -1px) skew(1deg);
    opacity: 0.8;
  }
  95% {
    transform: translate(-2px, 1px);
    opacity: 0.9;
  }
  96% {
    transform: translate(1px, -1px);
    opacity: 1;
  }
}

@keyframes glitchRGB {
  0%, 90%, 100% {
    transform: translate(0);
    opacity: 0;
  }
  91% {
    transform: translate(-15px, 0) skew(-10deg);
    opacity: 0.8;
  }
  92% {
    transform: translate(12px, 0) skew(8deg);
    opacity: 0.6;
  }
  93% {
    transform: translate(-8px, 0) skew(-5deg);
    opacity: 0.7;
  }
  94% {
    transform: translate(5px, 0) skew(3deg);
    opacity: 0.5;
  }
  95% {
    transform: translate(-3px, 0) skew(-2deg);
    opacity: 0.6;
  }
  96% {
    transform: translate(2px, 0) skew(1deg);
    opacity: 0.4;
  }
}

@keyframes scanLines {
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}`,
    holographic: `.holographicText {
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(
    45deg,
    #ff0000, #ff8000, #ffff00, #80ff00, #00ff00,
    #00ff80, #00ffff, #0080ff, #0000ff, #8000ff,
    #ff00ff, #ff0080
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: holographicShift 3s ease-in-out infinite;
  font-family: 'Inter', sans-serif;
}

.holographicText::before {
  content: attr(data-text);
  position: absolute;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 70%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 2s ease-in-out infinite;
  z-index: 1;
}

@keyframes holographicShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes shimmer {
  0%, 100% {
    background-position: -200% 0;
  }
  50% {
    background-position: 200% 0;
  }
}`,
    gradient2: `.gradient2Text {
  font-size: 4rem;
  font-weight: 900;
  color: transparent;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
  -webkit-background-clip: text;
  background-clip: text;
  font-family: 'Inter', sans-serif;
  padding: 1rem 2rem;
  border-radius: 15px;
}

/* Container styling for white background */
.typographyDisplay:has(.gradient2Text) {
  background-color: white;
  border-radius: 15px;
  padding: 1rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  min-height: auto;
}`,
    '3d': `.threeDText {
  font-size: 4rem;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 
    1px 1px 0 #ccc,
    2px 2px 0 #c9c9c9,
    3px 3px 0 #bbb,
    4px 4px 0 #b9b9b9,
    5px 5px 0 #aaa,
    6px 6px 1px rgba(0,0,0,.1),
    0 0 5px rgba(0,0,0,.1),
    0 1px 3px rgba(0,0,0,.3),
    0 3px 5px rgba(0,0,0,.2),
    0 5px 10px rgba(0,0,0,.25),
    0 10px 10px rgba(0,0,0,.2),
    0 20px 20px rgba(0,0,0,.15);
  font-family: 'Inter', sans-serif;
  transform: perspective(800px) rotateX(8deg);
  transition: all 0.3s ease;
}

.threeDText:hover {
  transform: perspective(800px) rotateX(8deg) scale(1.02);
  text-shadow: 
    1px 1px 0 #ccc,
    2px 2px 0 #c9c9c9,
    3px 3px 0 #bbb,
    4px 4px 0 #b9b9b9,
    5px 5px 0 #aaa,
    6px 6px 1px rgba(0,0,0,.1),
    0 0 5px rgba(0,0,0,.1),
    0 1px 3px rgba(0,0,0,.3),
    0 3px 5px rgba(0,0,0,.2),
    0 5px 10px rgba(0,0,0,.25),
    0 10px 10px rgba(0,0,0,.2),
    0 20px 20px rgba(0,0,0,.15),
    0 0 20px rgba(255,255,255,0.3);
}`,
    blurry: `.blurryText {
  font-size: 4rem;
  font-weight: 900;
  color: white;
  filter: blur(3px);
  font-family: 'Inter', sans-serif;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  transition: filter 0.3s ease;
}

.blurryText:hover {
  filter: blur(1px);
}`,
    chaos: `.chaosContainer {
  font-size: 4rem;
  font-weight: 900;
  color: white;
  font-family: 'Inter', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.chaosText {
  background: linear-gradient(135deg, rgba(255, 255, 196, 1.000) 0.000%, rgba(255, 97, 100, 1.000) 50.000%, rgba(176, 0, 18, 1.000) 100.000%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: chaos 3s ease-in-out infinite;
  position: relative;
  text-align: center;
}

@keyframes chaos {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    background-position: 0% 50%;
  }
  25% {
    transform: scale(1.2) rotate(5deg);
    background-position: 25% 50%;
  }
  50% {
    transform: scale(0.8) rotate(-5deg);
    background-position: 50% 50%;
  }
  75% {
    transform: scale(1.1) rotate(3deg);
    background-position: 75% 50%;
  }
}`
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.skewedHeading}>Lauralee's typography experiments</h1>
      </header>

      <div className={styles.controls}>
        <div className={styles.inputGroup}>
          <label htmlFor="textInput">Your Text:</label>
          <input
            id="textInput"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type something magical here"
            className={styles.textInput}
          />
        </div>

        <div className={styles.effectSelector}>
          <label>Choose Effect:</label>
          <div className={styles.effectButtons}>
            {effects.map((effect) => (
              <button
                key={effect.id}
                onClick={() => setSelectedEffect(effect.id)}
                className={`${styles.effectButton} ${
                  selectedEffect === effect.id ? styles.active : ''
                }`}
              >
                {effect.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.cssToggle}>
          <button
            onClick={() => setShowCSS(!showCSS)}
            className={styles.cssToggleButton}
          >
            {showCSS ? 'Hide CSS Code' : 'Show CSS Code'}
          </button>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.typographyDisplay}>
          {selectedEffect === 'wavy' && (
            <div className={styles.wavyText}>
              {inputText.split('').map((char, index) => (
                <span
                  key={index}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          )}

          {selectedEffect === 'circular' && (
            <div className={styles.circularContainer}>
              <div className={styles.circularText}>
                {inputText.split('').map((char, index) => {
                  // Start from -135 degrees (top-left) and go clockwise to the right
                  // Leave 20 degrees of space at the end (so text uses 340 degrees instead of 360)
                  const angle = -135 + (340 / inputText.length) * index;
                  return (
                    <span
                      key={index}
                      style={{
                        '--angle': `${angle}deg`
                      } as React.CSSProperties}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {selectedEffect === 'skewed' && (
            <div className={styles.skewedText}>
              {inputText}
            </div>
          )}

          {selectedEffect === 'gradient' && (
            <div className={styles.gradientText}>
              {inputText}
            </div>
          )}

          {selectedEffect === 'glitch' && (
            <div className={styles.glitchText}>
              <span className={styles.glitchBase}>{inputText}</span>
              <span className={styles.glitchLayer1}>{inputText}</span>
              <span className={styles.glitchLayer2}>{inputText}</span>
              <span className={styles.glitchLayer3}>{inputText}</span>
            </div>
          )}

          {selectedEffect === 'neon' && (
            <div className={styles.neonText} data-text={inputText}>
              {inputText}
            </div>
          )}

          {selectedEffect === 'typewriter' && (
            <div className={styles.typewriterText}>
              {inputText.split('').map((char, index) => (
                <span
                  key={index}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          )}

          {selectedEffect === 'holographic' && (
            <div className={styles.holographicText}>
              {inputText}
            </div>
          )}

          {selectedEffect === 'gradient2' && (
            <div className={styles.gradient2Text}>
              {inputText}
            </div>
          )}

          {selectedEffect === '3d' && (
            <div className={styles.threeDText}>
              {inputText}
            </div>
          )}

          {selectedEffect === 'blurry' && (
            <div className={styles.blurryText}>
              {inputText}
            </div>
          )}

          {selectedEffect === 'chaos' && (
            <div className={styles.chaosContainer}>
              <div className={styles.chaosText}>
                {inputText}
              </div>
            </div>
          )}
        </div>
      </main>

      {showCSS && (
        <div className={styles.cssCodeContainer}>
          <div className={styles.cssCodeHeader}>
            <div className={styles.cssCodeHeaderContent}>
              <h3>CSS Code for "{effects.find(e => e.id === selectedEffect)?.name}" Effect</h3>
              <p>Copy this CSS to recreate the effect in your own project!</p>
            </div>
            <button
              onClick={() => copyToClipboard(cssCode[selectedEffect as keyof typeof cssCode])}
              className={styles.copyButton}
            >
              {copyStatus || 'Copy CSS'}
            </button>
          </div>
          <pre className={styles.cssCode}>
            <code>{cssCode[selectedEffect as keyof typeof cssCode]}</code>
          </pre>
        </div>
      )}

      <footer className={styles.footer}>
        <p>Experiment with different effects and see how CSS transforms your text!</p>
      </footer>
    </div>
  );
} 