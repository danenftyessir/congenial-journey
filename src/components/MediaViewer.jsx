import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useApp } from '../context/AppContext';

const MediaViewer = ({ memory, onClose, startIndex = 0 }) => {
  const [current, setCurrent] = useState(startIndex);
  const { updateProgress, addToRecent } = useApp();
  const media = memory.media || [];
  const item = media[current];
  const videoRef = useRef(null);

  useEffect(() => {
    addToRecent(memory.id);
  }, []);

  // Update progress when navigating through media
  useEffect(() => {
    const pct = Math.round(((current + 1) / media.length) * 100);
    updateProgress(memory.id, pct);
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);

  const goPrev = () => setCurrent((i) => Math.max(0, i - 1));
  const goNext = () => setCurrent((i) => Math.min(media.length - 1, i + 1));

  if (!item) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9000] bg-black flex flex-col select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 lg:px-8 py-4 flex-shrink-0 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 transition-colors p-1"
        >
          <X size={24} />
        </button>
        <div className="text-center">
          <p className="text-white font-semibold text-sm">{memory.title}</p>
          <p className="text-gray-400 text-xs">
            {current + 1} / {media.length}
          </p>
        </div>
        <div className="w-8" />
      </div>

      {/* Main media area */}
      <div className="flex-1 flex items-center justify-center relative pt-16 pb-24">
        {item.type === 'image' && (
          <img
            src={item.src}
            alt={item.caption || memory.title}
            className="max-w-full max-h-full object-contain"
            draggable={false}
          />
        )}
        {item.type === 'video' && (
          <video
            ref={videoRef}
            key={item.src}
            src={item.src}
            controls
            autoPlay
            className="max-w-full max-h-full"
            style={{ maxHeight: 'calc(100vh - 160px)' }}
          />
        )}

        {/* Caption */}
        {item.caption && item.type === 'image' && (
          <div className="absolute bottom-28 left-0 right-0 text-center">
            <p className="text-gray-400 text-sm italic">{item.caption}</p>
          </div>
        )}

        {/* Prev / next arrows */}
        {current > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
        )}
        {current < media.length - 1 && (
          <button
            onClick={goNext}
            className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {media.length > 1 && (
        <div className="flex-shrink-0 flex justify-center gap-2 pb-6 px-4 overflow-x-auto scrollbar-hide">
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${
                i === current ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              {m.type === 'image' && (
                <img src={m.src} alt="" className="w-full h-full object-cover" />
              )}
              {m.type === 'video' && (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <Play size={14} className="text-white" />
                </div>
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
