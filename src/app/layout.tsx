import Home from "../pages/page";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "./globals.css";

export default function RootLayout() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <title>Cards</title>
        <meta name="description" content="Application for my collection cards"></meta>
        <base href="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </head>
      <body>
        <Home />
      </body>
    </html>
  );
}
