import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { notifications } from '../data/notifications';
import { useApp } from '../context/AppContext';

const NotificationCenter = ({ onClose }) => {
  const navigate = useNavigate();
  const { readNotifs, markNotifRead } = useApp();
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const handleClick = (notif) => {
    markNotifRead(notif.id);
    if (notif.memoryId) navigate(`/memory/${notif.memoryId}`);
    onClose();
  };

  const markAllRead = () => notifications.forEach((n) => markNotifRead(n.id));

  const unreadCount = notifications.filter((n) => !readNotifs.includes(n.id)).length;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-80 bg-[#1c1c1c] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-semibold text-sm">Notifikasi</h3>
          {unreadCount > 0 && (
            <span className="bg-[#e50914] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-gray-500 text-xs hover:text-white transition-colors"
            >
              Tandai semua
            </button>
          )}
          <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-[360px] overflow-y-auto">
        {notifications.map((notif) => {
          const isRead = readNotifs.includes(notif.id);
          return (
            <button
              key={notif.id}
              onClick={() => handleClick(notif)}
              className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${
                isRead ? 'opacity-50' : ''
              }`}
            >
              <span className="text-xl flex-shrink-0 mt-0.5 leading-none">{notif.icon}</span>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-semibold leading-tight ${
                    isRead ? 'text-gray-400' : 'text-white'
                  }`}
                >
                  {notif.title}
                </p>
                <p className="text-gray-500 text-[11px] mt-0.5 leading-relaxed">{notif.body}</p>
                <p className="text-gray-700 text-[10px] mt-1">{notif.date}</p>
              </div>
              {!isRead && (
                <div className="w-2 h-2 rounded-full bg-[#e50914] flex-shrink-0 mt-1.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationCenter;
