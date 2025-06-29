import './globals.css';
import type { Metadata } from 'next';
import { Inter, M_PLUS_Rounded_1c } from 'next/font/google';
import ClientProviders from './ClientProviders';

const inter = Inter({ subsets: ['latin'] });
const mplusRounded = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MorinoLab - Quantum Computing Research',
  description:
    'Pioneering the future of quantum computing through innovative research and cutting-edge technology development.',
  icons: {
    icon: '/img/icon.png',
    apple: '/img/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
