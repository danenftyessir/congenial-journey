import { createPortal } from 'react-dom';
import { FaPlay } from 'react-icons/fa6';
import { Plus, X, ThumbsUp, ChevronDown, VolumeX } from 'lucide-react';

const POPUP_W = 290;
const IMG_RATIO = 9 / 16; // landscape preview
const PANEL_H = 96;

const HoverPopup = ({ item, pos, onMouseEnter, onMouseLeave }) => {
  if (!pos || !item) return null;

  const imgH = POPUP_W * IMG_RATIO;
  const totalH = imgH + PANEL_H;

  // Horizontal: centre on card, clamp within viewport
  let left = pos.left + pos.width / 2 - POPUP_W / 2;
  if (left < 12) left = 12;
  if (left + POPUP_W > window.innerWidth - 12) left = window.innerWidth - POPUP_W - 12;

  // Vertical: centre on card, clamp below navbar and above bottom
  let top = pos.top + pos.height / 2 - totalH / 2;
  if (top < 68) top = 68;
  if (top + totalH > window.innerHeight - 10) top = window.innerHeight - totalH - 10;

  return createPortal(
    <div
      className="popup-animate fixed z-[9999] rounded-lg overflow-hidden shadow-2xl cursor-pointer"
      style={{ top, left, width: POPUP_W }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Landscape preview image */}
      <div className="relative" style={{ paddingBottom: `${IMG_RATIO * 100}%` }}>
        <img
          src={item.src}
          alt={item.title || 'memory'}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button
          className="absolute top-2 right-2 w-7 h-7 rounded-full border border-white/60 bg-black/50 flex items-center justify-center"
          onClick={e => e.stopPropagation()}
        >
          <VolumeX size={13} className="text-white" />
        </button>
      </div>

      {/* Action panel */}
      <div className="bg-[#181818] px-3 pt-2.5 pb-3">
        {/* Button row */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
              <FaPlay size={11} className="text-black translate-x-px" />
            </button>
            <button className="w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center hover:border-white transition-colors">
              <Plus size={15} className="text-white" />
            </button>
            <button className="w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center hover:border-white transition-colors">
              <X size={14} className="text-white" />
            </button>
            <button className="w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center hover:border-white transition-colors">
              <ThumbsUp size={13} className="text-white" />
            </button>
          </div>
          <button className="w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center hover:border-white transition-colors">
            <ChevronDown size={16} className="text-white" />
          </button>
        </div>

        {/* Progress bar */}
        {item.progress != null && (
          <div className="h-[3px] bg-gray-600 mb-1.5 rounded-full">
            <div
              className="h-full bg-[#e50914] rounded-full"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        )}

        {/* Info text */}
        <p className="text-white/60 text-[11px]">
          {item.progress != null
            ? `${item.progress}% ditonton · ${item.duration}`
            : item.duration}
        </p>
      </div>
    </div>,
    document.body
  );
};

export default HoverPopup;
