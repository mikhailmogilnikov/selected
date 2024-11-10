import type { Metadata, Viewport } from 'next';

import './globals.css';
import { siteConfig } from '@/src/config/site';
import { fontSans } from '@/src/config/fonts';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className='dark' lang='en'>
      <body className={`${fontSans.variable} bg-background text-foreground`}>{children}</body>
    </html>
  );
}
