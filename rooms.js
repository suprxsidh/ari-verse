window.ROOMS = [
 {
  "id": "yours-truly",
  "era": "Yours Truly",
  "year": 2013,
  "palette": {
   "bg1": "#F8E8EE",
   "bg2": "#E5C1CD",
   "accent": "#B85D78",
   "text": "#2E1A21"
  },
  "mood": "soft pink roses and vintage 1950s charm",
  "intro": "Welcome to 2013, birthday boy. Step into this sweet retro daydream where the journey began.",
  "hidden": [
   {
    "emoji": "🌹",
    "label": "Pink Rose",
    "x": 22,
    "y": 65,
    "fact": "The original cover showed Ariana kneeling on a bed of roses, but she changed it after fans disliked it.",
    "confidence": "high",
    "verdict": "true",
    "source": "Wikipedia (Yours Truly (Ariana Grande album))"
   },
   {
    "emoji": "🧁",
    "label": "Red Velvet Cupcake",
    "x": 75,
    "y": 40,
    "fact": "Ariana asked Mac Miller herself to join her on The Way. They recorded it in January 2013.",
    "confidence": "high",
    "verdict": "manual",
    "source": "Wikipedia (The Way (Ariana Grande song))"
   },
   {
    "emoji": "🐩",
    "label": "Toulouse",
    "x": 48,
    "y": 78,
    "fact": "Ariana adopted her rescue dog Toulouse in fall 2013, the same year Yours Truly came out.",
    "confidence": "high",
    "verdict": "manual",
    "source": "Famous Birthdays / TIME"
   }
  ],
  "puzzles": [
   {
    "prompt": "Emoji riddle: 🍯 + 🌙 + 🛣️. Name the opening track.",
    "answers": [
     "honeymoon avenue",
     "honeymoon ave"
    ],
    "hint": "Think of a sweet post-wedding trip and a type of street."
   },
   {
    "prompt": "This 2013 smash hit with Mac Miller was the lead single that started it all.",
    "answers": [
     "the way"
    ],
    "hint": "Two words. It is a synonym for the route or direction."
   },
   {
    "prompt": "Emoji riddle: 🎹. A Yours Truly track named after an instrument.",
    "answers": [
     "piano"
    ],
    "hint": "It has 88 black and white keys."
   }
  ],
  "unlockLine": "You aced the debut era! The door clicks open to 2014.",
  "game": "jukebox",
  "art": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 230\" preserveAspectRatio=\"xMidYMid slice\">\n  <defs>\n    <!-- Soft Wallpaper Gradient -->\n    <linearGradient id=\"bgGrad\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#F8E8EE\"/>\n      <stop offset=\"70%\" stop-color=\"#F5DCE6\"/>\n      <stop offset=\"100%\" stop-color=\"#E5C1CD\"/>\n    </linearGradient>\n\n    <!-- Center Glow for Readability -->\n    <radialGradient id=\"centerGlow\" cx=\"0.5\" cy=\"0.45\" r=\"0.5\">\n      <stop offset=\"0%\" stop-color=\"#FFFBFD\" stop-opacity=\"0.95\"/>\n      <stop offset=\"60%\" stop-color=\"#F8E8EE\" stop-opacity=\"0.6\"/>\n      <stop offset=\"100%\" stop-color=\"#F8E8EE\" stop-opacity=\"0\"/>\n    </radialGradient>\n\n    <!-- Diner Wainscoting Stripes -->\n    <pattern id=\"stripes\" width=\"24\" height=\"75\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"12\" height=\"75\" fill=\"#E5C1CD\" fill-opacity=\"0.4\"/>\n      <rect x=\"12\" width=\"12\" height=\"75\" fill=\"#F8E8EE\" fill-opacity=\"0.4\"/>\n    </pattern>\n\n    <!-- 1950s Polka Dots -->\n    <pattern id=\"polka\" width=\"22\" height=\"22\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(15)\">\n      <circle cx=\"5\" cy=\"5\" r=\"2\" fill=\"#D59EB1\" opacity=\"0.35\"/>\n      <circle cx=\"16\" cy=\"16\" r=\"2\" fill=\"#B85D78\" opacity=\"0.18\"/>\n    </pattern>\n\n    <!-- Diner Checkerboard Trim -->\n    <pattern id=\"checkers\" width=\"16\" height=\"8\" patternUnits=\"userSpaceOnUse\">\n      <rect width=\"8\" height=\"4\" fill=\"#B85D78\"/>\n      <rect x=\"8\" y=\"4\" width=\"8\" height=\"4\" fill=\"#B85D78\"/>\n      <rect x=\"8\" y=\"0\" width=\"8\" height=\"4\" fill=\"#FFF9FB\"/>\n      <rect x=\"0\" y=\"4\" width=\"8\" height=\"4\" fill=\"#FFF9FB\"/>\n    </pattern>\n\n    <!-- Vintage Scallop Border -->\n    <pattern id=\"scallop\" width=\"24\" height=\"20\" patternUnits=\"userSpaceOnUse\">\n      <path d=\"M 0 0 L 24 0 L 24 6 Q 12 20 0 6 Z\" fill=\"#E5C1CD\" opacity=\"0.7\"/>\n      <path d=\"M 0 0 L 24 0 L 24 3 Q 12 15 0 3 Z\" fill=\"#FFF9FB\"/>\n      <circle cx=\"12\" cy=\"12\" r=\"1.5\" fill=\"#B85D78\" opacity=\"0.5\"/>\n    </pattern>\n\n    <!-- Reusable Vintage Rose -->\n    <g id=\"rose\">\n      <circle cx=\"0\" cy=\"0\" r=\"18\" fill=\"#E5C1CD\"/>\n      <path d=\"M -16 -4 C -18 -16, 0 -22, 10 -14 C 22 -10, 20 8, 10 14 C 2 22, -16 16, -16 -4 Z\" fill=\"#D48C9E\"/>\n      <path d=\"M -10 6 C -16 -4, -6 -16, 6 -12 C 16 -8, 14 8, 4 12 C -4 14, -8 10, -10 6 Z\" fill=\"#B85D78\"/>\n      <path d=\"M -6 -2 C -6 -8, 4 -10, 8 -4 C 12 2, 4 10, -2 6 C -6 4, -4 0, 0 0 C 4 0, 4 4, 0 4\" fill=\"none\" stroke=\"#F8E8EE\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n      <path d=\"M -12 -10 Q -4 -16 6 -12\" fill=\"none\" stroke=\"#FFF9FB\" stroke-width=\"1.5\" stroke-linecap=\"round\" opacity=\"0.7\"/>\n    </g>\n\n    <!-- Rosebud -->\n    <g id=\"bud\">\n      <path d=\"M -4 6 C -2 10, 2 10, 4 6 C 4 2, 0 -8, 0 -8 C 0 -8, -4 2, -4 6 Z\" fill=\"#8C9E8A\"/>\n      <circle cx=\"0\" cy=\"0\" r=\"7\" fill=\"#D48C9E\"/>\n      <path d=\"M -5 -2 C -4 -7, 4 -7, 5 -2 C 6 3, 0 6, -5 -2 Z\" fill=\"#B85D78\"/>\n      <path d=\"M -2 -2 C 0 -5, 3 -2, 1 1\" fill=\"none\" stroke=\"#F8E8EE\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n    </g>\n\n    <!-- Leaf -->\n    <g id=\"leaf\">\n      <path d=\"M 0 0 Q 14 -10 26 0 Q 14 10 0 0 Z\" fill=\"#9CAF99\"/>\n      <path d=\"M 0 0 Q 14 -10 26 0\" fill=\"#859982\" opacity=\"0.5\"/>\n      <path d=\"M 2 0 L 20 0\" stroke=\"#F8E8EE\" stroke-width=\"1\" stroke-linecap=\"round\" opacity=\"0.6\"/>\n    </g>\n\n    <!-- Tiny Heart -->\n    <path id=\"heart\" d=\"M 0 3 C -3 0, -7 -2, -7 -6 C -7 -9, -4 -11, -1 -9 C 0 -8, 0 -7, 0 -7 C 0 -7, 0 -8, 1 -9 C 4 -11, 7 -9, 7 -6 C 7 -2, 3 0, 0 3 Z\"/>\n\n    <!-- 50s Starburst -->\n    <path id=\"star\" d=\"M 0 -8 Q 0 0 8 0 Q 0 0 0 8 Q 0 0 -8 0 Q 0 0 0 -8 Z\" fill=\"#FFF9FB\"/>\n  </defs>\n\n  <!-- 1. Base Wallpaper -->\n  <rect width=\"360\" height=\"230\" fill=\"url(#bgGrad)\"/>\n  <rect width=\"360\" height=\"160\" fill=\"url(#polka)\"/>\n\n  <!-- 2. 1950s Diner Wainscoting (Lower Wall) -->\n  <g transform=\"translate(0, 155)\">\n    <rect width=\"360\" height=\"75\" fill=\"#E5C1CD\" opacity=\"0.5\"/>\n    <rect width=\"360\" height=\"75\" fill=\"url(#stripes)\"/>\n    <!-- Retro Trim / Chair Rail -->\n    <rect y=\"-5\" width=\"360\" height=\"10\" fill=\"#E5C1CD\"/>\n    <rect y=\"-4\" width=\"360\" height=\"8\" fill=\"url(#checkers)\" opacity=\"0.75\"/>\n    <line x1=\"0\" y1=\"-5\" x2=\"360\" y2=\"-5\" stroke=\"#2E1A21\" stroke-width=\"1\" opacity=\"0.2\"/>\n    <line x1=\"0\" y1=\"5\" x2=\"360\" y2=\"5\" stroke=\"#FFF9FB\" stroke-width=\"1.5\"/>\n  </g>\n\n  <!-- 3. Diner Booth Silhouette (Bottom Right) -->\n  <g transform=\"translate(265, 165)\">\n    <!-- Booth Shadow -->\n    <path d=\"M -5 65 L -5 20 C -5 5, 10 -5, 25 -5 L 100 -5 L 100 65 Z\" fill=\"#2E1A21\" opacity=\"0.08\"/>\n    <!-- Booth Back -->\n    <path d=\"M 0 65 L 0 20 C 0 8, 10 0, 22 0 L 100 0 L 100 65 Z\" fill=\"#B85D78\"/>\n    <!-- Cream Piping & Tufting -->\n    <path d=\"M 3 65 L 3 20 C 3 10, 11 3, 22 3 L 100 3\" fill=\"none\" stroke=\"#FFF9FB\" stroke-width=\"2.5\"/>\n    <line x1=\"32\" y1=\"4\" x2=\"32\" y2=\"65\" stroke=\"#8E3D56\" stroke-width=\"2\"/>\n    <line x1=\"62\" y1=\"4\" x2=\"62\" y2=\"65\" stroke=\"#8E3D56\" stroke-width=\"2\"/>\n    <line x1=\"34\" y1=\"4\" x2=\"34\" y2=\"65\" stroke=\"#FFF9FB\" stroke-width=\"1\" opacity=\"0.5\"/>\n    <line x1=\"64\" y1=\"4\" x2=\"64\" y2=\"65\" stroke=\"#FFF9FB\" stroke-width=\"1\" opacity=\"0.5\"/>\n    <!-- Tabletop Edge -->\n    <rect x=\"-35\" y=\"48\" width=\"90\" height=\"8\" rx=\"4\" fill=\"#FFF9FB\" stroke=\"#E5C1CD\" stroke-width=\"1.5\"/>\n    <line x1=\"-30\" y1=\"52\" x2=\"50\" y2=\"52\" stroke=\"#B85D78\" stroke-width=\"1.5\" stroke-dasharray=\"4 4\" opacity=\"0.5\"/>\n  </g>\n\n  <!-- 4. Center Readability Glow -->\n  <rect width=\"360\" height=\"230\" fill=\"url(#centerGlow)\"/>\n\n  <!-- 5. Top Scallop Valence -->\n  <rect width=\"360\" height=\"20\" fill=\"url(#scallop)\"/>\n\n  <!-- 6. Floating Charm Motifs (Hearts & Stars) -->\n  <use href=\"#heart\" x=\"65\" y=\"55\" fill=\"#B85D78\" opacity=\"0.35\" transform=\"rotate(-15 65 55) scale(0.9)\"/>\n  <use href=\"#heart\" x=\"85\" y=\"38\" fill=\"#FFF9FB\" opacity=\"0.8\" transform=\"rotate(10 85 38) scale(0.6)\"/>\n  <use href=\"#heart\" x=\"305\" y=\"95\" fill=\"#B85D78\" opacity=\"0.3\" transform=\"rotate(20 305 95) scale(0.8)\"/>\n  <use href=\"#heart\" x=\"45\" y=\"135\" fill=\"#D48C9E\" opacity=\"0.4\" transform=\"rotate(-25 45 135) scale(0.7)\"/>\n  <use href=\"#star\" x=\"275\" y=\"42\" opacity=\"0.8\" transform=\"scale(0.8)\"/>\n  <use href=\"#star\" x=\"55\" y=\"95\" opacity=\"0.7\" transform=\"scale(0.6)\"/>\n  <use href=\"#star\" x=\"230\" y=\"140\" opacity=\"0.7\" transform=\"scale(0.7)\"/>\n\n  <!-- 7. Floral Arrangements (Framing Corners) -->\n  <!-- Top Left Cluster -->\n  <g transform=\"translate(15, 18)\">\n    <use href=\"#leaf\" x=\"15\" y=\"10\" transform=\"rotate(15)\"/>\n    <use href=\"#leaf\" x=\"5\" y=\"20\" transform=\"rotate(65)\"/>\n    <use href=\"#leaf\" x=\"28\" y=\"-5\" transform=\"rotate(-15) scale(0.8)\"/>\n    <use href=\"#bud\" x=\"48\" y=\"8\" transform=\"rotate(45 48 8)\"/>\n    <use href=\"#bud\" x=\"8\" y=\"48\" transform=\"rotate(15 8 48)\"/>\n    <use href=\"#rose\" x=\"22\" y=\"20\" transform=\"scale(0.9) rotate(25)\"/>\n    <use href=\"#rose\" x=\"-2\" y=\"2\" transform=\"scale(1.15)\"/>\n  </g>\n\n  <!-- Bottom Left Cluster -->\n  <g transform=\"translate(10, 215)\">\n    <use href=\"#leaf\" x=\"18\" y=\"-12\" transform=\"rotate(-25) scale(1.1)\"/>\n    <use href=\"#leaf\" x=\"5\" y=\"-25\" transform=\"rotate(-70) scale(0.9)\"/>\n    <use href=\"#leaf\" x=\"35\" y=\"0\" transform=\"rotate(5) scale(0.9)\"/>\n    <use href=\"#bud\" x=\"15\" y=\"-48\" transform=\"rotate(-10 15 -48)\"/>\n    <use href=\"#rose\" x=\"38\" y=\"-8\" transform=\"scale(0.85) rotate(40)\"/>\n    <use href=\"#rose\" x=\"8\" y=\"-12\" transform=\"scale(1.2) rotate(-15)\"/>\n    <use href=\"#heart\" x=\"68\" y=\"-15\" fill=\"#B85D78\" opacity=\"0.4\" transform=\"rotate(15 68 -15) scale(0.7)\"/>\n  </g>\n\n  <!-- Top Right Cluster -->\n  <g transform=\"translate(345, 20)\">\n    <use href=\"#leaf\" x=\"-15\" y=\"15\" transform=\"scale(-1, 1) rotate(25)\"/>\n    <use href=\"#leaf\" x=\"-5\" y=\"25\" transform=\"scale(-1, 1) rotate(70)\"/>\n    <use href=\"#bud\" x=\"-42\" y=\"12\" transform=\"rotate(-55 -42 12)\"/>\n    <use href=\"#rose\" x=\"-22\" y=\"22\" transform=\"scale(0.8) rotate(-35)\"/>\n    <use href=\"#rose\" x=\"2\" y=\"2\" transform=\"scale(1.1) rotate(15)\"/>\n  </g>\n\n  <!-- Diner Table Mini-Vase (Bottom Right Foreground) -->\n  <g transform=\"translate(248, 195)\">\n    <use href=\"#leaf\" x=\"0\" y=\"-8\" transform=\"rotate(-110) scale(0.7)\"/>\n    <use href=\"#leaf\" x=\"4\" y=\"-8\" transform=\"rotate(-40) scale(0.7)\"/>\n    <use href=\"#rose\" x=\"0\" y=\"-12\" transform=\"scale(0.65) rotate(10)\"/>\n    <!-- Milk Glass Vase -->\n    <path d=\"M -5 -2 L 5 -2 L 7 18 C 7 20, -7 20, -7 18 Z\" fill=\"#FFF9FB\" stroke=\"#E5C1CD\" stroke-width=\"1\"/>\n    <ellipse cx=\"0\" cy=\"-2\" rx=\"6\" ry=\"1.5\" fill=\"#B85D78\" opacity=\"0.4\"/>\n    <use href=\"#heart\" x=\"0\" y=\"10\" fill=\"#E5C1CD\" transform=\"scale(0.5)\"/>\n  </g>\n</svg>"
 },
 {
  "id": "my-everything",
  "era": "My Everything",
  "year": 2014,
  "palette": {
   "bg1": "#1C1C1C",
   "bg2": "#383838",
   "accent": "#D8BFD8",
   "text": "#F5F5F5"
  },
  "mood": "Black and white sophistication with a high ponytail and soft lavender glow",
  "intro": "Welcome to 2014, birthday boy! Put on your cat ears and get ready to unlock the biggest pop era of the year.",
  "hidden": [
   {
    "emoji": "🎷",
    "label": "Saxophone",
    "x": 75,
    "y": 30,
    "fact": "Ariana said she had no idea Problem would be on the album until she heard the final mix.",
    "confidence": "high",
    "verdict": "manual",
    "source": "Ariana Grande Wiki - Fandom"
   },
   {
    "emoji": "🚀",
    "label": "Space Helmet",
    "x": 45,
    "y": 20,
    "fact": "Ariana told Ryan Seacrest the Break Free video was inspired by Barbarella and Star Wars. Zedd DJs a spaceship dance party in it.",
    "confidence": "high",
    "verdict": "manual",
    "source": "antiMusic"
   }
  ],
  "puzzles": [
   {
    "prompt": "Emoji riddle: 💔 + 🆓. Name this Zedd collaboration.",
    "answers": [
     "break free",
     "breakfree"
    ],
    "hint": "It is the ultimate space anthem from this album."
   },
   {
    "prompt": "This romantic duet with The Weeknd asks you to care for her even more than before.",
    "answers": [
     "love me harder",
     "lovemeharder"
    ],
    "hint": "The title is three words starting with Love."
   },
   {
    "prompt": "Emoji riddle: 1️⃣ + 🔚 + ⏰. Which single is this?",
    "answers": [
     "one last time",
     "onelasttime",
     "1 last time"
    ],
    "hint": "The music video shows the end of the world with a comet crashing."
   }
  ],
  "unlockLine": "You solved them all with zero problems, so step right through to your next birthday surprise!",
  "game": "constellation",
  "art": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 230\" preserveAspectRatio=\"xMidYMid slice\">\n  <defs>\n    <!-- Background Gradient -->\n    <linearGradient id=\"bg\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#1C1C1C\"/>\n      <stop offset=\"55%\" stop-color=\"#383838\"/>\n      <stop offset=\"100%\" stop-color=\"#141414\"/>\n    </linearGradient>\n\n    <!-- Soft Lavender Glow keeping center light -->\n    <radialGradient id=\"glow\" cx=\"50%\" cy=\"46%\" r=\"55%\" fx=\"50%\" fy=\"46%\">\n      <stop offset=\"0%\" stop-color=\"#F5F5F5\" stop-opacity=\"0.95\"/>\n      <stop offset=\"30%\" stop-color=\"#D8BFD8\" stop-opacity=\"0.75\"/>\n      <stop offset=\"65%\" stop-color=\"#D8BFD8\" stop-opacity=\"0.18\"/>\n      <stop offset=\"100%\" stop-color=\"#383838\" stop-opacity=\"0\"/>\n    </radialGradient>\n\n    <!-- Big Soft Moon Gradient -->\n    <linearGradient id=\"moon\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#FFFFFF\"/>\n      <stop offset=\"65%\" stop-color=\"#F5F5F5\"/>\n      <stop offset=\"100%\" stop-color=\"#D8BFD8\"/>\n    </linearGradient>\n\n    <!-- Art Deco Line Vertical Fade -->\n    <linearGradient id=\"deco\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#D8BFD8\" stop-opacity=\"0.45\"/>\n      <stop offset=\"60%\" stop-color=\"#F5F5F5\" stop-opacity=\"0.15\"/>\n      <stop offset=\"100%\" stop-color=\"#1C1C1C\" stop-opacity=\"0\"/>\n    </linearGradient>\n\n    <!-- Floor Reflection Gradient -->\n    <linearGradient id=\"floorGlow\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n      <stop offset=\"0%\" stop-color=\"#1C1C1C\" stop-opacity=\"0\"/>\n      <stop offset=\"30%\" stop-color=\"#D8BFD8\" stop-opacity=\"0.15\"/>\n      <stop offset=\"50%\" stop-color=\"#F5F5F5\" stop-opacity=\"0.3\"/>\n      <stop offset=\"70%\" stop-color=\"#D8BFD8\" stop-opacity=\"0.15\"/>\n      <stop offset=\"100%\" stop-color=\"#1C1C1C\" stop-opacity=\"0\"/>\n    </linearGradient>\n  </defs>\n\n  <!-- Base Dark Layer -->\n  <rect width=\"360\" height=\"230\" fill=\"url(#bg)\"/>\n\n  <!-- Ambient Lavender Glow -->\n  <rect width=\"360\" height=\"230\" fill=\"url(#glow)\"/>\n\n  <!-- Subtle Starlight Dust -->\n  <g fill=\"#F5F5F5\" opacity=\"0.4\">\n    <circle cx=\"65\" cy=\"40\" r=\"1\"/>\n    <circle cx=\"95\" cy=\"25\" r=\"0.7\"/>\n    <circle cx=\"265\" cy=\"30\" r=\"0.8\"/>\n    <circle cx=\"295\" cy=\"55\" r=\"1.1\"/>\n    <circle cx=\"50\" cy=\"110\" r=\"0.6\"/>\n    <circle cx=\"310\" cy=\"105\" r=\"0.7\"/>\n  </g>\n\n  <!-- Big Soft Moon (Keep center bright for emojis) -->\n  <circle cx=\"180\" cy=\"105\" r=\"78\" fill=\"#D8BFD8\" opacity=\"0.2\"/>\n  <circle cx=\"180\" cy=\"105\" r=\"70\" fill=\"url(#moon)\" opacity=\"0.92\"/>\n  \n  <!-- Subtle Moon Crescent Highlight -->\n  <path d=\"M 130 55 A 70 70 0 0 1 235 150 A 68 68 0 0 0 130 55 Z\" fill=\"#FFFFFF\" opacity=\"0.5\"/>\n\n  <!-- Curved Horizon Stage Floor -->\n  <path d=\"M 0 192 Q 180 180 360 192 L 360 230 L 0 230 Z\" fill=\"#121212\"/>\n  <path d=\"M 0 192 Q 180 180 360 192 L 360 196 Q 180 184 0 196 Z\" fill=\"url(#floorGlow)\"/>\n\n  <!-- Art Deco Framing & Motifs -->\n  <g stroke=\"url(#deco)\" fill=\"none\" stroke-width=\"1\">\n    <!-- Left Stepped Pillars -->\n    <path d=\"M 14 0 L 14 195 M 24 0 L 24 185 M 34 0 L 34 165\"/>\n    <path d=\"M 0 45 L 34 15 M 0 85 L 24 65\"/>\n    \n    <!-- Right Stepped Pillars -->\n    <path d=\"M 346 0 L 346 195 M 336 0 L 336 185 M 326 0 L 326 165\"/>\n    <path d=\"M 360 45 L 326 15 M 360 85 L 336 65\"/>\n\n    <!-- Framing Archways -->\n    <path d=\"M 14 130 Q 14 15 130 15\" stroke-width=\"1.2\"/>\n    <path d=\"M 24 140 Q 24 25 115 25\" stroke-width=\"0.7\"/>\n    <path d=\"M 346 130 Q 346 15 230 15\" stroke-width=\"1.2\"/>\n    <path d=\"M 336 140 Q 336 25 245 25\" stroke-width=\"0.7\"/>\n\n    <!-- Top Center Art Deco Sunburst / Diamond -->\n    <polygon points=\"180,6 186,15 180,24 174,15\" stroke=\"#D8BFD8\" stroke-opacity=\"0.4\" fill=\"#1C1C1C\" fill-opacity=\"0.3\"/>\n    <line x1=\"160\" y1=\"15\" x2=\"174\" y2=\"15\" stroke=\"#D8BFD8\" stroke-opacity=\"0.3\"/>\n    <line x1=\"186\" y1=\"15\" x2=\"200\" y2=\"15\" stroke=\"#D8BFD8\" stroke-opacity=\"0.3\"/>\n  </g>\n\n  <!-- Corner Vignette Arches (Dark Sophistication) -->\n  <path d=\"M 0 0 L 85 0 Q 25 25 0 85 Z\" fill=\"#121212\" opacity=\"0.75\"/>\n  <path d=\"M 360 0 L 275 0 Q 335 25 360 85 Z\" fill=\"#121212\" opacity=\"0.75\"/>\n\n  <!-- Lone Slim Stool Silhouette (Iconic \"My Everything\" Cover Motif) -->\n  <!-- Stool Shadow -->\n  <ellipse cx=\"242\" cy=\"197\" rx=\"18\" ry=\"2.5\" fill=\"#080808\" opacity=\"0.8\"/>\n\n  <!-- Stool Structure -->\n  <g stroke=\"#1C1C1C\" stroke-linecap=\"round\">\n    <!-- Left Leg -->\n    <line x1=\"235\" y1=\"145\" x2=\"229\" y2=\"196\" stroke-width=\"2.2\"/>\n    <!-- Right Leg -->\n    <line x1=\"249\" y1=\"145\" x2=\"255\" y2=\"196\" stroke-width=\"2.2\"/>\n    <!-- Center Back Leg -->\n    <line x1=\"242\" y1=\"145\" x2=\"242\" y2=\"193\" stroke-width=\"1.6\" stroke=\"#282828\"/>\n    \n    <!-- Footrest Ring -->\n    <ellipse cx=\"242\" cy=\"175\" rx=\"9.5\" ry=\"2\" fill=\"none\" stroke=\"#282828\" stroke-width=\"1.5\"/>\n    <path d=\"M 232.5 175 A 9.5 2 0 0 0 251.5 175\" fill=\"none\" stroke=\"#181818\" stroke-width=\"1.6\"/>\n  </g>\n\n  <!-- Stool Seat Cushion -->\n  <ellipse cx=\"242\" cy=\"145\" rx=\"13.5\" ry=\"3.2\" fill=\"#141414\"/>\n  <ellipse cx=\"242\" cy=\"143.5\" rx=\"13.5\" ry=\"3\" fill=\"#2C2C2C\"/>\n  <!-- Cushion Rim Backlight from Moon -->\n  <path d=\"M 228.5 143.5 A 13.5 3 0 0 1 255.5 143.5\" fill=\"none\" stroke=\"#D8BFD8\" stroke-width=\"0.9\" opacity=\"0.85\"/>\n  <!-- Left Leg Rim Highlight -->\n  <line x1=\"234.2\" y1=\"146.5\" x2=\"228.3\" y2=\"195\" stroke=\"#D8BFD8\" stroke-width=\"0.6\" opacity=\"0.6\"/>\n</svg>"
 },
 {
  "id": "dangerous-woman",
  "era": "Dangerous Woman",
  "year": 2016,
  "palette": {
   "bg1": "#111111",
   "bg2": "#2a2a2a",
   "accent": "#d9b3ff",
   "text": "#f5f5f5"
  },
  "mood": "Sleek black latex, silver shadows, and iconic bunny ears",
  "intro": "Welcome to 2016, birthday boy. Put on your black bunny mask and unlock the secrets of this bold era.",
  "hidden": [
   {
    "emoji": "🐰",
    "label": "Latex Bunny Mask",
    "x": 22,
    "y": 35,
    "fact": "Ariana revealed the new album title in a Snapchat post on February 22, 2016.",
    "confidence": "high",
    "verdict": "manual",
    "source": "Wikipedia"
   },
   {
    "emoji": "🚲",
    "label": "Gym Spin Bike",
    "x": 75,
    "y": 65,
    "fact": "The Side to Side video starts in a SoulCycle-style spin class. Hannah Lux Davis directed it.",
    "confidence": "high",
    "verdict": "manual",
    "source": "XXL Mag"
   },
   {
    "emoji": "📺",
    "label": "Studio TV Camera",
    "x": 48,
    "y": 20,
    "fact": "Focus was planned as the lead single for the album. It was later scrapped.",
    "confidence": "high",
    "verdict": "manual",
    "source": "TIME"
   }
  ],
  "puzzles": [
   {
    "prompt": "Emoji riddle: ➡️ 👩 (This synth-pop banger was co-produced by Max Martin)",
    "answers": [
     "Into You",
     "into you"
    ],
    "hint": "It is two words and was the second single from the album."
   },
   {
    "prompt": "Emoji riddle: ⬅️ ➡️ (A reggae-pop collaboration with Nicki Minaj)",
    "answers": [
     "Side to Side",
     "Side To Side",
     "side to side"
    ],
    "hint": "Think about the famous cycling music video."
   },
   {
    "prompt": "This song was once going to be the title of the whole album.",
    "answers": [
     "moonlight"
    ],
    "hint": "Think of the night sky."
   }
  ],
  "unlockLine": "You solved the room like a true Dangerous Woman expert, so step right through to the next era!",
  "game": "scratch",
  "art": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 230\" preserveAspectRatio=\"xMidYMid slice\">\n  <defs>\n    <!-- Central soft glow for readability -->\n    <radialGradient id=\"centerGlow\" cx=\"50%\" cy=\"48%\" r=\"60%\">\n      <stop offset=\"0%\" stop-color=\"#f5f5f5\" stop-opacity=\"1\"/>\n      <stop offset=\"35%\" stop-color=\"#d9b3ff\" stop-opacity=\"0.7\"/>\n      <stop offset=\"65%\" stop-color=\"#2a2a2a\" stop-opacity=\"0.9\"/>\n      <stop offset=\"100%\" stop-color=\"#111111\" stop-opacity=\"1\"/>\n    </radialGradient>\n\n    <!-- Latex dark gradient -->\n    <linearGradient id=\"latexDark\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#2a2a2a\"/>\n      <stop offset=\"50%\" stop-color=\"#151515\"/>\n      <stop offset=\"100%\" stop-color=\"#080808\"/>\n    </linearGradient>\n\n    <!-- Latex glossy highlight -->\n    <linearGradient id=\"latexGloss\" x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#f5f5f5\" stop-opacity=\"0.6\"/>\n      <stop offset=\"30%\" stop-color=\"#d9b3ff\" stop-opacity=\"0.2\"/>\n      <stop offset=\"100%\" stop-color=\"#111111\" stop-opacity=\"0\"/>\n    </linearGradient>\n\n    <!-- Neon rim light -->\n    <linearGradient id=\"neonRim\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n      <stop offset=\"0%\" stop-color=\"#d9b3ff\" stop-opacity=\"0\"/>\n      <stop offset=\"50%\" stop-color=\"#d9b3ff\" stop-opacity=\"0.8\"/>\n      <stop offset=\"100%\" stop-color=\"#f5f5f5\" stop-opacity=\"0\"/>\n    </linearGradient>\n\n    <!-- Silver moon gradient -->\n    <linearGradient id=\"moonGrad\" x1=\"20%\" y1=\"20%\" x2=\"80%\" y2=\"80%\">\n      <stop offset=\"0%\" stop-color=\"#ffffff\"/>\n      <stop offset=\"70%\" stop-color=\"#d9b3ff\"/>\n      <stop offset=\"100%\" stop-color=\"#8c73a6\"/>\n    </linearGradient>\n    \n    <!-- Ear inner shadow -->\n    <linearGradient id=\"earInner\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#050505\"/>\n      <stop offset=\"60%\" stop-color=\"#1a1a1a\"/>\n      <stop offset=\"100%\" stop-color=\"#d9b3ff\" stop-opacity=\"0.4\"/>\n    </linearGradient>\n  </defs>\n\n  <!-- Base Background -->\n  <rect width=\"360\" height=\"230\" fill=\"#111111\"/>\n  <rect width=\"360\" height=\"230\" fill=\"url(#centerGlow)\"/>\n\n  <!-- Background Silver/Lavender Streaks -->\n  <path d=\"M-20,40 Q100,10 220,-20 L260,-20 Q120,30 -20,80 Z\" fill=\"#f5f5f5\" opacity=\"0.1\"/>\n  <path d=\"M120,250 Q240,200 380,120 L380,160 Q260,220 160,250 Z\" fill=\"#d9b3ff\" opacity=\"0.1\"/>\n\n  <!-- Glowing Crescent Moon (Top Center-Right, framing the light area) -->\n  <path d=\"M210,25 A45,45 0 1,1 155,95 A38,38 0 1,0 210,25 Z\" fill=\"url(#moonGrad)\" opacity=\"0.85\"/>\n\n  <!-- Top Left Latex Wave -->\n  <path d=\"M-10,-10 L180,-10 C120,30 60,40 -10,110 Z\" fill=\"url(#latexDark)\"/>\n  <path d=\"M-10,110 C60,40 120,30 180,-10\" fill=\"none\" stroke=\"url(#neonRim)\" stroke-width=\"2\"/>\n  <path d=\"M5,0 C60,25 100,20 140,-5 C90,10 50,15 5,0 Z\" fill=\"#f5f5f5\" opacity=\"0.25\"/>\n\n  <!-- Top Right Latex Wave -->\n  <path d=\"M370,-10 L230,-10 C280,25 320,60 370,120 Z\" fill=\"url(#latexDark)\"/>\n  <path d=\"M230,-10 C280,25 320,60 370,120\" fill=\"none\" stroke=\"url(#neonRim)\" stroke-width=\"1.5\"/>\n\n  <!-- Bottom Left Latex Fold -->\n  <path d=\"M-10,140 C50,150 90,190 160,240 L-10,240 Z\" fill=\"url(#latexDark)\"/>\n  <path d=\"M-10,155 C40,165 75,195 130,235 C70,200 35,175 -10,165 Z\" fill=\"url(#latexGloss)\"/>\n  <path d=\"M-10,140 C50,150 90,190 160,240\" fill=\"none\" stroke=\"url(#neonRim)\" stroke-width=\"2\"/>\n\n  <!-- Bottom Right Latex Fold -->\n  <path d=\"M370,150 C290,160 240,195 140,240 L370,240 Z\" fill=\"url(#latexDark)\"/>\n  <path d=\"M370,170 C300,175 250,205 180,235 C255,210 305,185 370,180 Z\" fill=\"url(#latexGloss)\"/>\n\n  <!-- Iconic Bunny Ears Silhouette (Bottom Left, framing the center) -->\n  <!-- Left Ear -->\n  <path d=\"M35,240 C15,160 10,70 30,25 C45,60 55,140 65,240 Z\" fill=\"url(#latexDark)\"/>\n  <path d=\"M33,40 C20,80 23,150 40,230 C48,150 42,80 33,40 Z\" fill=\"url(#earInner)\"/>\n  <!-- Left Ear Gloss & Neon Edge -->\n  <path d=\"M30,25 C10,70 15,160 35,240\" fill=\"none\" stroke=\"#d9b3ff\" stroke-width=\"1.5\" opacity=\"0.7\"/>\n  <path d=\"M30,25 C45,60 55,140 65,240\" fill=\"none\" stroke=\"#f5f5f5\" stroke-width=\"1\" opacity=\"0.4\"/>\n  <path d=\"M25,55 C18,95 20,140 27,180 C24,140 22,95 25,55 Z\" fill=\"#f5f5f5\" opacity=\"0.5\"/>\n\n  <!-- Right Ear (angled slightly) -->\n  <path d=\"M60,240 C65,160 85,75 115,35 C115,80 100,155 85,240 Z\" fill=\"url(#latexDark)\"/>\n  <path d=\"M108,50 C85,85 72,150 68,230 C85,155 98,90 108,50 Z\" fill=\"url(#earInner)\"/>\n  <!-- Right Ear Gloss & Neon Edge -->\n  <path d=\"M115,35 C85,75 65,160 60,240\" fill=\"none\" stroke=\"#f5f5f5\" stroke-width=\"1.5\" opacity=\"0.8\"/>\n  <path d=\"M115,35 C115,80 100,155 85,240\" fill=\"none\" stroke=\"#d9b3ff\" stroke-width=\"1.5\" opacity=\"0.6\"/>\n  <path d=\"M102,55 C85,85 75,125 70,165 C78,125 88,85 102,55 Z\" fill=\"#f5f5f5\" opacity=\"0.6\"/>\n\n  <!-- Foreground Sleek Bottom Vignette -->\n  <path d=\"M-10,215 Q180,190 370,210 L370,240 L-10,240 Z\" fill=\"#080808\"/>\n  <path d=\"M20,218 Q180,195 340,215 Q180,202 20,218 Z\" fill=\"#d9b3ff\" opacity=\"0.5\"/>\n  <path d=\"M80,212 Q180,200 280,210 Q180,203 80,212 Z\" fill=\"#ffffff\" opacity=\"0.8\"/>\n\n  <!-- Subtle Sparkles / Starlight in the Silver Shadows -->\n  <circle cx=\"280\" cy=\"60\" r=\"1.5\" fill=\"#ffffff\" opacity=\"0.8\"/>\n  <circle cx=\"310\" cy=\"95\" r=\"1\" fill=\"#d9b3ff\" opacity=\"0.6\"/>\n  <circle cx=\"130\" cy=\"30\" r=\"1\" fill=\"#ffffff\" opacity=\"0.5\"/>\n  <circle cx=\"250\" cy=\"150\" r=\"1.5\" fill=\"#d9b3ff\" opacity=\"0.5\"/>\n  <!-- 4-point star -->\n  <path d=\"M295,40 Q295,48 303,48 Q295,48 295,56 Q295,48 287,48 Q295,48 295,40 Z\" fill=\"#ffffff\" opacity=\"0.7\"/>\n</svg>"
 },
 {
  "id": "sweetener",
  "era": "Sweetener",
  "year": 2018,
  "palette": {
   "bg1": "#F5E6DC",
   "bg2": "#E3C9B8",
   "accent": "#C99A7E",
   "text": "#4A3A30"
  },
  "mood": "Dreamy upside-down pastels and warm beige tones",
  "intro": "Welcome to the upside-down room, birthday boy! Everything here is warm, dreamy, and waiting for you to explore.",
  "hidden": [
   {
    "emoji": "🏆",
    "label": "Grammy Trophy",
    "x": 22,
    "y": 40,
    "fact": "This album won Ariana her very first Grammy Award in 2019 for Best Pop Vocal Album.",
    "confidence": "high",
    "verdict": "true",
    "source": "GRAMMY.com"
   },
   {
    "emoji": "☁️",
    "label": "Cloud Perfume",
    "x": 75,
    "y": 25,
    "fact": "Her Cloud fragrance launched in September 2018, right after Sweetener came out.",
    "confidence": "high",
    "verdict": "manual",
    "source": "L'Officiel Singapore"
   },
   {
    "emoji": "🎧",
    "label": "Studio Mixer",
    "x": 55,
    "y": 78,
    "fact": "Pharrell Williams produced and co-wrote about six songs on Sweetener.",
    "confidence": "high",
    "verdict": "manual",
    "source": "The FADER"
   }
  ],
  "puzzles": [
   {
    "prompt": "Emoji riddle: 🚫💧😭",
    "answers": [
     "no tears left to cry",
     "no tears left to cry."
    ],
    "hint": "It was the lead single with the gravity-defying music video."
   },
   {
    "prompt": "This short Sweetener track is named after a comedian. Name the song.",
    "answers": [
     "pete davidson",
     "pete"
    ],
    "hint": "It is his full name."
   },
   {
    "prompt": "Emoji riddle: 👑🟰👩",
    "answers": [
     "god is a woman",
     "GIAW"
    ],
    "hint": "The music video features Ariana swimming in a pool of pastel paint."
   }
  ],
  "unlockLine": "The ceiling becomes the floor as the door swings open to your next era!",
  "game": "gravity",
  "art": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 230\" preserveAspectRatio=\"xMidYMid slice\">\n  <defs>\n    <!-- Upside-down sky gradient: darker warm beige at top, lightest creamy pastel in the middle/bottom -->\n    <linearGradient id=\"sky\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#D9B8A3\"/>\n      <stop offset=\"38%\" stop-color=\"#EED7C8\"/>\n      <stop offset=\"75%\" stop-color=\"#FBF3EE\"/>\n      <stop offset=\"100%\" stop-color=\"#F5E6DC\"/>\n    </linearGradient>\n\n    <!-- Soft center glow to keep middle readable -->\n    <radialGradient id=\"centerGlow\" cx=\"0.5\" cy=\"0.52\" r=\"0.5\">\n      <stop offset=\"0%\" stop-color=\"#FFFDFB\" stop-opacity=\"0.7\"/>\n      <stop offset=\"100%\" stop-color=\"#FFFDFB\" stop-opacity=\"0\"/>\n    </radialGradient>\n\n    <!-- Top inverted clouds: flat on the bottom, fluffy facing up -->\n    <linearGradient id=\"cloudTopBack\" x1=\"0\" y1=\"1\" x2=\"0\" y2=\"0\">\n      <stop offset=\"0%\" stop-color=\"#C99A7E\" stop-opacity=\"0.45\"/>\n      <stop offset=\"100%\" stop-color=\"#E3C9B8\" stop-opacity=\"0.85\"/>\n    </linearGradient>\n\n    <linearGradient id=\"cloudTopFront\" x1=\"0\" y1=\"1\" x2=\"0\" y2=\"0\">\n      <stop offset=\"0%\" stop-color=\"#E3C9B8\"/>\n      <stop offset=\"65%\" stop-color=\"#F5E6DC\"/>\n      <stop offset=\"100%\" stop-color=\"#FFF9F5\"/>\n    </linearGradient>\n\n    <!-- Bottom clouds: flat on the top, fluffy facing down (upside-down motif) -->\n    <linearGradient id=\"cloudBotBack\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#C99A7E\" stop-opacity=\"0.35\"/>\n      <stop offset=\"100%\" stop-color=\"#E3C9B8\" stop-opacity=\"0.8\"/>\n    </linearGradient>\n\n    <linearGradient id=\"cloudBotFront\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#FFF9F5\"/>\n      <stop offset=\"35%\" stop-color=\"#F5E6DC\"/>\n      <stop offset=\"100%\" stop-color=\"#E3C9B8\"/>\n    </linearGradient>\n\n    <!-- Whipped cream swirl gradients -->\n    <linearGradient id=\"creamSwirl\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#FFFDFB\" stop-opacity=\"0.9\"/>\n      <stop offset=\"50%\" stop-color=\"#F5E6DC\" stop-opacity=\"0.6\"/>\n      <stop offset=\"100%\" stop-color=\"#E3C9B8\" stop-opacity=\"0.2\"/>\n    </linearGradient>\n\n    <linearGradient id=\"peachRibbon\" x1=\"1\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#F7D6C4\" stop-opacity=\"0.6\"/>\n      <stop offset=\"50%\" stop-color=\"#F5E6DC\" stop-opacity=\"0.3\"/>\n      <stop offset=\"100%\" stop-color=\"#FFF9F5\" stop-opacity=\"0\"/>\n    </linearGradient>\n\n    <!-- Upside-down staircase portal gradients -->\n    <linearGradient id=\"portalArch\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#4A3A30\" stop-opacity=\"0.35\"/>\n      <stop offset=\"100%\" stop-color=\"#C99A7E\" stop-opacity=\"0.6\"/>\n    </linearGradient>\n  </defs>\n\n  <!-- Base Sky -->\n  <rect width=\"360\" height=\"230\" fill=\"url(#sky)\"/>\n\n  <!-- Dreamy Whipped Cream Swirls in the Background -->\n  <path d=\"M -30,150 C 70,210 130,30 230,90 C 310,140 330,40 390,70 L 390,230 L -30,230 Z\" fill=\"url(#peachRibbon)\"/>\n  <path d=\"M -20,95 C 60,30 140,180 220,115 C 280,65 320,130 380,100 C 330,160 270,100 210,145 C 130,205 50,70 -20,125 Z\" fill=\"url(#creamSwirl)\"/>\n  <path d=\"M 40,230 C 100,160 150,150 200,190 C 240,222 290,190 330,230 Z\" fill=\"url(#creamSwirl)\" opacity=\"0.7\"/>\n\n  <!-- Soft Center Light -->\n  <rect width=\"360\" height=\"230\" fill=\"url(#centerGlow)\"/>\n\n  <!-- TOP INVERTED WORLD: Hanging Arches & Upside-Down Staircase -->\n  <!-- Distant Hanging Arch Left -->\n  <path d=\"M 35,0 L 35,38 A 18,18 0 0 0 71,38 L 71,0 Z\" fill=\"#C99A7E\" opacity=\"0.25\"/>\n  \n  <!-- Main Hanging Portal & Stairs Right -->\n  <g opacity=\"0.85\">\n    <!-- Arch shadow/backing -->\n    <path d=\"M 254,0 L 254,48 A 22,22 0 0 0 298,48 L 298,0 Z\" fill=\"url(#portalArch)\"/>\n    <!-- Inner glowing doorway -->\n    <path d=\"M 260,0 L 260,46 A 16,16 0 0 0 292,46 L 292,0 Z\" fill=\"#F5E6DC\"/>\n    <!-- Upside-down stairs descending from ceiling -->\n    <path d=\"M 226,0 L 262,0 L 262,8 L 253,8 L 253,16 L 244,16 L 244,24 L 235,24 L 235,32 L 226,32 Z\" fill=\"#E3C9B8\"/>\n    <path d=\"M 226,32 L 235,32 L 235,24 L 244,24 L 244,16 L 253,16 L 253,8 L 262,8 L 270,22 L 234,46 Z\" fill=\"#C99A7E\" opacity=\"0.45\"/>\n  </g>\n\n  <!-- TOP CLOUDS (Hanging from top edge, flat bottoms facing down) -->\n  <!-- Back layer -->\n  <path d=\"M -20,0 L 380,0 L 380,28 C 350,48 310,42 285,24 C 255,48 205,46 175,20 C 145,42 95,40 65,18 C 35,42 -5,38 -20,20 Z\" fill=\"url(#cloudTopBack)\"/>\n\n  <!-- Mid inverted cloud island (Flat top, puffy bottom - Escher style) -->\n  <path d=\"M 15,26 L 145,26 C 142,46 118,52 105,38 C 92,58 62,56 50,38 C 38,50 18,44 15,26 Z\" fill=\"url(#cloudTopFront)\" opacity=\"0.9\"/>\n  \n  <!-- Front hanging puffs at top edge -->\n  <path d=\"M -10,0 L 370,0 L 370,14 C 345,32 315,28 295,12 C 270,34 230,30 205,10 C 185,24 155,22 135,8 C 105,30 65,26 40,10 C 20,24 -2,20 -10,10 Z\" fill=\"url(#cloudTopFront)\"/>\n\n  <!-- BOTTOM CLOUDS (Upside-down! Flat tops, fluffy bottoms sinking down) -->\n  <!-- Back layer -->\n  <path d=\"M 160,192 L 375,192 C 365,216 330,224 305,206 C 280,232 230,230 205,204 C 190,218 168,212 160,192 Z\" fill=\"url(#cloudBotBack)\"/>\n  <path d=\"M -25,198 L 150,198 C 140,218 110,222 90,208 C 65,230 25,228 5,208 C -10,218 -20,212 -25,198 Z\" fill=\"url(#cloudBotBack)\"/>\n\n  <!-- Front upside-down cloud islands -->\n  <path d=\"M 195,180 L 355,180 C 350,204 322,210 304,194 C 284,220 246,218 230,194 C 216,208 198,200 195,180 Z\" fill=\"url(#cloudBotFront)\"/>\n  <path d=\"M -15,186 L 125,186 C 120,206 96,212 82,198 C 64,220 32,218 18,198 C 4,210 -12,202 -15,186 Z\" fill=\"url(#cloudBotFront)\"/>\n\n  <!-- Soft Cream Peak / Meringue Drop on Bottom Center-Left -->\n  <path d=\"M 110,230 C 125,230 135,210 142,195 C 148,210 158,230 175,230 Z\" fill=\"#FFF9F5\" opacity=\"0.6\"/>\n\n  <!-- DREAMY CELESTIAL ACCENTS (Kept near edges, out of center) -->\n  <!-- Warm Bronze Crescent Moon (Inverted, bottom right) -->\n  <path d=\"M 322,148 A 11,11 0 1 1 304,162 A 9,9 0 1 0 322,148 Z\" fill=\"#C99A7E\" opacity=\"0.65\"/>\n\n  <!-- Tiny Floating Pearls & 4-Point Sparkles -->\n  <!-- Top Left -->\n  <path d=\"M 28,62 Q 28,70 20,70 Q 28,70 28,78 Q 28,70 36,70 Q 28,70 28,62 Z\" fill=\"#FFFDFB\" opacity=\"0.85\"/>\n  <circle cx=\"48\" cy=\"58\" r=\"2\" fill=\"#FFFDFB\" opacity=\"0.7\"/>\n  <circle cx=\"18\" cy=\"92\" r=\"1.5\" fill=\"#C99A7E\" opacity=\"0.4\"/>\n\n  <!-- Top Right -->\n  <path d=\"M 332,52 Q 332,58 326,58 Q 332,58 332,64 Q 332,58 338,58 Q 332,58 332,52 Z\" fill=\"#FFFDFB\" opacity=\"0.8\"/>\n  <path d=\"M 212,38 Q 212,42 208,42 Q 212,42 212,46 Q 212,42 216,42 Q 212,42 212,38 Z\" fill=\"#4A3A30\" opacity=\"0.3\"/>\n  <circle cx=\"310\" cy=\"70\" r=\"2\" fill=\"#FFFDFB\" opacity=\"0.6\"/>\n\n  <!-- Bottom Left -->\n  <path d=\"M 42,158 Q 42,164 36,164 Q 42,164 42,170 Q 42,164 48,164 Q 42,164 42,158 Z\" fill=\"#C99A7E\" opacity=\"0.5\"/>\n  <circle cx=\"72\" cy=\"172\" r=\"2.5\" fill=\"#FFFDFB\" opacity=\"0.8\"/>\n  <circle cx=\"24\" cy=\"145\" r=\"1.5\" fill=\"#FFFDFB\" opacity=\"0.6\"/>\n\n  <!-- Bottom Right -->\n  <path d=\"M 276,156 Q 276,161 271,161 Q 276,161 276,166 Q 276,161 281,161 Q 276,161 276,156 Z\" fill=\"#FFFDFB\" opacity=\"0.85\"/>\n  <circle cx=\"342\" cy=\"132\" r=\"1.5\" fill=\"#4A3A30\" opacity=\"0.25\"/>\n  <circle cx=\"165\" cy=\"178\" r=\"2\" fill=\"#FFFDFB\" opacity=\"0.75\"/>\n</svg>"
 },
 {
  "id": "thank-u-next",
  "era": "thank u, next",
  "year": 2019,
  "palette": {
   "bg1": "#FFD1DC",
   "bg2": "#E86A92",
   "accent": "#C2185B",
   "text": "#2A1020"
  },
  "mood": "Pink trap house glamour with early 2000s rom-com nostalgia",
  "intro": "Welcome to the 2019 room, birthday boy. Grab your lip gloss and solve these clues to unlock the next stage.",
  "hidden": [
   {
    "emoji": "📓",
    "label": "Burn Book",
    "x": 22,
    "y": 65,
    "fact": "The thank u, next video got 55.4 million YouTube views in its first 24 hours. That was a record at the time.",
    "confidence": "high",
    "verdict": "manual",
    "source": "HotNewHipHop / Headline Planet"
   },
   {
    "emoji": "🐰",
    "label": "Black Bunny Mask",
    "x": 45,
    "y": 25,
    "fact": "During this era, Ariana became the first solo artist since The Beatles to hold the top three spots on the Billboard Hot 100 at once.",
    "confidence": "high",
    "verdict": "true",
    "source": "Billboard"
   }
  ],
  "puzzles": [
   {
    "prompt": "Emoji riddle: 7️⃣ 💍",
    "answers": [
     "7 rings",
     "seven rings"
    ],
    "hint": "Think about a famous jewelry shopping spree at Tiffany's."
   },
   {
    "prompt": "Emoji riddle: 👎 + 💡. A thank u, next track.",
    "answers": [
     "bad idea"
    ],
    "hint": "Two words."
   },
   {
    "prompt": "Emoji riddle: 🩸 + ➖. A thank u, next track.",
    "answers": [
     "bloodline"
    ],
    "hint": "One word."
   }
  ],
  "unlockLine": "You solved them all, so it is time to say thank u, next to this room!",
  "game": "scrapbook",
  "art": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 230\" preserveAspectRatio=\"xMidYMid slice\">\n  <defs>\n    <!-- Soft Rom-Com Sky Gradient -->\n    <linearGradient id=\"sky\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#F7C8D0\"/>\n      <stop offset=\"50%\" stop-color=\"#FFEBF0\"/>\n      <stop offset=\"100%\" stop-color=\"#FFF5F8\"/>\n    </linearGradient>\n\n    <!-- Center Glow for Readability -->\n    <radialGradient id=\"centerGlow\" cx=\"0.5\" cy=\"0.45\" r=\"0.5\">\n      <stop offset=\"0%\" stop-color=\"#FFFFFF\" stop-opacity=\"0.9\"/>\n      <stop offset=\"60%\" stop-color=\"#FFE6EE\" stop-opacity=\"0.4\"/>\n      <stop offset=\"100%\" stop-color=\"#F7C8D0\" stop-opacity=\"0\"/>\n    </radialGradient>\n\n    <!-- Pink Trap House Mansion Gradient -->\n    <linearGradient id=\"mansion\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#FF85B3\" stop-opacity=\"0.55\"/>\n      <stop offset=\"100%\" stop-color=\"#F7C8D0\" stop-opacity=\"0.2\"/>\n    </linearGradient>\n\n    <!-- Gold Trim Gradient -->\n    <linearGradient id=\"gold\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#FFF0B3\"/>\n      <stop offset=\"50%\" stop-color=\"#FFD166\"/>\n      <stop offset=\"100%\" stop-color=\"#E6AC00\"/>\n    </linearGradient>\n\n    <!-- Dark Velvet Contrast -->\n    <linearGradient id=\"darkBase\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#2D1424\"/>\n      <stop offset=\"100%\" stop-color=\"#1A1A1D\"/>\n    </linearGradient>\n\n    <!-- Y2K 4-Point Sparkle -->\n    <g id=\"sparkle\">\n      <path d=\"M0,-10 C0.5,-2.5 2.5,-0.5 10,0 C2.5,0.5 0.5,2.5 0,10 C-0.5,2.5 -2.5,0.5 -10,0 C-2.5,-0.5 -0.5,-2.5 0,-10 Z\"/>\n      <circle cx=\"0\" cy=\"0\" r=\"1.5\" fill=\"#FFFFFF\"/>\n    </g>\n\n    <!-- Early 2000s Puffy Heart -->\n    <path id=\"heart\" d=\"M0,3 C0,3 -4,-1.5 -7,0.5 C-10,2.5 -8,7 0,12 C8,7 10,2.5 7,0.5 C4,-1.5 0,3 0,3 Z\"/>\n  </defs>\n\n  <!-- Background Sky -->\n  <rect width=\"360\" height=\"230\" fill=\"url(#sky)\"/>\n\n  <!-- Diagonal Y2K Glamour Rays -->\n  <g fill=\"#FFFFFF\" opacity=\"0.35\">\n    <polygon points=\"0,0 70,0 0,120\"/>\n    <polygon points=\"110,0 210,0 50,230 0,230\"/>\n    <polygon points=\"260,0 320,0 160,230 120,230\"/>\n    <polygon points=\"360,30 360,120 280,230 220,230\"/>\n  </g>\n\n  <!-- Distant Fluffy Pink Clouds -->\n  <g fill=\"#FFB6C1\" opacity=\"0.25\">\n    <circle cx=\"40\" cy=\"175\" r=\"45\"/>\n    <circle cx=\"95\" cy=\"185\" r=\"35\"/>\n    <circle cx=\"320\" cy=\"170\" r=\"50\"/>\n    <circle cx=\"265\" cy=\"185\" r=\"35\"/>\n  </g>\n  <g fill=\"#FFFFFF\" opacity=\"0.65\">\n    <circle cx=\"20\" cy=\"190\" r=\"35\"/>\n    <circle cx=\"65\" cy=\"195\" r=\"28\"/>\n    <circle cx=\"150\" cy=\"205\" r=\"40\"/>\n    <circle cx=\"215\" cy=\"205\" r=\"38\"/>\n    <circle cx=\"295\" cy=\"190\" r=\"30\"/>\n    <circle cx=\"345\" cy=\"185\" r=\"40\"/>\n  </g>\n\n  <!-- Center Readability Glow -->\n  <rect width=\"360\" height=\"230\" fill=\"url(#centerGlow)\"/>\n\n  <!-- Pink Glam Mansion Silhouette (Kept low & light in the center) -->\n  <g>\n    <!-- Mansion Turrets & Roofs (Hot Pink Tint) -->\n    <polygon points=\"78,160 112,160 95,135\" fill=\"#FF1493\" opacity=\"0.2\"/>\n    <polygon points=\"248,160 282,160 265,135\" fill=\"#FF1493\" opacity=\"0.2\"/>\n    <polygon points=\"130,155 230,155 180,130\" fill=\"#FF1493\" opacity=\"0.25\"/>\n\n    <!-- Mansion Main Body -->\n    <path d=\"M70,210 L70,168 L82,168 L82,160 L108,160 L108,168 L135,168 L135,155 L225,155 L225,168 L252,168 L252,160 L278,160 L278,168 L290,168 L290,210 Z\" fill=\"url(#mansion)\"/>\n\n    <!-- Glam Gold Mansion Outlines & Pillars -->\n    <path d=\"M78,160 L95,135 L112,160 M248,160 L265,135 L282,160 M130,155 L180,130 L230,155 M70,168 L290,168 M135,155 L225,155 M162,155 L162,205 M198,155 L198,205\" stroke=\"url(#gold)\" stroke-width=\"1\" fill=\"none\" opacity=\"0.8\"/>\n\n    <!-- Glowing Windows & Grand Archway -->\n    <path d=\"M170,205 L170,180 A10,10 0 0,1 190,180 L190,205 Z\" fill=\"#FFFFFF\" opacity=\"0.8\"/>\n    <rect x=\"90\" y=\"175\" width=\"10\" height=\"16\" rx=\"5\" fill=\"#FFFFFF\" opacity=\"0.65\"/>\n    <rect x=\"112\" y=\"175\" width=\"10\" height=\"16\" rx=\"5\" fill=\"#FFFFFF\" opacity=\"0.65\"/>\n    <rect x=\"144\" y=\"172\" width=\"10\" height=\"18\" rx=\"5\" fill=\"#FFFFFF\" opacity=\"0.65\"/>\n    <rect x=\"206\" y=\"172\" width=\"10\" height=\"18\" rx=\"5\" fill=\"#FFFFFF\" opacity=\"0.65\"/>\n    <rect x=\"238\" y=\"175\" width=\"10\" height=\"16\" rx=\"5\" fill=\"#FFFFFF\" opacity=\"0.65\"/>\n    <rect x=\"260\" y=\"175\" width=\"10\" height=\"16\" rx=\"5\" fill=\"#FFFFFF\" opacity=\"0.65\"/>\n    <!-- Heart Window in Pediment -->\n    <use href=\"#heart\" x=\"180\" y=\"140\" transform=\"scale(0.6) translate(120, 92)\" fill=\"#FFFFFF\" opacity=\"0.8\"/>\n  </g>\n\n  <!-- Early 2000s Floating Hearts & Concentric Rings (Corners) -->\n  <!-- Top Left Cluster -->\n  <g transform=\"translate(38, 42) rotate(-15)\">\n    <use href=\"#heart\" transform=\"scale(2.8)\" fill=\"none\" stroke=\"#FF1493\" stroke-width=\"0.6\" opacity=\"0.25\"/>\n    <use href=\"#heart\" transform=\"scale(1.9)\" fill=\"#FF1493\" opacity=\"0.2\"/>\n    <use href=\"#heart\" transform=\"scale(1.1)\" fill=\"#FF1493\" opacity=\"0.55\"/>\n  </g>\n  <use href=\"#heart\" transform=\"translate(88, 22) rotate(12) scale(0.9)\" fill=\"url(#gold)\" opacity=\"0.7\"/>\n  <use href=\"#heart\" transform=\"translate(22, 95) rotate(-25) scale(0.8)\" fill=\"#FFFFFF\" opacity=\"0.7\"/>\n\n  <!-- Top Right Cluster -->\n  <g transform=\"translate(322, 48) rotate(18)\">\n    <use href=\"#heart\" transform=\"scale(2.5)\" fill=\"none\" stroke=\"#FF1493\" stroke-width=\"0.6\" opacity=\"0.25\"/>\n    <use href=\"#heart\" transform=\"scale(1.6)\" fill=\"#FF1493\" opacity=\"0.25\"/>\n    <use href=\"#heart\" transform=\"scale(0.9)\" fill=\"url(#gold)\" opacity=\"0.8\"/>\n  </g>\n  <use href=\"#heart\" transform=\"translate(275, 25) rotate(-10) scale(1.1)\" fill=\"#FF1493\" opacity=\"0.4\"/>\n  <use href=\"#heart\" transform=\"translate(335, 105) rotate(20) scale(0.7)\" fill=\"#FF1493\" opacity=\"0.5\"/>\n\n  <!-- Sparkles & Glitz -->\n  <use href=\"#sparkle\" transform=\"translate(68, 65) scale(1.1)\" fill=\"url(#gold)\"/>\n  <use href=\"#sparkle\" transform=\"translate(288, 72) scale(0.9)\" fill=\"url(#gold)\"/>\n  <use href=\"#sparkle\" transform=\"translate(25, 130) scale(0.7)\" fill=\"url(#gold)\"/>\n  <use href=\"#sparkle\" transform=\"translate(335, 138) scale(0.8)\" fill=\"url(#gold)\"/>\n  <use href=\"#sparkle\" transform=\"translate(180, 118) scale(0.7)\" fill=\"url(#gold)\"/>\n\n  <use href=\"#sparkle\" transform=\"translate(115, 38) scale(0.8)\" fill=\"#FFFFFF\"/>\n  <use href=\"#sparkle\" transform=\"translate(245, 42) scale(0.6)\" fill=\"#FFFFFF\"/>\n  <use href=\"#sparkle\" transform=\"translate(95, 122) scale(0.6)\" fill=\"#FFFFFF\"/>\n  <use href=\"#sparkle\" transform=\"translate(265, 122) scale(0.7)\" fill=\"#FFFFFF\"/>\n  <use href=\"#sparkle\" transform=\"translate(52, 160) scale(0.5)\" fill=\"#FF1493\" opacity=\"0.6\"/>\n  <use href=\"#sparkle\" transform=\"translate(308, 160) scale(0.5)\" fill=\"#FF1493\" opacity=\"0.6\"/>\n\n  <!-- Tiny Shimmer Dots -->\n  <g fill=\"#FFFFFF\" opacity=\"0.8\">\n    <circle cx=\"55\" cy=\"25\" r=\"1.5\"/>\n    <circle cx=\"145\" cy=\"28\" r=\"1.2\"/>\n    <circle cx=\"215\" cy=\"22\" r=\"1.5\"/>\n    <circle cx=\"305\" cy=\"25\" r=\"1.2\"/>\n    <circle cx=\"42\" cy=\"110\" r=\"1.5\"/>\n    <circle cx=\"318\" cy=\"85\" r=\"1.5\"/>\n  </g>\n  <g fill=\"#FF1493\" opacity=\"0.4\">\n    <circle cx=\"78\" cy=\"90\" r=\"1.5\"/>\n    <circle cx=\"282\" cy=\"98\" r=\"1.5\"/>\n    <circle cx=\"18\" cy=\"68\" r=\"2\"/>\n    <circle cx=\"345\" cy=\"72\" r=\"1.5\"/>\n  </g>\n\n  <!-- Foreground Trap House Gate / Hills (Dark #1A1A1D anchor) -->\n  <!-- Hot Pink Rim Light -->\n  <path d=\"M0,191 Q95,191 145,206 Q180,214 215,206 Q265,191 360,191 L360,230 L0,230 Z\" fill=\"#FF1493\" opacity=\"0.7\"/>\n  <!-- Gold Accent Line -->\n  <path d=\"M0,193 Q95,193 145,208 Q180,216 215,208 Q265,193 360,193 L360,230 L0,230 Z\" fill=\"url(#gold)\"/>\n  <!-- Dark Base -->\n  <path d=\"M0,195 Q95,195 145,210 Q180,218 215,210 Q265,195 360,195 L360,230 L0,230 Z\" fill=\"url(#darkBase)\"/>\n\n  <!-- Subtle Gold Gate Scrollwork in Bottom Corners -->\n  <g stroke=\"url(#gold)\" stroke-width=\"1.2\" fill=\"none\" opacity=\"0.5\">\n    <path d=\"M15,230 L15,202 M35,230 L35,204 M55,230 L55,206\"/>\n    <path d=\"M15,212 C22,202 28,202 35,212 C42,204 48,204 55,212\"/>\n    <path d=\"M345,230 L345,202 M325,230 L325,204 M305,230 L305,206\"/>\n    <path d=\"M345,212 C338,202 332,202 325,212 C318,204 312,204 305,212\"/>\n  </g>\n</svg>"
 },
 {
  "id": "positions",
  "era": "Positions",
  "year": 2020,
  "palette": {
   "bg1": "#8C9A76",
   "bg2": "#DCD5C9",
   "accent": "#5C4738",
   "text": "#2B2623"
  },
  "mood": "Retro 1960s White House glamour with soft sage green and cream tones",
  "intro": "Welcome to the Oval Office, birthday boy. You are the commander in chief of this groovy 1960s room.",
  "hidden": [
   {
    "emoji": "🐶",
    "label": "Presidential Pup",
    "x": 25,
    "y": 75,
    "fact": "In the Positions video Ariana plays the US president. A portrait of her dog Toulouse hangs in the Oval Office.",
    "confidence": "high",
    "verdict": "manual",
    "source": "Showbiz Cheat Sheet / Zach Sang Show"
   },
   {
    "emoji": "🔬",
    "label": "Lab Coat",
    "x": 78,
    "y": 42,
    "fact": "In the 34+35 music video, Ariana plays both a scientist and the robot she is trying to bring to life.",
    "confidence": "high",
    "verdict": "true",
    "source": "Business Insider"
   },
   {
    "emoji": "🎻",
    "label": "Violin",
    "x": 48,
    "y": 28,
    "fact": "The Positions video came out right after the final 2020 presidential debate.",
    "confidence": "high",
    "verdict": "manual",
    "source": "Wikipedia / Discogs"
   }
  ],
  "puzzles": [
   {
    "prompt": "Emoji riddle: 🎩 + ✨. A Positions track.",
    "answers": [
     "just like magic"
    ],
    "hint": "It starts with the word just."
   },
   {
    "prompt": "Emoji riddle for a collaboration with The Weeknd: 📴 + 🍽️",
    "answers": [
     "off the table",
     "offthetable"
    ],
    "hint": "It is track five on the album."
   },
   {
    "prompt": "Emoji riddle: 🤢. This Positions track shares its name with a word for unpleasant.",
    "answers": [
     "nasty"
    ],
    "hint": "One word."
   }
  ],
  "unlockLine": "You solved the presidential puzzles! Switching the bedroom and kitchen doors open for you now.",
  "game": "desk",
  "art": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 230\" preserveAspectRatio=\"xMidYMid slice\">\n  <defs>\n    <linearGradient id=\"sky\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#8C9A76\" stop-opacity=\"0.35\"/>\n      <stop offset=\"30%\" stop-color=\"#EBE6DC\"/>\n      <stop offset=\"70%\" stop-color=\"#F5F2EB\"/>\n      <stop offset=\"100%\" stop-color=\"#DCD5C9\"/>\n    </linearGradient>\n    <radialGradient id=\"glow\" cx=\"0.5\" cy=\"0.45\" r=\"0.5\">\n      <stop offset=\"0%\" stop-color=\"#FFFFFF\" stop-opacity=\"0.9\"/>\n      <stop offset=\"65%\" stop-color=\"#F5F2EB\" stop-opacity=\"0.4\"/>\n      <stop offset=\"100%\" stop-color=\"#EBE6DC\" stop-opacity=\"0\"/>\n    </radialGradient>\n    <linearGradient id=\"drape\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#768560\"/>\n      <stop offset=\"100%\" stop-color=\"#8C9A76\"/>\n    </linearGradient>\n    <linearGradient id=\"bldg\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#F7F4EE\"/>\n      <stop offset=\"100%\" stop-color=\"#DCD5C9\"/>\n    </linearGradient>\n    <linearGradient id=\"lawn\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#8C9A76\"/>\n      <stop offset=\"100%\" stop-color=\"#6B7857\"/>\n    </linearGradient>\n    <g id=\"star\">\n      <path d=\"M0,-8 C1,-2 2,-1 8,0 C2,1 1,2 0,8 C-1,2 -2,1 -8,0 C-2,-1 -1,-2 0,-8 Z\" fill=\"#F7F4EE\"/>\n      <circle r=\"1.2\" fill=\"#5C4738\" opacity=\"0.4\"/>\n    </g>\n    <g id=\"sm-star\">\n      <path d=\"M0,-4 C0.5,-1 1,-0.5 4,0 C1,0.5 0.5,1 0,4 C-0.5,1 -1,0.5 -4,0 C-1,-0.5 -0.5,-1 0,-4 Z\" fill=\"#F7F4EE\" opacity=\"0.85\"/>\n    </g>\n    <g id=\"window\">\n      <rect x=\"-3\" y=\"0\" width=\"6\" height=\"9\" rx=\"3\" fill=\"#8C9A76\" opacity=\"0.35\"/>\n      <rect x=\"-3\" y=\"4\" width=\"6\" height=\"5\" fill=\"#8C9A76\" opacity=\"0.35\"/>\n    </g>\n  </defs>\n\n  <!-- Background & Glow -->\n  <rect width=\"360\" height=\"230\" fill=\"url(#sky)\"/>\n  <ellipse cx=\"180\" cy=\"105\" rx=\"160\" ry=\"85\" fill=\"url(#glow)\"/>\n\n  <!-- Subtle Retro Sunburst Rays -->\n  <g stroke=\"#FFFFFF\" stroke-width=\"1\" opacity=\"0.45\">\n    <line x1=\"180\" y1=\"160\" x2=\"40\" y2=\"20\"/>\n    <line x1=\"180\" y1=\"160\" x2=\"110\" y2=\"0\"/>\n    <line x1=\"180\" y1=\"160\" x2=\"180\" y2=\"0\"/>\n    <line x1=\"180\" y1=\"160\" x2=\"250\" y2=\"0\"/>\n    <line x1=\"180\" y1=\"160\" x2=\"320\" y2=\"20\"/>\n  </g>\n\n  <!-- Distant Foliage -->\n  <g fill=\"#8C9A76\" opacity=\"0.45\">\n    <circle cx=\"50\" cy=\"195\" r=\"28\"/>\n    <circle cx=\"80\" cy=\"200\" r=\"22\"/>\n    <circle cx=\"280\" cy=\"200\" r=\"22\"/>\n    <circle cx=\"310\" cy=\"195\" r=\"28\"/>\n  </g>\n  <g fill=\"#768560\" opacity=\"0.35\">\n    <circle cx=\"20\" cy=\"198\" r=\"24\"/>\n    <circle cx=\"340\" cy=\"198\" r=\"24\"/>\n  </g>\n\n  <!-- Government Building (White House Motif) -->\n  <g id=\"white-house\">\n    <!-- Side Wings -->\n    <rect x=\"75\" y=\"176\" width=\"210\" height=\"28\" fill=\"#E5DFD3\"/>\n    <!-- Balustrade -->\n    <rect x=\"72\" y=\"173\" width=\"216\" height=\"2\" fill=\"#F7F4EE\"/>\n    <!-- Wing Windows -->\n    <use href=\"#window\" x=\"90\" y=\"183\"/>\n    <use href=\"#window\" x=\"106\" y=\"183\"/>\n    <use href=\"#window\" x=\"122\" y=\"183\"/>\n    <use href=\"#window\" x=\"238\" y=\"183\"/>\n    <use href=\"#window\" x=\"254\" y=\"183\"/>\n    <use href=\"#window\" x=\"270\" y=\"183\"/>\n\n    <!-- Central Mansion Body -->\n    <rect x=\"134\" y=\"166\" width=\"92\" height=\"38\" fill=\"url(#bldg)\"/>\n    <!-- Shadow under portico roof -->\n    <rect x=\"138\" y=\"168\" width=\"84\" height=\"5\" fill=\"#5C4738\" opacity=\"0.2\"/>\n    \n    <!-- Portico Pediment (Triangle Roof) -->\n    <polygon points=\"128,168 180,149 232,168\" fill=\"#DCD5C9\"/>\n    <polygon points=\"133,167 180,151 227,167\" fill=\"#F7F4EE\"/>\n    <!-- Tympanum Star -->\n    <circle cx=\"180\" cy=\"161\" r=\"2.5\" fill=\"#8C9A76\" opacity=\"0.5\"/>\n\n    <!-- Center Door & Arch -->\n    <rect x=\"175\" y=\"186\" width=\"10\" height=\"18\" rx=\"5\" fill=\"#5C4738\" opacity=\"0.5\"/>\n    <!-- Lantern -->\n    <polygon points=\"180,169 178,173 180,176 182,173\" fill=\"#5C4738\" opacity=\"0.7\"/>\n\n    <!-- Iconic Columns -->\n    <g fill=\"#FFFFFF\">\n      <rect x=\"140\" y=\"168\" width=\"3.5\" height=\"35\"/>\n      <rect x=\"155\" y=\"168\" width=\"3.5\" height=\"35\"/>\n      <rect x=\"170\" y=\"168\" width=\"3.5\" height=\"35\"/>\n      <rect x=\"186.5\" y=\"168\" width=\"3.5\" height=\"35\"/>\n      <rect x=\"201.5\" y=\"168\" width=\"3.5\" height=\"35\"/>\n      <rect x=\"216.5\" y=\"168\" width=\"3.5\" height=\"35\"/>\n    </g>\n    <!-- Column Caps -->\n    <g fill=\"#DCD5C9\">\n      <rect x=\"139\" y=\"168\" width=\"5.5\" height=\"2\"/>\n      <rect x=\"154\" y=\"168\" width=\"5.5\" height=\"2\"/>\n      <rect x=\"169\" y=\"168\" width=\"5.5\" height=\"2\"/>\n      <rect x=\"185.5\" y=\"168\" width=\"5.5\" height=\"2\"/>\n      <rect x=\"200.5\" y=\"168\" width=\"5.5\" height=\"2\"/>\n      <rect x=\"215.5\" y=\"168\" width=\"5.5\" height=\"2\"/>\n    </g>\n    <!-- Base Steps -->\n    <rect x=\"126\" y=\"202\" width=\"108\" height=\"3\" fill=\"#F7F4EE\"/>\n  </g>\n\n  <!-- Foreground Lawn & Fountain Pool -->\n  <path d=\"M0,208 Q180,196 360,208 L360,230 L0,230 Z\" fill=\"url(#lawn)\"/>\n  <ellipse cx=\"180\" cy=\"218\" rx=\"55\" ry=\"7\" fill=\"#DCD5C9\"/>\n  <ellipse cx=\"180\" cy=\"218\" rx=\"50\" ry=\"5\" fill=\"#EBE6DC\"/>\n  <!-- Soft Fountain Spray -->\n  <path d=\"M180,218 Q174,205 166,214 M180,218 Q180,200 180,212 M180,218 Q186,205 194,214\" stroke=\"#FFFFFF\" stroke-width=\"1.5\" fill=\"none\" stroke-linecap=\"round\" opacity=\"0.75\"/>\n\n  <!-- 1960s Glamour Valance / Drapes (Top Frame) -->\n  <!-- Under-layer Cream Trim -->\n  <path d=\"M0,0 L360,0 L360,42 Q310,48 270,20 Q180,50 90,20 Q50,48 0,42 Z\" fill=\"#DCD5C9\"/>\n  <!-- Main Sage Drapes -->\n  <path d=\"M0,0 L360,0 L360,36 Q310,42 270,14 Q180,44 90,14 Q50,42 0,36 Z\" fill=\"url(#drape)\"/>\n  <!-- Fine Bronze-Brown Accent Cord -->\n  <path d=\"M0,36 Q50,42 90,14 Q180,44 270,14 Q310,42 360,36\" fill=\"none\" stroke=\"#5C4738\" stroke-width=\"1\" opacity=\"0.5\"/>\n  \n  <!-- Retro Tassels / Ornaments -->\n  <g fill=\"#5C4738\" opacity=\"0.6\">\n    <line x1=\"90\" y1=\"14\" x2=\"90\" y2=\"25\" stroke=\"#5C4738\" stroke-width=\"1\"/>\n    <circle cx=\"90\" cy=\"25\" r=\"2\"/>\n    <line x1=\"270\" y1=\"14\" x2=\"270\" y2=\"25\" stroke=\"#5C4738\" stroke-width=\"1\"/>\n    <circle cx=\"270\" cy=\"25\" r=\"2\"/>\n  </g>\n\n  <!-- Retro Stars & Sparkles (Kept to edges for clear center) -->\n  <use href=\"#star\" x=\"42\" y=\"65\"/>\n  <use href=\"#star\" x=\"318\" y=\"65\"/>\n  <use href=\"#star\" x=\"85\" y=\"46\" transform=\"scale(0.75) translate(28, 15)\"/>\n  <use href=\"#star\" x=\"275\" y=\"46\" transform=\"scale(0.75) translate(91, 15)\"/>\n  \n  <use href=\"#sm-star\" x=\"26\" y=\"105\"/>\n  <use href=\"#sm-star\" x=\"68\" y=\"88\"/>\n  <use href=\"#sm-star\" x=\"334\" y=\"105\"/>\n  <use href=\"#sm-star\" x=\"292\" y=\"88\"/>\n  <use href=\"#sm-star\" x=\"180\" y=\"38\"/>\n\n  <!-- Tiny Glamour Dots -->\n  <g fill=\"#5C4738\" opacity=\"0.3\">\n    <circle cx=\"55\" cy=\"55\" r=\"1\"/>\n    <circle cx=\"30\" cy=\"82\" r=\"1\"/>\n    <circle cx=\"305\" cy=\"55\" r=\"1\"/>\n    <circle cx=\"330\" cy=\"82\" r=\"1\"/>\n    <circle cx=\"145\" cy=\"36\" r=\"1\"/>\n    <circle cx=\"215\" cy=\"36\" r=\"1\"/>\n  </g>\n</svg>"
 },
 {
  "id": "eternal-sunshine",
  "era": "eternal sunshine",
  "year": 2024,
  "palette": {
   "bg1": "#F5E6D3",
   "bg2": "#D8C3A5",
   "accent": "#B22222",
   "text": "#2C1A1D"
  },
  "mood": "Warm sunlight, soft beige tones, and ruby red gloves",
  "intro": "Welcome to the Brighter Days clinic waiting room. Let us clear your mind and celebrate your birthday in style.",
  "hidden": [
   {
    "emoji": "👵",
    "label": "Nonna's Vinyl",
    "x": 22,
    "y": 68,
    "fact": "Her grandmother Nonna sings on the closing track, ordinary things. At 98 she became the oldest living person on the Billboard Hot 100.",
    "confidence": "high",
    "verdict": "manual",
    "source": "Us Weekly"
   },
   {
    "emoji": "🪐",
    "label": "Telescope",
    "x": 76,
    "y": 30,
    "fact": "The saturn returns interlude samples a YouTube video by astrologer Diana Garland about the Saturn return.",
    "confidence": "high",
    "verdict": "manual",
    "source": "Wikipedia"
   },
   {
    "emoji": "🧸",
    "label": "Memory Box",
    "x": 48,
    "y": 52,
    "fact": "The we can't be friends video borrows imagery from Eternal Sunshine of the Spotless Mind, like the snow angel. Evan Peters plays her ex.",
    "confidence": "high",
    "verdict": "manual",
    "source": "Business Insider"
   }
  ],
  "puzzles": [
   {
    "prompt": "Emoji riddle: 🚫 + 🤝. The big single from this album.",
    "answers": [
     "we can't be friends",
     "we cant be friends",
     "we can't be friends (wait for your love)",
     "we cant be friends (wait for your love)"
    ],
    "hint": "It ends with a bracket: wait for your love."
   },
   {
    "prompt": "Emoji riddle: 👍➕❓. This dance track Interpolates Madonna's classic hit Vogue.",
    "answers": [
     "yes, and?",
     "yes and?",
     "yes, and",
     "yes and"
    ],
    "hint": "It was the lead single that kicked off the entire era in January 2024."
   },
   {
    "prompt": "Emoji riddle: 👦 + 🙋‍♀️. A track with a boy in the title.",
    "answers": [
     "the boy is mine"
    ],
    "hint": "Four words."
   }
  ],
  "unlockLine": "Your memories are safe and the door is open. Happy Birthday!",
  "game": "memory",
  "art": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 230\" preserveAspectRatio=\"xMidYMid slice\">\n  <defs>\n    <linearGradient id=\"sky\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#FFFDF9\"/>\n      <stop offset=\"60%\" stop-color=\"#F5E6D3\"/>\n      <stop offset=\"100%\" stop-color=\"#E6D2B8\"/>\n    </linearGradient>\n    <radialGradient id=\"sunGlow\" cx=\"0.2\" cy=\"0.2\" r=\"0.7\">\n      <stop offset=\"0%\" stop-color=\"#FFFFFF\" stop-opacity=\"0.9\"/>\n      <stop offset=\"40%\" stop-color=\"#FFF6E5\" stop-opacity=\"0.6\"/>\n      <stop offset=\"100%\" stop-color=\"#F5E6D3\" stop-opacity=\"0\"/>\n    </radialGradient>\n    <linearGradient id=\"ice\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#E6D2B8\"/>\n      <stop offset=\"30%\" stop-color=\"#D8C3A5\"/>\n      <stop offset=\"100%\" stop-color=\"#C4AD8E\"/>\n    </linearGradient>\n    <linearGradient id=\"snow\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#FAF3EB\"/>\n      <stop offset=\"100%\" stop-color=\"#EFE0CE\"/>\n    </linearGradient>\n    <linearGradient id=\"angel\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#D8C3A5\" stop-opacity=\"0.7\"/>\n      <stop offset=\"100%\" stop-color=\"#E8D7C1\" stop-opacity=\"0.4\"/>\n    </linearGradient>\n    <linearGradient id=\"ray\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#FFFFFF\" stop-opacity=\"0.5\"/>\n      <stop offset=\"100%\" stop-color=\"#FFFFFF\" stop-opacity=\"0\"/>\n    </linearGradient>\n  </defs>\n\n  <!-- Sky Background -->\n  <rect width=\"360\" height=\"230\" fill=\"url(#sky)\"/>\n  \n  <!-- Glowing Sun & Soft Rays -->\n  <rect width=\"360\" height=\"230\" fill=\"url(#sunGlow)\"/>\n  <g fill=\"url(#ray)\">\n    <polygon points=\"72,46 180,-20 240,-20\"/>\n    <polygon points=\"72,46 360,20 360,90\"/>\n    <polygon points=\"72,46 360,140 360,220\"/>\n    <polygon points=\"72,46 160,230 90,230\"/>\n    <polygon points=\"72,46 10,230 -30,230\"/>\n  </g>\n  <circle cx=\"72\" cy=\"46\" r=\"42\" fill=\"#FFFFFF\" opacity=\"0.6\"/>\n  <circle cx=\"72\" cy=\"46\" r=\"26\" fill=\"#FFFFFF\" opacity=\"0.9\"/>\n\n  <!-- Distant Warm Hills -->\n  <path d=\"M0,115 Q90,95 190,112 T360,105 L360,140 L0,140 Z\" fill=\"#E9D8C4\" opacity=\"0.7\"/>\n  \n  <!-- Frozen Lake (Cracked Ice Base) -->\n  <rect y=\"122\" width=\"360\" height=\"108\" fill=\"url(#ice)\"/>\n  \n  <!-- Subtle Ice Reflections -->\n  <ellipse cx=\"95\" cy=\"145\" rx=\"70\" ry=\"12\" fill=\"#F5E6D3\" opacity=\"0.35\"/>\n  <ellipse cx=\"140\" cy=\"175\" rx=\"55\" ry=\"8\" fill=\"#F5E6D3\" opacity=\"0.25\"/>\n\n  <!-- Ice Cracks -->\n  <g fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <!-- Dark Deep Cracks -->\n    <path d=\"M 15,135 L 65,148 L 115,142 L 175,165 L 235,160\" stroke=\"#2C1A1D\" stroke-width=\"1\" opacity=\"0.25\"/>\n    <path d=\"M 65,148 L 45,180 L 75,215\" stroke=\"#2C1A1D\" stroke-width=\"0.9\" opacity=\"0.25\"/>\n    <path d=\"M 115,142 L 140,124\" stroke=\"#2C1A1D\" stroke-width=\"0.7\" opacity=\"0.2\"/>\n    <path d=\"M 175,165 L 150,195 L 110,210\" stroke=\"#2C1A1D\" stroke-width=\"0.8\" opacity=\"0.25\"/>\n    <path d=\"M 150,195 L 185,225\" stroke=\"#2C1A1D\" stroke-width=\"0.6\" opacity=\"0.2\"/>\n    <path d=\"M 45,180 L 10,195\" stroke=\"#2C1A1D\" stroke-width=\"0.6\" opacity=\"0.2\"/>\n    <!-- Light Catching Crack Edges -->\n    <path d=\"M 16,134 L 66,147 L 116,141 L 176,164 L 236,159\" stroke=\"#FAF3EB\" stroke-width=\"0.8\" opacity=\"0.6\"/>\n    <path d=\"M 66,147 L 46,179 L 76,214\" stroke=\"#FAF3EB\" stroke-width=\"0.7\" opacity=\"0.5\"/>\n    <path d=\"M 176,164 L 151,194 L 111,209\" stroke=\"#FAF3EB\" stroke-width=\"0.7\" opacity=\"0.5\"/>\n  </g>\n\n  <!-- Sweeping Snow Bank (Right Side) -->\n  <path d=\"M 170,122 Q 210,145 190,180 Q 175,208 215,230 L 360,230 L 360,122 Z\" fill=\"#E6D5C3\"/>\n  <path d=\"M 180,122 Q 220,145 200,180 Q 185,208 225,230 L 360,230 L 360,122 Z\" fill=\"url(#snow)\"/>\n  \n  <!-- Left Foreground Snow Bank -->\n  <path d=\"M 0,195 Q 45,200 75,230 L 0,230 Z\" fill=\"url(#snow)\"/>\n\n  <!-- Snow Angel Indentation -->\n  <g transform=\"translate(285, 175) rotate(-18)\" fill=\"url(#angel)\">\n    <!-- Inner Shadow / Rim -->\n    <g transform=\"translate(-1, 1.5)\" fill=\"#C9B396\" opacity=\"0.5\">\n      <ellipse cx=\"0\" cy=\"-24\" rx=\"7.5\" ry=\"6.5\"/>\n      <path d=\"M -5,-15 L -42,-28 C -48,-12 -46,8 -36,20 L -7,4 Z\"/>\n      <path d=\"M 5,-15 L 42,-28 C 48,-12 46,8 36,20 L 7,4 Z\"/>\n      <path d=\"M -6,-16 L 6,-16 L 15,28 L 3,28 L 0,12 L -3,28 L -15,28 Z\"/>\n    </g>\n    <!-- Main Angel Shape -->\n    <ellipse cx=\"0\" cy=\"-24\" rx=\"7.5\" ry=\"6.5\"/>\n    <path d=\"M -5,-15 L -42,-28 C -48,-12 -46,8 -36,20 L -7,4 Z\"/>\n    <path d=\"M 5,-15 L 42,-28 C 48,-12 46,8 36,20 L 7,4 Z\"/>\n    <path d=\"M -6,-16 L 6,-16 L 15,28 L 3,28 L 0,12 L -3,28 L -15,28 Z\"/>\n  </g>\n\n  <!-- Ruby Red Gloves (Resting near the snow bank edge) -->\n  <!-- Left Glove -->\n  <g transform=\"translate(212, 196) rotate(-15)\">\n    <ellipse cx=\"6\" cy=\"9\" rx=\"9\" ry=\"11\" fill=\"#C4AD8E\" opacity=\"0.6\"/>\n    <rect x=\"-1\" y=\"13\" width=\"12\" height=\"4.5\" rx=\"2\" fill=\"#8B1A1A\"/>\n    <path d=\"M 0,4 C 0,-3 10,-3 10,4 L 11,14 L -1,14 Z\" fill=\"#B22222\"/>\n    <path d=\"M 8,6 C 12,4 15,7 12,10 L 9,12 Z\" fill=\"#B22222\"/>\n    <ellipse cx=\"4\" cy=\"4\" rx=\"3\" ry=\"5\" fill=\"#D13838\" opacity=\"0.5\"/>\n  </g>\n  \n  <!-- Right Glove -->\n  <g transform=\"translate(228, 204) rotate(28)\">\n    <ellipse cx=\"6\" cy=\"9\" rx=\"9\" ry=\"11\" fill=\"#C4AD8E\" opacity=\"0.6\"/>\n    <rect x=\"-1\" y=\"13\" width=\"12\" height=\"4.5\" rx=\"2\" fill=\"#8B1A1A\"/>\n    <path d=\"M 0,4 C 0,-3 10,-3 10,4 L 11,14 L -1,14 Z\" fill=\"#B22222\"/>\n    <path d=\"M 2,6 C -2,4 -5,7 -2,10 L 1,12 Z\" fill=\"#B22222\"/>\n    <ellipse cx=\"6\" cy=\"4\" rx=\"3\" ry=\"5\" fill=\"#D13838\" opacity=\"0.5\"/>\n  </g>\n\n  <!-- Soft Sunlight Motes -->\n  <g fill=\"#FFFFFF\" opacity=\"0.6\">\n    <circle cx=\"130\" cy=\"70\" r=\"2\"/>\n    <circle cx=\"185\" cy=\"50\" r=\"1.5\"/>\n    <circle cx=\"230\" cy=\"85\" r=\"2.5\"/>\n    <circle cx=\"90\" cy=\"110\" r=\"1.5\"/>\n    <circle cx=\"280\" cy=\"60\" r=\"1.8\"/>\n  </g>\n</svg>"
 }
];
window.FINALE = {
 "id": "finale",
 "era": "34+35",
 "palette": {
  "bg1": "#E2ECE9",
  "bg2": "#FAD2E1",
  "accent": "#C59B6D",
  "text": "#2B2D42"
 },
 "mood": "retro sci-fi glam lab",
 "intro": "You solved all seven album rooms and unlocked the secret laboratory. One final math problem stands between you and your birthday surprise.",
 "finalePuzzle": {
  "prompt": "Track two on Positions. It is a simple addition problem that equals sixty-nine. What is the song title?",
  "answers": [
   "34+35",
   "34 + 35",
   "3435",
   "34 35"
  ],
  "hint": "Think of two consecutive numbers in the thirties with a plus sign."
 },
 "hidden": [
  {
   "emoji": "🤖",
   "label": "Lab Robot",
   "x": 25,
   "y": 60,
   "fact": "Director Julien Christian Lutz, known as Director X, directed the music video where Ariana plays both a scientist and a robot.",
   "confidence": "high",
   "verdict": "true",
   "source": "The List / Wikipedia"
  },
  {
   "emoji": "💿",
   "label": "Remix Vinyl",
   "x": 75,
   "y": 40,
   "fact": "The official remix of this song features guest verses from rappers Doja Cat and Megan Thee Stallion.",
   "confidence": "high",
   "verdict": "true",
   "source": "YouTube"
  }
 ],
 "birthdayNote": "Happy birthday, [NAME]! You conquered every era and proved you are the ultimate fan. Have the most magical day celebrating your special day.",
 "game": "lab",
 "art": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 230\" preserveAspectRatio=\"xMidYMid slice\">\n  <defs>\n    <linearGradient id=\"bg\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#E2ECE9\"/>\n      <stop offset=\"55%\" stop-color=\"#F6F9F8\"/>\n      <stop offset=\"100%\" stop-color=\"#FAD2E1\"/>\n    </linearGradient>\n    <radialGradient id=\"centerGlow\" cx=\"50%\" cy=\"48%\" r=\"48%\">\n      <stop offset=\"0%\" stop-color=\"#FFFFFF\" stop-opacity=\"0.95\"/>\n      <stop offset=\"70%\" stop-color=\"#FFFFFF\" stop-opacity=\"0.5\"/>\n      <stop offset=\"100%\" stop-color=\"#FFFFFF\" stop-opacity=\"0\"/>\n    </radialGradient>\n    <radialGradient id=\"tealGlow\" cx=\"50%\" cy=\"50%\" r=\"50%\">\n      <stop offset=\"0%\" stop-color=\"#00F5D4\" stop-opacity=\"0.45\"/>\n      <stop offset=\"100%\" stop-color=\"#00F5D4\" stop-opacity=\"0\"/>\n    </radialGradient>\n    <radialGradient id=\"pinkGlow\" cx=\"50%\" cy=\"50%\" r=\"50%\">\n      <stop offset=\"0%\" stop-color=\"#FF2A85\" stop-opacity=\"0.35\"/>\n      <stop offset=\"100%\" stop-color=\"#FF2A85\" stop-opacity=\"0\"/>\n    </radialGradient>\n    <linearGradient id=\"gold\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#DEC09A\"/>\n      <stop offset=\"50%\" stop-color=\"#C59B6D\"/>\n      <stop offset=\"100%\" stop-color=\"#9E764A\"/>\n    </linearGradient>\n    <linearGradient id=\"dark\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#434666\"/>\n      <stop offset=\"100%\" stop-color=\"#2B2D42\"/>\n    </linearGradient>\n    <linearGradient id=\"pinkLiq\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#FF70A6\"/>\n      <stop offset=\"100%\" stop-color=\"#FF2A85\"/>\n    </linearGradient>\n    <linearGradient id=\"tealLiq\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#72EFDD\"/>\n      <stop offset=\"100%\" stop-color=\"#00BB9E\"/>\n    </linearGradient>\n  </defs>\n\n  <!-- Main Background -->\n  <rect width=\"360\" height=\"230\" fill=\"url(#bg)\"/>\n\n  <!-- Background Soft Gears -->\n  <g fill=\"#C59B6D\" opacity=\"0.16\">\n    <g transform=\"translate(55, 45)\">\n      <circle r=\"24\"/>\n      <rect x=\"-4\" y=\"-31\" width=\"8\" height=\"62\" rx=\"2\"/>\n      <rect x=\"-31\" y=\"-4\" width=\"62\" height=\"8\" rx=\"2\"/>\n      <rect x=\"-4\" y=\"-31\" width=\"8\" height=\"62\" rx=\"2\" transform=\"rotate(45)\"/>\n      <rect x=\"-31\" y=\"-4\" width=\"62\" height=\"8\" rx=\"2\" transform=\"rotate(45)\"/>\n      <circle r=\"11\" fill=\"#E2ECE9\"/>\n    </g>\n    <g transform=\"translate(95, 22)\">\n      <circle r=\"13\"/>\n      <rect x=\"-2.5\" y=\"-17\" width=\"5\" height=\"34\" rx=\"1.5\"/>\n      <rect x=\"-17\" y=\"-2.5\" width=\"34\" height=\"5\" rx=\"1.5\"/>\n      <rect x=\"-2.5\" y=\"-17\" width=\"5\" height=\"34\" rx=\"1.5\" transform=\"rotate(45)\"/>\n      <rect x=\"-17\" y=\"-2.5\" width=\"34\" height=\"5\" rx=\"1.5\" transform=\"rotate(45)\"/>\n      <circle r=\"6\" fill=\"#E2ECE9\"/>\n    </g>\n    <g transform=\"translate(320, 65)\">\n      <circle r=\"30\"/>\n      <rect x=\"-5\" y=\"-38\" width=\"10\" height=\"76\" rx=\"2\"/>\n      <rect x=\"-38\" y=\"-5\" width=\"76\" height=\"10\" rx=\"2\"/>\n      <rect x=\"-5\" y=\"-38\" width=\"10\" height=\"76\" rx=\"2\" transform=\"rotate(45)\"/>\n      <rect x=\"-38\" y=\"-5\" width=\"76\" height=\"10\" rx=\"2\" transform=\"rotate(45)\"/>\n      <circle r=\"15\" fill=\"#FAD2E1\"/>\n    </g>\n  </g>\n\n  <!-- Retro Lab Wall Panels & Tubes -->\n  <path d=\"M 35 0 V 95 Q 35 110 50 110 H 85 Q 100 110 100 125 V 200\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"5\" opacity=\"0.6\"/>\n  <path d=\"M 35 0 V 95 Q 35 110 50 110 H 85 Q 100 110 100 125 V 200\" fill=\"none\" stroke=\"#00F5D4\" stroke-width=\"1.5\" opacity=\"0.5\"/>\n  \n  <!-- Left Top Shelf -->\n  <rect x=\"0\" y=\"76\" width=\"72\" height=\"4\" rx=\"2\" fill=\"url(#gold)\"/>\n  <path d=\"M 22 76 L 14 50 H 30 Z\" fill=\"url(#tealLiq)\" opacity=\"0.7\"/>\n  <circle cx=\"48\" cy=\"66\" r=\"10\" fill=\"url(#pinkLiq)\" opacity=\"0.7\"/>\n  <rect x=\"46\" y=\"52\" width=\"4\" height=\"6\" fill=\"#FFFFFF\" opacity=\"0.8\"/>\n\n  <!-- Center Readability Halo -->\n  <ellipse cx=\"180\" cy=\"110\" rx=\"145\" ry=\"90\" fill=\"url(#centerGlow)\"/>\n\n  <!-- Ambient Neon Glows -->\n  <circle cx=\"65\" cy=\"165\" r=\"55\" fill=\"url(#tealGlow)\"/>\n  <circle cx=\"290\" cy=\"155\" r=\"60\" fill=\"url(#pinkGlow)\"/>\n\n  <!-- Friendly Robot Silhouette (Right) -->\n  <g transform=\"translate(278, 102)\">\n    <!-- Antenna -->\n    <line x1=\"25\" y1=\"5\" x2=\"32\" y2=\"-10\" stroke=\"url(#gold)\" stroke-width=\"2.5\"/>\n    <circle cx=\"32\" cy=\"-10\" r=\"4.5\" fill=\"#FF2A85\"/>\n    <circle cx=\"32\" cy=\"-10\" r=\"8\" fill=\"url(#pinkGlow)\"/>\n    <!-- Ears/Bolts -->\n    <rect x=\"-4\" y=\"18\" width=\"6\" height=\"10\" rx=\"3\" fill=\"url(#gold)\"/>\n    <rect x=\"48\" y=\"18\" width=\"6\" height=\"10\" rx=\"3\" fill=\"url(#gold)\"/>\n    <!-- Head -->\n    <rect x=\"0\" y=\"5\" width=\"50\" height=\"36\" rx=\"18\" fill=\"url(#dark)\"/>\n    <!-- Visor & Glowing Eyes -->\n    <rect x=\"6\" y=\"13\" width=\"38\" height=\"16\" rx=\"8\" fill=\"#191A26\"/>\n    <circle cx=\"17\" cy=\"21\" r=\"4\" fill=\"#00F5D4\"/>\n    <circle cx=\"33\" cy=\"21\" r=\"4\" fill=\"#00F5D4\"/>\n    <!-- Neck -->\n    <rect x=\"20\" y=\"41\" width=\"10\" height=\"6\" rx=\"2\" fill=\"url(#gold)\"/>\n    <!-- Torso -->\n    <path d=\"M 5 47 C 0 47 -2 85 -2 95 L 52 95 C 52 85 50 47 45 47 Z\" fill=\"url(#dark)\"/>\n    <!-- Glam Heart Core -->\n    <circle cx=\"25\" cy=\"67\" r=\"11\" fill=\"#191A26\" stroke=\"url(#gold)\" stroke-width=\"1.5\"/>\n    <path d=\"M 25 73 C 25 73 17 67 17 63 C 17 60 20 59 22 61 C 24 62 25 64 25 64 C 25 64 26 62 28 61 C 30 59 33 60 33 63 C 33 67 25 73 25 73 Z\" fill=\"#FF2A85\"/>\n    <!-- Floating Coils -->\n    <ellipse cx=\"-14\" cy=\"48\" rx=\"6\" ry=\"2.5\" transform=\"rotate(-20 -14 48)\" fill=\"none\" stroke=\"url(#gold)\" stroke-width=\"2.5\"/>\n    <ellipse cx=\"-19\" cy=\"40\" rx=\"4.5\" ry=\"2\" transform=\"rotate(-20 -19 40)\" fill=\"none\" stroke=\"#00F5D4\" stroke-width=\"2\"/>\n  </g>\n\n  <!-- Right Tall Glowing Tube -->\n  <g transform=\"translate(328, 128)\">\n    <rect x=\"0\" y=\"0\" width=\"20\" height=\"68\" rx=\"10\" fill=\"#FFFFFF\" fill-opacity=\"0.4\" stroke=\"#FFFFFF\" stroke-width=\"1.5\"/>\n    <rect x=\"2\" y=\"22\" width=\"16\" height=\"44\" rx=\"8\" fill=\"url(#tealLiq)\"/>\n    <rect x=\"-2\" y=\"-3\" width=\"24\" height=\"5\" rx=\"2.5\" fill=\"url(#gold)\"/>\n    <rect x=\"-2\" y=\"63\" width=\"24\" height=\"5\" rx=\"2.5\" fill=\"url(#gold)\"/>\n    <circle cx=\"10\" cy=\"52\" r=\"2.5\" fill=\"#FFFFFF\" opacity=\"0.6\"/>\n    <circle cx=\"7\" cy=\"38\" r=\"1.5\" fill=\"#FFFFFF\" opacity=\"0.6\"/>\n  </g>\n\n  <!-- Left Foreground Flasks -->\n  <!-- Round Magenta Flask -->\n  <g transform=\"translate(10, 122)\">\n    <rect x=\"19\" y=\"0\" width=\"12\" height=\"22\" fill=\"#FFFFFF\" fill-opacity=\"0.4\" stroke=\"#FFFFFF\" stroke-width=\"1.5\"/>\n    <ellipse cx=\"25\" cy=\"0\" rx=\"8\" ry=\"2.5\" fill=\"url(#gold)\"/>\n    <circle cx=\"25\" cy=\"45\" r=\"25\" fill=\"#FFFFFF\" fill-opacity=\"0.4\" stroke=\"#FFFFFF\" stroke-width=\"1.5\"/>\n    <path d=\"M 3 38 C 12 34 38 42 47 38 A 22 22 0 1 1 3 38 Z\" fill=\"url(#pinkLiq)\"/>\n    <path d=\"M 8 32 A 19 19 0 0 1 20 24\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"2.5\" stroke-linecap=\"round\" opacity=\"0.7\"/>\n    <circle cx=\"20\" cy=\"54\" r=\"3\" fill=\"#FFFFFF\" opacity=\"0.5\"/>\n    <circle cx=\"29\" cy=\"46\" r=\"2\" fill=\"#FFFFFF\" opacity=\"0.5\"/>\n    <circle cx=\"22\" cy=\"14\" r=\"2.5\" fill=\"#FF2A85\" opacity=\"0.7\"/>\n    <circle cx=\"27\" cy=\"-8\" r=\"3.5\" fill=\"#FF2A85\" opacity=\"0.5\"/>\n    <circle cx=\"23\" cy=\"-20\" r=\"2\" fill=\"#FF2A85\" opacity=\"0.3\"/>\n  </g>\n\n  <!-- Conical Teal Flask -->\n  <g transform=\"translate(56, 144)\">\n    <path d=\"M 15 0 H 25 V 14 L 40 46 A 5 5 0 0 1 35 53 H 5 A 5 5 0 0 1 0 46 L 15 14 Z\" fill=\"#FFFFFF\" fill-opacity=\"0.45\" stroke=\"#FFFFFF\" stroke-width=\"1.5\"/>\n    <rect x=\"13\" y=\"-2\" width=\"14\" height=\"4\" rx=\"2\" fill=\"url(#gold)\"/>\n    <path d=\"M 9 31 Q 20 28 31 31 L 37 45 A 3 3 0 0 1 34 50 H 6 A 3 3 0 0 1 3 45 Z\" fill=\"url(#tealLiq)\"/>\n    <circle cx=\"17\" cy=\"42\" r=\"2.5\" fill=\"#FFFFFF\" opacity=\"0.6\"/>\n    <circle cx=\"24\" cy=\"36\" r=\"1.5\" fill=\"#FFFFFF\" opacity=\"0.6\"/>\n    <circle cx=\"20\" cy=\"18\" r=\"2\" fill=\"#00F5D4\" opacity=\"0.8\"/>\n    <circle cx=\"18\" cy=\"-10\" r=\"3\" fill=\"#00F5D4\" opacity=\"0.5\"/>\n  </g>\n\n  <!-- Retro Curved Lab Countertop -->\n  <path d=\"M 0 194 Q 180 202 360 194 L 360 230 L 0 230 Z\" fill=\"url(#dark)\"/>\n  <path d=\"M 0 194 Q 180 202 360 194\" fill=\"none\" stroke=\"url(#gold)\" stroke-width=\"3.5\"/>\n  <path d=\"M 0 197 Q 180 205 360 197\" fill=\"none\" stroke=\"#00F5D4\" stroke-width=\"1\" opacity=\"0.5\"/>\n\n  <!-- Subtle Glam Sparkles (Edges Only) -->\n  <g fill=\"#FFFFFF\" opacity=\"0.85\">\n    <path d=\"M 88 122 Q 88 130 96 130 Q 88 130 88 138 Q 88 130 80 130 Q 88 130 88 122 Z\"/>\n    <path d=\"M 255 72 Q 255 78 261 78 Q 255 78 255 84 Q 255 78 249 78 Q 255 78 255 72 Z\"/>\n    <path d=\"M 235 162 Q 235 166 239 166 Q 235 166 235 170 Q 235 166 231 166 Q 235 166 235 162 Z\"/>\n    <circle cx=\"42\" cy=\"95\" r=\"2\"/>\n    <circle cx=\"315\" cy=\"38\" r=\"2\"/>\n  </g>\n</svg>"
};
