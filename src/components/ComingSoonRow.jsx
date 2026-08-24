import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { comingSoon } from '../data/comingSoon';

const ComingSoonCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/finale')}
      className="flex-shrink-0 w-44 lg:w-52 rounded-lg overflow-hidden group relative focus:outline-none"
    >
      {/* Gradient background instead of real image */}
      <div
        className={`w-full aspect-[2/3] bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center relative`}
      >
        {/* Lock icon */}
        <div
          className="w-10 h-10 rounded-full border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
          style={{ borderColor: `${item.accent}60`, background: `${item.accent}15` }}
        >
          <Lock size={16} style={{ color: item.accent }} />
        </div>

        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
          {item.sublabel}
        </p>

        {/* Hover reveal teaser */}
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 text-center">
          <p className="text-white text-xs font-semibold mb-2">{item.title}</p>
          <p className="text-gray-400 text-[10px] leading-relaxed">{item.teaser}</p>
        </div>
      </div>

      {/* Label below card */}
      <div className="bg-[#181818] px-2 py-2">
        <p className="text-gray-600 text-[11px] truncate">{item.title}</p>
        <p style={{ color: item.accent }} className="text-[10px] mt-0.5">
          {item.sublabel}
        </p>
      </div>
    </button>
  );
};

const ComingSoonRow = () => {
  return (
    <div className="mb-8 lg:mb-10">
      <h2 className="text-white text-lg lg:text-xl font-bold px-5 lg:px-10 mb-3">
        Coming Soon
      </h2>
      <div className="flex gap-3 overflow-x-auto px-5 lg:px-10 pb-2 scroll-smooth no-scrollbar">
        {comingSoon.map((item) => (
          <ComingSoonCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ComingSoonRow;
