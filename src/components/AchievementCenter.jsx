import { useEffect, useRef, useMemo } from 'react';
import { X, Trophy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { achievements, rarityConfig } from '../data/achievements';
import { publicMemories } from '../data/memories';

const AchievementCenter = ({ onClose }) => {
  const { watchProgress, visitedMemories, myList, reactions, seenAchievements, markAchievementsSeen } = useApp();
  const ref = useRef(null);

  const eggs = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('nfm_eggs') || '[]'); } catch { return []; }
  }, []);

  const state = useMemo(() => ({
    visited: visitedMemories.length,
    totalPublic: publicMemories.length,
    myList: myList.length,
    reactionsCount: Object.keys(reactions).length,
    completedCount: Object.values(watchProgress).filter((p) => p >= 90).length,
    eggs,
  }), [visitedMemories, myList, reactions, watchProgress, eggs]);

  const computed = useMemo(() =>
    achievements.map((a) => {
      const { current, target } = a.getProgress(state);
      return { ...a, current, target, unlocked: current >= target };
    }),
    [state]
  );

  const unlockedCount = computed.filter((a) => a.unlocked).length;
  const overallPct = Math.round((unlockedCount / computed.length) * 100);

  useEffect(() => {
    const unlockedIds = computed.filter((a) => a.unlocked).map((a) => a.id);
    if (unlockedIds.length > 0) markAchievementsSeen(unlockedIds);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-[340px] max-w-[340px] bg-[#1c1c1c] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
    >
      {/* Header */}
      <div className="px-4 pt-3 pb-3 border-b border-white/10">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <Trophy size={14} className="text-amber-400" />
            <h3 className="text-white font-semibold text-sm">Achievements</h3>
            <span className="text-gray-500 text-xs">{unlockedCount}/{computed.length}</span>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors p-0.5">
            <X size={14} />
          </button>
        </div>
        {/* Overall progress bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-700"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <span className="text-amber-400 text-[11px] font-bold w-8 text-right tabular-nums">
            {overallPct}%
          </span>
        </div>
      </div>

      {/* Achievement list */}
      <div className="max-h-[50vh] sm:max-h-[440px] overflow-y-auto overscroll-contain">
        {computed.map((a) => {
          const style = rarityConfig[a.rarity] || rarityConfig.common;
          const pct = Math.min(100, a.target > 0 ? Math.round((a.current / a.target) * 100) : 0);
          const isNew = a.unlocked && !seenAchievements.includes(a.id);

          return (
            <div
              key={a.id}
              className={`flex items-start gap-3 px-4 py-3 border-b border-white/5 last:border-0 ${
                a.unlocked ? 'bg-white/[0.02]' : 'opacity-55'
              }`}
            >
              <span className={`flex-shrink-0 mt-0.5 ${a.unlocked ? style.color : 'text-gray-600'}`}>
                <a.icon size={20} strokeWidth={1.5} />
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <p className={`text-xs font-semibold leading-tight ${a.unlocked ? 'text-white' : 'text-gray-400'}`}>
                    {a.title}
                  </p>
                  <span className={`text-[9px] font-bold px-1 py-0.5 rounded leading-none ${style.color} ${style.bg}`}>
                    {style.label.toUpperCase()}
                  </span>
                  {isNew && (
                    <span className="text-[9px] font-bold px-1 py-0.5 rounded leading-none text-white bg-[#e50914]">
                      NEW
                    </span>
                  )}
                  {a.unlocked && (
                    <span className="ml-auto text-[10px] font-bold text-amber-400 flex-shrink-0">✓ UNLOCKED</span>
                  )}
                </div>
                <p className="text-gray-500 text-[11px] leading-relaxed mb-1.5">{a.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        a.unlocked ? 'bg-amber-400' : style.bar
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-gray-600 text-[10px] tabular-nums w-12 text-right">
                    {a.current}/{a.target}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementCenter;
