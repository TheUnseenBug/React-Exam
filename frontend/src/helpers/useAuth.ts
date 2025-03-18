import { useState, useEffect } from "react";
import axios from "axios";
import useAccessStore from "@/store/store";

export default function useAuth(code: string) {
  const token = useAccessStore().accessToken;
  const [accessToken, setAccessToken] = useState<string>();
  const [expiresIn, setExpiresIn] = useState<number>();
  const addAccessToken = useAccessStore((state) => state.addAccessToken);
  //FIXME refreshToken funkar inte
  console.log("useAth runs, code:", code);
  console.log("token:", token);
  if (!token) {
    if (code) {
      axios
        .post("http://localhost:3001/login", {
          code,
        })
        .then(
          (res: {
            data: {
              accessToken: string;
              refreshToken: string;
              expiresIn: number;
            };
          }) => {
            addAccessToken(res.data.accessToken);
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
            refresh(res.data.refreshToken);
            console.log(res.data);
          }
        );
    }
  }

  async function refresh(refreshToken: string) {
    console.log("refresh start");
    if (!refreshToken || !expiresIn) return;
    const intervalDuration = (expiresIn - 60) * 1000;
    console.log("refreshToken:", refreshToken);
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", { refreshToken })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setAccessToken(res.data.refreshToken);
          // IMPORTANT: Update expiresIn with the *new* expiration time
          setExpiresIn(res.data.expiresIn); // Assuming expiresIn is in seconds
        })
        .catch((error) => {
          // Handle refresh token errors appropriately.  Examples:
          console.error("Error refreshing token:", error);
          // 1.  Redirect to login (if refresh fails, user needs to re-authenticate)
          // 2.  Set a flag to indicate authentication failure
          // 3.  Clear tokens
          // setRefreshToken(null); //Example, add setRefreshToken function to component
          // setAccessToken(null) //Example
        });
    }, intervalDuration);
    return () => clearInterval(interval);
  }

  // useEffect(() => {
  //   if (!refreshToken || !expiresIn) return;
  //   console.log("refresh start");
  //   // Convert expiresIn to milliseconds and subtract 60 seconds for pre-emptive refresh
  //   const intervalDuration = (65 - 60) * 1000;

  //   const interval = setInterval(() => {
  //     axios
  //       .post("http://localhost:3001/refresh", { refreshToken })
  //       .then((res) => {
  //         setAccessToken(res.data.accessToken);
  //         setAccessToken(res.data.refreshToken);
  //         // IMPORTANT: Update expiresIn with the *new* expiration time
  //         setExpiresIn(res.data.expiresIn); // Assuming expiresIn is in seconds
  //       })
  //       .catch((error) => {
  //         // Handle refresh token errors appropriately.  Examples:
  //         console.error("Error refreshing token:", error);
  //         // 1.  Redirect to login (if refresh fails, user needs to re-authenticate)
  //         // 2.  Set a flag to indicate authentication failure
  //         // 3.  Clear tokens
  //         // setRefreshToken(null); //Example, add setRefreshToken function to component
  //         // setAccessToken(null) //Example
  //       });
  //   }, intervalDuration);

  //   return () => clearInterval(interval);
  // }, [refreshToken, setAccessToken, setExpiresIn, expiresIn]); // Dependency array

  return accessToken;
}
