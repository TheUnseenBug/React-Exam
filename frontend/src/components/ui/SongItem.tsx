interface Song {
  id: string;
  name: string;
  images: { url: string }[];
}

interface SongItemProps {
  song: Song;
}

export default function SongItem({ song }: SongItemProps) {
  const handleClick = () => {
    window.open(`https://open.spotify.com/track/${song.id}`, "_blank");
  };
  return (
    <li className="flex items-center gap-4 p-2 m-2 border-4 border-black rounded-md cursor-pointer bg-colors-customPink hover:bg-colors-customBlue"
    onClick={handleClick}>
      
        {song.images.length > 0 && (
          <img
            src={song.images[0].url}
            alt={song.name}
            className="w-12 h-12 rounded-full"
          />
        )}
        <p className="font-semibold">{song.name}</p>
     
    </li>
  );
}
