import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeTest from './components/SwipeTest';
import Timeline from './components/Timeline';

/* ================================================
   App — State Machine: landing → swipeTest → timeline
   ================================================ */

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

export default function App() {
  const [screen, setScreen] = useState('landing');

  return (
    <AnimatePresence mode="wait">
      {screen === 'landing' && (
        <motion.div key="landing" {...pageTransition}>
          <LandingScreen onStart={() => setScreen('swipeTest')} />
        </motion.div>
      )}
      {screen === 'swipeTest' && (
        <motion.div key="swipe" {...pageTransition}>
          <SwipeTest onComplete={() => setScreen('timeline')} />
        </motion.div>
      )}
      {screen === 'timeline' && (
        <motion.div key="timeline" {...pageTransition}>
          <Timeline />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------
   Landing Screen — Cinematic Investor Hook
   ------------------------------------------------ */
function LandingScreen({ onStart }) {
  return (
    <div style={styles.container}>
      {/* Background effects */}
      <div style={styles.bgGlow} />
      <div style={styles.bgGlow2} />

      {/* Content */}
      <motion.div
        style={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Logo area */}
        <motion.div
          style={styles.logoContainer}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.1, type: 'spring' }}
        >
          <div style={styles.emblem}>⚜</div>
        </motion.div>

        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          BeFake
        </motion.h1>

        <motion.p
          style={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Sahte Ol. Gerçek Yaşa.
        </motion.p>

        <motion.div
          style={styles.divider}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        />

        <motion.p
          style={styles.desc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Dönemsel dünyalarda anonim roleplay deneyimi.
          <br />
          Soy ağacına katıl, hikayeni yaz, isyan et.
        </motion.p>

        <motion.div
          style={styles.seasonBadge}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
        >
          SEZON 1 — ORTA ÇAĞ
        </motion.div>

        <motion.button
          style={styles.ctaBtn}
          onClick={onStart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          whileHover={{
            scale: 1.06,
            boxShadow: '0 0 40px rgba(212, 164, 76, 0.4)',
          }}
          whileTap={{ scale: 0.97 }}
        >
          Karakterini Keşfet
        </motion.button>

        <motion.p
          style={styles.hint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2 }}
        >
          Soy ağacında yerinizi alın
        </motion.p>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            ...styles.particle,
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        >
          {['⚜', '⚔', '🛡', '👑', '🏰', '✦'][i]}
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------
   Landing Styles (inline for self-containment)
   ------------------------------------------------ */
const styles = {
  container: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '24px 20px',
  },
  bgGlow: {
    position: 'absolute',
    top: '-20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(212, 164, 76, 0.08), transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  bgGlow2: {
    position: 'absolute',
    bottom: '-10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06), transparent 70%)',
    filter: 'blur(50px)',
    pointerEvents: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: '16px',
  },
  emblem: {
    fontSize: '3.5rem',
    filter: 'drop-shadow(0 0 20px rgba(212, 164, 76, 0.4))',
  },
  title: {
    fontFamily: "'Cinzel Decorative', serif",
    fontSize: '3rem',
    fontWeight: 700,
    color: '#d4a44c',
    letterSpacing: '0.08em',
    marginBottom: '8px',
    textShadow: '0 2px 30px rgba(212, 164, 76, 0.25)',
  },
  tagline: {
    fontFamily: "'Cinzel', serif",
    fontSize: '1rem',
    color: '#f0d48a',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '20px',
    opacity: 0.8,
  },
  divider: {
    width: '60px',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(212, 164, 76, 0.5), transparent)',
    marginBottom: '20px',
  },
  desc: {
    fontSize: '0.9rem',
    color: '#8b8899',
    lineHeight: 1.6,
    maxWidth: '320px',
    marginBottom: '24px',
  },
  seasonBadge: {
    fontFamily: "'Cinzel', serif",
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    color: '#8b8899',
    padding: '6px 20px',
    border: '1px solid rgba(212, 164, 76, 0.15)',
    borderRadius: '20px',
    marginBottom: '32px',
  },
  ctaBtn: {
    fontFamily: "'Cinzel', serif",
    fontSize: '1rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    padding: '16px 48px',
    border: '2px solid #d4a44c',
    borderRadius: '16px',
    background: 'rgba(212, 164, 76, 0.1)',
    color: '#f0d48a',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: '16px',
    boxShadow: '0 0 20px rgba(212, 164, 76, 0.15)',
  },
  hint: {
    fontSize: '0.75rem',
    color: '#5a5768',
    letterSpacing: '0.05em',
  },
  particle: {
    position: 'absolute',
    fontSize: '1.4rem',
    pointerEvents: 'none',
    zIndex: 0,
  },
};
