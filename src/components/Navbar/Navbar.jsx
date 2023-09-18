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
          <Link href="/about">Om Os</Link>
        </li>
        {token && (
          <li>
            <Link href="/min-side">Min Side</Link>
          </li>
        )}
        <li>
          <Link href="#">Link</Link>
        </li>
        <li>
          <Link href="#">Link</Link>
        </li>
        <li>
          <Link href="#">Link</Link>
        </li>
      </ul>
    </nav>
  )
}
