const playlist = [
  {
    id: "song-01",
    title: "Track 01",
    artist: "YouTube",
    youtubeId: "x96TFHoI86g"
  },
  {
    id: "song-02",
    title: "Track 02",
    artist: "YouTube",
    youtubeId: "CM5oSuScYS4"
  },
  {
    id: "song-03",
    title: "Track 03",
    artist: "YouTube",
    youtubeId: "0WziMtAB2hE"
  },
  {
    id: "song-04",
    title: "Track 04",
    artist: "YouTube",
    youtubeId: "oDfK3RfSlKk"
  },
  {
    id: "song-05",
    title: "Track 05",
    artist: "YouTube",
    youtubeId: "g-sVznH5FEk"
  },
  {
    id: "song-06",
    title: "Track 06",
    artist: "YouTube",
    youtubeId: "QwLQ4_gkvsE"
  },
  {
    id: "song-07",
    title: "Track 07",
    artist: "YouTube",
    youtubeId: "kxT-5glSScc"
  },
  {
    id: "song-08",
    title: "Track 08",
    artist: "YouTube",
    youtubeId: "uKQ99gs6B4w"
  },
  {
    id: "song-09",
    title: "Track 09",
    artist: "YouTube",
    youtubeId: "qKpnmFiCTSY"
  },
  {
    id: "song-10",
    title: "Track 10",
    artist: "YouTube",
    youtubeId: "1B7zGfBHdg0"
  },
  {
    id: "song-11",
    title: "Track 11",
    artist: "YouTube",
    youtubeId: "6T3y1JcWRbM"
  },
  {
    id: "song-12",
    title: "Track 12",
    artist: "YouTube",
    youtubeId: "CakDDkF-Qv4"
  },
  {
    id: "song-13",
    title: "Track 13",
    artist: "YouTube",
    youtubeId: "aYIq2efHS94"
  },
  {
    id: "song-14",
    title: "Track 14",
    artist: "YouTube",
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
