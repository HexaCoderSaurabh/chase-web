import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "../components/NavBar";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { useRouter } from "next/router";
  
export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const NO_NAV_ROUTES = ["/login", "/signup", "/forgot"];
  const hideNavbar = NO_NAV_ROUTES.includes(router.pathname);
  return (
    <AuthProvider>
      {!hideNavbar && <NavBar />}
      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
  );
}
