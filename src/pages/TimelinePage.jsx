import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { memories } from '../data/memories';
import { seasons } from '../data/seasons';
import { useApp } from '../context/AppContext';

// Group memories by year, sorted by date within each year
const buildTimeline = () => {
  const byYear = {};
  memories.forEach((m) => {
    const year = m.year || m.date?.slice(0, 4) || '?';
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(m);
  });
  // Sort memories within each year by date
  Object.keys(byYear).forEach((y) => {
    byYear[y].sort((a, b) => new Date(a.date || a.year) - new Date(b.date || b.year));
  });
  // Return sorted years
  const sortedYears = Object.keys(byYear).sort((a, b) => Number(a) - Number(b));
  return sortedYears.map((year) => ({ year, memories: byYear[year] }));
};

const MONTH_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const getMonth = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return isNaN(d) ? '' : MONTH_ID[d.getMonth()];
};

const TimelineCard = ({ memory, isLast }) => {
  const navigate = useNavigate();
  const { watchProgress, reactions } = useApp();
  const progress = watchProgress[memory.id];
  const month = getMonth(memory.date);
  const season = seasons.find((s) => s.id === memory.season);

  return (
    <div className="relative flex gap-5 lg:gap-8 pb-8 group">
      {/* Vertical line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-[#e50914] border-2 border-[#141414] ring-2 ring-[#e50914]/30 mt-1.5 z-10 group-hover:ring-4 transition-all" />
        {!isLast && <div className="w-px flex-1 bg-white/10 mt-1" />}
      </div>

      {/* Content */}
      <button
        onClick={() => navigate(`/memory/${memory.id}`)}
        className="flex-1 flex gap-4 text-left hover:bg-white/5 rounded-xl p-3 -ml-3 transition-colors group/card mb-1"
      >
        {/* Thumbnail */}
        <div className="relative w-24 h-16 lg:w-32 lg:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
          <img
            src={memory.coverImage}
            alt={memory.title}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
          />
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600">
              <div className="h-full bg-[#e50914]" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              {month && (
                <p className="text-[#e50914] text-[10px] font-bold uppercase tracking-widest mb-0.5">
                  {month} {memory.year}
                </p>
              )}
              <h3 className="text-white font-semibold text-sm lg:text-base leading-tight group-hover/card:text-gray-100">
                {memory.title}
              </h3>
            </div>
            {reactions[memory.id] && (
              <span className="text-base flex-shrink-0">{
                { heart: '❤️', miss: '🥹', laugh: '😂', skull: '💀', star: '⭐' }[reactions[memory.id]]
              }</span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {season && (
              <span className="text-gray-600 text-[10px]">
                S{season.id} E{memory.episode}
              </span>
            )}
            <span className="text-gray-600 text-[10px]">·</span>
            <span className="text-gray-500 text-[10px]">{memory.duration}</span>
            {memory.location && (
              <>
                <span className="text-gray-600 text-[10px]">·</span>
                <span className="flex items-center gap-0.5 text-gray-500 text-[10px]">
                  <MapPin size={9} />{memory.location}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mt-1.5">
            {memory.genre.slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-[10px] text-gray-600 bg-white/5 px-1.5 py-0.5 rounded-sm"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
};

const TimelinePage = () => {
  const timeline = buildTimeline();
  const totalYears = timeline.length;

  return (
    <main className="bg-[#141414] min-h-screen text-white">
      <Navbar />

      {/* Page header */}
      <div className="max-w-screen-lg mx-auto px-5 lg:px-10 pt-28 pb-4">
        <h1 className="text-3xl lg:text-4xl font-black mb-1">Timeline Kita</h1>
        <p className="text-gray-500 text-sm">
          {memories.length} kenangan · {totalYears} tahun bersama
        </p>
      </div>

      {/* Season legend */}
      <div className="max-w-screen-lg mx-auto px-5 lg:px-10 mb-10">
        <div className="flex flex-wrap gap-3">
          {seasons.map((s) => (
            <div key={s.id} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#e50914]" />
              <span className="text-gray-400">Season {s.id} — {s.title}</span>
              <span className="text-gray-700">({s.year})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-screen-lg mx-auto px-5 lg:px-10 pb-20">
        {timeline.map(({ year, memories: yearMems }, yi) => (
          <div key={year} className="mb-12">
            {/* Year marker */}
            <div className="flex items-center gap-5 mb-8">
              <h2
                className="text-6xl lg:text-8xl font-black leading-none select-none"
                style={{
                  WebkitTextStroke: '1px rgba(255,255,255,0.08)',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              >
                {year}
              </h2>
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-700 text-xs">{yearMems.length} kenangan</span>
            </div>

            {/* Memories */}
            <div className="pl-2">
              {yearMems.map((m, i) => (
                <TimelineCard
                  key={m.id}
                  memory={m}
                  isLast={i === yearMems.length - 1 && yi === timeline.length - 1}
                />
              ))}
            </div>
          </div>
        ))}

        {/* End cap */}
        <div className="flex flex-col items-center py-12 text-center">
          <div className="w-px h-12 bg-white/10 mb-4" />
          <div className="w-4 h-4 rounded-full border-2 border-white/20 mb-6" />
          <p className="text-gray-600 text-sm">Cerita ini belum selesai.</p>
          <p className="text-gray-700 text-xs mt-1">Masih ada episode yang belum dibuat.</p>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default TimelinePage;
