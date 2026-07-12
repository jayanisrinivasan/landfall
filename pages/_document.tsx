import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Landfall tracks where AI is about to hit the economy — a living forecast of displacement imminence by occupation, updated every quarter." />
        <meta property="og:title" content="Landfall — AI Economic Impact Forecast" />
        <meta property="og:description" content="A living forecast of where AI is about to hit the economy." />
        <meta name="theme-color" content="#0A0F1E" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
