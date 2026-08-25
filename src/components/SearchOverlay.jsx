import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchMemories } from '../data/memories';

const SearchOverlay = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const results = searchMemories(query);
  const showEmpty = query.length < 2;
  const showNoResult = query.length >= 2 && results.length === 0;

  useEffect(() => {
    // Small delay so keyboard animation doesn't fight with modal open animation
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSelect = (memory) => {
    navigate(`/memory/${memory.id}`);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9500] bg-[#141414] flex flex-col animate-fadeIn">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 sm:px-8 lg:px-16 border-b border-white/[0.08]"
        style={{ height: '64px' }}
      >
        <Search size={20} className="text-[#e50914] flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari kenangan, orang, tempat, tahun..."
          className="flex-1 bg-transparent text-white text-base sm:text-lg outline-none placeholder:text-gray-600 caret-[#e50914]"
        />
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-500 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
          aria-label="Tutup pencarian"
        >
          <X size={22} />
        </button>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-8 lg:px-16 py-8">

        {/* Empty state */}
        {showEmpty && (
          <div className="flex flex-col items-center justify-center py-20 sm:py-28 text-center select-none">
            <Search size={40} className="text-gray-700 mb-5" strokeWidth={1.5} />
            <p className="text-gray-400 text-base sm:text-lg font-medium mb-1">
              Cari kenangan
            </p>
            <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
              Ketik nama orang, genre, lokasi, atau tahun
            </p>
            {/* Quick filter chips */}
            <div className="flex flex-wrap gap-2 mt-8 justify-center">
              {['Comedy', 'Core Memory', 'Road Trip', 'Food', 'Chaos', 'Wholesome'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs text-gray-400 border border-white/10 px-3 py-1.5 rounded-full hover:border-white/30 hover:text-white transition-all duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No result */}
        {showNoResult && (
          <div className="flex flex-col items-center justify-center py-20 sm:py-28 text-center select-none">
            <p className="text-gray-300 text-base sm:text-lg font-medium mb-2">
              Tidak ada kenangan untuk &ldquo;{query}&rdquo;
            </p>
            <p className="text-gray-600 text-sm">
              Coba kata kunci yang berbeda
            </p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-5">
              {results.length} kenangan ditemukan
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
              {results.map((memory) => (
                <button
                  key={memory.id}
                  onClick={() => handleSelect(memory)}
                  className="group relative rounded-lg overflow-hidden aspect-[2/3] text-left focus:outline-none focus:ring-2 focus:ring-white/40 bg-gray-900"
                >
                  <img
                    src={memory.coverImage}
                    alt={memory.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Persistent subtle overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3">
                    <p className="text-white font-semibold text-[11px] sm:text-xs leading-snug line-clamp-2">
                      {memory.title}
                    </p>
                    <p className="text-gray-400 text-[10px] mt-0.5">
                      {memory.year}&nbsp;·&nbsp;{memory.genre[0]}
                    </p>
                  </div>
                  {/* Hover accent border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/60 rounded-lg transition-all duration-200 pointer-events-none" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default SearchOverlay;
