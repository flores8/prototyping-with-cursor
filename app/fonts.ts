import { Fredoka, Inter } from 'next/font/google';

// Playful, chunky font for headlines
export const fredoka = Fredoka({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fredoka',
});

// Clean, readable sans-serif for body text
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
}); 