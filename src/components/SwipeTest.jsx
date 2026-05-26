import { useState, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import './SwipeTest.css';

/* ------------------------------------------------
   Mock Character Data — Medieval Season 1
   ------------------------------------------------ */
const BASE = import.meta.env.BASE_URL;

const CHARACTERS = [
  {
    id: 'knight',
    name: 'Şövalye',
    subtitle: 'Kılıcın Varisi',
    image: `${BASE}images/cards/knight.png`,
    traits: ['Cesur', 'Sadık', 'Savaşçı'],
    flavor: '"Kılıcım onurum, kalkanım ailemdir."',
    family: 'Altınaslan Hanedanı',
    desc: 'Savaş meydanlarında yetiştin. Ailenin kalkanı sensin. Şerefin, soy ağacının dallarında yankılanacak.',
  },
  {
    id: 'alchemist',
    name: 'Simyacı',
    subtitle: 'Bilgenin Çırağı',
    image: `${BASE}images/cards/alchemist.png`,
    traits: ['Gizemli', 'Zeki', 'Meraklı'],
    flavor: '"Her iksir bir sır, her sır bir anahtar."',
    family: 'Gölgefener Tarikatı',
    desc: 'Karanlık laboratuvarında evrenin sırlarını çözüyorsun. Bilgi senin silahın, iksirler senin ordun.',
  },
  {
    id: 'bard',
    name: 'Ozan',
    subtitle: 'Diyarın Sesi',
    image: `${BASE}images/cards/bard.png`,
    traits: ['Karizmatik', 'Kurnaz', 'Eğlenceli'],
    flavor: '"Bir şarkı, bin kılıçtan keskindir."',
    family: 'Gümüştel Ozanları',
    desc: 'Tavernalar senin sahnen, hikayeler senin silahın. Bir nağmeyle kalpleri fethedeceksin.',
  },
  {
    id: 'spy',
    name: 'Casus',
    subtitle: 'Gölgelerin Efendisi',
    image: `${BASE}images/cards/spy.png`,
    traits: ['Sinsi', 'Çevik', 'Tehlikeli'],
    flavor: '"Gölgeler konuşur, ben dinlerim."',
    family: 'Karabasma Loncası',
    desc: 'Kimse seni görmez, ama sen herkesi görürsün. Bilgi ticaretinin tacısın.',
  },
  {
    id: 'peasant',
    name: 'Köylü',
    subtitle: 'Toprağın Evladı',
    image: `${BASE}images/cards/peasant.png`,
    traits: ['Dayanıklı', 'Kanaatkar', 'Sezgisel'],
    flavor: '"Toprak yalan söylemez."',
    family: 'Bereketli Vadi Köyü',
    desc: 'Sade ama güçlüsün. Diyarın en büyük isyanları hep senin gibilerden doğar.',
  },
];

/* ------------------------------------------------
   SwipeTest Component
   ------------------------------------------------ */
export default function SwipeTest({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedCards, setSwipedCards] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [resultChar, setResultChar] = useState(null);

  const handleSwipe = useCallback(
    (direction) => {
      const card = CHARACTERS[currentIndex];
      setSwipedCards((prev) => [...prev, { ...card, direction }]);

      if (currentIndex >= CHARACTERS.length - 1) {
        // All cards swiped — pick result based on accepted cards
        setTimeout(() => {
          const accepted = [...swipedCards, { ...card, direction }].filter(
            (c) => c.direction === 'right'
          );
          const chosen =
            accepted.length > 0
              ? accepted[Math.floor(Math.random() * accepted.length)]
              : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          setResultChar(chosen);
          setShowResult(true);
        }, 400);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [currentIndex, swipedCards]
  );

  if (showResult && resultChar) {
    return <ResultScreen character={resultChar} onContinue={onComplete} />;
  }

  return (
    <div className="swipe-container">
      {/* Header */}
      <div className="swipe-header">
        <h2>Karakterini Keşfet</h2>
        <p>Kartları sağa veya sola kaydır</p>
      </div>

      {/* Card Stack */}
      <div className="card-stack">
        {/* Background cards */}
        {currentIndex + 2 < CHARACTERS.length && (
          <div className="bg-card bg-card-2" />
        )}
        {currentIndex + 1 < CHARACTERS.length && (
          <div className="bg-card bg-card-1" />
        )}

        {/* Active card */}
        <AnimatePresence mode="popLayout">
          {currentIndex < CHARACTERS.length && (
            <SwipeCard
              key={CHARACTERS[currentIndex].id}
              character={CHARACTERS[currentIndex]}
              onSwipe={handleSwipe}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Hints */}
      <div className="swipe-hints">
        <span className="hint">
          <span className="hint-icon">👈</span> Reddet
        </span>
        <span className="hint">
          Kabul Et <span className="hint-icon">👉</span>
        </span>
      </div>

      {/* Progress */}
      <div className="swipe-progress">
        {CHARACTERS.map((_, i) => (
          <div
            key={i}
            className={`progress-dot ${
              i === currentIndex
                ? 'active'
                : i < currentIndex
                ? 'done'
                : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------
   SwipeCard — Draggable Card
   ------------------------------------------------ */
function SwipeCard({ character, onSwipe }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const acceptOpacity = useTransform(x, [0, 100], [0, 1]);
  const rejectOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      className="character-card"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ 
        x: x.get() > 0 ? 400 : -400, 
        opacity: 0,
        rotate: x.get() > 0 ? 20 : -20,
        transition: { duration: 0.35, ease: 'easeOut' } 
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="card-inner">
        <img
          src={character.image}
          alt={character.name}
          className="card-image"
          draggable={false}
        />
        <div className="card-gradient" />

        {/* Swipe overlays */}
        <motion.div
          className="swipe-overlay accept"
          style={{ opacity: acceptOpacity }}
        >
          KABUL ✓
        </motion.div>
        <motion.div
          className="swipe-overlay reject"
          style={{ opacity: rejectOpacity }}
        >
          RED ✗
        </motion.div>

        {/* Card info */}
        <div className="card-content">
          <div className="card-title">{character.name}</div>
          <div className="card-subtitle">{character.subtitle}</div>
          <div className="card-traits">
            {character.traits.map((t) => (
              <span key={t} className="trait-badge">
                {t}
              </span>
            ))}
          </div>
          <div className="card-flavor">{character.flavor}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------
   ResultScreen — Character Assignment Reveal
   ------------------------------------------------ */
function ResultScreen({ character, onContinue }) {
  return (
    <motion.div
      className="result-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="result-glow"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.img
        src={character.image}
        alt={character.name}
        className="result-avatar"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
      />

      <motion.div
        className="result-label"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Soy ağacında doğdun
      </motion.div>

      <motion.h1
        className="result-title"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: 'spring' }}
      >
        {character.name}
      </motion.h1>

      <motion.div
        className="result-family"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        ⚜ {character.family} ⚜
      </motion.div>

      <motion.p
        className="result-desc"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        {character.desc}
      </motion.p>

      <motion.button
        className="result-btn"
        onClick={onContinue}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Diyar'a Gir
      </motion.button>
    </motion.div>
  );
}
