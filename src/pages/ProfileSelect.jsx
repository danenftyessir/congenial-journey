import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { profiles } from '../data/profiles';
import netflixLogo from '../assets/Netflix_Logomark.png';

const NetflixFaceIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="34" cy="43" r="8" fill="white" />
    <circle cx="66" cy="43" r="8" fill="white" />
    <path
      d="M 24 63 Q 50 85 76 63"
      stroke="white"
      strokeWidth="7"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const ProfileSelect = () => {
  const { setCurrentProfile } = useApp();
  const navigate = useNavigate();
  const [selecting, setSelecting] = useState(null);

  const handleSelect = (profile) => {
    setSelecting(profile.id);
    setTimeout(() => {
      setCurrentProfile(profile);
      navigate('/home');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col">
      {/* Header — logo centered */}
      <header className="flex justify-center pt-8 pb-4">
        <img src={netflixLogo} alt="logo" className="w-[120px]" />
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-5">
        <h1 className="text-white text-4xl lg:text-5xl font-semibold mb-10 text-center">
          Siapa yang menonton?
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-8">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleSelect(profile)}
              className={`group flex flex-col items-center gap-3 transition-all duration-300 ${
                selecting === profile.id ? 'scale-95 opacity-60' : 'hover:scale-105'
              }`}
            >
              {/* Avatar — Netflix face icon style */}
              <div
                className="w-28 h-28 lg:w-36 lg:h-36 rounded-md flex items-center justify-center border-[3px] border-transparent group-hover:border-white transition-all duration-200 p-5 lg:p-6"
                style={{ backgroundColor: profile.color }}
              >
                <NetflixFaceIcon />
              </div>

              <span className="text-gray-400 group-hover:text-white text-sm font-medium transition-colors duration-200">
                {profile.name}
              </span>
            </button>
          ))}
        </div>
      </main>

      {/* Footer — Kelola Profil button */}
      <footer className="flex justify-center pb-12">
        <button className="border border-gray-500 text-gray-400 hover:text-white hover:border-white px-8 py-2 text-sm tracking-widest transition-colors duration-200">
          Kelola Profil
        </button>
      </footer>
    </div>
  );
};

export default ProfileSelect;
