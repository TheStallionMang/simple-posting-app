import "@/styles/globals.css";
import Navbar from "../../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../../lib/context";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore } from "../../lib/firebase";
import { useUserData } from "../../lib/hooks";

export default function App({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}
