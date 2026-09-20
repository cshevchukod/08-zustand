import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple and convenient application for managing notes.',
  openGraph: {
    title: 'NoteHub',
    description: 'A simple and convenient application for managing notes.',
    url: 'https://08-zustand.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
