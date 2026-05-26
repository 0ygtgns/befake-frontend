<p align="center">
  <img src="docs/images/logo.png" width="100" alt="BeFake" />
</p>

<h1 align="center">BeFake</h1>
<h3 align="center">Sahte Ol. Gerçek Yaşa.</h3>

<p align="center">
  Sosyal Simülasyon & Oyunlaştırılmış Zaman Döngülü Sosyal Medya Platformu
</p>

<p align="center">
  <a href="https://0gunes.github.io/befake-frontend/">
    <img src="https://img.shields.io/badge/🌐_Canlı_Demo-GitHub_Pages-d4a44c?style=for-the-badge&labelColor=0a0a0f" alt="Live Demo" />
  </a>
  &nbsp;
  <a href="docs/INVESTOR_PITCH.md">
    <img src="https://img.shields.io/badge/📄_Yatırımcı_Dokümanı-Pitch_Deck-8b5cf6?style=for-the-badge&labelColor=0a0a0f" alt="Pitch Deck" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.x-FF0055?logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Neo4j-Graf_DB-4581C3?logo=neo4j&logoColor=white" alt="Neo4j" />
</p>

---

## ⚜ Konsept

BeFake, günümüz sosyal medyasının **"kusursuz görünme"** ve **"kendin olma"** baskılarına meydan okur. Kullanıcılara dönemsel kurgusal dünyalarda, tamamen anonim ve kasmadan **"başkası olma (roleplay)"** deneyimi sunar.

> *Ya sosyal medyada kendin olmak zorunda olmasaydın?*

### Temel Özellikler

- 🎭 **Anonim Roleplay** — Gerçek kimlik gizli, karakter kimlik ön planda
- 🌍 **Dönemsel Sezonlar** — 1-2 aylık kurgusal dünyalar (Orta Çağ → Siberpunk → Antik Mısır)
- 🌳 **Soy Ağacı** — Graf tabanlı devasa aile yapısında doğ, bağ kur
- ⚔️ **İsyan Mekanizması** — Topluluk odaklı taht devrimleri ve hikaye dallanması
- 🤖 **AI Destekli Hikaye** — LangGraph ajanları ile dinamik görev atamaları
- 🔄 **Sıfırdan Başla** — Her sezon eşit başlangıç, yeni hikaye

---

## 🖥️ Ekran Görüntüleri

<table>
  <tr>
    <td align="center" width="33%">
      <img src="docs/images/01_landing.png" alt="Landing Page" /><br/>
      <strong>Giriş Ekranı</strong>
    </td>
    <td align="center" width="33%">
      <img src="docs/images/02_result.png" alt="Character Assignment" /><br/>
      <strong>Karakter Atama</strong>
    </td>
    <td align="center" width="33%">
      <img src="docs/images/03_timeline.png" alt="Timeline" /><br/>
      <strong>Sosyal Akış</strong>
    </td>
  </tr>
</table>

<p align="center">
  <img src="docs/images/demo_recording.webp" width="500" alt="Demo Kaydı" /><br/>
  <em>Tam akış: Landing → Swipe Test → Karakter Atama → Timeline → İsyan Modu</em>
</p>

---

## 🎭 Karakter Sistemi — Sezon 1: Orta Çağ

Kullanıcılar Tinder tarzı bir swipe testi ile kişilik eğilimlerini belirler ve soy ağacına atanır:

<table>
  <tr>
    <td align="center"><img src="docs/images/card_knight.png" width="120" /><br/><strong>Şövalye</strong></td>
    <td align="center"><img src="docs/images/card_alchemist.png" width="120" /><br/><strong>Simyacı</strong></td>
    <td align="center"><img src="docs/images/card_bard.png" width="120" /><br/><strong>Ozan</strong></td>
    <td align="center"><img src="docs/images/card_spy.png" width="120" /><br/><strong>Casus</strong></td>
    <td align="center"><img src="docs/images/card_peasant.png" width="120" /><br/><strong>Köylü</strong></td>
  </tr>
</table>

---

## 🏗️ Teknik Mimari

```
┌──────────────────────────────────────────────────┐
│                   FRONTEND                        │
│         React 19 + Framer Motion + Vite           │
└──────────────────────┬───────────────────────────┘
                       │ REST API + WebSocket
┌──────────────────────┴───────────────────────────┐
│                   BACKEND                         │
│              Python FastAPI (Async)                │
└──────────┬───────────────────────┬───────────────┘
           │                       │
┌──────────┴──────────┐  ┌────────┴────────────────┐
│     NEO4J (Graf)    │  │    AI KATMANI           │
│  Soy ağacı ilişki-  │  │  LangGraph Ajanları:    │
│  leri, aile bağları │  │  Görev atama, NPC,      │
│  ms içinde sorgu    │  │  Hikaye dallanması      │
└─────────────────────┘  └─────────────────────────┘
```

| Katman | Teknoloji | Amaç |
|---|---|---|
| Frontend | React 19 + Framer Motion | Interaktif UI, swipe animasyonları |
| Backend | FastAPI (Python) | Asenkron API, WebSocket desteği |
| Veritabanı | Neo4j | Graf tabanlı soy ağacı sorguları |
| AI | LangGraph | Otonom hikaye yönetimi |
| Deploy | GitHub Pages (Demo) | Statik demo hosting |

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+
- npm 9+

### Kurulum & Çalıştırma

```bash
# Repo'yu klonla
git clone https://github.com/0ygtgns/befake-frontend.git
cd befake-frontend

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu
npm run dev
```

Tarayıcıda [http://localhost:5173/befake-frontend/](http://localhost:5173/befake-frontend/) adresine git.

### Production Build & Deploy

```bash
# Build
npm run build

# GitHub Pages'e deploy
npm run deploy
```

---

## 📁 Proje Yapısı

```
befake-frontend/
├── docs/
│   ├── INVESTOR_PITCH.md        # Yatırımcı pitch dokümanı
│   └── images/                  # Doküman görselleri
├── public/
│   └── images/
│       ├── cards/               # Karakter kartı görselleri
│       └── avatars/             # Timeline avatar görselleri
├── src/
│   ├── components/
│   │   ├── SwipeTest.jsx        # Tinder-tarzı karakter seçimi
│   │   ├── SwipeTest.css
│   │   ├── Timeline.jsx         # Sosyal medya akışı + İsyan
│   │   └── Timeline.css
│   ├── App.jsx                  # State machine (landing→swipe→timeline)
│   ├── index.css                # Orta Çağ dark theme tasarım sistemi
│   └── main.jsx                 # React entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## 📄 Dokümantasyon

| Doküman | Açıklama |
|---|---|
| [**INVESTOR_PITCH.md**](docs/INVESTOR_PITCH.md) | Kapsamlı yatırımcı sunum dokümanı — pazar analizi, monetizasyon, yol haritası |
| **README.md** | Bu dosya — teknik kurulum ve proje yapısı |

---

## 📬 İletişim

📧 **E-posta:** [0gunesyigit@gmail.com](mailto:0gunesyigit@gmail.com)

---

<p align="center">
  <strong>⚜ BeFake — Sahte Ol. Gerçek Yaşa. ⚜</strong>
  <br/><br/>
  <em>© 2025 BeFake. Tüm hakları saklıdır.</em>
</p>
