import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Timeline.css';

/* ------------------------------------------------
   Mock Data — Medieval Timeline Posts
   ------------------------------------------------ */
const BASE = import.meta.env.BASE_URL;

const AVATARS = {
  king: `${BASE}images/avatars/king.png`,
  duchess: `${BASE}images/avatars/duchess.png`,
  blacksmith: `${BASE}images/avatars/blacksmith.png`,
  knight: `${BASE}images/cards/knight.png`,
  bard: `${BASE}images/cards/bard.png`,
  spy: `${BASE}images/cards/spy.png`,
};

const NORMAL_POSTS = [
  {
    id: 1,
    user: 'Kral III. Aldric',
    avatar: AVATARS.king,
    isRoyal: true,
    royalTitle: '👑 Kral',
    family: 'Altınaslan Hanedanı',
    time: '2 saat önce • Kralın Kalesi\'nden',
    text: 'Bugün diyarın tüm lordlarını büyük ziyafete davet ediyorum. Sadakat gösterenlere yeni topraklar bahşedilecek. Tahtın gölgesinde kimse aç kalmayacak. ⚜️',
    reactions: { '⚔️': 24, '👑': 89, '🛡️': 31 },
    canRevolt: true,
  },
  {
    id: 2,
    user: 'Düşes Elara',
    avatar: AVATARS.duchess,
    isRoyal: true,
    royalTitle: '🏰 Düşes',
    family: 'Altınaslan Hanedanı',
    time: '4 saat önce • Gül Bahçeleri\'nden',
    text: 'Yeni bir ittifak mektubu Kuzey Krallığı\'ndan geldi. Evlilik yoluyla barış mı, yoksa yeni bir savaşın habercisi mi? Konsey yarın toplanıyor.',
    reactions: { '🏰': 45, '⚔️': 18, '🛡️': 12 },
    canRevolt: false,
  },
  {
    id: 3,
    user: 'Demirci Tormund',
    avatar: AVATARS.blacksmith,
    isRoyal: false,
    family: 'Bereketli Vadi Köyü',
    time: '6 saat önce • Köy Demirhanesi\'nden',
    text: 'Kışa hazırlık! 200 kılıç, 150 kalkan, 80 zırh seti... Kollarım düşecek ama ordumuz hazır olacak. Demir biterse Kral\'dan istiyorum, vergi yerine metal kabul etsin artık. 🔨',
    reactions: { '⚔️': 67, '🛡️': 34, '🏰': 8 },
    canRevolt: false,
  },
  {
    id: 4,
    user: 'Şövalye Ser Kael',
    avatar: AVATARS.knight,
    isRoyal: false,
    family: 'Altınaslan Hanedanı',
    time: '8 saat önce • Eğitim Meydanı\'ndan',
    text: 'Bugünkü turnuvada 3 rakibi devirip şampiyonluk madalyasını aldım! Onurumu ailem için taşıyorum. Bir sonraki hedef: Büyük Turnuva. ⚔️🏆',
    reactions: { '⚔️': 112, '👑': 23, '🛡️': 56 },
    canRevolt: false,
  },
  {
    id: 5,
    user: 'Ozan Lyris',
    avatar: AVATARS.bard,
    isRoyal: false,
    family: 'Gümüştel Ozanları',
    time: '12 saat önce • Altın Kadeh Tavernası\'ndan',
    text: '🎵 Yeni şarkım: "Kara Kale\'nin Gözyaşları"\n\nBir zamanlar bir kral varmış,\nAltın tahtında yalnız kalmış...\nHalkı ağlarken o gülermiş,\nSonunda tahtı devirmiş.\n\n(Herkese ithaf, hiç kimseye değil.) 🎵',
    reactions: { '🏰': 78, '⚔️': 15, '👑': 42 },
    canRevolt: false,
  },
  {
    id: 6,
    user: 'Casus Zephyr',
    avatar: AVATARS.spy,
    isRoyal: false,
    family: 'Karabasma Loncası',
    time: '1 gün önce • ???',
    text: 'Gölgelerde fısıldanan haberlere göre, Kuzey sınırında hareketlilik var. Kim bilir, belki yarın her şey değişir. 👁️ Gözlerinizi açık tutun.',
    reactions: { '⚔️': 33, '🛡️': 89, '🏰': 21 },
    canRevolt: false,
  },
];

const REVOLT_POSTS = [
  {
    id: 101,
    user: '??? Anonim Direniş',
    avatar: AVATARS.spy,
    isRoyal: false,
    isUnderground: true,
    family: 'Yeraltı Direniş Ağı',
    time: 'Az önce • Gizli Tünel\'den',
    text: '🔥 İSYAN BAŞLADI! Kral Aldric tahttan indirildi. Artık "Düşmüş Soylu" olarak sürgünde. Yeni düzen kuruluyor. Herkes safını seçsin!',
    reactions: { '⚔️': 234, '🛡️': 167, '🏰': 12 },
    canRevolt: false,
  },
  {
    id: 102,
    user: 'Ozan Lyris',
    avatar: AVATARS.bard,
    isRoyal: false,
    isUnderground: true,
    family: 'Gümüştel Ozanları',
    time: '5 dakika önce • Yeraltı Meydanı\'ndan',
    text: '🎵 "Devrim Marşı"\n\nKaleler yıkılır, tahtlar devrilir,\nHalkın sesi göklere yükselir!\nAltın taç artık pas tutmuş,\nYeni bir çağ doğmuş! 🎵\n\n#İsyan #YeniDüzen',
    reactions: { '⚔️': 189, '🏰': 45, '🛡️': 78 },
    canRevolt: false,
  },
  {
    id: 103,
    user: 'Demirci Tormund',
    avatar: AVATARS.blacksmith,
    isRoyal: false,
    isUnderground: true,
    family: 'Bereketli Vadi Köyü',
    time: '15 dakika önce • Gizli Demirhanesi\'nden',
    text: 'Artık Kral\'a kılıç değil, halka silah dövüyorum. 300 bıçak, 200 mızrak hazır. Devrimin demircisi olmak şeref. Vergiler artık yok! 🔨⚔️',
    reactions: { '⚔️': 145, '🛡️': 98, '🏰': 34 },
    canRevolt: false,
  },
];

