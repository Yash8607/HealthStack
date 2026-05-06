import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="light" lang="en">
      <Head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-surface text-on-surface min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
