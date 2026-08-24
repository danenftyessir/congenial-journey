import img1 from '../assets/pics/1.jpeg';
import img2 from '../assets/pics/2.jpeg';
import img3 from '../assets/pics/3.jpeg';
import img4 from '../assets/pics/4.jpeg';
import img5 from '../assets/pics/5.jpeg';
import img6 from '../assets/pics/6.jpeg';
import img7 from '../assets/pics/7.jpeg';
import img8 from '../assets/pics/8.jpeg';
import img9 from '../assets/pics/9.jpeg';
import img10 from '../assets/pics/10.jpeg';
import img11 from '../assets/pics/11.jpeg';
import img12 from '../assets/pics/12.jpeg';
import img13 from '../assets/pics/13.jpeg';

import vidTwentyFive from '../assets/vids/twenty-five-twenty-one.mp4';
import vidAncika from '../assets/vids/ancika-dia-yang-bersamaku-1995.mp4';
import vidLove from '../assets/vids/Can-This-Love-Be-Translated.mp4';
import vidDia from '../assets/vids/dia-milikku-bukan-milikmu.mp4';
import vidTwentieth from '../assets/vids/20th-century-girl.mp4';
import vidDoctor from '../assets/vids/doctor-strange-in-the-multiverse-of-madness.mp4';

