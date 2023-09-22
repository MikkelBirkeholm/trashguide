import '../../../styles/globals.scss'

import { Open_Sans } from 'next/font/google'
const open_sans = Open_Sans({ subsets: ['latin'], variable: '--font-opensans' })

export const metadata = {
  title: 'Affaldsguiden',
  description: 'Login',
}

export default function RootLayout({ children }) {
  return (
    <html lang="da-DK">
      <body className={open_sans.className + ' login-page'}>{children}</body>
    </html>
  )
}
