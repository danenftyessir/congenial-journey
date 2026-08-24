import { Play, Compass, Zap, Trophy, Bookmark, Archive, Heart, Smile, CheckCircle, Search } from 'lucide-react';

// Achievement definitions — all progress is computed dynamically from app state.
// getProgress receives: { visited, totalPublic, myList, reactionsCount, completedCount, eggs }
// Returns: { current, target }

export const achievements = [
  {
    id: 'first_step',
    icon: Play,
    title: 'Langkah Pertama',
    description: 'Buka kenangan pertamamu untuk pertama kali',
    rarity: 'common',
    getProgress: ({ visited }) => ({ current: Math.min(visited, 1), target: 1 }),
  },
  {
    id: 'explorer',
    icon: Compass,
    title: 'Penjelajah',
    description: 'Jelajahi 5 kenangan berbeda',
    rarity: 'common',
    getProgress: ({ visited }) => ({ current: Math.min(visited, 5), target: 5 }),
  },
  {
    id: 'binge',
    icon: Zap,
    title: 'Maratoner',
    description: 'Jelajahi 10 kenangan berbeda',
    rarity: 'uncommon',
    getProgress: ({ visited }) => ({ current: Math.min(visited, 10), target: 10 }),
  },
  {
    id: 'khatam',
    icon: Trophy,
    title: 'Khatam',
    description: 'Buka semua kenangan yang tersedia',
    rarity: 'legendary',
    getProgress: ({ visited, totalPublic }) => ({
      current: Math.min(visited, totalPublic),
      target: totalPublic,
    }),
  },
  {
    id: 'collector',
    icon: Bookmark,
    title: 'Kolektor',
    description: 'Simpan 3 kenangan ke My Memories',
    rarity: 'common',
    getProgress: ({ myList }) => ({ current: Math.min(myList, 3), target: 3 }),
  },
  {
    id: 'hoarder',
    icon: Archive,
    title: 'Penyimpan Kenangan',
    description: 'Simpan 10 kenangan ke My Memories',
    rarity: 'uncommon',
    getProgress: ({ myList }) => ({ current: Math.min(myList, 10), target: 10 }),
  },
  {
    id: 'reactor',
    icon: Heart,
    title: 'Pemberi Reaksi',
    description: 'Beri reaksi pada 3 kenangan',
    rarity: 'common',
    getProgress: ({ reactionsCount }) => ({ current: Math.min(reactionsCount, 3), target: 3 }),
  },
  {
    id: 'full_reactor',
    icon: Smile,
    title: 'Penuh Perasaan',
    description: 'Beri reaksi pada semua kenangan yang tersedia',
    rarity: 'rare',
    getProgress: ({ reactionsCount, totalPublic }) => ({
      current: Math.min(reactionsCount, totalPublic),
      target: totalPublic,
    }),
  },
  {
    id: 'completionist',
    icon: CheckCircle,
    title: 'Penyelesai Sejati',
    description: 'Tonton satu kenangan hingga selesai (>=90%)',
    rarity: 'uncommon',
    getProgress: ({ completedCount }) => ({ current: Math.min(completedCount, 1), target: 1 }),
  },
  {
    id: 'detective',
    icon: Search,
    title: 'Detektif Tersembunyi',
    description: 'Temukan kenangan rahasia yang tersembunyi',
    rarity: 'legendary',
    getProgress: ({ eggs }) => ({ current: eggs.length >= 1 ? 1 : 0, target: 1 }),
  },
];

export const rarityConfig = {
  common:    { label: 'Common',    color: 'text-gray-400',  bg: 'bg-gray-400/10',  bar: 'bg-gray-400'  },
  uncommon:  { label: 'Uncommon',  color: 'text-green-400', bg: 'bg-green-400/10', bar: 'bg-green-400' },
  rare:      { label: 'Rare',      color: 'text-blue-400',  bg: 'bg-blue-400/10',  bar: 'bg-blue-400'  },
  legendary: { label: 'Legendary', color: 'text-amber-400', bg: 'bg-amber-400/10', bar: 'bg-amber-400' },
};