export const memories = [
  // ── SEASON 1: The Beginning ──────────────────────────────────────────────
  {
    id: 1,
    title: 'The Beginning of Us',
    description:
      'Nobody planned it. It started with one small, almost forgettable moment — and somehow, that was all it took. Looking back, this is where everything begins.',
    year: '2023',
    date: '2023-09-05',
    duration: '1j 12m',
    genre: ['Core Memory', 'Wholesome'],
    tags: ['first meeting', 'friendship', 'campus'],
    people: ['danendra', 'grace'],
    location: 'ITB, Bandung',
    season: 1,
    episode: 1,
    coverImage: img1,
    backdropImage: img1,
    backdropVideo: null,
    media: [
      { type: 'image', src: img1, caption: 'Hari itu.' },
      { type: 'image', src: img2, caption: 'Dan semua dimulai dari sini.' },
    ],
    badge: 'Newly Added',
    featured: false,
    trivia: [
      'Ini adalah pertama kalinya kita benar-benar berbicara — bukan hanya melewati satu sama lain.',
    ],
    quotes: ['"Aku tidak menyangka ini akan menjadi memori favoritku."'],
  },
  {
    id: 2,
    title: 'First Hangout',
    description:
      'The first time we decided to do something outside of obligation. No reason, no occasion — just because we wanted to. That distinction matters more than it sounds.',
    year: '2023',
    date: '2023-10-12',
    duration: '45m',
    genre: ['Comedy', 'Unplanned'],
    tags: ['hangout', 'first time', 'spontaneous'],
    people: ['danendra', 'grace', 'friend1'],
    location: 'Bandung',
    season: 1,
    episode: 2,
    coverImage: img3,
    backdropImage: img3,
    backdropVideo: null,
    media: [
      { type: 'image', src: img3, caption: 'Hangout pertama.' },
      { type: 'image', src: img4, caption: 'Yang pertama dari banyak.' },
    ],
    badge: 'Season Baru',
    featured: false,
    trivia: ['Kita merencanakan ini dalam waktu kurang dari 10 menit.'],
    quotes: ['"Kita harus melakukan ini lagi."'],
  },
  {
    id: 3,
    title: 'Random Tuesday',
    description:
      'There was nothing special about this day. Nothing was planned, nothing was expected. And somehow that made it one of the best ones.',
    year: '2023',
    date: '2023-11-28',
    duration: '32m',
    genre: ['Unplanned', 'Random Moments'],
    tags: ['random', 'everyday', 'no reason'],
    people: ['danendra', 'grace'],
    location: 'Bandung',
    season: 1,
    episode: 3,
    coverImage: img5,
    backdropImage: img5,
    backdropVideo: null,
    media: [{ type: 'image', src: img5, caption: 'Selasa yang biasa.' }],
    badge: null,
    featured: false,
    trivia: ['Tidak ada yang memotivasi pertemuan ini selain kebosanan murni.'],
    quotes: ['"Hari-hari biasa seperti ini yang paling aku rindukan."'],
  },

  // ── SEASON 2: The Good Times ─────────────────────────────────────────────
  {
    id: 4,
    title: 'Late Night Conversations',
    description:
      'At some point, the conversations stopped being small talk and started becoming the kind you remember years later. This was that point.',
    year: '2024',
    date: '2024-02-14',
    duration: '2j 15m',
    genre: ['Late Night', 'Core Memory'],
    tags: ['late night', 'deep talk', 'honest'],
    people: ['danendra', 'grace'],
    location: 'Somewhere at night',
    season: 2,
    episode: 1,
    coverImage: img6,
    backdropImage: img6,
    backdropVideo: vidTwentyFive,
    media: [
      { type: 'image', src: img6, caption: 'Malam yang panjang.' },
      { type: 'video', src: vidTwentyFive, caption: 'Sebuah momen.' },
    ],
    badge: 'Season Baru',
    featured: false,
    trivia: ['Percakapan ini berlangsung lebih dari dua jam tanpa kita sadari.'],
    quotes: ['"Aku tidak pernah bercerita ini ke siapa pun sebelumnya."'],
  },
  {
    id: 5,
    title: 'Graduation Day',
    description:
      'The day everyone had worked toward for years. In the middle of all the formality and milestone-making, we still managed to find our own corner of the moment.',
    year: '2024',
    date: '2024-07-21',
    duration: '1j 30m',
    genre: ['Core Memory', 'Wholesome'],
    tags: ['graduation', 'milestone', 'achievement'],
    people: ['danendra', 'grace', 'friend1'],
    location: 'ITB, Bandung',
    season: 2,
    episode: 2,
    coverImage: img7,
    backdropImage: img7,
    backdropVideo: null,
    media: [
      { type: 'image', src: img7, caption: 'Hari kelulusan.' },
      { type: 'image', src: img8, caption: 'Setelah semuanya selesai.' },
    ],
    badge: 'Newly Added',
    featured: false,
    trivia: ['Kita sempat nyasar sebelum menemukan tempat foto ini.'],
    quotes: ['"Akhirnya."'],
  },
  {
    id: 6,
    title: 'That Trip We Almost Missed',
    description:
      'We nearly cancelled. Nearly. And that small decision to go anyway became one of the best things we ever did together. Remember this the next time you want to back out.',
    year: '2024',
    date: '2024-08-10',
    duration: '1j 45m',
    genre: ['Road Trip', 'Chaos'],
    tags: ['trip', 'road trip', 'adventure', 'almost cancelled'],
    people: ['danendra', 'grace', 'friend1'],
    location: 'Luar Kota',
    season: 2,
    episode: 3,
    coverImage: img9,
    backdropImage: img9,
    backdropVideo: vidAncika,
    media: [
      { type: 'image', src: img9, caption: 'Perjalanan yang hampir tidak terjadi.' },
      { type: 'video', src: vidAncika, caption: 'Di perjalanan.' },
    ],
    badge: null,
    featured: true,
    trivia: ['Kita hampir membatalkan perjalanan ini tiga kali.'],
    quotes: ['"Kita hampir tidak jadi pergi. Bayangkan jika kita tidak jadi."'],
  },
  {
    id: 7,
    title: 'Chaos at 2AM',
    description:
      "What started as a normal night somehow turned into the story we keep retelling. We still don't fully agree on what happened. That's probably a good sign.",
    year: '2024',
    date: '2024-09-03',
    duration: '28m',
    genre: ['Chaos', 'Comedy'],
    tags: ['chaos', 'late night', 'story', '2am'],
    people: ['danendra', 'grace'],
    location: 'Bandung',
    season: 2,
    episode: 4,
    coverImage: img10,
    backdropImage: img10,
    backdropVideo: null,
    media: [
      { type: 'image', src: img10, caption: 'Kekacauan jam 2 pagi.' },
      { type: 'image', src: img11, caption: 'Sisa-sisa malam itu.' },
    ],
    badge: 'Newly Added',
    featured: false,
    trivia: ['Sampai sekarang kita masih berbeda pendapat tentang apa yang sebenarnya terjadi.'],
    quotes: ['"Ini semua salahmu." — Semua orang, bersamaan.'],
  },
  {
    id: 8,
    title: 'The Food Incident',
    description:
      'We ordered too much. We always order too much. But this time, something happened in the middle of it that none of us will forget — especially not the waiter.',
    year: '2024',
    date: '2024-10-19',
    duration: '1j',
    genre: ['Food', 'Comedy'],
    tags: ['food', 'makan', 'incident', 'embarrassing'],
    people: ['danendra', 'grace', 'friend1'],
    location: 'Bandung',
    season: 2,
    episode: 5,
    coverImage: img12,
    backdropImage: img12,
    backdropVideo: null,
    media: [
      { type: 'image', src: img12, caption: 'Momen sebelum insiden.' },
      { type: 'image', src: img13, caption: 'Setelahnya.' },
    ],
    badge: null,
    featured: false,
    trivia: ['Pelayan itu masih menjadi topik pembicaraan sampai sekarang.'],
    quotes: ['"Kita pesan terlalu banyak. Lagi."'],
  },

  // ── HIDDEN MEMORY (only accessible via easter egg) ───────────────────────
  {
    id: 99,
    title: 'Pesan yang Tidak Pernah Terkirim',
    description:
      'Kamu menemukannya. Ini adalah kenangan yang selalu ada di sini — tersembunyi di antara semua kenangan lainnya. Bukan karena tidak penting, tapi justru karena terlalu penting untuk ditampilkan begitu saja. Ada hal-hal yang ingin kami sampaikan tapi tidak pernah kami temukan caranya. Ini salah satunya: terima kasih sudah ada.',
    year: '2023–2025',
    date: '2025-08-24',
    duration: 'Tak terbatas',
    genre: ['Core Memory', 'Tersembunyi'],
    tags: ['secret', 'hidden', 'easter egg', 'letter', 'terima kasih'],
    people: ['danendra', 'grace', 'friend1'],
    location: 'Di antara semua kenangan ini',
    season: null,
    episode: null,
    coverImage: img1,
    backdropImage: img13,
    backdropVideo: null,
    media: [
      { type: 'image', src: img1, caption: 'Di mana semuanya dimulai.' },
      { type: 'image', src: img6, caption: 'Momen yang tidak sempat terdokumentasi.' },
      { type: 'image', src: img13, caption: 'Sebelum semuanya berubah.' },
    ],
    badge: '🔓 Tersembunyi',
    featured: false,
    hidden: true,
    trivia: [
      'Kenangan ini hanya bisa ditemukan oleh mereka yang benar-benar mencari.',
      'Ada banyak hal yang tidak pernah terucap. Ini salah satunya.',
      'Kamu menemukannya. Itu berarti sesuatu.',
    ],
    quotes: [
      '"Terima kasih sudah ada."',
      '"Aku tidak tahu cara mengatakannya. Tapi kamu tahu."',
      '"Persahabatan terbaik adalah yang tidak butuh banyak kata."',
    ],
  },

  // ── SEASON 3: Almost Goodbye ─────────────────────────────────────────────
  {
    id: 9,
    title: 'Midnight Snack Run',
    description:
      'Sometimes the best memories are the ones with no agenda. A late-night craving, a short drive, and a conversation that lasted until sunrise. No cameras were needed — but we brought one anyway.',
    year: '2025',
    date: '2025-01-07',
    duration: '52m',
    genre: ['Unplanned', 'Late Night'],
    tags: ['midnight', 'snack', 'spontaneous', 'night drive'],
    people: ['danendra', 'grace'],
    location: 'Bandung, malam',
    season: 3,
    episode: 1,
    coverImage: img2,
    backdropImage: img2,
    backdropVideo: vidLove,
    media: [
      { type: 'image', src: img2, caption: 'Tengah malam.' },
      { type: 'video', src: vidLove, caption: 'Perjalanan malam.' },
    ],
    badge: 'Season Baru',
    featured: false,
    trivia: ['Toko yang kita tuju tutup. Kita tetap tidak pulang ke rumah.'],
    quotes: ['"Kita tidak pergi untuk makanannya."'],
  },
  {
    id: 10,
    title: 'When We Were Young',
    description:
      "A photo from early on, dug up and re-examined now. We look different. We talk differently. But there's something in this image that we haven't lost — and we should probably protect it.",
    year: '2023',
    date: '2023-12-15',
    duration: '1j 20m',
    genre: ['Nostalgia', 'Core Memory', 'We Were Young'],
    tags: ['throwback', 'nostalgia', 'early days'],
    people: ['danendra', 'grace'],
    location: 'Bandung',
    season: 3,
    episode: 2,
    coverImage: img4,
    backdropImage: img4,
    backdropVideo: null,
    media: [
      { type: 'image', src: img4, caption: 'Waktu kita masih muda.' },
      { type: 'image', src: img1, caption: 'Kembali ke awal.' },
    ],
    badge: null,
    featured: false,
    trivia: ['Foto ini diambil sebelum kita benar-benar kenal satu sama lain.'],
    quotes: ['"Kita dulu lebih rileks."'],
  },
  {
    id: 11,
    title: 'The Last Semester',
    description:
      'Everything felt heavier that semester. Deadlines, decisions, distance. But we still showed up for each other — in smaller ways, with less time, but we did.',
    year: '2025',
    date: '2025-05-20',
    duration: '2j',
    genre: ['Academic Survival', 'Core Memory'],
    tags: ['semester', 'stressful', 'showing up', 'last year'],
    people: ['danendra', 'grace', 'friend1'],
    location: 'ITB, Bandung',
    season: 3,
    episode: 3,
    coverImage: img8,
    backdropImage: img8,
    backdropVideo: vidDia,
    media: [
      { type: 'image', src: img8, caption: 'Semester terakhir.' },
      { type: 'video', src: vidDia, caption: 'Apa yang tersisa.' },
    ],
    badge: 'Newly Added',
    featured: false,
    trivia: ['Ini semester dengan absen pertemuan terbanyak — tapi juga yang paling berkesan.'],
    quotes: ['"Kita masing-masing punya beban sendiri. Dan kita tetap hadir."'],
  },
  {
    id: 12,
    title: 'Before We Said Goodbye',
    description:
      "The last time we were all together — before paths diverged, before life got in the way. We didn't say it was the last time. We didn't need to. We all knew.",
    year: '2025',
    date: '2025-08-01',
    duration: '1j 55m',
    genre: ['Core Memory', 'Last Days Together'],
    tags: ['goodbye', 'last time', 'ending', 'bittersweet'],
    people: ['danendra', 'grace', 'friend1'],
    location: 'Bandung',
    season: 3,
    episode: 4,
    coverImage: img13,
    backdropImage: img13,
    backdropVideo: vidTwentieth,
    media: [
      { type: 'image', src: img13, caption: 'Sebelum semuanya berubah.' },
      { type: 'image', src: img12, caption: 'Satu foto terakhir.' },
      { type: 'video', src: vidTwentieth, caption: 'Perpisahan.' },
    ],
    badge: 'Newly Added',
    featured: false,
    trivia: ['Tidak ada yang menyebut ini sebagai pertemuan terakhir. Tapi kita semua tahu.'],
    quotes: [
      '"Sampai jumpa lagi." — Mudah-mudahan bukan hanya kata-kata.',
    ],
  },
];

