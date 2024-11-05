import Footer from "@/components/footer";
import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen min-w-fit  justify-center items-center mx-auto">
      <Header />
      <div className="flex-1 max-w-5xl">
        <main className="mx-auto p-4 max-w-4xl z-0">
          <Component {...pageProps} />
        </main>
      </div>
      <div className="max-w-5xl">
        <Footer />
      </div>
    </div>
  );
}
