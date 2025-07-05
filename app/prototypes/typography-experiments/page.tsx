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

  const effects = [
    { id: 'neon', name: 'Neon Glow' },
    { id: 'typewriter', name: 'Typewriter' },
    { id: 'skewed', name: '3D Skewed' },
    { id: 'gradient', name: 'Gradient Text' },
    { id: 'wavy', name: 'Wavy Text' },
    { id: 'circular', name: 'Circular Text' },
    { id: 'glitch', name: 'Glitch Effect' },
    { id: 'holographic', name: 'Holographic' },
    { id: 'matrix', name: 'Matrix Rain' },
    { id: 'bubble', name: 'Bubble Text' },
    { id: 'fire', name: 'Fire Text' },
    { id: 'morphing', name: 'Morphing Text' }
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
  font-weight: 900;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.wavyText span {
  display: inline-block;
  animation: wave 2s ease-in-out infinite;
  font-family: 'Roboto Flex', sans-serif;
  font-variation-settings: 'wght' 900;
}

@keyframes wave {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
  }
  50% {
    transform: translateY(-10px) rotate(-3deg);
  }
  75% {
    transform: translateY(-15px) rotate(2deg);
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
}

.glitchBase {
  position: relative;
  z-index: 1;
}

.glitchLayer1,
.glitchLayer2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: glitch 2s infinite;
}

.glitchLayer1 {
  color: #ff6b6b;
  z-index: 2;
  animation-delay: 0.1s;
}

.glitchLayer2 {
  color: #4ecdc4;
  z-index: 3;
  animation-delay: 0.2s;
}

@keyframes glitch {
  0%, 100% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
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
    matrix: `.matrixContainer {
  font-size: 3rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  color: #00ff00;
  text-shadow: 0 0 10px #00ff00;
}

.matrixChar {
  opacity: 0;
  animation: matrixFall 2s ease-in forwards;
}

@keyframes matrixFall {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0.8;
    transform: translateY(0);
  }
}`,
    bubble: `.bubbleContainer {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.bubbleChar {
  display: inline-block;
  animation: bubbleFloat 3s ease-in-out infinite;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
  border-radius: 50%;
  padding: 0.5rem;
  margin: 0.2rem;
  box-shadow: 
    0 0 20px rgba(255, 255, 255, 0.5),
    inset 0 0 20px rgba(255, 255, 255, 0.3);
}

@keyframes bubbleFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  25% {
    transform: translateY(-10px) scale(1.1);
  }
  50% {
    transform: translateY(-5px) scale(0.9);
  }
  75% {
    transform: translateY(-15px) scale(1.05);
  }
}`,
    fire: `.fireText {
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(45deg, #ff4500, #ff8c00, #ffd700, #ff4500);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fireFlicker 0.5s ease-in-out infinite;
  font-family: 'Inter', sans-serif;
}

.fireText::before {
  content: attr(data-text);
  position: absolute;
  background: linear-gradient(45deg, #ff0000, #ff6600, #ffcc00);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fireGlow 0.3s ease-in-out infinite;
  z-index: -1;
}

@keyframes fireFlicker {
  0%, 100% {
    background-position: 0% 50%;
    filter: brightness(1);
  }
  25% {
    background-position: 25% 50%;
    filter: brightness(1.1);
  }
  50% {
    background-position: 50% 50%;
    filter: brightness(0.9);
  }
  75% {
    background-position: 75% 50%;
    filter: brightness(1.2);
  }
}`,
    morphing: `.morphingContainer {
  font-size: 4rem;
  font-weight: 900;
  color: white;
  font-family: 'Inter', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.morphingChar {
  display: inline-block;
  animation: morphing 3s ease-in-out infinite;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

@keyframes morphing {
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

      {showCSS && (
        <div className={styles.cssCodeContainer}>
          <div className={styles.cssCodeHeader}>
            <h3>CSS Code for "{effects.find(e => e.id === selectedEffect)?.name}" Effect</h3>
            <p>Copy this CSS to recreate the effect in your own project!</p>
          </div>
          <pre className={styles.cssCode}>
            <code>{cssCode[selectedEffect as keyof typeof cssCode]}</code>
          </pre>
        </div>
      )}

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

          {selectedEffect === 'matrix' && (
            <div className={styles.matrixContainer}>
              {inputText.split('').map((char, index) => (
                <span
                  key={index}
                  className={styles.matrixChar}
                  style={{
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          )}

          {selectedEffect === 'bubble' && (
            <div className={styles.bubbleContainer}>
              {inputText.split('').map((char, index) => (
                <span
                  key={index}
                  className={styles.bubbleChar}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          )}

          {selectedEffect === 'fire' && (
            <div className={styles.fireText}>
              {inputText}
            </div>
          )}

          {selectedEffect === 'morphing' && (
            <div className={styles.morphingContainer}>
              <div className={styles.morphingText}>
                {inputText.split('').map((char, index) => (
                  <span
                    key={index}
                    className={styles.morphingChar}
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Experiment with different effects and see how CSS transforms your text!</p>
      </footer>
    </div>
  );
} 