import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage full — silently ignore
  }
};

export const AppProvider = ({ children }) => {
  const [currentProfile, setCurrentProfileState] = useState(() =>
    load('nfm_profile', null)
  );

  const [myList, setMyList] = useState(() => load('nfm_mylist', []));

  // { [memoryId]: percentage 0-100 }
  const [watchProgress, setWatchProgress] = useState(() =>
    load('nfm_progress', {})
  );

  // Array of memory IDs, most-recently-viewed first (max 20, for Continue Watching UI)
  const [recentlyWatched, setRecentlyWatched] = useState(() =>
    load('nfm_recent', [])
  );

  // Unbounded set of all visited memory IDs — used for achievement tracking
  const [visitedMemories, setVisitedMemories] = useState(() =>
    load('nfm_visited', [])
  );

  // { [memoryId]: reactionId ('heart' | 'miss' | 'laugh' | 'skull' | 'star') }
  const [reactions, setReactionsState] = useState(() =>
    load('nfm_reactions', {})
  );

  // Array of achievement IDs the user has seen while unlocked (for badge count)
  const [seenAchievements, setSeenAchievements] = useState(() =>
    load('nfm_seen_achievements', [])
  );

  // ── Profile ──────────────────────────────────────────────────────────────

  const setCurrentProfile = (profile) => {
    setCurrentProfileState(profile);
    save('nfm_profile', profile);
  };

  const clearProfile = () => {
    setCurrentProfileState(null);
    save('nfm_profile', null);
  };

  // ── My List ───────────────────────────────────────────────────────────────

  const toggleMyList = (memoryId) => {
    setMyList((prev) => {
      const next = prev.includes(memoryId)
        ? prev.filter((id) => id !== memoryId)
        : [...prev, memoryId];
      save('nfm_mylist', next);
      return next;
    });
  };

  // ── Watch Progress ────────────────────────────────────────────────────────

  const updateProgress = (memoryId, pct) => {
    setWatchProgress((prev) => {
      const next = { ...prev, [memoryId]: Math.min(100, Math.max(0, pct)) };
      save('nfm_progress', next);
      return next;
    });
  };

  // ── Recently Watched + Visited ────────────────────────────────────────────

  const addToRecent = (memoryId) => {
    // Capped list for Continue Watching UI
    setRecentlyWatched((prev) => {
      const filtered = prev.filter((id) => id !== memoryId);
      const next = [memoryId, ...filtered].slice(0, 20);
      save('nfm_recent', next);
      return next;
    });
    // Unbounded set for achievement tracking
    setVisitedMemories((prev) => {
      if (prev.includes(memoryId)) return prev;
      const next = [...prev, memoryId];
      save('nfm_visited', next);
      return next;
    });
  };

  // ── Reactions ─────────────────────────────────────────────────────────────

  const setReaction = (memoryId, reactionId) => {
    setReactionsState((prev) => {
      let next;
      if (!reactionId || reactionId === prev[memoryId]) {
        next = { ...prev };
        delete next[memoryId];
      } else {
        next = { ...prev, [memoryId]: reactionId };
      }
      save('nfm_reactions', next);
      return next;
    });
  };

  // ── Achievements ──────────────────────────────────────────────────────────

  const markAchievementsSeen = (ids) => {
    setSeenAchievements((prev) => {
      const newIds = ids.filter((id) => !prev.includes(id));
      if (newIds.length === 0) return prev;
      const next = [...prev, ...newIds];
      save('nfm_seen_achievements', next);
      return next;
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentProfile,
        setCurrentProfile,
        clearProfile,
        myList,
        toggleMyList,
        watchProgress,
        updateProgress,
        recentlyWatched,
        visitedMemories,
        addToRecent,
        reactions,
        setReaction,
        seenAchievements,
        markAchievementsSeen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
