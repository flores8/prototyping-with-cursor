# Noted OS - Classic Operating System Note-Taking Interface

Noted OS reimagines digital note-taking through the lens of classic operating system interfaces, providing a nostalgic yet modern experience for creative professionals and tech enthusiasts.

## 🎯 Target Audience

1. **Creative professionals** seeking a modern and visually engaging note-taking system
2. **Tech enthusiasts** who appreciate nostalgic UI elements and customizable interfaces

## ✨ Key Features

### 1. Window Management System
A flexible window-based organization system that allows users to arrange notes spatially.

- **Draggable Windows**: Windows maintain position after drag with smooth movement
- **No Lag**: Optimized performance during window movement
- **Snap to Grid**: Optional grid snapping for organized layouts
- **Session Persistence**: Windows remember position between sessions (localStorage)
- **Window Controls**: Minimize, maximize, and close functionality
- **Z-Index Management**: Click to bring windows to front

### 2. Text Notes
Rich text editing capabilities within draggable windows.

- **Auto-save**: Content automatically saves to localStorage
- **Dynamic Titles**: Window title updates with note content
- **Full-screen Editing**: Clean, distraction-free text interface
- **Copy/Paste Support**: Standard text operations work seamlessly

### 3. Drawing Canvas
Built-in sketching functionality for quick visualizations.

- **Smooth Drawing**: Basic drawing tools work smoothly with pressure simulation
- **Color Picker**: Choose from any color for your drawings
- **Brush Size Control**: Adjustable brush size from 1-20 pixels
- **Undo/Redo**: Remove last stroke with undo functionality
- **Clear Canvas**: Reset drawing area completely
- **Auto-save**: Drawing strokes persist between sessions

### 4. Classic OS Interface
Authentic operating system experience with modern touches.

- **Taskbar**: Shows active windows and system controls
- **Desktop Icons**: Easy access to create new notes and drawings
- **System Clock**: Real-time clock display
- **Grid Toggle**: Enable/disable snap-to-grid functionality
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation
1. Navigate to the project root directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:3000/prototypes/noted-os`

## 🎮 How to Use

### Creating Content
1. **New Text Note**: Click the "New Note" desktop icon or use the taskbar
2. **New Drawing**: Click the "New Drawing" desktop icon
3. **Window Management**: Drag windows by their title bars to reposition

### Text Notes
- Click inside any text window to start typing
- The window title automatically updates with the first line of your note
- Content auto-saves as you type

### Drawing Canvas
- Use the color picker to select drawing colors
- Adjust brush size with the slider
- Click and drag to draw
- Use "Undo" to remove the last stroke
- Use "Clear" to reset the entire canvas

### Window Controls
- **Minimize (−)**: Hide the window (restore from taskbar)
- **Maximize (□)**: Expand window to full screen
- **Close (×)**: Close and remove the window

### Taskbar Features
- **Start Button**: Classic OS start button (decorative)
- **Window Tabs**: Click to bring windows to front
- **Grid Toggle**: Enable/disable snap-to-grid alignment
- **Clock**: Real-time system time display

## 🛠️ Technical Implementation

### Technologies Used
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **CSS Modules**: Scoped styling
- **HTML5 Canvas**: Drawing functionality
- **localStorage**: Data persistence

### Key Components
- **Window Management**: Custom drag-and-drop system
- **Drawing Engine**: Canvas-based drawing with stroke tracking
- **State Management**: React hooks for complex state
- **Responsive Design**: Mobile-friendly interface

### Data Persistence
- All windows, positions, and content are saved to localStorage
- Drawing strokes are preserved between sessions
- Window states (minimized, maximized) are maintained

## 🎨 Design Philosophy

Noted OS combines the familiarity of classic operating systems with modern web technologies:

- **Nostalgic UI**: Classic gradients, borders, and button styles
- **Modern UX**: Smooth animations and responsive interactions
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized rendering and state management

## 🔧 Customization

The interface can be easily customized by modifying the CSS variables and styles:

- **Color Schemes**: Update gradient colors in the CSS
- **Window Styling**: Modify window appearance and behavior
- **Drawing Tools**: Add new brush types or drawing features
- **Layout**: Adjust desktop icon positions and taskbar layout

## 🐛 Known Limitations

- Drawing canvas is limited to one active canvas per session
- Text formatting is basic (no rich text editor)
- No file export functionality (localStorage only)
- Limited to single-user local storage

## 🚧 Future Enhancements

- **Rich Text Editor**: Bold, italic, lists, and headings
- **Multiple Drawing Canvases**: Support for multiple drawing windows
- **File Export**: Save notes and drawings as files
- **Cloud Sync**: Multi-device synchronization
- **Themes**: Multiple OS theme options (Windows 95, macOS Classic, etc.)
- **Keyboard Shortcuts**: Power user shortcuts for efficiency

## 📝 License

This prototype is created for educational purposes as part of the "Prototyping with Cursor" workshop.

---

*Noted OS - Where nostalgia meets productivity* 🖥️✨ 