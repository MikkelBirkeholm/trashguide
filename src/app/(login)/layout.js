// Imports Globally Applied Styles
import '../../styles/globals.scss'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

// Setup Fonts
import { Open_Sans } from 'next/font/google'
const open_sans = Open_Sans({ subsets: ['latin'], variable: '--font-opensans' })

export const metadata = {
  title: 'Affaldsguiden',
  description: 'Login',
}

// Remember to set language on html

export default function RootLayout({ children }) {
  return (
    <html lang="da-DK">
      <body className={open_sans.className}>{children}</body>
    </html>
  )
}
