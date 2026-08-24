import Navbar from "./components/Navbar";
import heroImg from "./assets/pics/9.jpeg";
import { Info } from "lucide-react";
import { FaPlay } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import MemoryRow from "./components/MemoryRow";
import { images, continueWatching, top10 } from "./constants/images";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  const [openModal, setOpenModal] = useState(false);

  const Button = ({ children, variant, ...rest }) => (
    <button
      className={`flex items-center gap-2 py-2 px-5 lg:py-2.5 lg:px-7 rounded font-semibold active:scale-90 duration-300 ease-in-out text-sm lg:text-base ${
        variant === "primary" ? "bg-white text-black hover:bg-gray-200" : ""
      } ${variant === "secondary" ? "bg-white/30 text-white hover:bg-white/20" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );

  useEffect(() => {
    Aos.init();
  }, []);

  const newlyAdded = images.filter((img) => img.badge);
  const becauseYouWereThere = images.slice(6);

  return (
    <main className="bg-[#141414]">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-screen flex justify-center items-end"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        {/* Left-side gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        {/* Bottom gradient fading to page bg */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />

        {/* Hero content — bottom left */}
        <div className="w-full max-w-screen-2xl px-5 lg:px-10 mb-[7%] flex flex-col gap-3 lg:gap-4 z-10 text-white">
          <p
            className="text-sm text-gray-300"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            Film&nbsp;•&nbsp;2024&nbsp;•&nbsp;1h 42m&nbsp;•&nbsp;All Ages
          </p>

          <h1
            className="text-3xl lg:text-5xl font-bold lg:w-[48%] leading-tight"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            How to say Happy Birthday before I disappear back into the crowd.
          </h1>

          <p
            className="text-sm lg:text-base lg:w-[40%] text-gray-200 line-clamp-3"
            data-aos="fade-right"
            data-aos-duration="1200"
          >
            This is how Didin, someone you might never know, expresses
            admiration. From a distance, he's watched your light grow brighter,
            hoping one day you'd notice. But for now, this is how Didin says
            happy birthday to You.
          </p>

          <div
            className="flex items-center gap-3 mt-1"
            data-aos="fade-right"
            data-aos-duration="1400"
          >
            <Button variant="primary" onClick={() => setOpenModal(true)}>
              <FaPlay size={14} />
              Play
            </Button>
            <Button variant="secondary">
              <Info size={16} />
              More Info
            </Button>
          </div>
        </div>

        {/* Right-side hero badges */}
        <div
          className="absolute right-5 lg:right-10 bottom-[9%] flex flex-col gap-2 z-10"
          data-aos="fade-left"
          data-aos-duration="1200"
        >
          <div className="flex items-center gap-2 border border-white/40 px-3 py-1.5 bg-black/50 backdrop-blur-sm">
            <span className="text-white text-sm font-semibold">Newly Added</span>
          </div>
          <div className="flex items-center gap-2 border border-white/40 px-3 py-1.5 bg-black/50 backdrop-blur-sm">
            <span className="text-yellow-400 font-bold text-sm">TOP</span>
            <span className="text-yellow-400 font-bold text-xl leading-none">10</span>
            <span className="text-white text-sm">Film No. 3</span>
          </div>
        </div>
      </section>

      {/* Content Rows */}
      <div className="pt-4 pb-20">
        <MemoryRow title="Newly Added" items={newlyAdded} />
        <MemoryRow
          title="Continue Watching for Didin"
          items={continueWatching}
          variant="continue"
        />
        <MemoryRow
          title="Top 10 Memories Today"
          items={top10}
          variant="top10"
        />
        <MemoryRow title="Because You Were There" items={becauseYouWereThere} />
        <MemoryRow title="More to Explore : Us" items={images} />
      </div>

      <Modal setOpenModal={setOpenModal} openModal={openModal}>
        <div
          className="relative bg-cover bg-center bg-no-repeat h-[250px] lg:h-[450px]"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundPosition: "center 40%",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black" />
        </div>
        <div className="flex flex-col gap-3 lg:gap-5 p-5 text-white">
          <h1 className="font-bold text-2xl">Happy Birthday, You</h1>
          <p>Hi You...</p>
          <p>
            You don't know me, and maybe you never will. But from afar, I've
            been inspired by your journey, your energy, and the way you light up
            the lives of so many. On this special day, I just wanted to send a
            simple wish: May your path continue to be as beautiful as the person
            you are, and may this year bring even more joy, love, and success
            into your life.
          </p>
          <p>
            With all my love,
            <br />
            Didin
          </p>
        </div>
      </Modal>
    </main>
  );
}

export default App;
