import { useNavigate } from 'react-router-dom';
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
        className="relative w-[260px] lg:w-[300px] h-[146px] lg:h-[169px] flex-shrink-0 rounded overflow-hidden cursor-pointer"
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
                {progress}% ditonton
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
        className="relative w-[195px] lg:w-[235px] h-[210px] lg:h-[255px] flex-shrink-0 cursor-pointer"
        data-aos="fade-up"
        data-aos-duration={`${900 + idx * 80}`}
        data-aos-once="true"
        onClick={() => navigate(`/memory/${item.id}`)}
      >
        <span
          className="absolute left-0 bottom-0 font-black select-none z-0 text-[120px] lg:text-[145px]"
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
          className="absolute right-0 top-0 w-[138px] lg:w-[165px] h-full rounded overflow-hidden z-10"
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
  if (!items || items.length === 0) return null;

  return (
    <section className="mb-8">
      <h3 className="text-white font-bold text-base lg:text-lg mb-3 px-5 lg:px-10">
        {title}
      </h3>
      <div className="flex gap-2 lg:gap-3 overflow-x-auto scrollbar-hide px-5 lg:px-10 pb-2">
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
    </section>
  );
};

export default MemoryRow;
