'use client'
import { useState } from 'react'
import styles from './Navbar.module.scss'
import Link from 'next/link'

// clickawaylistener fra MUI er en component man kan wrapper uden om andre, for at lytte efter klik uden for denne
import { ClickAwayListener } from '@mui/base/ClickAwayListener'

export const MobileNavbar = () => {
  const [open, setOpen] = useState(false)

  function handleClickAway() {
    setOpen(false)
  }
  function handleClickOpen() {
    setOpen(true)
  }

  return (
    <nav className={styles.mobileNavbar}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 24 24"
        onClick={handleClickOpen}
      >
        <path
          fill="none"
          stroke="#114d46"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={
            open
              ? 'm18 18l-6-6m0 0L6 6m6 6l6-6m-6 6l-6 6'
              : 'M5 17h14M5 12h14M5 7h14'
          }
        ></path>
      </svg>

      {open && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <ul>
            <li>
              <Link
                href="/"
                id="home"
              >
                Forside
              </Link>
            </li>
            <li>
              <Link
                href="/sortering"
                id="sortering"
              >
                Sortering
              </Link>
            </li>
            <li>
              <Link
                href="/genbrugsstationer"
                id="genbrugsstationer"
              >
                Genbrugsstationer
              </Link>
            </li>
            <li>
              <Link
                href="/bestil-beholder"
                id="bestil-beholder"
              >
                Bestil Beholder
              </Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </ClickAwayListener>
      )}
    </nav>
  )
}