/* ------------------------------------------------
   Timeline Component
   ------------------------------------------------ */
export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isRevolt, setIsRevolt] = useState(false);
  const [revoltMeter, setRevoltMeter] = useState(0);
  const [posts, setPosts] = useState(NORMAL_POSTS);
  const [reactions, setReactions] = useState({});

  const filters = [
    { id: 'family', label: 'Ailem' },
    { id: 'clan', label: 'Klanım' },
    { id: 'all', label: 'Tüm Diyar' },
  ];

  /* --- Revolt Handler --- */
  const handleRevolt = useCallback(() => {
    if (isRevolt) return;

    // Apply revolt theme to body
    document.documentElement.setAttribute('data-theme', 'revolt');
    setIsRevolt(true);

    // Animate revolt meter
    setTimeout(() => setRevoltMeter(35), 100);
    setTimeout(() => setRevoltMeter(68), 600);
    setTimeout(() => setRevoltMeter(100), 1200);

    // Swap posts after meter fills
    setTimeout(() => {
      setPosts(REVOLT_POSTS);
    }, 1800);
  }, [isRevolt]);

  /* --- Reset revolt on unmount --- */
  useEffect(() => {
    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, []);

  /* --- Reaction handler --- */
  const handleReaction = (postId, emoji) => {
    setReactions((prev) => ({
      ...prev,
      [`${postId}-${emoji}`]: (prev[`${postId}-${emoji}`] || 0) + 1,
    }));
  };

  return (
    <div className="timeline-container">
      {/* Top Bar */}
      <div className="timeline-topbar">
        <div className="topbar-header">
          <motion.span
            className="topbar-logo"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {isRevolt ? '🔥 İsyan Diyarı' : '⚜ BeFake'}
          </motion.span>
          <span className="topbar-season">
            {isRevolt ? '⚔️ İsyan Modu' : 'Sezon 1 • Orta Çağ'}
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`filter-tab ${activeFilter === f.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Revolt Banner */}
      <AnimatePresence>
        {isRevolt && (
          <motion.div
            className="revolt-banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="revolt-banner-title">
              ⚔️ TAHTTAN İNDİRİLMİŞ SOYLU — SÜRGÜN MODU AKTİF ⚔️
            </div>
            <div className="revolt-banner-text">
              Kral Aldric yeraltı direniş ağına taşındı. İntikam görevleri açıldı.
            </div>
            <div className="revolt-meter">
              <motion.div
                className="revolt-meter-fill"
                style={{ width: `${revoltMeter}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feed */}
      <div className="feed">
        <AnimatePresence mode="popLayout">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <PostCard
                post={post}
                onRevolt={handleRevolt}
                isRevoltActive={isRevolt}
                onReaction={handleReaction}
                extraReactions={reactions}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* FAB */}
      <motion.button
        className="fab"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        title="Yeni Gönderi"
      >
        ✦
      </motion.button>
    </div>
  );
}

/* ------------------------------------------------
   PostCard Component
   ------------------------------------------------ */
function PostCard({ post, onRevolt, isRevoltActive, onReaction, extraReactions }) {
  return (
    <div className={`post-card ${post.isUnderground ? 'underground' : ''}`}>
      {/* Header */}
      <div className="post-header">
        <img
          src={post.avatar}
          alt={post.user}
          className={`post-avatar ${post.isRoyal ? 'royal' : ''}`}
        />
        <div className="post-user-info">
          <div className="post-username">
            {post.user}
            {post.isRoyal && (
              <span className="royal-badge">{post.royalTitle}</span>
            )}
            {post.isUnderground && (
              <span className="underground-badge">🔥 Direniş</span>
            )}
          </div>
          <div className="post-meta">
            {post.family} • {post.time}
          </div>
        </div>
        <button className="post-menu-btn">⋯</button>
      </div>

      {/* Body */}
      <div className="post-body">
        <p className="post-text" style={{ whiteSpace: 'pre-line' }}>
          {post.text}
        </p>
      </div>

      {/* Actions */}
      <div className="post-actions">
        {Object.entries(post.reactions).map(([emoji, count]) => {
          const extra = extraReactions[`${post.id}-${emoji}`] || 0;
          return (
            <motion.button
              key={emoji}
              className="action-btn"
              onClick={() => onReaction(post.id, emoji)}
              whileTap={{ scale: 1.3 }}
            >
              <span className="emoji">{emoji}</span>
              {count + extra}
            </motion.button>
          );
        })}

        {post.canRevolt && !isRevoltActive && (
          <motion.button
            className="revolt-btn"
            onClick={onRevolt}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚔️ İsyan Et
          </motion.button>
        )}

        {post.canRevolt && isRevoltActive && (
          <motion.button
            className="revolt-btn active"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            🔥 İsyan Aktif
          </motion.button>
        )}
      </div>
    </div>
  );
}
