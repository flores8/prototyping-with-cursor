/**
 * Root layout component that wraps all pages in the application.
 * This layout:
 * - Sets up Fredoka (playful headlines) and Inter (clean body text) fonts
 * - Configures metadata like title and favicon
 * - Provides the basic HTML structure
 * - Applies font variables to the entire app
 */

import type { Metadata } from "next";
import { fredoka, inter } from "./fonts";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Lauralee's prototypes",
  description: "The home for all my prototypes",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
