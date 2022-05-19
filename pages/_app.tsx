import "../styles/globals.css";
import "../styles/colors.css";
import type { AppProps } from "next/app";
import { AuthenticationProvider } from "../providers/authentication";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationProvider>
      <Component {...pageProps} />;
    </AuthenticationProvider>
  );
}

export default MyApp;
