export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <title>Cards</title>
        <meta name="description" content="Application for my collection cards"></meta>
        <base href="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/webp" href="/favicon.webp" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}