// ── Derived collections ───────────────────────────────────────────────────

// Public memories (excludes hidden easter egg entries)
export const publicMemories = memories.filter((m) => !m.hidden);

export const featuredMemory = publicMemories.find((m) => m.featured) || publicMemories[5];

export const top10 = publicMemories
  .slice()
  .sort((a, b) => b.id - a.id)
  .slice(0, 10)
  .map((m, i) => ({ ...m, rank: i + 1 }));

// Finds any memory including hidden ones (for direct ID lookup / easter egg access)
export const getMemoryById = (id) => memories.find((m) => m.id === Number(id));

export const getRelated = (memory, limit = 8) =>
  publicMemories
    .filter(
      (m) =>
        m.id !== memory.id &&
        (m.people.some((p) => memory.people.includes(p)) ||
          m.genre.some((g) => memory.genre.includes(g)))
    )
    .slice(0, limit);

export const getSeasonMemories = (seasonId) =>
  publicMemories.filter((m) => m.season === seasonId);

export const searchMemories = (query) => {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  return publicMemories.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.genre.some((g) => g.toLowerCase().includes(q)) ||
      m.tags.some((t) => t.toLowerCase().includes(q)) ||
      m.people.some((p) => p.toLowerCase().includes(q)) ||
      (m.location || '').toLowerCase().includes(q) ||
      m.year.includes(q) ||
      (m.quotes || []).some((qt) => qt.toLowerCase().includes(q))
  );
};
