// import { Slider } from "@radix-ui/react-slider";
// import Image from "@/assets/billie.jpg";
import {
  PreviousButton,
  PlayButton,
  PauseButton,
  NextButton,
} from "@/components/ui/PlayerButtons";
import { Slider } from "@radix-ui/react-slider";
import SpotifyPlayer from "react-spotify-web-playback";

// export default function Player() {
//   const code = new URLSearchParams(window.location.search).get("code");
//   console.log("code:", code);
//   const token = useAccessStore().accessToken;
//   if (code) {
//     useAuth(code);
//   }

//   console.log("accesstoken:", token);
//   return <PlayerComponent accessToken={token} />;
export default function Player(accessToken: any, trackUri: any) {
  if (!accessToken) return null;
  return (
    <div className="flex flex-col gap-5 align-center">
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        uris={trackUri ? [trackUri] : []}
      />

      <div className="flex flex-col self-center w-3/4 gap-3 p-4 border-4 border-black rounded-md bg-colors-customYellow lg:flex-col">
        {/* Album + Info */}
        <div className="flex flex-col w-full gap-3 lg:flex-row">
          {/* Album cover */}
          <div className="self-center w-full lg:w-1/2">
            <img
              src={Image}
              alt="Album Cover"
              className="w-full border-4 border-black rounded-md"
            />
          </div>

          {/* Info container */}
          <div className="self-stretch w-full p-4 text-left border-4 border-black rounded-md bg-colors-customPink lg:w-1/2">
            <h2 className="font-bold sm:text-lg md:text-2xl lg:text-4xl">
              I'm a Fool to Want You (with Ray Ellis & His Orchestra)
            </h2>
            <h3 className="sm:text-lg md:text-2xl lg:text-4xl">
              Billie Holiday, Ray Ellis And His Orchestra
            </h3>
            <p className="italic sm:text-lg md:text-2xl lg:text-3xl">
              Album Name
            </p>
          </div>
        </div>

        {/* Button controls */}
        <div className="flex flex-row justify-center order-3 w-full gap-3 mt-4">
          <PreviousButton />
          <PlayButton />
          <PauseButton />
          <NextButton />
        </div>
      </div>
    </div>
  );
}
