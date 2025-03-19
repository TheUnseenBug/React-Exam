export type Artist = {
  name: string;
  popularity: number;
  external_urls: string;
  image: string;
  topTracks: {
    album: {
      image: string;
      name: string;
      release_date: string;
    };
    artists: { name: string }[];
    duration_ms: number;
    name: string;
    uri: string;
  }[];
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
  uri: string;
  artists: {
    name: string;
  }[];
  album: {
    image: string;
    name: string;
    release_date: string;
  };
};
