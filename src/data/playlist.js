const playlist = [
  {
    id: "song-01",
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    youtubeId: "x96TFHoI86g"
  },
  {
    id: "song-02",
    title: "Yeh Shaam Mastani",
    artist: "Kishore Kumar",
    youtubeId: "CM5oSuScYS4"
  },
  {
    id: "song-03",
    title: "Chura Liya Hai Tumne Jo Dil Ko",
    artist: "Asha Bhosle & Mohammad Rafi",
    youtubeId: "0WziMtAB2hE"
  },
  {
    id: "song-04",
    title: "Lag Ja Gale Se Phir",
    artist: "Lata Mangeshkar",
    youtubeId: "oDfK3RfSlKk"
  },
  {
    id: "song-05",
    title: "Pal Pal Dil Ke Paas",
    artist: "Kishore Kumar",
    youtubeId: "g-sVznH5FEk"
  },
  {
    id: "song-06",
    title: "Roop Tera Mastana",
    artist: "Kishore Kumar",
    youtubeId: "QwLQ4_gkvsE"
  },
  {
    id: "song-07",
    title: "Gulabi Aankhen Jo Teri Dekhi",
    artist: "Mohammed Rafi",
    youtubeId: "kxT-5glSScc"
  },
  {
    id: "song-08",
    title: "Mere Sapno Ki Rani",
    artist: "Kishore Kumar",
    youtubeId: "uKQ99gs6B4w"
  },
  {
    id: "song-09",
    title: "Pyar Deewana Hota Hai",
    artist: "Kishore Kumar",
    youtubeId: "qKpnmFiCTSY"
  },
  {
    id: "song-10",
    title: "O Mere Dil Ke Chain",
    artist: "Kishore Kumar",
    youtubeId: "1B7zGfBHdg0"
  },
  {
    id: "song-11",
    title: "Kabira",
    artist: "Arijit Singh & Harshdeep Kaur",
    youtubeId: "6T3y1JcWRbM"
  },
  {
    id: "song-12",
    title: "Tere Bina Zindagi Se",
    artist: "Lata Mangeshkar & Kishore Kumar",
    youtubeId: "CakDDkF-Qv4"
  },
  {
    id: "song-13",
    title: "Ek Ajnabee Haseena Se",
    artist: "Kishore Kumar",
    youtubeId: "aYIq2efHS94"
  },
  {
    id: "song-14",
    title: "Sujan Singh Vintage Rides Classic",
    artist: "Retro Classics",
    youtubeId: "Xbnj55AUtXE"
  }
];

export function getCleanYoutubeId(input) {
  if (!input) return "";
  if (input.length === 11 && !input.includes("/")) return input;
  const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : input;
}

export default playlist;
export { playlist as mockPlaylist };
