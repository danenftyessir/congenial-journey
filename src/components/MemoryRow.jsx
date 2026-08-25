import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CardImage from './CardImage';
import HoverPopup from './HoverPopup';
import useCardHover from '../hooks/useCardHover';
import { useApp } from '../context/AppContext';

// ── Continue Watching Card ────────────────────────────────────────────────
const ContinueCard = ({ item, idx }) => {
  const navigate = useNavigate();
  const { watchProgress } = useApp();
  const { cardRef, isHovered, pos, handleMouseEnter, handleMouseLeave, cancelLeave } =
    useCardHover();
  const progress = item.progress ?? watchProgress[item.id] ?? 0;

  return (
    <>
      <div
        ref={cardRef}
        className="relative w-[200px] sm:w-[240px] lg:w-[300px] h-[113px] sm:h-[135px] lg:h-[169px] flex-shrink-0 rounded overflow-hidden cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(`/memory/${item.id}`)}
        data-aos="fade-up"
        data-aos-duration={`${900 + idx * 80}`}
        data-aos-once="true"
      >
        <img
          src={item.src || item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="h-0.5 bg-gray-600">
            <div className="h-full bg-[#e50914]" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center justify-between px-1.5 py-1 bg-black/80">
            {item.badge && (
              <span className="bg-[#e50914] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-sm">
                {item.badge}
              </span>
            )}
            {progress > 0 && (
              <span className="text-gray-400 text-[10px] ml-auto">
                {progress}%
              </span>
            )}
          </div>
        </div>
      </div>

      {isHovered && pos && (
        <HoverPopup
          item={item}
          pos={pos}
          onMouseEnter={cancelLeave}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </>
  );
};

// ── Top 10 Card ───────────────────────────────────────────────────────────
const Top10Card = ({ item, rank, idx }) => {
  const navigate = useNavigate();
  const { cardRef, isHovered, pos, handleMouseEnter, handleMouseLeave, cancelLeave } =
    useCardHover();

  return (
    <>
      <div
        className="relative w-[150px] sm:w-[180px] lg:w-[235px] h-[162px] sm:h-[195px] lg:h-[255px] flex-shrink-0 cursor-pointer"
        data-aos="fade-up"
        data-aos-duration={`${900 + idx * 80}`}
        data-aos-once="true"
        onClick={() => navigate(`/memory/${item.id}`)}
      >
        <span
          className="absolute left-0 bottom-0 font-black select-none z-0 text-[90px] sm:text-[108px] lg:text-[145px]"
          style={{
            lineHeight: '0.82',
            fontFamily: "'Arial Black', Impact, sans-serif",
            WebkitTextStroke: '3px #555',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
        >
          {rank}
        </span>

        <div
          ref={cardRef}
          className="absolute right-0 top-0 w-[106px] sm:w-[127px] lg:w-[165px] h-full rounded overflow-hidden z-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={item.src || item.coverImage}
            alt={item.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-1.5 left-1.5 bg-[#e50914] text-white flex items-center gap-0.5 px-1.5 py-0.5 rounded-sm">
            <span className="text-[7px] font-bold leading-none">TOP</span>
            <span className="text-xs font-bold leading-none">10</span>
          </div>
        </div>
      </div>

      {isHovered && pos && (
        <HoverPopup
          item={item}
          pos={pos}
          onMouseEnter={cancelLeave}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </>
  );
};

// ── Memory Row ────────────────────────────────────────────────────────────
const MemoryRow = ({ title, items, variant }) => {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      ro.disconnect();
    };
  }, [items, updateArrows]);

  const scroll = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="mb-6 sm:mb-8 group/row">
      <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 px-4 sm:px-5 lg:px-10">
        {title}
      </h3>
      <div className="relative">
        {/* Left arrow — desktop only (touch users swipe) */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-0 bottom-2 z-20 w-12 lg:w-14 items-center justify-center bg-gradient-to-r from-black/80 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 hover:from-black"
            aria-label="Scroll left"
          >
            <ChevronLeft className="text-white w-8 h-8 drop-shadow-lg" />
          </button>
        )}

        <div
          ref={rowRef}
          className="flex gap-2 lg:gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-5 lg:px-10 pb-2 scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {variant === 'continue'
            ? items.map((item, idx) => (
                <ContinueCard key={item.id} item={item} idx={idx} />
              ))
            : variant === 'top10'
            ? items.map((item, idx) => (
                <Top10Card key={item.id} item={item} rank={idx + 1} idx={idx} />
              ))
            : items.map((item, idx) => (
                <CardImage
                  key={item.id}
                  src={item.src || item.coverImage}
                  idx={idx}
                  item={item}
                />
              ))}
        </div>

        {/* Right arrow — desktop only */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-0 bottom-2 z-20 w-12 lg:w-14 items-center justify-center bg-gradient-to-l from-black/80 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 hover:from-black"
            aria-label="Scroll right"
          >
            <ChevronRight className="text-white w-8 h-8 drop-shadow-lg" />
          </button>
        )}
      </div>
    </section>
  );
};

export default MemoryRow;
