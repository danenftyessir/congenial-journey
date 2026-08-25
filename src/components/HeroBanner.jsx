import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa6';
import { Info, VolumeX, Volume2, Plus, Check } from 'lucide-react';
import { featuredMemory, publicMemories } from '../data/memories';
import { useApp } from '../context/AppContext';

const HeroBanner = () => {
  const navigate = useNavigate();
  const { myList, toggleMyList, watchProgress, recentlyWatched } = useApp();
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  const inProgressMemory = recentlyWatched
    .map((id) => publicMemories.find((m) => m.id === id))
    .find((m) => m && watchProgress[m.id] > 0 && watchProgress[m.id] < 100);
  const memory = inProgressMemory || featuredMemory;

  const inMyList = myList.includes(memory.id);
  const progress = watchProgress[memory.id];

  const toggleMute = () => {
    setMuted((m) => {
      if (videoRef.current) videoRef.current.muted = !m;
      return !m;
    });
  };

  return (
    <section className="relative bg-black h-[100svh] min-h-[500px] max-h-[900px] flex justify-center items-end overflow-hidden">
      {/* Background */}
      {memory.backdropVideo ? (
        <video
          ref={videoRef}
          src={memory.backdropVideo}
          autoPlay
          muted={muted}
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={memory.backdropImage}
          alt={memory.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />

      {/* Mute button — positioned below navbar */}
      {memory.backdropVideo && (
        <div className="absolute right-4 sm:right-5 lg:right-10 top-20 sm:top-[18%] z-10">
          <button
            onClick={toggleMute}
            className="text-white border border-white/50 rounded-full p-2 hover:bg-white/20 duration-200"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      )}

      {/* Hero content */}
      <div className="w-full max-w-screen-2xl px-4 sm:px-5 lg:px-10 mb-[8%] sm:mb-[7%] flex flex-col gap-2 lg:gap-3 z-10 text-white">
        {/* Genre tags */}
        <div className="flex items-center gap-2 flex-wrap">
          {memory.genre.slice(0, 2).map((g) => (
            <span
              key={g}
              className="text-[10px] font-semibold uppercase tracking-widest text-gray-300 border border-white/20 px-2 py-0.5 rounded-sm"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black sm:w-[75%] md:w-[60%] lg:w-[45%] leading-tight"
          data-aos="fade-right"
          data-aos-duration="800"
        >
          {memory.title}
        </h1>

        {/* Meta */}
        <p
          className="text-xs text-gray-300 font-medium"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          {memory.year}&nbsp;·&nbsp;{memory.duration}&nbsp;·&nbsp;{memory.location}
        </p>

        {/* Description — hidden on small phones to save space */}
        <p
          className="hidden sm:block text-sm lg:text-base text-gray-200 sm:w-[75%] md:w-[55%] lg:w-[38%] leading-relaxed line-clamp-3"
          data-aos="fade-right"
          data-aos-duration="1100"
        >
          {memory.description}
        </p>

        {/* Progress bar */}
        {progress > 0 && progress < 100 && (
          <div className="w-full sm:w-[55%] lg:w-[30%] max-w-xs">
            <div className="h-[3px] bg-gray-600 rounded-full">
              <div
                className="h-full bg-[#e50914] rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-gray-400 text-[11px] mt-0.5">{progress}% ditonton</p>
          </div>
        )}

        {/* CTAs */}
        <div
          className="flex items-center gap-2 sm:gap-3 mt-1"
          data-aos="fade-right"
          data-aos-duration="1200"
        >
          <button
            onClick={() => navigate(`/memory/${memory.id}`)}
            className="flex items-center gap-1.5 sm:gap-2 py-2 px-4 sm:px-5 lg:py-2.5 lg:px-7 rounded font-semibold active:scale-95 duration-200 bg-white text-black hover:bg-gray-200 text-sm lg:text-base"
          >
            <FaPlay size={13} />
            <span>{progress > 0 && progress < 100 ? 'Lanjutkan' : 'Putar'}</span>
          </button>
          <button
            onClick={() => navigate(`/memory/${memory.id}`)}
            className="flex items-center gap-1.5 sm:gap-2 py-2 px-4 sm:px-5 lg:py-2.5 lg:px-7 rounded font-semibold active:scale-95 duration-200 bg-[#6d6d6e]/70 text-white hover:bg-[#6d6d6e]/50 text-sm lg:text-base"
          >
            <Info size={16} />
            <span className="hidden xs:inline sm:inline">Info</span>
            <span className="hidden md:inline"> Selengkapnya</span>
          </button>
          <button
            onClick={() => toggleMyList(memory.id)}
            className="hidden sm:flex items-center gap-2 py-2 px-4 lg:py-2.5 lg:px-5 rounded font-semibold active:scale-95 duration-200 bg-transparent border border-white/40 text-white hover:border-white text-sm lg:text-base"
          >
            {inMyList ? <Check size={15} /> : <Plus size={15} />}
            <span className="hidden lg:inline">{inMyList ? 'Tersimpan' : 'My Memories'}</span>
          </button>
        </div>
      </div>

      {/* Bottom-right badges — only on desktop where there's enough room */}
      <div
        className="absolute right-5 lg:right-10 bottom-[8%] hidden lg:flex items-center gap-5 z-10"
        data-aos="fade-left"
        data-aos-duration="1200"
      >
        <div className="flex items-center gap-2">
          <div className="bg-[#E50914] px-1.5 flex flex-col items-center justify-center leading-none py-0.5">
            <span className="text-white font-black text-[8px] tracking-[3px]">TOP</span>
            <span className="text-white font-black text-[22px] leading-tight">10</span>
          </div>
          <span className="text-white text-sm font-medium">Memory No. 1</span>
        </div>
        {memory.season && (
          <>
            <div className="w-px h-8 bg-white/25" />
            <div className="flex items-center gap-1.5 bg-black/60 border border-white/20 px-3 py-1.5 rounded-sm">
              <span className="text-white text-xs font-medium tracking-wide">
                S{memory.season} &nbsp; E{memory.episode}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroBanner;
