import useCardHover from '../hooks/useCardHover';
import HoverPopup from './HoverPopup';

const CardImage = ({ src, idx, item }) => {
  const { cardRef, isHovered, pos, handleMouseEnter, handleMouseLeave, cancelLeave } = useCardHover();

  return (
    <>
      <div
        ref={cardRef}
        className="relative w-[140px] lg:w-[170px] h-[210px] lg:h-[255px] flex-shrink-0 rounded overflow-hidden cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-aos="fade-up"
        data-aos-duration={`${900 + idx * 80}`}
        data-aos-once="true"
      >
        <img
          src={src}
          alt={item?.title || 'memory'}
          className="w-full h-full object-cover"
        />

        {item?.badge && (
          <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1 bg-gradient-to-t from-black/90 to-transparent">
            <span className="bg-[#e50914] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-sm inline-block">
              {item.badge}
            </span>
          </div>
        )}
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

export default CardImage;
