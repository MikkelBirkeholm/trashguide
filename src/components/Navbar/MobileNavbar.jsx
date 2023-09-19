'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.scss'
import Link from 'next/link'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'

export const MobileNavbar = () => {
  const [open, setOpen] = useState(false)

  //   function handleClick(e) {
  //     // håndter hvilket link er klikket på (newlink) + hvilket allerede var aktivt (activelink)
  //     if (activeLinkRef.current === e.target) return
  //     if (activeLinkRef.current === undefined) {
  //       activeLinkRef.current = e.target
  //       activeLinkRef.current.dataset.selected = 'true'
  //       moveIndicator(newLinkRef.current)
  //       return
  //     }
  //     newLinkRef.current = e.target
  //     // flyt indikator til nyt link
  //     moveIndicator(newLinkRef.current)
  //   }

  //   function moveIndicator(newLink) {
  //     // Bredden af nyt link
  //     const newLinkWidth = newLink.offsetWidth / listRef.current.offsetWidth

  //     // indstil hvortil indikator skal rykke og hvor bred den skal være
  //     listRef.current.style.setProperty('--_left', newLink.offsetLeft + 'px')
  //     listRef.current.style.setProperty('--_width', newLinkWidth)

  //     // sæt det aktive link til at være det nye link
  //     activeLinkRef.current = newLink
  //   }

  //   useEffect(() => {
  //     // useEffect nødvendig for at sætte indikator korrekt på første pageload
  //     const slug = pathname.slice(1)
  //     if (slug) {
  //       // på forsiden er slug false, derfor if statement her
  //       const initialPage = document.querySelector(`#${slug}`)
  //       activeLinkRef.current = initialPage
  //     }
  //     activeLinkRef.current.dataset.selected = 'true'
  //     moveIndicator(activeLinkRef.current)
  //   }, [])

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
