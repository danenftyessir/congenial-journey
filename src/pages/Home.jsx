import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MemoryRow from '../components/MemoryRow';
import Footer from '../components/Footer';
import { publicMemories as memories } from '../data/memories';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { currentProfile, myList, watchProgress, recentlyWatched, reactions } = useApp();
  const [showAre, setShowAre] = useState(false);

  // "Are you still reminiscing?" after 7+ memories touched
  useEffect(() => {
    if (recentlyWatched.length >= 7) setShowAre(true);
  }, [recentlyWatched]);

  const profileId = currentProfile?.id || '';
  const profileName = currentProfile?.name || 'You';

  // Split: film/drama "nonton bareng" vs. actual memories
  const nontonBareng = memories.filter((m) => m.tags.includes('nonton bareng'));
  const realMemories = memories.filter((m) => !m.tags.includes('nonton bareng'));

  // Continue watching: real memories with partial progress
  const continueItems = realMemories
    .filter((m) => {
      const p = watchProgress[m.id];
      return p != null && p > 0 && p < 100;
    })
    .map((m) => ({ ...m, progress: watchProgress[m.id] }));

  // My list items (keep all — user may have saved a film)
  const myListItems = memories.filter((m) => myList.includes(m.id));

  // Because you were there — real memories only
  const becauseYou = realMemories.filter((m) => m.people.includes(profileId));

  // Newly added — real memories only
  const newlyAdded = realMemories.filter((m) => m.badge === 'Newly Added');

  // Recently watched (as a row) — real memories only
  const recentItems = recentlyWatched
    .map((id) => realMemories.find((m) => m.id === id))
    .filter(Boolean);

  // "You may have forgotten" — oldest real memories not in recentlyWatched
  const forgotten = realMemories
    .filter((m) => !recentlyWatched.includes(m.id))
    .sort((a, b) => a.id - b.id)
    .slice(0, 8);

  // Trending: sorted by watchProgress descending — real memories only
  const trending = [...realMemories]
    .sort((a, b) => (watchProgress[b.id] || 0) - (watchProgress[a.id] || 0))
    .filter((m) => (watchProgress[m.id] || 0) > 0)
    .slice(0, 10);

  // Most rewatched: real memories with progress >= 90
  const mostRewatched = realMemories
    .filter((m) => (watchProgress[m.id] || 0) >= 90)
    .slice(0, 8);

  // "Because you liked..." — based on reacted real memories
  const reactedIds = Object.keys(reactions).map(Number).filter((id) => reactions[id]);
  const reactedMemories = realMemories.filter((m) => reactedIds.includes(m.id));
  const likedGenres = [...new Set(reactedMemories.flatMap((m) => m.genre))];
  const likedPeople = [...new Set(reactedMemories.flatMap((m) => m.people))];
  const becauseLiked = realMemories
    .filter(
      (m) =>
        !reactedIds.includes(m.id) &&
        (m.genre.some((g) => likedGenres.includes(g)) ||
          m.people.some((p) => likedPeople.includes(p)))
    )
    .slice(0, 8);

  // Top 10 from real memories only
  const realTop10 = realMemories
    .slice()
    .sort((a, b) => b.id - a.id)
    .slice(0, 10)
    .map((m, i) => ({ ...m, rank: i + 1 }));

  return (
    <main className="bg-[#141414] min-h-screen">
      <Navbar />

      <HeroBanner />

      <div className="pt-4 pb-8">
        {continueItems.length > 0 && (
          <MemoryRow
            title={`Lanjutkan Menonton untuk ${profileName}`}
            items={continueItems}
            variant="continue"
          />
        )}

        {recentItems.length > 0 && (
          <MemoryRow
            title="Baru Ditonton"
            items={recentItems}
          />
        )}

        <MemoryRow title="Baru Ditambahkan" items={newlyAdded} />

        <MemoryRow
          title="Top 10 Kenangan Hari Ini"
          items={realTop10}
          variant="top10"
        />

        {becauseYou.length > 0 && (
          <MemoryRow
            title={`Karena ${profileName} Ada Di Sana`}
            items={becauseYou}
          />
        )}

        {myListItems.length > 0 && (
          <MemoryRow title="My Memories" items={myListItems} />
        )}

        {trending.length > 0 && (
          <MemoryRow title="Trending Di Antara Kita" items={trending} />
        )}

        {mostRewatched.length > 0 && (
          <MemoryRow title="Paling Sering Diputar Ulang" items={mostRewatched} />
        )}

        {becauseLiked.length > 0 && (
          <MemoryRow title="Karena Kamu Menyukainya..." items={becauseLiked} />
        )}

        {forgotten.length > 0 && (
          <MemoryRow
            title="Kamu Mungkin Sudah Lupa Ini..."
            items={forgotten}
          />
        )}

        <MemoryRow title="Jelajahi Semua Kenangan" items={realMemories} />

        {nontonBareng.length > 0 && (
          <MemoryRow
            title="Film & Drakor yang Pernah Kita Tonton Bareng"
            items={nontonBareng}
          />
        )}

      </div>

      {/* "Are you still reminiscing?" */}
      {showAre && (
        <div className="fixed inset-0 z-[500] bg-black/80 flex items-center justify-center">
          <div className="bg-[#181818] border border-white/10 rounded-xl p-8 max-w-sm mx-4 text-center">
            <p className="text-white text-xl font-bold mb-2">
              Masih reminiscing?
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Kamu sudah membuka {recentlyWatched.length} kenangan. Enjoy the nostalgia.
            </p>
            <button
              onClick={() => setShowAre(false)}
              className="bg-white text-black font-bold px-8 py-2.5 rounded hover:bg-gray-200 transition-colors"
            >
              Jelas
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default Home;
