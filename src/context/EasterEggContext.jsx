import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];
const LS_KEY = 'nfm_eggs';

const EasterEggContext = createContext(null);

export const EasterEggProvider = ({ children }) => {
  const [discovered, setDiscovered] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
  });
  const [activeEgg, setActiveEgg] = useState(null); // 'konami' | 'logo'
  const [logoClicks, setLogoClicks] = useState(0);
  const logoTimer = useRef(null);
  const konamiSeq = useRef([]);

  const triggerEgg = useCallback((type) => {
    setDiscovered((prev) => {
      if (!prev.includes(type)) {
        const next = [...prev, type];
        localStorage.setItem(LS_KEY, JSON.stringify(next));
        return next;
      }
      return prev;
    });
    setActiveEgg(type);
  }, []);

  const dismissEgg = useCallback(() => setActiveEgg(null), []);

  // Konami code listener
  useEffect(() => {
    const onKey = (e) => {
      const key = e.key;
      konamiSeq.current = [...konamiSeq.current, key].slice(-KONAMI.length);
      if (konamiSeq.current.join(',') === KONAMI.join(',')) {
        triggerEgg('konami');
        konamiSeq.current = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [triggerEgg]);

  // Logo 5-click handler
  const handleLogoClick = useCallback(() => {
    setLogoClicks((c) => {
      const next = c + 1;
      clearTimeout(logoTimer.current);
      if (next >= 5) {
        triggerEgg('logo');
        return 0;
      }
      logoTimer.current = setTimeout(() => setLogoClicks(0), 2000);
      return next;
    });
  }, [triggerEgg]);

  return (
    <EasterEggContext.Provider value={{ discovered, activeEgg, dismissEgg, handleLogoClick, logoClicks }}>
      {children}
    </EasterEggContext.Provider>
  );
};

export const useEasterEgg = () => useContext(EasterEggContext);
