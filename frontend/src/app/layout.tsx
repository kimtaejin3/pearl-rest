import './globals.css';

import type { Metadata } from 'next';

import Header from '@/components/shared/Header';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-[1100px] mx-auto">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
