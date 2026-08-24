# Vintage Rides 🏍️✨

**Vintage Rides** is an interactive, nostalgic retro Indian motorcycle garage experience inspired by early-2000s virtual environments. Built with **React 18**, **Vite**, **JavaScript**, **CSS3**, **HTML5**, and the official **YouTube IFrame Player API**.

---

## 🌟 Features & Highlights

### 1. Interactive Retro Garage Environment
- **Focal Centerpiece**: Vector SVG artwork of a classic 1968 Indian Bullet 350 motorcycle with single-cylinder engine fins, teardrop fuel tank, spoked wheels, leather saddle, and kickstand shadow.
- **Interactive Workshop**: Tabletop radio, heavy hardwood workbench, hanging tool pegboard, storage shelves, rotating 3-blade ceiling fan, and retro Indian motorcycle rally posters.

### 2. Vintage Tabletop Radio & 14-Track Playlist
- **Airwave 1998 Tabletop Player**: Authentic late-1990s/early-2000s mahogany cabinet radio deck with glowing analog frequency dial, red tuning needle, and active LED status indicators (`● PLAYING`, `Ⅱ PAUSED`, `LOADING...`, `PLAYBACK ERROR`).
- **14 Official YouTube Tracks**: Curated playlist supporting Play, Pause, Next, Previous, Shuffle mode, Volume slider, Mute toggle, track progress display (`01 / 14`), and scrollable track selection panel.

### 3. YouTube IFrame Player API Integration
- **Compliance & Privacy**: Streams music through YouTube's official embedded IFrame Player API (`window.YT.Player`).
- **Zero File Extraction**: No local MP3 hosting, no audio extraction, and no video downloading.
- **Automatic Playback**: Detects video end events to automatically select and load the next track without interrupting the garage view.

### 4. Immersive Rain Mode
- **Rain Visuals**: 35 GPU-optimized falling rain particle streaks, dark storm sky backdrop (`#020617`), water droplet glass streaks on window panes (`@keyframes rainStreakSlide`), and subtle distant storm lightning flashes.
- **Rain Ambience Audio**: Plays loopable ambient rain audio with independent volume controls and Web Audio API synth fallback.

### 5. Independent Ambient Audio Channels
- **Multi-Channel Deck**: Independent volume controls and toggles for **Garage Ambience**, **Rain Ambience**, and **Ceiling Fan Ambience**.
- **Volume Isolation**: Muting YouTube music does not stop ambient sound; muting ambience does not interrupt YouTube music.

### 6. Day & Night Atmosphere Switch
- **Day Mode (`☀️ Day`)**: Warm natural sunlight, bright garage interior, clear workshop details, and sunny daylight window sky gradient.
- **Night Mode (`🌙 Night`)**: Cozy midnight atmosphere, tungsten pendant bulb illumination, deeper shadow depth, and glowing analog radio LEDs.

### 7. Opening Entry Screen & Accessibility
- **Entry Screen**: `VINTAGE RIDES` logo badge, tagline *"Where every ride has a story."*, and smooth `0.6s` transition establishing user interaction for audio playback permissions.
- **Accessibility & Mobile**: Keyboard navigation (`tabIndex={0}`, `:focus-visible` gold outline ring, `Enter`/`Space` activation), `aria-label` attributes on all controls, and touch-friendly mobile targets (`>= 44x44px`).

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18, Vite 5, JavaScript (ES6+), CSS3
- **Icons**: Lucide React
- **Audio Integration**: YouTube IFrame Player API (`window.YT.Player`), HTML5 Audio, Web Audio API
- **State Persistence**: Browser `localStorage` (Theme, Rain, Audio Volumes, Track Index, Shuffle State)

---

## 📁 Folder Structure

```
Vintage-Rides/
├── public/
│   ├── audio/         # Rain, Garage, and Fan ambient audio files
│   ├── images/        # Local graphic assets
│   ├── videos/        # Video media
│   └── fonts/         # Typography
│
├── src/
│   ├── components/    # Reusable React UI Components
│   │   ├── Garage.jsx
│   │   ├── Motorcycle.jsx
│   │   ├── Radio.jsx
│   │   ├── RadioPlayer.jsx
│   │   ├── YouTubePlayer.jsx
│   │   ├── GarageObjects.jsx
│   │   ├── Lighting.jsx
│   │   ├── EnvironmentEffects.jsx
│   │   ├── InspectModal.jsx
│   │   ├── AmbientSoundModal.jsx
│   │   └── EntryScreen.jsx
│   │
│   ├── data/          # Playlist data & helper functions (playlist.js)
│   ├── utils/         # Audio managers (ambientAudio.js, engineAudio.js, rainAudio.js)
│   ├── styles/        # Baseline CSS tokens, keyframe animations, & responsive rules (index.css)
│   ├── App.jsx        # Root application wrapper
│   └── main.jsx       # Entry mounting file
│
├── index.html         # HTML5 root template
├── vite.config.js     # Vite configuration
├── package.json       # Dependencies & build scripts
├── .gitignore         # Excluded files & directories
└── README.md          # Documentation
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **NPM**: v9.0.0 or higher

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Rahulgaikwad1108/vintage-rides.git
   cd vintage-rides
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The compiled production output will be generated in the `dist/` directory.

---

## 🔒 Security & Compliance

- **No API Keys or Secrets**: Built strictly using public embedded YouTube IFrame API URLs.
- **Safe Rendering**: All text strings are safely interpolated via React JSX without `dangerouslySetInnerHTML`.
- **Privacy**: User preferences are stored locally in the browser's `localStorage` with zero collection of personal data.

---

## 🌐 Deployment Information

The production build in `dist/` is static and optimized for zero-configuration deployment on platforms such as:
- **Vercel**: Run `vercel` or link repository.
- **Netlify**: Drag and drop the `dist/` folder or build with command `npm run build` and publish directory `dist`.
- **GitHub Pages**: Deploy the `dist/` folder using `gh-pages`.
