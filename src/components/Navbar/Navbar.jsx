import React from 'react'
import styles from './Navbar.module.scss'
import Link from 'next/link'
import { cookies } from 'next/headers'

export const Navbar = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">Forside</Link>
        </li>
        <li>
          <Link href="/sortering">Sortering</Link>
        </li>
        <li>
          <Link href="/genbrugsstationer">Genbrugsstationer</Link>
        </li>
        <li>
          <Link href="/bestil-beholder">Bestil Beholder</Link>
        </li>
      </ul>
    </nav>
  )
}
