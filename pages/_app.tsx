import "../app/styles/globals.css";
import "../app/styles/colors.css";
import type { AppProps } from "next/app";
import { AuthenticationProvider } from "../app/providers/authentication";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationProvider>
      <Component {...pageProps} />;
    </AuthenticationProvider>
  );
}

export default MyApp;
