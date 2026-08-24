import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicMemories } from '../data/memories';
import { seasons } from '../data/seasons';

// Cinematic series finale experience
const PHASES = ['black', 'stats', 'end', 'season4', 'cta'];

const FinaleScreen = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0); // index into PHASES
  const [visible, setVisible] = useState(false);

  const current = PHASES[phase];

  useEffect(() => {
    // Fade in current phase
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, [phase]);

  const advance = () => {
    setVisible(false);
    setTimeout(() => {
      if (phase < PHASES.length - 1) {
        setPhase((p) => p + 1);
      }
    }, 600);
  };

  // Auto-advance for first two phases
  useEffect(() => {
    if (current === 'black') {
      const t = setTimeout(() => advance(), 2000);
      return () => clearTimeout(t);
    }
    if (current === 'stats') {
      const t = setTimeout(() => advance(), 4000);
      return () => clearTimeout(t);
    }
  }, [current]);

  const totalPhotos = publicMemories.reduce(
    (acc, m) => acc + m.media.filter((x) => x.type === 'image').length, 0
  );

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden flex flex-col items-center justify-center text-white"
      onClick={current === 'end' || current === 'season4' ? advance : undefined}
      style={{ cursor: current === 'end' || current === 'season4' ? 'pointer' : 'default' }}
    >
      {/* PHASE: black */}
      {current === 'black' && (
        <div
          className={`text-center transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-gray-600 text-sm tracking-widest uppercase">
            {seasons[seasons.length - 1]?.title}
          </p>
        </div>
      )}

      {/* PHASE: stats */}
      {current === 'stats' && (
        <div
          className={`text-center transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-6">Cerita kita sejauh ini</p>
          <div className="grid grid-cols-2 gap-x-16 gap-y-6">
            {[
              [publicMemories.length, 'Kenangan'],
              [totalPhotos, 'Foto'],
              [seasons.length, 'Season'],
              ['2023–2025', 'Tahun Bersama'],
            ].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-4xl font-black text-white">{val}</p>
                <p className="text-gray-500 text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PHASE: end */}
      {current === 'end' && (
        <div
          className={`text-center transition-opacity duration-1500 ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDuration: '1500ms' }}
        >
          <h1
            className="text-[80px] lg:text-[140px] font-black leading-none tracking-tight select-none"
            style={{
              WebkitTextStroke: '2px rgba(255,255,255,0.9)',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            THE END
          </h1>
          <p className="text-gray-500 text-sm mt-6 max-w-xs mx-auto leading-relaxed">
            Tapi cerita ini tidak benar-benar selesai.
          </p>
          <p className="text-gray-700 text-xs mt-4">Tap untuk melanjutkan</p>
        </div>
      )}

      {/* PHASE: season4 */}
      {current === 'season4' && (
        <div
          className={`text-center transition-opacity duration-1500 ${visible ? 'opacity-100' : 'opacity-0'} px-6`}
          style={{ transitionDuration: '1500ms' }}
        >
          <p className="text-[#e50914] text-xs font-bold uppercase tracking-widest mb-4">
            Season 4
          </p>
          <h2 className="text-5xl lg:text-7xl font-black uppercase leading-tight mb-4">
            The Future
          </h2>
          <div className="w-12 h-px bg-white/20 mx-auto mb-6" />
          <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed">
            Masih ada episode yang belum dibuat.
            Masih ada momen yang belum terjadi.
            Cerita kita belum selesai.
          </p>
          <p className="text-gray-600 text-xs mt-8 tracking-widest uppercase">
            Coming Soon...
          </p>
          <p className="text-gray-700 text-xs mt-4">Tap untuk melanjutkan</p>
        </div>
      )}

      {/* PHASE: cta */}
      {current === 'cta' && (
        <div
          className={`text-center transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-8">
            Apa yang ingin kamu lakukan?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/home')}
              className="bg-white text-black font-bold px-8 py-3 rounded hover:bg-gray-100 transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
          <p className="text-gray-700 text-[11px] mt-10 max-w-xs mx-auto">
            "Sampai kita bertemu lagi — entah kapan, entah di mana."
          </p>
        </div>
      )}

      {/* Subtle skip button */}
      {(current === 'black' || current === 'stats') && (
        <button
          className="absolute bottom-6 right-6 text-gray-700 text-xs hover:text-gray-500 transition-colors"
          onClick={() => {
            setVisible(false);
            setTimeout(() => setPhase(4), 600); // jump to CTA
          }}
        >
          Lewati
        </button>
      )}
    </div>
  );
};

export default FinaleScreen;
