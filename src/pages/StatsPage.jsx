import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { memories } from '../data/memories';
import { seasons } from '../data/seasons';
import { people } from '../data/profiles';
import { REACTIONS } from '../components/ReactionPicker';
import { useApp } from '../context/AppContext';

// ── Computed stats ────────────────────────────────────────────────────────

const computeGlobal = () => {
  const totalPhotos = memories.reduce((acc, m) => acc + m.media.filter((x) => x.type === 'image').length, 0);
  const totalVideos = memories.reduce((acc, m) => acc + m.media.filter((x) => x.type === 'video').length, 0);
  const places = [...new Set(memories.map((m) => m.location).filter(Boolean))];
  const years = [...new Set(memories.map((m) => m.year))].sort();
  return { totalPhotos, totalVideos, places, years };
};

const StatCard = ({ value, label, sub }) => (
  <div className="flex flex-col items-start">
    <p className="text-5xl lg:text-6xl font-black text-white leading-none">{value}</p>
    <p className="text-gray-300 text-sm font-semibold mt-2">{label}</p>
    {sub && <p className="text-gray-600 text-xs mt-0.5">{sub}</p>}
  </div>
);

const StatsPage = () => {
  const navigate = useNavigate();
  const { currentProfile, watchProgress, myList, reactions } = useApp();
  const { totalPhotos, totalVideos, places, years } = computeGlobal();

  const profileId = currentProfile?.id || '';
  const profileName = currentProfile?.name || 'Kamu';

  // Profile-specific
  const profileMemories = memories.filter((m) => m.people.includes(profileId));

  // Watched stats
  const watchedIds = Object.keys(watchProgress)
    .map(Number)
    .filter((id) => watchProgress[id] > 0);
  const watchedCount = watchedIds.length;
  const completedCount = watchedIds.filter((id) => watchProgress[id] >= 90).length;

  // Favorite genre from watched memories
  const watchedMemories = memories.filter((m) => watchedIds.includes(m.id));
  const genreCounts = {};
  watchedMemories.forEach((m) => m.genre.forEach((g) => { genreCounts[g] = (genreCounts[g] || 0) + 1; }));
  const genreEntries = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
  const favoriteGenre = genreEntries[0]?.[0] || null;
  const secondGenre = genreEntries[1]?.[0] || null;

  // Most watched memory
  const mostWatched = memories.reduce((best, m) => {
    const p = watchProgress[m.id] || 0;
    return !best || p > (watchProgress[best.id] || 0) ? m : best;
  }, null);

  // Reactions summary
  const reactionCounts = {};
  Object.values(reactions).forEach((rid) => {
    reactionCounts[rid] = (reactionCounts[rid] || 0) + 1;
  });
  const topReaction = REACTIONS.find(
    (r) => r.id === Object.entries(reactionCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
  );

  // Co-appearance stats: who appears most alongside this profile
  const coPeople = {};
  profileMemories.forEach((m) => {
    m.people.filter((p) => p !== profileId).forEach((p) => {
      coPeople[p] = (coPeople[p] || 0) + 1;
    });
  });
  const topCoPersonId = Object.entries(coPeople).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topCoPerson = topCoPersonId ? people[topCoPersonId]?.name : null;

  const yearsActive = years.length;

  return (
    <main className="bg-[#141414] min-h-screen text-white">
      <Navbar />

      {/* Hero header */}
      <div className="relative pt-28 pb-16 px-5 lg:px-10 max-w-screen-2xl mx-auto">
        <p className="text-[#e50914] text-xs font-bold uppercase tracking-widest mb-3">
          Profil Persahabatan
        </p>
        <h1 className="text-5xl lg:text-7xl font-black uppercase leading-none mb-2">
          {profileName}
        </h1>
        <p className="text-gray-500 text-sm">
          Bergabung sejak {years[0] || '2023'} · {yearsActive} tahun bersama
        </p>
      </div>

      {/* Global stats grid */}
      <div className="px-5 lg:px-10 max-w-screen-2xl mx-auto mb-16">
        <div className="border-t border-white/10 pt-10 mb-10">
          <h2 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">
            Koleksi Kenangan
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
            <StatCard value={memories.length} label="Total Kenangan" />
            <StatCard value={totalPhotos} label="Foto" />
            <StatCard value={totalVideos} label="Video" />
            <StatCard value={places.length} label="Tempat" sub={places.slice(0, 2).join(', ')} />
            <StatCard value={seasons.length} label="Season" />
            <StatCard value={memories.length} label="Episode" />
            <StatCard value={yearsActive} label="Tahun Bersama" />
            <StatCard value={myList.length} label="My Memories" sub="kenangan tersimpan" />
          </div>
        </div>

        {/* Personal stats */}
        {profileId && (
          <div className="border-t border-white/10 pt-10 mb-10">
            <h2 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">
              Statistik {profileName}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
              <StatCard
                value={profileMemories.length}
                label="Kenangan Bersamamu"
                sub={`dari ${memories.length} total kenangan`}
              />
              <StatCard value={watchedCount} label="Ditonton" sub="kenangan diputar" />
              <StatCard value={completedCount} label="Selesai Ditonton" sub=">90% selesai" />
              <StatCard
                value={Object.values(reactions).filter(Boolean).length}
                label="Reaksi Diberikan"
              />
            </div>
          </div>
        )}

        {/* Highlights */}
        <div className="border-t border-white/10 pt-10">
          <h2 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">
            Highlight
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Favorite genre */}
            {favoriteGenre && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Genre Favorit</p>
                <p className="text-white text-2xl font-black">{favoriteGenre}</p>
                {secondGenre && (
                  <p className="text-gray-600 text-sm mt-1">diikuti {secondGenre}</p>
                )}
              </div>
            )}

            {/* Most watched */}
            {mostWatched && watchProgress[mostWatched.id] > 0 && (
              <button
                onClick={() => navigate(`/memory/${mostWatched.id}`)}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-left hover:bg-white/8 transition-colors group"
              >
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Paling Sering Ditonton</p>
                <div className="flex gap-3 items-center">
                  <div className="w-14 h-10 rounded overflow-hidden flex-shrink-0">
                    <img src={mostWatched.coverImage} alt={mostWatched.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm group-hover:underline">
                      {mostWatched.title}
                    </p>
                    <p className="text-gray-500 text-xs">{watchProgress[mostWatched.id]}% ditonton</p>
                  </div>
                </div>
              </button>
            )}

            {/* Top reaction */}
            {topReaction && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Reaksi Terbanyak</p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{topReaction.emoji}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{topReaction.label}</p>
                    <p className="text-gray-500 text-xs">{reactionCounts[topReaction.id]}× diberikan</p>
                  </div>
                </div>
              </div>
            )}

            {/* Most frequent co-person */}
            {topCoPerson && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Paling Sering Bersama</p>
                <p className="text-white text-2xl font-black">{topCoPerson}</p>
                <p className="text-gray-600 text-sm mt-1">
                  {coPeople[topCoPersonId]} kenangan bersama
                </p>
              </div>
            )}

            {/* My list count */}
            {myList.length > 0 && (
              <button
                onClick={() => navigate('/my-memories')}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-left hover:bg-white/8 transition-colors group"
              >
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">My Memories</p>
                <p className="text-white text-2xl font-black">{myList.length}</p>
                <p className="text-gray-600 text-sm mt-1 group-hover:underline">Lihat semua →</p>
              </button>
            )}

            {/* Places visited */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Tempat</p>
              <p className="text-white text-2xl font-black">{places.length}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {places.map((p) => (
                  <span key={p} className="text-gray-600 text-[10px] bg-white/5 px-1.5 py-0.5 rounded">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Memory collection preview */}
      <div className="px-5 lg:px-10 max-w-screen-2xl mx-auto border-t border-white/10 pt-10 pb-20">
        <h2 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">
          Kenangan Bersamamu
        </h2>
        {profileMemories.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {profileMemories.map((m) => (
              <button
                key={m.id}
                onClick={() => navigate(`/memory/${m.id}`)}
                className="aspect-[2/3] rounded overflow-hidden group relative"
              >
                <img
                  src={m.coverImage}
                  alt={m.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-sm">
            Belum ada kenangan yang melibatkan profil ini secara spesifik.
          </p>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default StatsPage;
