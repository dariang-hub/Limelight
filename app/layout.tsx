import type { Metadata } from 'next'
import './globals.css'
import PwaProvider from './components/PwaProvider'

export const metadata: Metadata = {
  title: 'LimeLight — Your Resume Should Get You The Audition',
  description: 'The performing arts resume builder made by working performers. Get the audition. Step into the limelight.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'LimeLight',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#F4694B" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
      </head>
      <body>
        {children}
        <PwaProvider />
      </body>
    </html>
  )
}
