import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa6';
import { Plus, Check, ArrowLeft, MapPin, Calendar, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import MediaViewer from '../components/MediaViewer';
import EpisodeList from '../components/EpisodeList';
import MemoryRow from '../components/MemoryRow';
import ReactionPicker from '../components/ReactionPicker';
import Footer from '../components/Footer';
import { getMemoryById, getRelated, getSeasonMemories, publicMemories as memories } from '../data/memories';
import { seasons } from '../data/seasons';
import { people } from '../data/profiles';
import { useApp } from '../context/AppContext';

// Derives a "Because You Watched..." row from the memory this detail relates to
const getRelatedByWatch = (memory) =>
  memories
    .filter(
      (m) =>
        m.id !== memory.id &&
        (m.people.some((p) => memory.people.includes(p)) ||
          m.genre.some((g) => memory.genre.includes(g)) ||
          m.season === memory.season)
    )
    .slice(0, 8);

const MemoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { myList, toggleMyList, watchProgress, addToRecent, reactions } = useApp();
  const [viewerOpen, setViewerOpen] = useState(false);

  const memory = getMemoryById(id);
  if (!memory) return <Navigate to="/home" replace />;

  const inMyList = myList.includes(memory.id);
  const progress = watchProgress[memory.id];
  const related = getRelated(memory, 8);
  const becauseYouWatched = getRelatedByWatch(memory);
  const season = seasons.find((s) => s.id === memory.season);
  const seasonEpisodes = season ? getSeasonMemories(season.id) : [];
  const peopleNames = memory.people.map((pid) => people[pid]?.name || pid).join(', ');

  useEffect(() => {
    window.scrollTo(0, 0);
    addToRecent(memory.id);
  }, [memory.id]);

  return (
    <main className="bg-[#141414] min-h-screen text-white">
      <Navbar />

      {/* Hero / Backdrop */}
      <div className="relative h-[55vh] lg:h-[75vh] overflow-hidden">
        <img
          src={memory.backdropImage}
          alt={memory.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-20 left-5 lg:left-10 z-10 text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        {/* Hero content */}
        <div className="absolute bottom-8 left-5 lg:left-10 right-5 lg:right-10 z-10">
          {season && (
            <p className="text-[#e50914] text-xs font-bold uppercase tracking-widest mb-2">
              Season {season.id} — {season.title}&nbsp;·&nbsp;Episode {memory.episode}
            </p>
          )}

          <h1 className="text-3xl lg:text-5xl font-black mb-2 lg:w-[55%] leading-tight">
            {memory.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-4">
            <span className="flex items-center gap-1"><Calendar size={13} />{memory.year}</span>
            <span className="flex items-center gap-1"><Clock size={13} />{memory.duration}</span>
            {memory.location && (
              <span className="flex items-center gap-1"><MapPin size={13} />{memory.location}</span>
            )}
            {memory.genre.slice(0, 2).map((g) => (
              <span key={g} className="border border-white/20 px-2 py-0.5 rounded-sm text-[11px] uppercase tracking-wide">
                {g}
              </span>
            ))}
          </div>

          {/* Progress bar */}
          {progress > 0 && progress < 100 && (
            <div className="w-48 mb-3">
              <div className="h-0.5 bg-gray-600 rounded-full">
                <div className="h-full bg-[#e50914] rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-gray-400 text-[11px] mt-0.5">{progress}% ditonton</p>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setViewerOpen(true)}
              className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded font-bold hover:bg-gray-200 active:scale-95 transition-all text-sm lg:text-base"
            >
              <FaPlay size={14} />
              {progress > 0 && progress < 100 ? 'Lanjutkan' : 'Putar'}
            </button>
            <button
              onClick={() => toggleMyList(memory.id)}
              className="flex items-center gap-2 bg-white/10 border border-white/30 text-white px-5 py-2.5 rounded font-semibold hover:bg-white/20 active:scale-95 transition-all text-sm lg:text-base"
            >
              {inMyList ? <Check size={16} /> : <Plus size={16} />}
              {inMyList ? 'Tersimpan' : 'My Memories'}
            </button>
          </div>
        </div>
      </div>

      {/* Detail body */}
      <div className="max-w-screen-2xl mx-auto px-5 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <p className="text-gray-200 leading-relaxed text-base lg:text-lg">
              {memory.description}
            </p>

            {peopleNames && (
              <p className="text-sm">
                <span className="text-gray-500">Orang yang hadir:&nbsp;</span>
                <span className="text-white">{peopleNames}</span>
              </p>
            )}

            {memory.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {memory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-gray-400 text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Reactions */}
            <div className="border-t border-white/10 pt-5">
              <ReactionPicker memoryId={memory.id} />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6">
            {memory.trivia?.length > 0 && (
              <div>
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">
                  Did You Know
                </h3>
                <div className="flex flex-col gap-2">
                  {memory.trivia.map((t, i) => (
                    <p key={i} className="text-gray-300 text-sm leading-relaxed border-l-2 border-[#e50914]/40 pl-3">
                      {t}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {memory.quotes?.length > 0 && (
              <div>
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">
                  Quotes
                </h3>
                <div className="flex flex-col gap-3">
                  {memory.quotes.map((q, i) => (
                    <p key={i} className="text-gray-300 text-sm italic leading-relaxed">
                      {q}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {memory.media?.length > 0 && (
              <button onClick={() => setViewerOpen(true)} className="text-left group">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">
                  Media
                </h3>
                <p className="text-[#e50914] text-sm group-hover:underline">
                  {memory.media.length} foto/video — Putar
                </p>
              </button>
            )}
          </div>
        </div>

        {/* Episode list */}
        {season && seasonEpisodes.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-10">
            <EpisodeList season={season} episodes={seasonEpisodes} currentId={memory.id} />
          </div>
        )}

        {/* Because You Watched */}
        {becauseYouWatched.length > 0 && (
          <div className="mt-10 -mx-5 lg:-mx-10">
            <MemoryRow title={`Karena Kamu Menonton "${memory.title}"`} items={becauseYouWatched} />
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-2 -mx-5 lg:-mx-10">
            <MemoryRow title="Lebih Banyak Seperti Ini" items={related} />
          </div>
        )}
      </div>

      <Footer />

      {viewerOpen && (
        <MediaViewer
          memory={memory}
          onClose={() => setViewerOpen(false)}
          startIndex={
            progress > 0 && memory.media?.length > 0
              ? Math.min(
                  Math.max(0, Math.round((progress / 100) * memory.media.length) - 1),
                  memory.media.length - 1
                )
              : 0
          }
        />
      )}
    </main>
  );
};

export default MemoryDetail;
