import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { FaPlay } from 'react-icons/fa6';
import { publicMemories as memories } from '../data/memories';
import { useApp } from '../context/AppContext';

const SurpriseMe = ({ onClose }) => {
  const navigate = useNavigate();
  const { recentlyWatched } = useApp();
  const [phase, setPhase] = useState('selecting'); // 'selecting' | 'reveal'
  const [picked, setPicked] = useState(null);
  const [dots, setDots] = useState('');

  // Dot animation while selecting
  useEffect(() => {
    if (phase !== 'selecting') return;
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'));
    }, 350);
    return () => clearInterval(interval);
  }, [phase]);

  // Pick a random memory not recently watched, with a delay for drama
  useEffect(() => {
    const pool = memories.filter((m) => !recentlyWatched.includes(m.id));
    const source = pool.length > 0 ? pool : memories;
    const random = source[Math.floor(Math.random() * source.length)];

    const timer = setTimeout(() => {
      setPicked(random);
      setPhase('reveal');
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const handleWatch = () => {
    navigate(`/memory/${picked.id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[800] bg-black/90 flex items-center justify-center px-4">
      <div className="relative bg-[#181818] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-500 hover:text-white transition-colors p-1"
        >
          <X size={18} />
        </button>

        {phase === 'selecting' ? (
          /* Selecting phase */
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="text-5xl mb-5 animate-bounce">🎲</div>
            <p className="text-white text-lg font-bold">
              Memilih kenangan untukmu{dots}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Dari {memories.length} kenangan yang tersimpan
            </p>
          </div>
        ) : (
          /* Reveal phase */
          <>
            <div className="relative h-52">
              <img
                src={picked.backdropImage}
                alt={picked.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/60 to-transparent" />
            </div>

            <div className="px-6 pb-7 pt-4 text-center">
              <p className="text-[#e50914] text-[11px] font-bold uppercase tracking-widest mb-2">
                Rekomendasi Malam Ini
              </p>
              <h2 className="text-white text-xl font-black mb-1 leading-tight">
                {picked.title}
              </h2>
              <p className="text-gray-500 text-sm mb-1">
                {picked.year}&nbsp;·&nbsp;{picked.genre[0]}&nbsp;·&nbsp;{picked.duration}
              </p>
              <p className="text-gray-600 text-xs mb-6 line-clamp-2 leading-relaxed px-2">
                {picked.description}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleWatch}
                  className="flex items-center gap-2 bg-white text-black font-bold px-6 py-2.5 rounded hover:bg-gray-200 active:scale-95 transition-all"
                >
                  <FaPlay size={12} />
                  Tonton
                </button>
                <button
                  onClick={onClose}
                  className="bg-white/10 border border-white/20 text-white px-6 py-2.5 rounded hover:bg-white/20 active:scale-95 transition-all"
                >
                  Nanti
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SurpriseMe;
