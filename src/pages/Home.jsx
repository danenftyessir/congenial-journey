import { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MemoryRow from '../components/MemoryRow';
import Footer from '../components/Footer';
import { publicMemories as memories, top10 } from '../data/memories';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { currentProfile, myList, watchProgress, recentlyWatched, reactions } = useApp();
  const [showAre, setShowAre] = useState(false);

  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  // "Are you still reminiscing?" after 7+ memories touched
  useEffect(() => {
    if (recentlyWatched.length >= 7) setShowAre(true);
  }, [recentlyWatched]);

  const profileId = currentProfile?.id || '';
  const profileName = currentProfile?.name || 'You';

  // Continue watching: memories with partial progress
  const continueItems = memories
    .filter((m) => {
      const p = watchProgress[m.id];
      return p != null && p > 0 && p < 100;
    })
    .map((m) => ({ ...m, progress: watchProgress[m.id] }));

  // My list items
  const myListItems = memories.filter((m) => myList.includes(m.id));

  // Because you were there
  const becauseYou = memories.filter((m) => m.people.includes(profileId));

  // Newly added
  const newlyAdded = memories.filter((m) => m.badge === 'Newly Added');

  // Recently watched (as a row)
  const recentItems = recentlyWatched
    .map((id) => memories.find((m) => m.id === id))
    .filter(Boolean);

  // "You may have forgotten" — oldest memories not in recentlyWatched
  const forgotten = memories
    .filter((m) => !recentlyWatched.includes(m.id))
    .sort((a, b) => a.id - b.id)
    .slice(0, 8);

  // Trending: sorted by watchProgress descending (most viewed % across all users)
  const trending = [...memories]
    .sort((a, b) => (watchProgress[b.id] || 0) - (watchProgress[a.id] || 0))
    .filter((m) => (watchProgress[m.id] || 0) > 0)
    .slice(0, 10);

  // Most rewatched: memories with progress >= 90
  const mostRewatched = memories
    .filter((m) => (watchProgress[m.id] || 0) >= 90)
    .slice(0, 8);

  // "Because you liked..." — based on reacted memories
  const reactedIds = Object.keys(reactions).map(Number).filter((id) => reactions[id]);
  const reactedMemories = memories.filter((m) => reactedIds.includes(m.id));
  const likedGenres = [...new Set(reactedMemories.flatMap((m) => m.genre))];
  const likedPeople = [...new Set(reactedMemories.flatMap((m) => m.people))];
  const becauseLiked = memories
    .filter(
      (m) =>
        !reactedIds.includes(m.id) &&
        (m.genre.some((g) => likedGenres.includes(g)) ||
          m.people.some((p) => likedPeople.includes(p)))
    )
    .slice(0, 8);

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
          items={top10}
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

        <MemoryRow title="Jelajahi Semua Kenangan" items={memories} />

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
