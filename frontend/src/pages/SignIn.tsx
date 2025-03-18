import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import SocialIcons from "../components/SocialButtons";

export default function SignIn() {
  return (
    <main className="h-full w-full flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md border-2 border-[#EEBB36] mx-auto">
        <h2 className="bg-white text-center text-[140%] font-bold mb-6 whitespace-nowrap">
          Sign in with your Spotify account
        </h2>

        <div className="space-y-4">
          <Input
            placeholder="E-mail or username..."
            className="w-full bg-[#36EE5F] border-2 border-[#EE36C5] placeholder:text-black"
          ></Input>
          <Input
            placeholder="Password..."
            className="w-full bg-[#36EE5F] border-2 border-[#EE36C5] placeholder:text-black"
            type="password"
          ></Input>
          <Button
            className="w-full bg-[#3669ee] [transition:none] hover:bg-opacity-95 hover:border-2 hover:border-black/20 text-xl py-3 rounded-xl"
            onClick={() => alert("Sign in pressed :)")}
          >
            Sign in
          </Button>
        </div>

        <SocialIcons />
        <p className="mt-6 text-xs">
          You need a Spotify account and subscription to proceed. <br></br>
          <a
            href="https://www.spotify.com/se/signup"
            target="_blank"
            className="font-bold  hover:underline"
          >
            Get it here.
          </a>
        </p>
      </div>
    </main>
  );
}
