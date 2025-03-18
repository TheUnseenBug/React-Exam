import { Outlet } from "react-router-dom";
import Header from "./Header";
import useAccessStore from "@/store/store"; // Hämta accessToken
import PlayerComponent from "../PlayerComponent";

export default function RootLayout() {
  const accessToken = useAccessStore((state) => state.accessToken);

  return (
    <div>
      {accessToken && <Header />}
      <>
        <Outlet />
      </>
      {/* {accessToken && <PlayerComponent />} */}
    </div>
  );
}
