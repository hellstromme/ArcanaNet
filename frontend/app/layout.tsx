import type { ReactNode } from 'react';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ArcanaNet',
  description: 'Online TTRPG virtual tabletop platform',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>ArcanaNet</h1>
          <p>Virtual tabletop for your campaigns</p>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
