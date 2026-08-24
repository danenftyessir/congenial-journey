import { useApp } from '../context/AppContext';

export const REACTIONS = [
  { id: 'heart',  emoji: '❤️',  label: 'Core Memory' },
  { id: 'miss',   emoji: '🥹',  label: 'I Miss This' },
  { id: 'laugh',  emoji: '😂',  label: "Can't Believe We Did This" },
  { id: 'skull',  emoji: '💀',  label: 'Why Did We Do This?' },
  { id: 'star',   emoji: '⭐',  label: 'Would Relive' },
];

// compact=true → single emoji pill showing current reaction (no picker UI)
// compact=false → full row of selectable reaction buttons
const ReactionPicker = ({ memoryId, compact = false }) => {
  const { reactions, setReaction } = useApp();
  const current = reactions[memoryId];
  const currentReaction = REACTIONS.find((r) => r.id === current);

  if (compact) {
    if (!currentReaction) return null;
    return (
      <span
        className="text-base leading-none"
        title={currentReaction.label}
      >
        {currentReaction.emoji}
      </span>
    );
  }

  return (
    <div>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">
        Reaksimu
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        {REACTIONS.map((r) => (
          <button
            key={r.id}
            onClick={() => setReaction(memoryId, r.id)}
            title={r.label}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all duration-200 select-none ${
              current === r.id
                ? 'bg-white/20 border border-white/50 scale-110 shadow-lg'
                : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105'
            }`}
          >
            <span>{r.emoji}</span>
            <span className="text-white/70 text-xs hidden sm:inline">{r.label}</span>
          </button>
        ))}
      </div>
      {current && (
        <p className="text-gray-600 text-xs mt-2">
          Kamu memberi reaksi:{' '}
          <span className="text-gray-400">{currentReaction?.label}</span>
          {' '}
          <button
            className="text-[#e50914] hover:underline"
            onClick={() => setReaction(memoryId, null)}
          >
            Hapus
          </button>
        </p>
      )}
    </div>
  );
};

export default ReactionPicker;
