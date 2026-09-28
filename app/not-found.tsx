import Link from "next/link";

// Fallback for paths outside any locale (the middleware normally prevents this).
export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", textAlign: "center", padding: 48 }}>
        <h1>Page not found</h1>
        <Link href="/en">Go to NextNTech.org</Link>
      </body>
    </html>
  );
}
