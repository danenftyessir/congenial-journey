import Img1 from "../assets/pics/1.jpeg";
import Img2 from "../assets/pics/2.jpeg";
import Img3 from "../assets/pics/3.jpeg";
import Img4 from "../assets/pics/4.jpeg";
import Img5 from "../assets/pics/5.jpeg";
import Img6 from "../assets/pics/6.jpeg";
import Img7 from "../assets/pics/8.jpeg";
import Img8 from "../assets/pics/7.jpeg";
import Img9 from "../assets/pics/10.jpeg";
import Img10 from "../assets/pics/11.jpeg";
import Img11 from "../assets/pics/12.jpeg";
import Img12 from "../assets/pics/13.jpeg";

export const images = [
  { id: 1, src: Img1, title: "The Beginning of Us", year: "2023", genre: "Core Memory", duration: "1h 12m", badge: "Newly Added" },
  { id: 2, src: Img2, title: "First Hangout", year: "2023", genre: "Comedy", duration: "45m", badge: "Season Baru" },
  { id: 3, src: Img3, title: "Random Tuesday", year: "2023", genre: "Unplanned", duration: "32m" },
  { id: 4, src: Img4, title: "Late Night Conversations", year: "2024", genre: "Late Night", duration: "2h 15m", badge: "Season Baru" },
  { id: 5, src: Img5, title: "Graduation Day", year: "2024", genre: "Core Memory", duration: "1h 30m", badge: "Newly Added" },
  { id: 6, src: Img6, title: "That Trip We Almost Missed", year: "2024", genre: "Road Trip", duration: "1h 45m" },
  { id: 7, src: Img7, title: "Chaos at 2AM", year: "2024", genre: "Chaos", duration: "28m", badge: "Newly Added" },
  { id: 8, src: Img8, title: "The Food Incident", year: "2024", genre: "Food", duration: "1h" },
  { id: 9, src: Img9, title: "Midnight Snack Run", year: "2025", genre: "Unplanned", duration: "52m", badge: "Season Baru" },
  { id: 10, src: Img10, title: "When We Were Young", year: "2023", genre: "Nostalgia", duration: "1h 20m" },
  { id: 11, src: Img11, title: "The Last Semester", year: "2025", genre: "Academic Survival", duration: "2h" },
  { id: 12, src: Img12, title: "Before We Said Goodbye", year: "2025", genre: "Core Memory", duration: "1h 55m", badge: "Newly Added" },
];

export const continueWatching = [
  { ...images[0], progress: 72, watchAction: null },
  { ...images[1], progress: 45, watchAction: null },
  { ...images[2], progress: 23, watchAction: null },
  { ...images[3], progress: 88, watchAction: "Tonton Sekarang", badge: "Episode Baru" },
  { ...images[4], progress: 55, watchAction: "Tonton Sekarang", badge: "Episode Baru" },
];

export const top10 = images.slice(0, 10).map((img, i) => ({ ...img, rank: i + 1, badge: "Newly Added" }));
