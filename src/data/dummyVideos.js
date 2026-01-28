const videos = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: `Amazing Video ${i + 1}`,
  channel: `Creator ${i + 1}`,
}));

export default videos;
