import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa6';
import { useApp } from '../context/AppContext';

const EpisodeList = ({ season, episodes, currentId }) => {
  const navigate = useNavigate();
  const { watchProgress } = useApp();

  return (
    <div>
      <div className="mb-4 sm:mb-5">
        <h2 className="text-white text-lg sm:text-xl font-bold">
          Season {season.id} — {season.title}
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">{season.description}</p>
      </div>

      <div className="flex flex-col gap-1">
        {episodes.map((ep, idx) => {
          const progress = watchProgress[ep.id];
          const isCurrent = ep.id === currentId;

          return (
            <button
              key={ep.id}
              onClick={() => navigate(`/memory/${ep.id}`)}
              className={`flex items-start gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-lg text-left transition-colors hover:bg-white/8 group ${
                isCurrent ? 'bg-white/5 border border-white/10' : ''
              }`}
            >
              {/* Episode number */}
              <span className="text-gray-500 text-base sm:text-lg font-bold w-5 sm:w-6 flex-shrink-0 mt-1 group-hover:text-white transition-colors">
                {idx + 1}
              </span>

              {/* Thumbnail */}
              <div className="relative w-20 sm:w-28 lg:w-32 h-[45px] sm:h-16 flex-shrink-0 rounded overflow-hidden bg-gray-800">
                <img
                  src={ep.coverImage}
                  alt={ep.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <FaPlay size={14} className="text-white" />
                </div>
                {progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600">
                    <div
                      className="h-full bg-[#e50914]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`font-medium text-xs sm:text-sm truncate ${isCurrent ? 'text-white' : 'text-gray-200'}`}>
                    {ep.title}
                  </p>
                  <span className="text-gray-500 text-xs flex-shrink-0 hidden sm:block">{ep.duration}</span>
                </div>
                <p className="text-gray-500 text-xs mt-0.5 sm:mt-1 line-clamp-2 leading-relaxed hidden sm:block">
                  {ep.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EpisodeList;
