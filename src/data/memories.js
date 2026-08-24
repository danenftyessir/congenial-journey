import img1 from '../assets/pics/first-photobooth.jpeg';
import img2 from '../assets/pics/blok-m-1.jpeg';
import img3 from '../assets/pics/blok-m-2.jpeg';
import img4 from '../assets/pics/after-photobooth-1.jpeg';
import img5 from '../assets/pics/after-photobooth-2.jpeg';
import img6 from '../assets/pics/blok-m-food-1.jpeg';
import img7 from '../assets/pics/blok-m-food-2.jpeg';
import img8 from '../assets/pics/playtopia-entrance.jpeg';
import img9 from '../assets/pics/after-photobooth-3.jpeg';
import img10 from '../assets/pics/playtopia-magang-tanpa-bokem-1.jpeg';
import img11 from '../assets/pics/playtopia-magang-x-bokem-1.jpeg';
import img12 from '../assets/pics/selfie-time-1786710330171.jpg.jpeg';
import img13 from '../assets/pics/blok-m-photobooth.jpeg';

import imgBoardgame1 from '../assets/pics/boardgame-1.jpeg';
import imgBoardgame2 from '../assets/pics/boardgame-2.jpeg';
import imgBoardgame3 from '../assets/pics/boardgame-3.jpeg';
import imgBoardgame4 from '../assets/pics/boardgame-4.jpeg';
import imgBoardgame5 from '../assets/pics/boardgame-5.jpeg';
import imgBoardgame6 from '../assets/pics/boardgame-6.jpeg';
import imgBoardgame7 from '../assets/pics/boardgame-7.jpeg';
import imgCafe1 from '../assets/pics/cafe-1.jpeg';
import imgCafe2 from '../assets/pics/cafe-2.jpeg';
import imgCafe3 from '../assets/pics/cafe-3.jpeg';
import imgCafe4 from '../assets/pics/cafe-4.jpeg';

import vidTwentyFive from '../assets/vids/twenty-five-twenty-one.mp4';
import vidAncika from '../assets/vids/ancika-dia-yang-bersamaku-1995.mp4';
import vidLove from '../assets/vids/Can-This-Love-Be-Translated.mp4';
import vidDia from '../assets/vids/dia-milikku-bukan-milikmu.mp4';
import vidTwentieth from '../assets/vids/20th-century-girl.mp4';
import vidDoctor from '../assets/vids/doctor-strange-in-the-multiverse-of-madness.mp4';
import vidAsItWas from '../assets/vids/as-it-was.mp4';
import vidPerfectCrown from '../assets/vids/perfect-crown.mp4';
import vidEndOfTheStory from '../assets/vids/end-of-the-story.mp4';
import vidSoreIstri from '../assets/vids/sore-istri-dari-masa-depan.mp4';

import imgBlokMFood3 from '../assets/pics/blok-m-food-3.jpeg';
import imgBlokMAfterWork from '../assets/pics/blok-m-after-work.jpeg';

import imgSelfie1 from '../assets/pics/selfie-time-1786710330171.jpg.jpeg';
import imgSelfie2 from '../assets/pics/selfie-time-1786710311326.jpg.jpeg';
import imgSelfie3 from '../assets/pics/selfie-time-1786710133863.jpg.jpeg';
import imgSelfie4 from '../assets/pics/selfie-time-1786710564370.jpg.jpeg';
import imgSelfie5 from '../assets/pics/selfie-time-1786710634178.jpg.jpeg';

import vidBlokM1 from '../assets/vids/blok-m-journey-1.MOV';
import vidBlokM2 from '../assets/vids/blok-m-journey-2.MOV';
import vidBlokM3 from '../assets/vids/blok-m-journey-3.MOV';
import vidBlokM4 from '../assets/vids/blok-m-journey-4.MOV';
import vidBlokM5 from '../assets/vids/blok-m-journey-5.MOV';
import vidBlokM6 from '../assets/vids/blok-m-journey-6.MOV';
import vidBlokM7 from '../assets/vids/blok-m-journey-7.MOV';

