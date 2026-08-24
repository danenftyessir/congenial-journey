import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchMemories } from '../data/memories';

const SearchOverlay = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const results = searchMemories(query);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSelect = (memory) => {
    navigate(`/memory/${memory.id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#141414]/98 flex flex-col">
      {/* Search bar */}
      <div className="flex items-center gap-4 px-5 lg:px-10 py-5 border-b border-white/10">
        <Search size={22} className="text-gray-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari kenangan, orang, tempat, tahun..."
          className="flex-1 bg-transparent text-white text-lg lg:text-xl outline-none placeholder:text-gray-600"
        />
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white transition-colors p-1"
        >
          <X size={22} />
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-5 lg:px-10 py-6">
        {query.length < 2 && (
          <div className="text-center mt-24">
            <p className="text-gray-600 text-lg">Mulai ketik untuk mencari kenangan...</p>
            <p className="text-gray-700 text-sm mt-2">
              Coba: nama orang, genre, lokasi, atau tahun
            </p>
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="text-center mt-24">
            <p className="text-gray-400 text-lg">
              Tidak ada kenangan untuk &ldquo;{query}&rdquo;
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Coba kata kunci yang berbeda
            </p>
          </div>
        )}

        {results.length > 0 && (
          <>
            <p className="text-gray-500 text-sm mb-4">
              {results.length} kenangan ditemukan
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
              {results.map((memory) => (
                <button
                  key={memory.id}
                  onClick={() => handleSelect(memory)}
                  className="group relative rounded-md overflow-hidden aspect-[2/3] text-left focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <img
                    src={memory.coverImage}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-semibold text-sm leading-tight">
                      {memory.title}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {memory.year}&nbsp;·&nbsp;{memory.genre[0]}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
