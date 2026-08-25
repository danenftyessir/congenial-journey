import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, ChevronDown, Search, User, LogOut, BookMarked, Dice5, Menu, X } from 'lucide-react';
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
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const achieveRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (achieveRef.current && !achieveRef.current.contains(e.target)) {
        setAchieveOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Beranda', path: '/home' },
    { label: 'My Memories', path: '/my-memories' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    clearProfile();
    navigate('/profile');
  };

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
        <div className="flex items-center justify-between w-full px-4 sm:px-5 py-3 sm:py-4 lg:py-5 lg:px-10 max-w-screen-2xl">
          {/* Left — logo + nav */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <button
              onClick={() => { navigate('/home'); handleLogoClick(); }}
              className="flex-shrink-0 w-[75px] sm:w-[90px] lg:w-[100px] relative"
              title={logoClicks > 0 ? `${logoClicks}/5` : undefined}
            >
              <img src={netflixLogo} alt="logo" className="w-full" />
            </button>

            {/* Desktop nav */}
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

          {/* Right — icons */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 text-white">
            {/* Surprise Me — desktop only */}
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
              className="hover:text-gray-300 transition-colors p-1"
              aria-label="Cari kenangan"
            >
              <Search size={20} />
            </button>

            {/* Achievements */}
            <div className="relative" ref={achieveRef}>
              <button
                onClick={() => { setAchieveOpen((o) => !o); setProfileOpen(false); }}
                className="hover:text-gray-300 transition-colors relative p-1"
                aria-label="Achievements"
              >
                <Trophy size={20} className={unseenCount > 0 ? 'text-amber-400' : ''} />
                {unseenCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-400 text-black text-[9px] font-bold flex items-center justify-center leading-none">
                    {unseenCount}
                  </span>
                )}
              </button>
              {achieveOpen && (
                <AchievementCenter onClose={() => setAchieveOpen(false)} />
              )}
            </div>

            {/* Profile dropdown — click-based for touch support */}
            <div className="relative hidden sm:block" ref={profileRef}>
              <button
                onClick={() => { setProfileOpen((o) => !o); setAchieveOpen(false); }}
                className="flex items-center gap-1.5 cursor-pointer"
                aria-label="Profil"
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: currentProfile?.color || '#e50914' }}
                >
                  {currentProfile?.name?.[0] || 'U'}
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 hidden lg:block text-gray-400 ${profileOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 bg-[#1c1c1c]/95 border border-white/10 rounded-md py-2 min-w-[200px] flex flex-col backdrop-blur-sm shadow-2xl z-30">
                  <div className="px-4 py-2.5 border-b border-white/10 mb-1">
                    <p className="text-white text-sm font-semibold">{currentProfile?.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{currentProfile?.greeting}</p>
                  </div>

                  {/* Mobile nav links shown inside dropdown */}
                  <div className="lg:hidden">
                    {navItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => { navigate(item.path); setProfileOpen(false); }}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left w-full"
                      >
                        {item.label}
                      </button>
                    ))}
                    <div className="border-t border-white/10 my-1" />
                  </div>

                  <button
                    onClick={() => { setSurpriseOpen(true); setProfileOpen(false); }}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                  >
                    <Dice5 size={15} />
                    Surprise Me
                  </button>

                  <button
                    onClick={() => { navigate('/my-memories'); setProfileOpen(false); }}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left"
                  >
                    <BookMarked size={15} />
                    My Memories
                  </button>

                  <div className="border-t border-white/10 mt-1 pt-1">
                    <button
                      onClick={() => { navigate('/profile'); setProfileOpen(false); }}
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
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="sm:hidden p-1 text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#141414] flex flex-col pt-16 sm:hidden">
          {/* Profile header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
            <div
              className="w-10 h-10 rounded flex items-center justify-center text-base font-bold text-white flex-shrink-0"
              style={{ background: currentProfile?.color || '#e50914' }}
            >
              {currentProfile?.name?.[0] || 'U'}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{currentProfile?.name}</p>
              <p className="text-gray-500 text-xs">{currentProfile?.greeting}</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-5 py-4 gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`text-left py-3 text-base font-medium border-b border-white/5 transition-colors ${
                  isActive(item.path) ? 'text-white' : 'text-gray-400'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setSurpriseOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-left py-3 text-base font-medium text-gray-400 border-b border-white/5"
            >
              <Dice5 size={18} />
              Surprise Me
            </button>
          </nav>

          {/* Bottom actions */}
          <div className="mt-auto px-5 pb-8 flex flex-col gap-2">
            <button
              onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 py-3 text-sm text-gray-400 border-t border-white/10"
            >
              <User size={16} />
              Ganti Profil
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 py-3 text-sm text-[#e50914]"
            >
              <LogOut size={16} />
              Keluar
            </button>
          </div>
        </div>
      )}

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      {surpriseOpen && <SurpriseMe onClose={() => setSurpriseOpen(false)} />}
    </>
  );
};

export default Navbar;
