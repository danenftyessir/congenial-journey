import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, Lock } from 'lucide-react';
import { useEasterEgg } from '../context/EasterEggContext';
import { getMemoryById } from '../data/memories';

const hiddenMemory = getMemoryById(99);

const EasterEggModal = () => {
  const { activeEgg, dismissEgg, discovered } = useEasterEgg();
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0); // 0 = notification flash, 1 = full reveal
  const [visible, setVisible] = useState(false);

  const isKonami = activeEgg === 'konami';
  const isFirstDiscover = !discovered.slice(0, -1).includes(activeEgg);

  useEffect(() => {
    if (!activeEgg) {
      setPhase(0);
      setVisible(false);
      return;
    }
    // Animate in
    const t = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => setPhase(1), 1200);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [activeEgg]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(dismissEgg, 400);
  };

  const handleView = () => {
    handleClose();
    setTimeout(() => navigate('/memory/99'), 400);
  };

  if (!activeEgg || !hiddenMemory) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[10000] transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95" onClick={handleClose} />

      {/* Modal */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-700 ${
          visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Phase 0: notification flash */}
        {phase === 0 && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#e50914]/60 bg-[#e50914]/10 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Lock size={24} className="text-[#e50914]" />
            </div>
            <p className="text-[#e50914] text-xs font-bold uppercase tracking-widest mb-2">
              {isKonami ? 'Konami Code Terdeteksi' : 'Easter Egg Ditemukan'}
            </p>
            <p className="text-white/40 text-xs">Membuka kenangan...</p>
          </div>
        )}

        {/* Phase 1: full reveal */}
        {phase === 1 && (
          <div className="w-full max-w-xl relative">
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute -top-10 right-0 text-gray-600 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Badge */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 bg-[#e50914] rounded-full" />
              <p className="text-[#e50914] text-xs font-bold uppercase tracking-widest">
                🔓 Kenangan Tersembunyi Ditemukan
              </p>
              {isFirstDiscover && (
                <span className="bg-[#e50914]/20 text-[#e50914] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ml-1">
                  Baru
                </span>
              )}
            </div>

            {/* Hidden memory card */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#181818]">
              {/* Backdrop image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hiddenMemory.backdropImage}
                  alt={hiddenMemory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <p className="text-[#e50914] text-[10px] font-bold uppercase tracking-widest mb-1">
                    {hiddenMemory.year} · {hiddenMemory.location}
                  </p>
                  <h3 className="text-white text-xl font-black leading-tight">
                    {hiddenMemory.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="px-5 py-5">
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {hiddenMemory.description}
                </p>

                {/* Quotes */}
                <div className="border-l-2 border-[#e50914]/30 pl-3 mb-6 space-y-2">
                  {hiddenMemory.quotes.map((q, i) => (
                    <p key={i} className="text-gray-500 text-sm italic">{q}</p>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleView}
                    className="flex-1 bg-white text-black font-bold py-2.5 rounded text-sm hover:bg-gray-100 transition-colors"
                  >
                    Lihat Kenangan
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-white/10 border border-white/20 text-white font-semibold py-2.5 rounded text-sm hover:bg-white/15 transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>

            {/* Trigger hint */}
            <p className="text-center text-gray-700 text-[10px] mt-4">
              {isKonami ? '↑↑↓↓←→←→BA' : 'Klik logo 5× untuk membuka lagi'}
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default EasterEggModal;
