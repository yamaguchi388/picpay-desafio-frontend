import "../app/styles/globals.css";
import "../app/styles/colors.css";
import type { AppProps } from "next/app";
import { AuthenticationProvider } from "../app/providers/authentication";
import { ToastProvider } from "../app/providers/toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </AuthenticationProvider>
  );
}

export default MyApp;
