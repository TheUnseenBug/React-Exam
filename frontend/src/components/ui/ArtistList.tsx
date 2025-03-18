import ArtistItem from "./ArtistItem";
import { Link } from "react-router";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface ArtistListProps {
  artists: Artist[];
}

export default function ArtistList({ artists }: ArtistListProps) {
  return (
    <ul className="mt-4">
      {artists.length > 0 ? (
        artists.map((artist) => <ArtistItem key={artist.id} artist={artist} />)
      ) : (
        <Link to="ArtistPage">
        <p className="bg-colors-customPink rounded-md border-4 border-black p-4">No artists found.</p>
        </Link>
      )}
    </ul>
  );
}

// practice database

// const artists = [
//   {
//     id: "1",
//     name: "Artist One",
//     images: [{ url: "../scr/images/yellow-dog.jpg" }],
//   },
//   {
//     id: "2",
//     name: "Artist Two",
//     images: [{ url: "https://example.com/image2.jpg" }],
//   },
//   {
//     id: "3",
//     name: "Artist Three",
//     images: [{ url: "https://example.com/image3.jpg" }],
//   },
//   {
//     id: "4",
//     name: "Artist Four",
//     images: [{ url: "https://example.com/image4.jpg" }],
//   },
//   {
//     id: "5",
//     name: "Artist Five",
//     images: [{ url: "https://example.com/image5.jpg" }],
//   },
// ];

// // Example usage in your component
// export default function ArtistList() {
//   return (
//     <ul className="">
//       {artists.map((artist) => (
//         <ArtistItem key={artist.id} artist={artist} />
//       ))}
//     </ul>
//   );
// }