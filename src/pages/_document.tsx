import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="icon" href="/favicon.svg" sizes="any" />
      <body className="antialiased flex flex-col min-h-screen min-w-fit">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
