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
  const [selectedEffect, setSelectedEffect] = useState('wavy');

  const effects = [
    { id: 'wavy', name: 'Wavy Text' },
    { id: 'circular', name: 'Circular Text' },
    { id: 'skewed', name: '3D Skewed' },
    { id: 'gradient', name: 'Gradient Text' },
    { id: 'glitch', name: 'Glitch Effect' },
    { id: 'neon', name: 'Neon Glow' }
  ];

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
            </div>
          )}

          {selectedEffect === 'neon' && (
            <div className={styles.neonText}>
              {inputText}
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