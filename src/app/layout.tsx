import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import '@style/global.css';

import Head from "next/head";

import InstallBootstrap from "@component/install-bootstrap";
import NavbarComponent from "@component/navbar";
import CardGameCategoryComponent from "@component/card-game-category";

export const metadata = {
  title: "Cards",
  description: "An application to view and interact with my cards collection.",
  icons: {
    icon: "/images/favicon/favicon.webp"
  },
  manifest: "/site.webmanifest"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <InstallBootstrap /> {/* Include the component to install Bootstrap JS */}
        <NavbarComponent /> {/* Include the Navbar component */}
        <CardGameCategoryComponent /> {/* Include the Card Category component */}
        {children}
      </body>
    </html>
  );
}