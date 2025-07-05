# Typography Experiments

An interactive prototype that explores the creative possibilities of CSS typography. Users can type custom text and see it transformed through various typographic effects.

## Features

### Interactive Text Input
- Real-time text input that updates all typography effects
- Clean, modern interface with glassmorphism design

### Typography Effects

1. **Wavy Text**
   - Characters animate in a wave pattern
   - Uses variable font (Roboto Flex) with custom weight settings
   - Each character has a staggered animation delay

2. **Circular Text**
   - Text wraps around a circular path
   - Characters rotate around the center point
   - Continuous rotation animation

3. **3D Skewed Text**
   - Text with 3D perspective and skew transformations
   - Multi-layered text shadow for depth
   - Floating animation effect
   - Uses variable font with maximum weight

4. **Gradient Text**
   - Animated gradient background clipped to text
   - Smooth color transitions
   - Multiple color stops for vibrant effects

5. **Glitch Effect**
   - Three-layer glitch animation
   - Color separation effect
   - Random displacement animations

6. **Neon Glow**
   - Glowing text with pulsing animation
   - Multiple text-shadow layers
   - Cyberpunk-inspired aesthetic

## Technical Implementation

### Variable Fonts
- **Inter**: Used for UI elements and some text effects
- **Roboto Flex**: Variable font with weight range 100-1000, used for wavy and skewed effects

### CSS Features Used
- `font-variation-settings` for variable font control
- `transform` properties for 3D effects and animations
- `background-clip: text` for gradient text
- `text-shadow` for depth and glow effects
- CSS Grid for responsive button layout
- Backdrop filters for glassmorphism effects

### Responsive Design
- Mobile-optimized layouts
- Responsive font sizes
- Adaptive circular text sizing

## Setup Instructions

1. Navigate to the prototype directory
2. The prototype uses only CSS and React - no additional dependencies required
3. Open the page in your browser
4. Type in the text input to see real-time typography transformations
5. Click different effect buttons to switch between typography styles

## Learning Objectives

This prototype demonstrates:
- Advanced CSS typography techniques
- Variable font implementation
- CSS animations and keyframes
- Text transformation and positioning
- Responsive design principles
- Modern CSS features like backdrop-filter and grid

Perfect for designers and developers learning about creative typography and CSS capabilities! 