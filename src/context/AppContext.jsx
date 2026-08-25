import { createContext, useContext, useState, useRef } from 'react';

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

// All per-profile keys are namespaced: nfm_<key>_<profileId>
const pk = (profileId, key) => `nfm_${key}_${profileId || 'guest'}`;

export const AppProvider = ({ children }) => {
  const [currentProfile, setCurrentProfileState] = useState(() =>
    load('nfm_profile', null)
  );

  const initId = currentProfile?.id || 'guest';
  // Ref keeps the current profile ID in sync for use inside setState callbacks
  const profileIdRef = useRef(initId);

  const [myList, setMyList] = useState(() => load(pk(initId, 'mylist'), []));
  const [watchProgress, setWatchProgress] = useState(() => load(pk(initId, 'progress'), {}));
  const [recentlyWatched, setRecentlyWatched] = useState(() => load(pk(initId, 'recent'), []));
  const [visitedMemories, setVisitedMemories] = useState(() => load(pk(initId, 'visited'), []));
  const [reactions, setReactionsState] = useState(() => load(pk(initId, 'reactions'), {}));
  const [seenAchievements, setSeenAchievements] = useState(() =>
    load(pk(initId, 'seen_achievements'), [])
  );

  // ── Profile ───────────────────────────────────────────────────────────────

  const setCurrentProfile = (profile) => {
    const pid = profile?.id || 'guest';
    profileIdRef.current = pid;
    setCurrentProfileState(profile);
    save('nfm_profile', profile);
    // Load this profile's own state from localStorage
    setMyList(load(pk(pid, 'mylist'), []));
    setWatchProgress(load(pk(pid, 'progress'), {}));
    setRecentlyWatched(load(pk(pid, 'recent'), []));
    setVisitedMemories(load(pk(pid, 'visited'), []));
    setReactionsState(load(pk(pid, 'reactions'), {}));
    setSeenAchievements(load(pk(pid, 'seen_achievements'), []));
  };

  const clearProfile = () => {
    setCurrentProfileState(null);
    save('nfm_profile', null);
    profileIdRef.current = 'guest';
  };

  // ── My List ───────────────────────────────────────────────────────────────

  const toggleMyList = (memoryId) => {
    setMyList((prev) => {
      const next = prev.includes(memoryId)
        ? prev.filter((id) => id !== memoryId)
        : [...prev, memoryId];
      save(pk(profileIdRef.current, 'mylist'), next);
      return next;
    });
  };

  // ── Watch Progress ────────────────────────────────────────────────────────

  const updateProgress = (memoryId, pct) => {
    setWatchProgress((prev) => {
      const next = { ...prev, [memoryId]: Math.min(100, Math.max(0, pct)) };
      save(pk(profileIdRef.current, 'progress'), next);
      return next;
    });
  };

  // ── Recently Watched + Visited ────────────────────────────────────────────

  const addToRecent = (memoryId) => {
    setRecentlyWatched((prev) => {
      const filtered = prev.filter((id) => id !== memoryId);
      const next = [memoryId, ...filtered].slice(0, 20);
      save(pk(profileIdRef.current, 'recent'), next);
      return next;
    });
    setVisitedMemories((prev) => {
      if (prev.includes(memoryId)) return prev;
      const next = [...prev, memoryId];
      save(pk(profileIdRef.current, 'visited'), next);
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
      save(pk(profileIdRef.current, 'reactions'), next);
      return next;
    });
  };

  // ── Achievements ──────────────────────────────────────────────────────────

  const markAchievementsSeen = (ids) => {
    setSeenAchievements((prev) => {
      const newIds = ids.filter((id) => !prev.includes(id));
      if (newIds.length === 0) return prev;
      const next = [...prev, ...newIds];
      save(pk(profileIdRef.current, 'seen_achievements'), next);
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
