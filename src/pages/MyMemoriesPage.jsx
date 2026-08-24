import { useNavigate } from 'react-router-dom';
import { BookMarked } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { memories } from '../data/memories';
import { useApp } from '../context/AppContext';

const MyMemoriesPage = () => {
  const { myList, toggleMyList } = useApp();
  const navigate = useNavigate();
  const saved = memories.filter((m) => myList.includes(m.id));

  return (
    <main className="bg-[#141414] min-h-screen text-white">
      <Navbar />

      <div className="max-w-screen-2xl mx-auto px-5 lg:px-10 pt-28 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <BookMarked size={26} className="text-white" />
          <h1 className="text-2xl lg:text-3xl font-bold">My Memories</h1>
          {saved.length > 0 && (
            <span className="text-gray-500 text-sm">{saved.length} tersimpan</span>
          )}
        </div>

        {saved.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BookMarked size={48} className="text-gray-700 mb-4" />
            <p className="text-gray-400 text-lg mb-2">Belum ada kenangan yang disimpan</p>
            <p className="text-gray-600 text-sm mb-8">
              Tekan tombol + My Memories pada setiap kenangan untuk menyimpannya di sini.
            </p>
            <button
              onClick={() => navigate('/home')}
              className="bg-white text-black font-semibold px-6 py-2.5 rounded hover:bg-gray-200 transition-colors"
            >
              Jelajahi Kenangan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
            {saved.map((memory) => (
              <div key={memory.id} className="group relative">
                <button
                  onClick={() => navigate(`/memory/${memory.id}`)}
                  className="w-full aspect-[2/3] rounded overflow-hidden block"
                >
                  <img
                    src={memory.coverImage}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
                    <p className="text-white font-semibold text-xs leading-tight">
                      {memory.title}
                    </p>
                    <p className="text-gray-400 text-[10px] mt-0.5">
                      {memory.year} · {memory.genre[0]}
                    </p>
                  </div>
                </button>

                {/* Remove button */}
                <button
                  onClick={() => toggleMyList(memory.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#e50914]"
                  title="Hapus dari My Memories"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default MyMemoriesPage;
