import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import '@style/global.css';

import Head from "next/head";

export const metadata = {
  title: "Cards",
  description: "An application to view and interact with my cards collection.",
  icons: {
    icon: "/favicon.webp",
  },
  manifest: "/webmanifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}