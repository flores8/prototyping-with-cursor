import Link from "next/link";
import styles from './styles/home.module.css';

export default function Home() {
  // Add your prototypes to this array
  const prototypes = [
    {
      title: 'Getting started',
      description: 'How to create a prototype',
      path: '/prototypes/example'
    },
    {
      title: 'Confetti button',
      description: 'An interactive button that creates a colorful confetti explosion',
      path: '/prototypes/confetti-button'
    },
    {
      title: 'Cosmic Piano',
      description: 'An otherworldly digital piano with floating keys and particle effects',
      path: '/prototypes/cosmic-piano'
    },
    {
      title: 'Typography Experiments',
      description: 'Interactive typography generator with wavy text, circular layouts, and 3D effects',
      path: '/prototypes/typography-experiments'
    },
    {
      title: 'Noted OS',
      description: 'A classic operating system-inspired note-taking app with draggable windows, text notes, and drawing canvas',
      path: '/prototypes/noted-os'
    },
    // Add your new prototypes here like this:
    // {
    //   title: 'Your new prototype',
    //   description: 'A short description of what this prototype does',
    //   path: '/prototypes/my-new-prototype'
    // },
  ];

  return (
    <div className={styles.container}>
      {/* CRT scanline overlay for retro effect */}
      <div style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 10,
        background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 2px, transparent 4px)'
      }} aria-hidden="true" />
      <header className={styles.header}>
        <h1 style={{ fontFamily: 'Menlo, Fira Mono, Consolas, monospace' }}>Lauralee's prototypes</h1>
        <p className={styles.subtitle} style={{ fontFamily: 'Menlo, Fira Mono, Consolas, monospace' }}>
          A curated collection of interactive prototypes exploring design, technology, and user experience.
        </p>
      </header>

      <main>
        <section className={styles.grid}>
          {/* Goes through the prototypes list (array) to create cards */}
          {prototypes.map((prototype, index) => (
            <Link 
              key={index}
              href={prototype.path} 
              className={styles.card}
              style={{ fontFamily: 'Menlo, Fira Mono, Consolas, monospace' }}
            >
              <h3>{prototype.title}</h3>
              <p>{prototype.description}</p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
