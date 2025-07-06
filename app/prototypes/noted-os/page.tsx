"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

// Add hydration safety
const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
};

interface Window {
  id: string;
  type: 'text' | 'drawing';
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  content: string;
  zIndex: number;
  drawingStrokes?: DrawingStroke[];
  currentStroke?: DrawingStroke | null;
  isDrawing?: boolean;
}

interface DrawingPoint {
  x: number;
  y: number;
  color: string;
  size: number;
}

interface DrawingStroke {
  points: DrawingPoint[];
  color: string;
  size: number;
}

export default function NotedOS() {
  const hydrated = useHydrated();
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(1);
  const [drawingColor, setDrawingColor] = useState('#3cc6c8');
  const [drawingSize, setDrawingSize] = useState(2);
  const [snapToGrid, setSnapToGrid] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  
  const canvasRefs = useRef<{ [key: string]: HTMLCanvasElement | null }>({});
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const draggedWindow = useRef<string | null>(null);
  const originalWindowPos = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });

  // Load windows from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWindows = localStorage.getItem('notedOS_windows');
      if (savedWindows) {
        const parsed = JSON.parse(savedWindows);
        setWindows(parsed);
        setNextZIndex(Math.max(...parsed.map((w: Window) => w.zIndex), 0) + 1);
      }
    }
  }, []);

  // Save windows to localStorage when they change (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined' && hydrated) {
      localStorage.setItem('notedOS_windows', JSON.stringify(windows));
    }
  }, [windows, hydrated]);

  // Update clock (client-side only)
  useEffect(() => {
    if (!hydrated) return;
    
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, [hydrated]);

  const createWindow = (type: 'text' | 'drawing') => {
    if (!hydrated) return;
    
    const newWindow: Window = {
      id: `window_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
      type,
      title: type === 'text' ? 'Untitled Note' : 'Drawing Canvas',
      x: 50 + windows.length * 20,
      y: 50 + windows.length * 20,
      width: type === 'text' ? 400 : 500,
      height: type === 'text' ? 300 : 400,
      isMinimized: false,
      isMaximized: false,
      content: '',
      zIndex: nextZIndex,
      drawingStrokes: type === 'drawing' ? [] : undefined,
      currentStroke: type === 'drawing' ? null : undefined,
      isDrawing: type === 'drawing' ? false : undefined
    };
    
    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
    setActiveWindow(newWindow.id);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const bringToFront = (id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        // If window is minimized, restore it; otherwise just bring to front
        return { 
          ...w, 
          zIndex: nextZIndex, 
          isMinimized: false 
        };
      }
      return w;
    }));
    setNextZIndex(prev => prev + 1);
    setActiveWindow(id);
  };

  const updateWindowContent = (id: string, content: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, content, title: content.split('\n')[0] || 'Untitled Note' } : w
    ));
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    // Check if the click is on the title bar or its children
    const target = e.target as HTMLElement;
    const titleBar = target.closest(`.${styles.titleBar}`);
    
    if (titleBar) {
      e.preventDefault();
      const window = windows.find(w => w.id === id);
      if (window) {
        isDragging.current = true;
        draggedWindow.current = id;
        dragStart.current = { x: e.clientX, y: e.clientY };
        originalWindowPos.current = { x: window.x, y: window.y };
        bringToFront(id);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current && draggedWindow.current) {
      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;
      
      let newX = originalWindowPos.current.x + deltaX;
      let newY = originalWindowPos.current.y + deltaY;
      
      if (snapToGrid) {
        newX = Math.round(newX / 20) * 20;
        newY = Math.round(newY / 20) * 20;
      }
      
      // Update the window position directly in React state
      setWindows(prev => prev.map(w => {
        if (w.id === draggedWindow.current) {
          return { ...w, x: newX, y: newY };
        }
        return w;
      }));
    }
  };

  const handleMouseUp = (e?: React.MouseEvent) => {
    if (isDragging.current && draggedWindow.current) {
      // The position is already updated during drag, just clean up
      isDragging.current = false;
      draggedWindow.current = null;
      dragOffset.current = { x: 0, y: 0 };
    }
  };

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>, windowId: string) => {
    const canvas = canvasRefs.current[windowId];
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newStroke: DrawingStroke = {
      points: [{ x, y, color: drawingColor, size: drawingSize }],
      color: drawingColor,
      size: drawingSize
    };
    
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isDrawing: true, currentStroke: newStroke } : w
    ));
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>, windowId: string) => {
    const window = windows.find(w => w.id === windowId);
    if (!window?.isDrawing || !window?.currentStroke) return;
    
    const canvas = canvasRefs.current[windowId];
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setWindows(prev => prev.map(w => {
      if (w.id === windowId && w.currentStroke) {
        return {
          ...w,
          currentStroke: {
            ...w.currentStroke,
            points: [...w.currentStroke.points, { x, y, color: drawingColor, size: drawingSize }]
          }
        };
      }
      return w;
    }));
  };

  const stopDrawing = (windowId: string) => {
    const window = windows.find(w => w.id === windowId);
    if (!window?.currentStroke) return;
    
    setWindows(prev => prev.map(w => {
      if (w.id === windowId) {
        return {
          ...w,
          isDrawing: false,
          currentStroke: null,
          drawingStrokes: [...(w.drawingStrokes || []), w.currentStroke!]
        };
      }
      return w;
    }));
  };

  const clearCanvas = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, drawingStrokes: [], currentStroke: null } : w
    ));
  };

  const undoLastStroke = (windowId: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === windowId && w.drawingStrokes) {
        return {
          ...w,
          drawingStrokes: w.drawingStrokes.slice(0, -1)
        };
      }
      return w;
    }));
  };

  // Render drawing for all drawing windows
  useEffect(() => {
    windows.forEach(window => {
      if (window.type !== 'drawing') return;
      
      const canvas = canvasRefs.current[window.id];
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw all strokes
      const allStrokes = [...(window.drawingStrokes || []), window.currentStroke].filter(Boolean);
      allStrokes.forEach(stroke => {
        if (!stroke || stroke.points.length < 2) return;
        
        ctx.beginPath();
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      });
    });
  }, [windows]);

  // Don't render until hydrated to prevent hydration mismatch
  if (!hydrated) {
    return (
      <div className={styles.notedOS}>
        <div className={styles.desktop}>
          <div className={styles.taskbar}>
            <div className={styles.startButton}>
              <span>Start</span>
            </div>
            <div className={styles.taskbarCenter}></div>
            <div className={styles.taskbarRight}>
              <div className={styles.clock}>--:--:--</div>
            </div>
          </div>
          <div className={styles.desktopIcons}>
            <div className={styles.desktopIcon}>
              <div className={styles.icon}>📝</div>
              <span>New Note</span>
            </div>
            <div className={styles.desktopIcon}>
              <div className={styles.icon}>🎨</div>
              <span>New Drawing</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function playBeep() {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'square';
    oscillator.frequency.value = 880;
    gain.gain.value = 0.08;
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.08);
    oscillator.onended = () => ctx.close();
  }

  return (
    <div className={styles.notedOS} onMouseMove={handleMouseMove} onMouseUp={(e) => handleMouseUp(e)}>
      {/* Desktop */}
      <div className={styles.desktop}>
        {/* Footer (Luman CRT style) */}
        <footer className={styles.footer}>
          <span className={styles.footerBrand}>LUMON INDUSTRIES</span>
          <div className={styles.footerMinimized}>
            {windows.filter(w => w.isMinimized).map(window => (
              <button
                key={window.id}
                className={styles.minimizedButton}
                onClick={() => bringToFront(window.id)}
                title={window.title}
              >
                <span className={styles.minimizedIcon}>{window.type === 'text' ? '📝' : '🎨'}</span>
                <span className={styles.minimizedTitle}>{window.title}</span>
              </button>
            ))}
          </div>
          <span className={styles.footerClock}>{hydrated ? currentTime : '--:--:--'}</span>
        </footer>
        {/* Desktop Icons */}
        <div className={styles.desktopIcons}>
          <button className={styles.desktopIcon} onClick={() => { playBeep(); createWindow('text'); }}>
            <span>NEW NOTE</span>
          </button>
          <button className={styles.desktopIcon} onClick={() => { playBeep(); createWindow('drawing'); }}>
            <span>NEW DRAWING</span>
          </button>
        </div>

        {/* Windows */}
        {windows.map(window => (
          <div
            key={window.id}
            data-window-id={window.id}
            className={`${styles.window} ${window.isMinimized ? styles.minimized : ''} ${window.isMaximized ? styles.maximized : ''}`}
            style={{
              left: window.isMaximized ? 0 : window.x,
              top: window.isMaximized ? 40 : window.y,
              width: window.isMaximized ? '100%' : window.width,
              height: window.isMaximized ? 'calc(100% - 40px)' : window.height,
              zIndex: window.zIndex
            }}
          >
            {/* Window Title Bar */}
            <div 
              className={styles.titleBar}
              onMouseDown={(e) => handleMouseDown(e, window.id)}
            >
              <div className={styles.titleBarLeft}>
                <span className={styles.windowIcon}>
                  {window.type === 'text' ? '📝' : '🎨'}
                </span>
                <span className={styles.windowTitle}>{window.title}</span>
              </div>
              <div className={styles.windowControls}>
                <button 
                  className={styles.controlButton}
                  onClick={() => minimizeWindow(window.id)}
                >
                  −
                </button>
                <button 
                  className={styles.controlButton}
                  onClick={() => maximizeWindow(window.id)}
                >
                  □
                </button>
                <button 
                  className={styles.controlButton}
                  onClick={() => closeWindow(window.id)}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div className={styles.windowContent}>
              {window.type === 'text' ? (
                <textarea
                  className={styles.textEditor}
                  value={window.content}
                  onChange={(e) => updateWindowContent(window.id, e.target.value)}
                  placeholder="Start typing your note..."
                  autoFocus
                />
              ) : (
                <div className={styles.drawingWindow}>
                  <div className={styles.drawingToolbar}>
                    <input
                      type="color"
                      value={drawingColor}
                      onChange={(e) => setDrawingColor(e.target.value)}
                      className={styles.colorPicker}
                    />
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={drawingSize}
                      onChange={(e) => setDrawingSize(Number(e.target.value))}
                      className={styles.sizeSlider}
                    />
                    <button onClick={() => undoLastStroke(window.id)} className={styles.toolbarButton}>
                      ↩️ Undo
                    </button>
                    <button onClick={() => clearCanvas(window.id)} className={styles.toolbarButton}>
                      🗑️ Clear
                    </button>
                  </div>
                  <canvas
                    ref={(el) => { canvasRefs.current[window.id] = el; }}
                    width={window.width - 40}
                    height={window.height - 80}
                    className={styles.drawingCanvas}
                    onMouseDown={(e) => startDrawing(e, window.id)}
                    onMouseMove={(e) => draw(e, window.id)}
                    onMouseUp={() => stopDrawing(window.id)}
                    onMouseLeave={() => stopDrawing(window.id)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 