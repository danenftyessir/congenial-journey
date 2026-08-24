import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa6';
import { Plus, Check, ChevronDown, VolumeX } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { REACTIONS } from './ReactionPicker';

const POPUP_W = 290;
const IMG_RATIO = 9 / 16;
const PANEL_H = 108;

const HoverPopup = ({ item, pos, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate();
  const { myList, toggleMyList, watchProgress, reactions } = useApp();

  if (!pos || !item) return null;

  const imgH = POPUP_W * IMG_RATIO;
  const totalH = imgH + PANEL_H;
  const progress = item.progress ?? watchProgress[item.id];
  const inMyList = myList.includes(item.id);
  const reactionId = reactions[item.id];
  const reaction = REACTIONS.find((r) => r.id === reactionId);

  let left = pos.left + pos.width / 2 - POPUP_W / 2;
  if (left < 12) left = 12;
  if (left + POPUP_W > window.innerWidth - 12) left = window.innerWidth - POPUP_W - 12;

  let top = pos.top + pos.height / 2 - totalH / 2;
  if (top < 68) top = 68;
  if (top + totalH > window.innerHeight - 10) top = window.innerHeight - totalH - 10;

  const goToDetail = () => navigate(`/memory/${item.id}`);

  return createPortal(
    <div
      className="popup-animate fixed z-[9999] rounded-lg overflow-hidden shadow-2xl cursor-pointer"
      style={{ top, left, width: POPUP_W }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={goToDetail}
    >
      {/* Landscape preview image */}
      <div className="relative" style={{ paddingBottom: `${IMG_RATIO * 100}%` }}>
        <img
          src={item.src || item.coverImage}
          alt={item.title || 'memory'}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button
          className="absolute top-2 right-2 w-7 h-7 rounded-full border border-white/60 bg-black/50 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <VolumeX size={13} className="text-white" />
        </button>
        {/* Reaction badge */}
        {reaction && (
          <div className="absolute bottom-2 left-2 text-xl leading-none" title={reaction.label}>
            {reaction.emoji}
          </div>
        )}
      </div>

      {/* Action panel */}
      <div className="bg-[#181818] px-3 pt-2.5 pb-3">
        {/* Button row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            {/* Play */}
            <button
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={(e) => { e.stopPropagation(); goToDetail(); }}
              title="Putar"
            >
              <FaPlay size={11} className="text-black translate-x-px" />
            </button>

            {/* My Memories toggle */}
            <button
              className="w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center hover:border-white transition-colors"
              onClick={(e) => { e.stopPropagation(); toggleMyList(item.id); }}
              title={inMyList ? 'Hapus dari My Memories' : 'Tambah ke My Memories'}
            >
              {inMyList
                ? <Check size={14} className="text-white" />
                : <Plus size={15} className="text-white" />}
            </button>
          </div>

          {/* More info */}
          <button
            className="w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center hover:border-white transition-colors"
            onClick={(e) => { e.stopPropagation(); goToDetail(); }}
            title="Info selengkapnya"
          >
            <ChevronDown size={16} className="text-white" />
          </button>
        </div>

        {/* Progress bar */}
        {progress != null && progress > 0 && (
          <div className="h-[3px] bg-gray-600 mb-1.5 rounded-full">
            <div
              className="h-full bg-[#e50914] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Title + meta */}
        <p className="text-white text-xs font-semibold truncate mb-0.5">{item.title}</p>
        <p className="text-white/50 text-[11px]">
          {progress != null && progress > 0
            ? `${progress}% ditonton · ${item.duration}`
            : `${item.year} · ${item.duration}`}
        </p>
        {item.genre?.[0] && (
          <p className="text-white/30 text-[10px] mt-0.5">{item.genre[0]}</p>
        )}
      </div>
    </div>,
    document.body
  );
};

export default HoverPopup;
