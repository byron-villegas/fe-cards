export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <title>Cards</title>
        <meta name="description" content="An application to view and interact with my cards collection."></meta>
        <base href="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/webp" href="/favicon.webp" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}