import { Html, Head, Main, NextScript } from "next/document";

/*
 * `lang` belongs on <html> for screen readers and SEO, and the justified copy
 * in About needs it before the browser will hyphenate.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