import imgTwentyFiveTwentyOne from '../assets/pics/Twenty-Five_Twenty-One.jpg';
import imgAncika from '../assets/pics/ancika-dia-yang-bersamaku-1995.webp';
import imgCanThisLove from '../assets/pics/can-this-love-be-translated.jpg';
import imgDrStrange from '../assets/pics/dr-strange-multiverse-of-madness.jpg';
import img20thCenturyGirl from '../assets/pics/20th-century-girl.jpg';
import imgAsItWas from '../assets/pics/as-it-was.png';
import imgPerfectCrown from '../assets/pics/perfect-crown.png';
import imgEndOfTheStory from '../assets/pics/end-of-the-story.jpg';
import imgSoreIstri from '../assets/pics/sore-istri-dari-masa-depan.webp';

export const memories = [
  // ── SEASON 1: The Beginning ──────────────────────────────────────────────
  {
    id: 1,
    title: 'The Beginning of Us',
    description:
      'ga ada yg rencanain. ada satu momen kecil yg awalnya ga kerasa penting, tapi dari situ semuanya mulai. ini titik awalnya.',
    year: '2023',
    date: '2023-09-05',
    duration: '1j 12m',
    genre: ['Core Memory', 'Wholesome'],
    tags: ['first meeting', 'friendship', 'campus'],
    people: ['denan', 'grace'],
    location: 'ITB, Bandung',
    season: 1,
    episode: 1,
    coverImage: img1,
    backdropImage: img1,
    backdropVideo: null,
    media: [
      { type: 'image', src: img1, caption: 'hari itu.' },
      { type: 'image', src: img2, caption: 'dari sini semuanya dimulai.' },
    ],
    badge: 'Newly Added',
    featured: false,
  },
  {
    id: 2,
    title: 'First Hangout',
    description:
      'hangout pertama yg beneran keluar bareng, bukan krn ada keperluan. ga ada agenda, ga ada alasan khusus. cuma mau. itu yg bikin ini beda.',
    year: '2023',
    date: '2023-10-12',
    duration: '45m',
    genre: ['Comedy', 'Unplanned'],
    tags: ['hangout', 'first time', 'spontaneous'],
    people: ['denan', 'grace', 'zefanya'],
    location: 'Bandung',
    season: 1,
    episode: 2,
    coverImage: img3,
    backdropImage: img3,
    backdropVideo: null,
    media: [
      { type: 'image', src: img3, caption: 'hangout pertama.' },
      { type: 'image', src: img4, caption: 'yg pertama dari banyak.' },
    ],
    badge: 'Season Baru',
    featured: false,
  },
  {
    id: 3,
    title: 'Random Tuesday',
    description:
      'selasa biasa. ga ada rencana, ga ada yg spesial. entah kenapa ini yg paling diingat.',
    year: '2023',
    date: '2023-11-28',
    duration: '32m',
    genre: ['Unplanned', 'Random Moments'],
    tags: ['random', 'everyday', 'no reason'],
    people: ['denan', 'grace'],
    location: 'Bandung',
    season: 1,
    episode: 3,
    coverImage: img5,
    backdropImage: img5,
    backdropVideo: null,
    media: [{ type: 'image', src: img5, caption: 'selasa biasa.' }],
    badge: null,
    featured: false,
  },

  // ── SEASON 2: The Good Times ─────────────────────────────────────────────
  {
    id: 4,
    title: 'Late Night Conversations',
    description:
      'di suatu titik, obrolannya berhenti jadi basa-basi. susah dijelasin kapan tepatnya. tapi malam itu jelas salah satunya.',
    year: '2024',
    date: '2024-02-14',
    duration: '2j 15m',
    genre: ['Late Night', 'Core Memory'],
    tags: ['late night', 'deep talk', 'honest'],
    people: ['denan', 'grace'],
    location: 'Somewhere at night',
    season: 2,
    episode: 1,
    coverImage: img6,
    backdropImage: img6,
    backdropVideo: null,
    media: [
      { type: 'image', src: img6, caption: 'malam yg panjang.' },
    ],
    badge: 'Season Baru',
    featured: false,
  },
  {
    id: 5,
    title: 'Graduation Day',
    description:
      'hari yg udah ditunggu bertahun-tahun. di tengah semua formalitas dan foto-foto, kita sempat punya sudut sendiri dari momen itu.',
    year: '2024',
    date: '2024-07-21',
    duration: '1j 30m',
    genre: ['Core Memory', 'Wholesome'],
    tags: ['graduation', 'milestone', 'achievement'],
    people: ['denan', 'grace', 'zefanya'],
    location: 'ITB, Bandung',
    season: 2,
    episode: 2,
    coverImage: img7,
    backdropImage: img7,
    backdropVideo: null,
    media: [
      { type: 'image', src: img7, caption: 'hari kelulusan.' },
      { type: 'image', src: img8, caption: 'setelah semuanya selesai.' },
    ],
    badge: 'Newly Added',
    featured: false,
  },
  {
    id: 6,
    title: 'That Trip We Almost Missed',
    description:
      'hampir batal. tiga kali. tapi akhirnya jadi juga, dan itu salah satu keputusan terbaik. tiap kali mau balik kagak jadi, inget ini.',
    year: '2024',
    date: '2024-08-10',
    duration: '1j 45m',
    genre: ['Unplanned'],
    tags: ['trip', 'road trip', 'adventure', 'almost cancelled'],
    people: ['denan', 'grace', 'zefanya'],
    location: 'Luar Kota',
    season: 2,
    episode: 3,
    coverImage: img9,
    backdropImage: img9,
    backdropVideo: null,
    media: [
      { type: 'image', src: img9, caption: 'perjalanan yg hampir ga jadi.' },
    ],
    badge: null,
    featured: true,
  },
  {
    id: 7,
    title: 'Chaos at 2AM',
    description:
      'mulainya biasa-biasa. entah gimana berakhir jadi cerita yg sampe sekarang masih sering dibawa-bawa. versi masing-masing tentang apa yg terjadi masih beda sampai sekarang.',
    year: '2024',
    date: '2024-09-03',
    duration: '28m',
    genre: ['Comedy'],
    tags: ['chaos', 'late night', 'story', '2am'],
    people: ['denan', 'grace'],
    location: 'Bandung',
    season: 2,
    episode: 4,
    coverImage: img10,
    backdropImage: img10,
    backdropVideo: null,
    media: [
      { type: 'image', src: img10, caption: 'kekacauan jam 2 pagi.' },
      { type: 'image', src: img11, caption: 'sisa-sisa malam itu.' },
    ],
    badge: 'Newly Added',
    featured: false,
  },
  {
    id: 8,
    title: 'The Food Incident',
    description:
      'pesan terlalu banyak, kayak biasa. tapi kali ini ada satu hal yg terjadi di tengah-tengahnya yg ga bakal dilupain. pelayannya juga kayaknya ga bakal lupa.',
    year: '2024',
    date: '2024-10-19',
    duration: '1j',
    genre: ['Food', 'Comedy'],
    tags: ['food', 'makan', 'incident', 'embarrassing'],
    people: ['denan', 'grace', 'zefanya'],
    location: 'Bandung',
    season: 2,
    episode: 5,
    coverImage: img12,
    backdropImage: img12,
    backdropVideo: null,
    media: [
      { type: 'image', src: img12, caption: 'sebelum insiden.' },
      { type: 'image', src: img13, caption: 'setelahnya.' },
    ],
    badge: null,
    featured: false,
  },

  // ── HIDDEN MEMORY (only accessible via easter egg) ───────────────────────
  {
    id: 99,
    title: 'Pesan yang Tidak Pernah Terkirim',
    description:
      'kamu nemu ini. ini bukan kecelakaan, ini memang ada di sini. ada hal-hal yg ga pernah ketemu momen yg pas buat disampaikan. salah satunya ini. terima kasih udah ada.',
    year: '2023-2025',
    date: '2025-08-24',
    duration: 'tak terbatas',
    genre: ['Core Memory', 'Tersembunyi'],
    tags: ['secret', 'hidden', 'easter egg', 'letter', 'terima kasih'],
    people: ['denan', 'grace', 'zefanya'],
    location: 'di antara semua kenangan ini',
    season: null,
    episode: null,
    coverImage: img1,
    backdropImage: img13,
    backdropVideo: null,
    media: [
      { type: 'image', src: img1, caption: 'di mana semuanya dimulai.' },
      { type: 'image', src: img6, caption: 'momen yg ga sempat terdokumentasi.' },
      { type: 'image', src: img13, caption: 'sebelum semuanya berubah.' },
    ],
    badge: 'Tersembunyi',
    featured: false,
    hidden: true,
  },

  // ── SEASON 3: Almost Goodbye ─────────────────────────────────────────────
  {
    id: 9,
    title: 'Midnight Snack Run',
    description:
      'toko yg dituju tutup. tetap ga pulang. akhirnya ngobrol sampai subuh di tempat lain. ga ada fotonya, tapi tetap dibawa kamera satu.',
    year: '2025',
    date: '2025-01-07',
    duration: '52m',
    genre: ['Unplanned', 'Late Night'],
    tags: ['midnight', 'snack', 'spontaneous', 'night drive'],
    people: ['denan', 'grace'],
    location: 'Bandung, malam',
    season: 3,
    episode: 1,
    coverImage: img2,
    backdropImage: img2,
    backdropVideo: null,
    media: [
      { type: 'image', src: img2, caption: 'tengah malam.' },
    ],
    badge: 'Season Baru',
    featured: false,
  },
  {
    id: 10,
    title: 'When We Were Young',
    description:
      'foto dari awal, baru dibuka lagi sekarang. kelihatan beda. ngomongnya beda. tapi ada sesuatu yg sama yg belum hilang.',
    year: '2023',
    date: '2023-12-15',
    duration: '1j 20m',
    genre: ['Nostalgia', 'Core Memory', 'We Were Young'],
    tags: ['throwback', 'nostalgia', 'early days'],
    people: ['denan', 'grace'],
    location: 'Bandung',
    season: 3,
    episode: 2,
    coverImage: img4,
    backdropImage: img4,
    backdropVideo: null,
    media: [
      { type: 'image', src: img4, caption: 'waktu masih muda.' },
      { type: 'image', src: img1, caption: 'kembali ke awal.' },
    ],
    badge: null,
    featured: false,
  },
  {
    id: 11,
    title: 'The Last Semester',
    description:
      'semester itu berat. deadline, jarak, keputusan yg ga mudah. tapi tetap hadir satu sama lain, meski lebih kecil caranya dan lebih sedikit waktunya.',
    year: '2025',
    date: '2025-05-20',
    duration: '2j',
    genre: ['Academic Survival', 'Core Memory'],
    tags: ['semester', 'stressful', 'showing up', 'last year'],
    people: ['denan', 'grace', 'zefanya'],
    location: 'ITB, Bandung',
    season: 3,
    episode: 3,
    coverImage: img8,
    backdropImage: img8,
    backdropVideo: null,
    media: [
      { type: 'image', src: img8, caption: 'semester terakhir.' },
    ],
    badge: 'Newly Added',
    featured: false,
  },
  {
    id: 12,
    title: 'Before We Said Goodbye',
    description:
      'terakhir kali semua kumpul sebelum jalur masing-masing mulai beda. ga ada yg bilang ini yg terakhir. semua tahu.',
    year: '2025',
    date: '2025-08-01',
    duration: '1j 55m',
    genre: ['Core Memory', 'Last Days Together'],
    tags: ['goodbye', 'last time', 'ending', 'bittersweet'],
    people: ['denan', 'grace', 'zefanya'],
    location: 'Bandung',
    season: 3,
    episode: 4,
    coverImage: img13,
    backdropImage: img13,
    backdropVideo: null,
    media: [
      { type: 'image', src: img13, caption: 'sebelum semuanya berubah.' },
      { type: 'image', src: img12, caption: 'satu foto terakhir.' },
    ],
    badge: 'Newly Added',
    featured: false,
  },

  // ── SEASON 3 (cont.): Magang Era ─────────────────────────────────────────
  {
    id: 13,
    type: 'series',
    title: 'Boardgame Night di Kantor',
    description:
      'uno flip, love letter, monopoly deal, uno no mercy. kantor jadi arena. ada yg dikeluarkan dari meja krn dianggap curang. ada yg diem-diem kena kartu empat plus-plus. ritual yg ga direncanain, tapi selalu diulang.',
    year: '2026',
    date: '2026-07-15',
    duration: '2j 30m',
    genre: ['Comedy', 'Chaos', 'Random Moments'],
    tags: ['boardgame', 'uno', 'monopoly', 'love letter', 'kantor', 'office', 'games', 'magang'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: 'Kantor Diskominfotik',
    season: 3,
    episode: 5,
    coverImage: imgBoardgame1,
    backdropImage: imgBoardgame2,
    backdropVideo: null,
    media: [
      { type: 'youtube', videoId: 'n7UvywcVPp4', thumbnail: imgBoardgame1, caption: 'sesi 1' },
      { type: 'youtube', videoId: 'fKAW4fpKMKk', thumbnail: imgBoardgame2, caption: 'sesi 2' },
      { type: 'youtube', videoId: '65LwfpW_0gw', thumbnail: imgBoardgame3, caption: 'sesi 3' },
      { type: 'youtube', videoId: 'RHjhw5YYDHY', thumbnail: imgBoardgame4, caption: 'sesi 4' },
      { type: 'youtube', videoId: 'AyUDajwS4KA', thumbnail: imgBoardgame5, caption: 'sesi 5' },
      { type: 'youtube', videoId: 'vgwg0Y90yQE', thumbnail: imgBoardgame6, caption: 'sesi 6' },
      { type: 'youtube', videoId: 'I1NL7aqSXGo', thumbnail: imgBoardgame7, caption: 'sesi 7' },
    ],
    badge: 'Newly Added',
    featured: false,
  },
  {
    id: 14,
    type: 'series',
    title: 'Main di Cafe',
    description:
      'sebentar doang, katanya. hampir dua jam kemudian baru beranjak. pesanannya hampir dingin krn lupa dimakan.',
    year: '2026',
    date: '2026-07-28',
    duration: '1j 45m',
    genre: ['Unplanned', 'Food', 'Random Moments'],
    tags: ['cafe', 'hangout', 'magang', 'santai', 'games', 'office'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: 'Cafe, Jakarta',
    season: 3,
    episode: 6,
    coverImage: imgCafe1,
    backdropImage: imgCafe2,
    backdropVideo: null,
    media: [
      { type: 'youtube', videoId: 'P4maATKyaVQ', thumbnail: imgCafe1, caption: 'sesi 1' },
      { type: 'youtube', videoId: '6iCm2i85bBA', thumbnail: imgCafe2, caption: 'sesi 2' },
      { type: 'youtube', videoId: 'PinCIyq1daQ', thumbnail: imgCafe3, caption: 'sesi 3' },
      { type: 'youtube', videoId: '2vZVgQ_8-Ss', thumbnail: imgCafe4, caption: 'sesi 4' },
    ],
    badge: 'Newly Added',
    featured: false,
  },
  {
    id: 15,
    type: 'movie',
    title: 'Day 1 (Sampai Grace Cabut)',
    description:
      'hari pertama. semua masih canggung, semua masih baru. Grace yg pergi duluan, dan entah kenapa itu yg paling diingat dari semua yg terjadi hari itu.',
    year: '2026',
    date: '2026-07-01',
    duration: '47m',
    genre: ['Core Memory', 'Wholesome'],
    tags: ['day 1', 'magang', 'pertama', 'grace', 'awal', 'office'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: 'Kantor Diskominfotik',
    season: 3,
    episode: 7,
    coverImage: 'https://img.youtube.com/vi/tUGCmz-_hM8/maxresdefault.jpg',
    backdropImage: 'https://img.youtube.com/vi/tUGCmz-_hM8/maxresdefault.jpg',
    backdropVideo: null,
    media: [
      { type: 'youtube', videoId: 'tUGCmz-_hM8', caption: 'day 1, dari awal sampai Grace cabut duluan' },
    ],
    badge: 'Newly Added',
    featured: false,
  },

  // ── SERIES: Blok M ───────────────────────────────────────────────────────
  {
    id: 25,
    type: 'series',
    title: 'Blok M Journey',
    description:
      'tujuh momen dari satu hari yg sama di blok M. setiap orang punya versinya sendiri tentang bagian mana yg paling diingat.',
    year: '2025',
    date: '2025-01-01',
    duration: '7 episode',
    genre: ['Unplanned', 'Random Moments'],
    tags: ['blok m', 'jakarta', 'jalan-jalan', 'hangout', 'series'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: 'Blok M, Jakarta',
    season: null,
    episode: null,
    coverImage: img2,
    backdropImage: img3,
    backdropVideo: null,
    media: [
      { type: 'video', src: vidBlokM1, thumbnail: img2,            caption: 'episode 1' },
      { type: 'video', src: vidBlokM2, thumbnail: img3,            caption: 'episode 2' },
      { type: 'video', src: vidBlokM3, thumbnail: img13,           caption: 'episode 3' },
      { type: 'video', src: vidBlokM4, thumbnail: img6,            caption: 'episode 4' },
      { type: 'video', src: vidBlokM5, thumbnail: img7,            caption: 'episode 5' },
      { type: 'video', src: vidBlokM6, thumbnail: imgBlokMFood3,   caption: 'episode 6' },
      { type: 'video', src: vidBlokM7, thumbnail: imgBlokMAfterWork, caption: 'episode 7' },
    ],
    badge: 'Newly Added',
    featured: false,
  },

  // ── SERIES: Selfie Time ───────────────────────────────────────────────────
  {
    id: 26,
    type: 'series',
    title: 'Selfie Time',
    description:
      'lima foto, satu sesi. ada yg akhirnya dapet angle bagus, ada yg ga. semua tetap disimpan.',
    year: '2025',
    date: '2025-01-01',
    duration: '5 episode',
    genre: ['Random Moments', 'Comedy'],
    tags: ['selfie', 'foto', 'sesi foto', 'konyol'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: null,
    season: null,
    episode: null,
    coverImage: imgSelfie1,
    backdropImage: imgSelfie2,
    backdropVideo: null,
    media: [
      { type: 'image', src: imgSelfie1, caption: 'foto 1' },
      { type: 'image', src: imgSelfie2, caption: 'foto 2' },
      { type: 'image', src: imgSelfie3, caption: 'foto 3' },
      { type: 'image', src: imgSelfie4, caption: 'foto 4' },
      { type: 'image', src: imgSelfie5, caption: 'foto 5' },
    ],
    badge: 'Newly Added',
    featured: false,
  },

  // ── MOVIES: Nonton Bareng ─────────────────────────────────────────────────
  {
    id: 16,
    type: 'movie',
    title: 'Twenty Five Twenty One',
    description:
      'nonton bareng. ada yg nangis, ada yg pura-pura ga nangis. berhasil ngerusak mood semua orang dengan cara yg baik.',
    year: '2022',
    date: '2024-01-01',
    duration: '1j 10m',
    genre: ['Drama', 'Romance', 'Korea'],
    tags: ['nonton bareng', 'korea', 'drama', 'movie night'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: null,
    season: null,
    episode: null,
    coverImage: imgTwentyFiveTwentyOne,
    backdropImage: imgTwentyFiveTwentyOne,
    backdropVideo: null,
    media: [{ type: 'video', src: vidTwentyFive, caption: 'twenty five twenty one' }],
    badge: null,
    featured: false,
  },
  {
    id: 17,
    type: 'movie',
    title: 'Ancika: Dia yang Bersamaku 1995',
    description:
      'film lokal yg ternyata bikin beberapa orang di ruangan lebih diem dari biasanya.',
    year: '2023',
    date: '2024-01-01',
    duration: '1j 50m',
    genre: ['Drama', 'Romance', 'Indonesia'],
    tags: ['nonton bareng', 'indonesia', 'drama', 'movie night'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: null,
    season: null,
    episode: null,
    coverImage: imgAncika,
    backdropImage: imgAncika,
    backdropVideo: null,
    media: [{ type: 'video', src: vidAncika, caption: 'ancika: dia yang bersamaku 1995' }],
    badge: null,
    featured: false,
  },
  {
    id: 18,
    type: 'movie',
    title: 'Can This Love Be Translated',
    description:
      'filmnya sederhana. tapi nonton ini sama mereka bikin lebih kerasa dari yg harusnya.',
    year: '2023',
    date: '2024-01-01',
    duration: '1j 40m',
    genre: ['Romance', 'Drama'],
    tags: ['nonton bareng', 'romance', 'movie night'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: null,
    season: null,
    episode: null,
    coverImage: imgCanThisLove,
    backdropImage: imgCanThisLove,
    backdropVideo: null,
    media: [{ type: 'video', src: vidLove, caption: 'can this love be translated' }],
    badge: null,
    featured: false,
  },
  {
    id: 19,
    type: 'movie',
    title: 'Doctor Strange in the Multiverse of Madness',
    description:
      'chaos multiverse versi marvel-nya lebih mudah diikuti kalo nonton rame-rame sambil bingung bareng.',
    year: '2022',
    date: '2024-01-01',
    duration: '2j 6m',
    genre: ['Action', 'Marvel'],
    tags: ['nonton bareng', 'marvel', 'action', 'movie night'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: null,
    season: null,
    episode: null,
    coverImage: imgDrStrange,
    backdropImage: imgDrStrange,
    backdropVideo: null,
    media: [{ type: 'video', src: vidDoctor, caption: 'doctor strange in the multiverse of madness' }],
    badge: null,
    featured: false,
  },
  {
    id: 20,
    type: 'movie',
    title: '20th Century Girl',
    description:
      'film korea yg bikin satu ruangan diem di bagian terakhirnya. ga ada yg ngomong apa-apa setelah credits roll.',
    year: '2022',
    date: '2024-01-01',
    duration: '1j 59m',
    genre: ['Drama', 'Romance', 'Korea'],
    tags: ['nonton bareng', 'korea', 'drama', 'movie night'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: null,
    season: null,
    episode: null,
    coverImage: img20thCenturyGirl,
    backdropImage: img20thCenturyGirl,
    backdropVideo: null,
    media: [{ type: 'video', src: vidTwentieth, caption: '20th century girl' }],
    badge: null,
    featured: false,
  },
  {
    id: 21,
    type: 'movie',
    title: 'As It Was',
    description:
      'visual yg gitu doang, tapi sampe sekarang masih sering diinget.',
    year: '2023',
    date: '2024-01-01',
    duration: '1j 30m',
    genre: ['Drama'],
    tags: ['nonton bareng', 'drama', 'movie night'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: null,
    season: null,
    episode: null,
    coverImage: imgAsItWas,
    backdropImage: imgAsItWas,
    backdropVideo: null,
    media: [{ type: 'video', src: vidAsItWas, caption: 'as it was' }],
    badge: null,
    featured: false,
  },
  {
    id: 22,
    type: 'movie',
    title: 'Perfect Crown',
    description:
      'baru tau ada film ini gara-gara salah satu dari mereka yg punya rekomendasi aneh yg ternyata selalu bagus.',
    year: '2023',
    date: '2024-01-01',
    duration: '1j 45m',
    genre: ['Drama'],
    tags: ['nonton bareng', 'drama', 'movie night'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: null,
    season: null,
    episode: null,
    coverImage: imgPerfectCrown,
    backdropImage: imgPerfectCrown,
    backdropVideo: null,
    media: [{ type: 'video', src: vidPerfectCrown, caption: 'perfect crown' }],
    badge: null,
    featured: false,
  },
  {
    id: 23,
    type: 'movie',
    title: 'End of the Story',
    description:
      'judulnya agak dramatis. filmnya juga lumayan. yang paling dramatis adalah reaksi orang-orang di ruangan.',
    year: '2023',
    date: '2024-01-01',
    duration: '1j 35m',
    genre: ['Drama', 'Romance'],
    tags: ['nonton bareng', 'drama', 'movie night'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: null,
    season: null,
    episode: null,
    coverImage: imgEndOfTheStory,
    backdropImage: imgEndOfTheStory,
    backdropVideo: null,
    media: [{ type: 'video', src: vidEndOfTheStory, caption: 'end of the story' }],
    badge: null,
    featured: false,
  },
  {
    id: 24,
    type: 'movie',
    title: 'Sore: Istri dari Masa Depan',
    description:
      'film lokal yg ga banyak orang tahu. ini salah satu alasan kenapa rekomendasinya perlu dipercaya.',
    year: '2023',
    date: '2024-01-01',
    duration: '1j 55m',
    genre: ['Romance', 'Indonesia'],
    tags: ['nonton bareng', 'indonesia', 'romance', 'movie night'],
    people: ['denan', 'zefanya', 'angel', 'dinda', 'grace', 'abi'],
    location: null,
    season: null,
    episode: null,
    coverImage: imgSoreIstri,
    backdropImage: imgSoreIstri,
    backdropVideo: null,
    media: [{ type: 'video', src: vidSoreIstri, caption: 'sore: istri dari masa depan' }],
    badge: null,
    featured: false,
  },
];

// ── Derived collections ───────────────────────────────────────────────────

export const publicMemories = memories.filter((m) => !m.hidden);

export const featuredMemory = publicMemories.find((m) => m.featured) || publicMemories[5];

export const top10 = publicMemories
  .slice()
  .sort((a, b) => b.id - a.id)
  .slice(0, 10)
  .map((m, i) => ({ ...m, rank: i + 1 }));

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
      m.year.includes(q)
  );
};
