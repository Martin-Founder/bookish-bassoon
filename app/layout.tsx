import type { Metadata } from 'next'
import { DM_Sans, Barlow_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Display font for headings — bold, condensed, modern
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
  weight: ['200', '300', '400', '600', '700', '800', '900'],
})

// Body font — clean, readable
const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Websure | Tvoříme digitální budoucnost',
  description: 'Webdesign, marketing a identita pro moderní firmy.',
  generator: 'v0.app',
  keywords: ['web', 'marketing', 'design', 'branding', 'websure'],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs" className={`${barlowCondensed.variable} ${dmSans.variable} bg-background`}>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
