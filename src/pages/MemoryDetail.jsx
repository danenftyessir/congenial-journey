import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa6';
import { Plus, Check, ArrowLeft, MapPin, Calendar, Clock, Images } from 'lucide-react';
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
  const [viewerIndex, setViewerIndex] = useState(0);

  const memory = getMemoryById(id);
  if (!memory) return <Navigate to="/home" replace />;

  const isSeries = memory.type === 'series';

  const openAt = (index) => {
    setViewerIndex(index);
    setViewerOpen(true);
  };

  const inMyList = myList.includes(memory.id);
  const progress = watchProgress[memory.id];
  const related = getRelated(memory, 8);
  const becauseYouWatched = getRelatedByWatch(memory);
  const season = seasons.find((s) => s.id === memory.season);
  const seasonEpisodes = season ? getSeasonMemories(season.id) : [];
  const cast = memory.people.map((pid) => people[pid]?.name || pid);
  const hasVideo = memory.media?.some((m) => m.type === 'video' || m.type === 'youtube' || m.type === 'gdrive');

  useEffect(() => {
    window.scrollTo(0, 0);
    addToRecent(memory.id);
  }, [memory.id]);

  return (
    <main className="bg-[#141414] min-h-screen text-white">
      <Navbar />

      {/* Hero / Backdrop */}
      <div className="relative h-[45vh] sm:h-[55vh] lg:h-[75vh] min-h-[280px] overflow-hidden">
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
          className="absolute top-16 sm:top-20 left-4 sm:left-5 lg:left-10 z-10 text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Kembali</span>
        </button>

        {/* Hero content */}
        <div className="absolute bottom-5 sm:bottom-8 left-4 sm:left-5 lg:left-10 right-4 sm:right-5 lg:right-10 z-10">
          {season && (
            <p className="text-[#e50914] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1.5 sm:mb-2">
              Season {season.id} — {season.title}&nbsp;·&nbsp;Episode {memory.episode}
            </p>
          )}

          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-2 sm:w-[80%] lg:w-[55%] leading-tight">
            {memory.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">
            <span className="flex items-center gap-1"><Calendar size={12} />{memory.year}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{memory.duration}</span>
            {memory.location && (
              <span className="hidden sm:flex items-center gap-1"><MapPin size={12} />{memory.location}</span>
            )}
            {memory.genre.slice(0, 2).map((g) => (
              <span key={g} className="border border-white/20 px-1.5 sm:px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-wide">
                {g}
              </span>
            ))}
          </div>

          {/* Progress bar */}
          {hasVideo && progress > 0 && progress < 100 && (
            <div className="w-full max-w-[12rem] mb-3">
              <div className="h-0.5 bg-gray-600 rounded-full">
                <div className="h-full bg-[#e50914] rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-gray-400 text-[11px] mt-0.5">{progress}% ditonton</p>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                const idx = isSeries
                  ? 0
                  : hasVideo && progress > 0 && memory.media?.length > 0
                  ? Math.min(Math.max(0, Math.round((progress / 100) * memory.media.length) - 1), memory.media.length - 1)
                  : 0;
                openAt(idx);
              }}
              className="flex items-center gap-1.5 sm:gap-2 bg-white text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded font-bold hover:bg-gray-200 active:scale-95 transition-all text-sm"
            >
              {hasVideo || isSeries ? <FaPlay size={12} /> : <Images size={13} />}
              {isSeries
                ? 'Putar Episode 1'
                : hasVideo && progress > 0 && progress < 100
                ? 'Lanjutkan'
                : hasVideo
                ? 'Putar'
                : 'Lihat Foto'}
            </button>
            <button
              onClick={() => toggleMyList(memory.id)}
              className="flex items-center gap-1.5 sm:gap-2 bg-white/10 border border-white/30 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded font-semibold hover:bg-white/20 active:scale-95 transition-all text-sm"
            >
              {inMyList ? <Check size={14} /> : <Plus size={14} />}
              <span className="hidden xs:inline">{inMyList ? 'Tersimpan' : 'My Memories'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detail body */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-5 lg:px-10 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {/* Left */}
          <div className="lg:col-span-2 flex flex-col gap-5 sm:gap-6">
            <p className="text-gray-200 leading-relaxed text-sm sm:text-base lg:text-lg">
              {memory.description}
            </p>

            {memory.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {memory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-gray-400 text-xs bg-white/5 border border-white/10 px-2 sm:px-2.5 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Episode list — series only */}
            {isSeries && memory.media?.length > 0 && (
              <div className="border-t border-white/10 pt-5 sm:pt-6">
                <h3 className="text-gray-500 font-bold text-xs mb-3 sm:mb-4 uppercase tracking-widest">
                  Episode
                </h3>
                <div className="flex flex-col divide-y divide-white/5">
                  {memory.media.map((ep, i) => {
                    const thumb =
                      ep.thumbnail ||
                      (ep.type === 'image'
                        ? ep.src
                        : ep.type === 'youtube'
                        ? `https://img.youtube.com/vi/${ep.videoId}/mqdefault.jpg`
                        : ep.type === 'gdrive'
                        ? `https://drive.google.com/thumbnail?id=${ep.fileId}&sz=w400`
                        : null);
                    return (
                      <button
                        key={i}
                        onClick={() => openAt(i)}
                        className="flex items-center gap-3 sm:gap-4 py-2.5 sm:py-3 text-left group hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors"
                      >
                        <span className="text-gray-600 text-sm font-bold w-5 flex-shrink-0 group-hover:text-gray-400 transition-colors">
                          {i + 1}
                        </span>
                        <div className="relative w-20 sm:w-28 h-12 sm:h-16 flex-shrink-0 rounded overflow-hidden bg-gray-800">
                          {thumb && (
                            <img
                              src={thumb}
                              alt=""
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                            <FaPlay size={12} className="text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-500 text-[10px] sm:text-xs mb-0.5">episode {i + 1}</p>
                          <p className="text-gray-200 text-xs sm:text-sm font-medium group-hover:text-white transition-colors line-clamp-2">
                            {ep.caption || `episode ${i + 1}`}
                          </p>
                        </div>
                        <FaPlay size={11} className="text-gray-600 group-hover:text-white flex-shrink-0 transition-colors mr-1 hidden sm:block" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reactions */}
            <div className="border-t border-white/10 pt-4 sm:pt-5">
              <ReactionPicker memoryId={memory.id} />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {cast.length > 0 && (
              <div>
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3">
                  Pemeran
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 lg:flex-col lg:gap-1.5">
                  {cast.map((name) => (
                    <p key={name} className="text-white text-sm">
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {!isSeries && memory.media?.length > 0 && (
              <button onClick={() => openAt(0)} className="text-left group">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1.5 sm:mb-2">
                  Media
                </h3>
                <p className="text-[#e50914] text-sm group-hover:underline">
                  {memory.media.length} foto/video
                </p>
              </button>
            )}
          </div>
        </div>

        {/* Season episode list */}
        {!isSeries && season && seasonEpisodes.length > 0 && (
          <div className="mt-8 sm:mt-12 border-t border-white/10 pt-8 sm:pt-10">
            <EpisodeList season={season} episodes={seasonEpisodes} currentId={memory.id} />
          </div>
        )}

        {/* Because You Watched */}
        {becauseYouWatched.length > 0 && (
          <div className="mt-8 sm:mt-10 -mx-4 sm:-mx-5 lg:-mx-10">
            <MemoryRow title={`Karena Kamu Menonton "${memory.title}"`} items={becauseYouWatched} />
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-2 -mx-4 sm:-mx-5 lg:-mx-10">
            <MemoryRow title="Lebih Banyak Seperti Ini" items={related} />
          </div>
        )}
      </div>

      <Footer />

      {viewerOpen && (
        <MediaViewer
          memory={memory}
          onClose={() => setViewerOpen(false)}
          startIndex={viewerIndex}
        />
      )}
    </main>
  );
};

export default MemoryDetail;
