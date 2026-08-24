import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, ChevronDown, Search, User, LogOut, BookMarked, Dice5 } from 'lucide-react';
import netflixLogo from '../assets/Netflix_Logomark.png';
import { useApp } from '../context/AppContext';
import { useEasterEgg } from '../context/EasterEggContext';
import { achievements } from '../data/achievements';
import { publicMemories } from '../data/memories';
import SearchOverlay from './SearchOverlay';
import AchievementCenter from './AchievementCenter';
import SurpriseMe from './SurpriseMe';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentProfile,
    clearProfile,
    watchProgress,
    visitedMemories,
    myList,
    reactions,
    seenAchievements,
  } = useApp();
  const { handleLogoClick, logoClicks } = useEasterEgg();

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [achieveOpen, setAchieveOpen] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);

  const achieveRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Beranda', path: '/home' },
    { label: 'My Memories', path: '/my-memories' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    clearProfile();
    navigate('/profile');
  };

  // Count achievements unlocked but not yet seen in the panel
  const unseenCount = useMemo(() => {
    const eggs = (() => {
      try { return JSON.parse(localStorage.getItem('nfm_eggs') || '[]'); } catch { return []; }
    })();
    const state = {
      visited: visitedMemories.length,
      totalPublic: publicMemories.length,
      myList: myList.length,
      reactionsCount: Object.keys(reactions).length,
      completedCount: Object.values(watchProgress).filter((p) => p >= 90).length,
      eggs,
    };
    return achievements.filter((a) => {
      const { current, target } = a.getProgress(state);
      return current >= target && !seenAchievements.includes(a.id);
    }).length;
  }, [watchProgress, visitedMemories, myList, reactions, seenAchievements]);

  return (
    <>
      <header
        className={`flex w-full fixed top-0 z-20 justify-center transition-all duration-300 ${
          scrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/90 to-transparent'
        }`}
      >
        <div className="flex items-center justify-between w-full px-5 py-4 lg:py-5 lg:px-10 max-w-screen-2xl">
          {/* Left — logo + nav */}
          <div className="flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => { navigate('/home'); handleLogoClick(); }}
              className="flex-shrink-0 w-[90px] lg:w-[100px] relative"
              title={logoClicks > 0 ? `${logoClicks}/5` : undefined}
            >
              <img src={netflixLogo} alt="logo" className="w-full" />
            </button>

            <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-white">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right — surprise, search, achievements, profile */}
          <div className="flex items-center gap-4 lg:gap-5 text-white">
            {/* Surprise Me */}
            <button
              onClick={() => setSurpriseOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm"
              title="Surprise Me"
            >
              <Dice5 size={18} />
              <span className="hidden xl:inline text-xs">Surprise Me</span>
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hover:text-gray-300 transition-colors"
              aria-label="Cari kenangan"
            >
              <Search size={20} />
            </button>

            {/* Achievements */}
            <div className="relative" ref={achieveRef}>
              <button
                onClick={() => setAchieveOpen((o) => !o)}
                className="hover:text-gray-300 transition-colors relative"
                aria-label="Achievements"
              >
                <Trophy size={20} className={unseenCount > 0 ? 'text-amber-400' : ''} />
                {unseenCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-black text-[9px] font-bold flex items-center justify-center leading-none">
                    {unseenCount}
                  </span>
                )}
              </button>
              {achieveOpen && (
                <AchievementCenter onClose={() => setAchieveOpen(false)} />
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 cursor-pointer">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: currentProfile?.color || '#e50914' }}
                >
                  {currentProfile?.name?.[0] || 'U'}
                </div>
                <ChevronDown
                  size={16}
                  className="group-hover:rotate-180 transition-transform duration-200 hidden lg:block text-gray-400"
                />
              </button>

              {/* Dropdown */}
              <div className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 duration-200 top-full right-0 mt-2 bg-[#1c1c1c]/95 border border-white/10 rounded-md py-2 min-w-[200px] flex flex-col backdrop-blur-sm">
                {/* Profile info */}
                <div className="px-4 py-2.5 border-b border-white/10 mb-1">
                  <p className="text-white text-sm font-semibold">{currentProfile?.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{currentProfile?.greeting}</p>
                </div>

                {/* Mobile nav links */}
                <div className="lg:hidden">
                  {navItems.slice(1).map((item) => (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left w-full"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="border-t border-white/10 my-1" />
                </div>

                <button
                  onClick={() => setSurpriseOpen(true)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                >
                  <Dice5 size={15} />
                  Surprise Me
                </button>

                <button
                  onClick={() => navigate('/my-memories')}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                >
                  <BookMarked size={15} />
                  My Memories
                </button>

                <div className="border-t border-white/10 mt-1 pt-1">
                  <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left w-full"
                  >
                    <User size={15} />
                    Ganti Profil
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-400 hover:text-[#e50914] hover:bg-white/5 transition-colors text-left w-full"
                  >
                    <LogOut size={15} />
                    Keluar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      {surpriseOpen && <SurpriseMe onClose={() => setSurpriseOpen(false)} />}
    </>
  );
};

export default Navbar;
