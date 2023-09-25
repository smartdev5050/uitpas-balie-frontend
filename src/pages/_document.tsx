import { Html, Head, Main, NextScript } from "next/document";
import { openSansFont } from "@/lib/ui";

export default function Document() {
  return (
    <Html lang="nl">
      <Head />
      <body
        className={[openSansFont.variable, openSansFont.className].join(" ")}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
