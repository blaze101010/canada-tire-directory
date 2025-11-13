import type { Metadata } from 'next'
import './globals.css'
import { siteConfig } from '@/lib/config'
import { AuthProvider } from '@/contexts/AuthContext'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: `Find a Tire Shop Near Me | ${siteConfig.totalShops} Tire Shops Across Canada | ${siteConfig.name}`,
  description: `Find tire shops near you with ${siteConfig.name}. Browse ${siteConfig.totalShops} tire shops across Canada. Compare services, prices, and hours. Tire installation, alignment, repair, and more.`,
  keywords: siteConfig.keywords,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: `Find a Tire Shop Near Me | ${siteConfig.name}`,
    description: `Browse ${siteConfig.totalShops} tire shops across Canada. Find tire installation, alignment, and repair services near you.`,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Find a Tire Shop Near Me | ${siteConfig.name}`,
    description: `Browse ${siteConfig.totalShops} tire shops across Canada`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
