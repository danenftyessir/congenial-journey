import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useApp } from '../context/AppContext';

const MediaViewer = ({ memory, onClose, startIndex = 0 }) => {
  const [current, setCurrent] = useState(startIndex);
  const [playing, setPlaying] = useState(true);
  const { updateProgress, addToRecent } = useApp();
  const media = memory.media || [];
  const item = media[current];
  const videoRef = useRef(null);

  // Touch swipe support
  const touchStartX = useRef(null);

  useEffect(() => {
    addToRecent(memory.id);
  }, []);

  useEffect(() => {
    const pct = Math.round(((current + 1) / media.length) * 100);
    updateProgress(memory.id, pct);
  }, [current]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);

  const goPrev = () => { setCurrent((i) => Math.max(0, i - 1)); setPlaying(true); };
  const goNext = () => { setCurrent((i) => Math.min(media.length - 1, i + 1)); setPlaying(true); };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setPlaying(true); }
    else { videoRef.current.pause(); setPlaying(false); }
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  if (!item) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9000] bg-black flex flex-col select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-8 py-3 sm:py-4 flex-shrink-0 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 transition-colors p-1.5 sm:p-1 -ml-1"
        >
          <X size={22} />
        </button>
        <div className="text-center">
          <p className="text-white font-semibold text-xs sm:text-sm truncate max-w-[200px] sm:max-w-none">{memory.title}</p>
          <p className="text-gray-400 text-xs">
            {current + 1} / {media.length}
          </p>
        </div>
        <div className="w-9 sm:w-8" />
      </div>

      {/* Main media area */}
      <div className="flex-1 flex items-center justify-center relative pt-14 sm:pt-16 pb-20 sm:pb-24">
        {item.type === 'image' && (
          <img
            src={item.src}
            alt={item.caption || memory.title}
            className="max-w-full max-h-full object-contain"
            draggable={false}
          />
        )}
        {item.type === 'video' && (
          <div className="relative flex items-center justify-center max-w-full max-h-full">
            <video
              ref={videoRef}
              key={item.src}
              src={item.src}
              autoPlay
              playsInline
              className="max-w-full max-h-full w-full cursor-pointer"
              style={{ maxHeight: 'calc(100vh - 140px)' }}
              onClick={togglePlay}
              onEnded={() => setPlaying(false)}
            />
            {!playing && (
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="bg-black/50 rounded-full p-4">
                  <Play size={28} className="text-white fill-white" />
                </div>
              </div>
            )}
          </div>
        )}
        {item.type === 'youtube' && (
          <div className="w-full max-w-4xl px-3 sm:px-4" style={{ aspectRatio: '16/9' }}>
            <iframe
              key={item.videoId}
              src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0`}
              title={item.caption || memory.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        )}
        {item.type === 'gdrive' && (
          <div className="w-full max-w-4xl px-3 sm:px-4" style={{ aspectRatio: '16/9' }}>
            <iframe
              key={item.fileId}
              src={`https://drive.google.com/file/d/${item.fileId}/preview`}
              title={item.caption || memory.title}
              frameBorder="0"
              allow="autoplay"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        )}

        {/* Caption */}
        {item.caption && item.type === 'image' && (
          <div className="absolute bottom-24 sm:bottom-28 left-0 right-0 text-center px-4">
            <p className="text-gray-400 text-xs sm:text-sm italic">{item.caption}</p>
          </div>
        )}

        {/* Prev / Next arrows — larger tap target on mobile */}
        {current > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-1 sm:left-2 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 lg:w-12 sm:h-11 lg:h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {current < media.length - 1 && (
          <button
            onClick={goNext}
            className="absolute right-1 sm:right-2 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 lg:w-12 sm:h-11 lg:h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {media.length > 1 && (
        <div className="flex-shrink-0 flex justify-center gap-1.5 sm:gap-2 pb-4 sm:pb-6 px-3 sm:px-4 overflow-x-auto scrollbar-hide">
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-12 h-9 sm:w-14 sm:h-10 rounded overflow-hidden border-2 transition-all ${
                i === current ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              {m.type === 'image' && (
                <img src={m.src} alt="" className="w-full h-full object-cover" />
              )}
              {m.type === 'video' && (
                m.thumbnail ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <img src={m.thumbnail} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Play size={10} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <Play size={14} className="text-white" />
                  </div>
                )
              )}
              {m.type === 'youtube' && (
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={m.thumbnail || `https://img.youtube.com/vi/${m.videoId}/mqdefault.jpg`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play size={10} className="text-white" />
                  </div>
                </div>
              )}
              {m.type === 'gdrive' && (
                m.thumbnail ? (
                  <div className="w-full h-full relative overflow-hidden">
                    <img src={m.thumbnail} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Play size={10} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <Play size={14} className="text-white" />
                  </div>
                )
              )}
            </button>
          ))}
        </div>
      )}

      {/* Progress bar */}
      <div className="flex-shrink-0 h-0.5 bg-gray-800">
        <div
          className="h-full bg-[#e50914] transition-all duration-300"
          style={{ width: `${((current + 1) / media.length) * 100}%` }}
        />
      </div>
    </div>,
    document.body
  );
};

export default MediaViewer;
