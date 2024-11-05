import localFont from "next/font/local";
import HomePage from "./home";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] flex-1`}
    >
      <Head>
        <title>Michael Zietz</title>
      </Head>
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <HomePage />
      </main>
    </div>
  );
}
