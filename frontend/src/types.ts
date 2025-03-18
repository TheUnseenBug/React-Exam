export type Artist = {
  name: string;
  popularity: number;
  external_urls: {
    spotify: string;
  };
  image: string;
  topTracks: TopTrack[];
};
export type TopTrack = {
  album: {
    image: string;
    name: string;
    release_date: string;
  };
  artists: {
    name: string;
  }[];
  duration_ms: number;
  name: string;
  uri: string;
};
export type Track = {
  name: string;
  duration_ms: number;
  artists: {
    name: string;
  }[];
  album: {
    name: string;
    images: {
      url: string;
    }[];
  };
};
