import SongItem from "../ui/SongItem"

interface Song {
  id: string;
  name: string;
  images: { url: string }[];
}

interface SongListProps {
  songs: Song[];
}

export default function SongList({ songs }: SongListProps) {
  return (
    <ul className="mt-4">
      {songs.length > 0 ? (
        songs.map((song) => <SongItem key={song.id} song={song} />)
      ) : (
        
        <p className="bg-colors-customPink rounded-md border-4 border-black p-4">No songs found.</p>
    
      )}
    </ul>
  );
}