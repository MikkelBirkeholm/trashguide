'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.scss'
import Link from 'next/link'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'

import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const pathname = usePathname()
  const newLinkRef = useRef()
  const activeLinkRef = useRef()
  const listRef = useRef()
  const [open, setOpen] = useState(false)

  function handleClick(e) {
    // håndter hvilket link er klikket på (newlink) + hvilket allerede var aktivt (activelink)
    if (activeLinkRef.current === e.target) return
    if (activeLinkRef.current === undefined) {
      activeLinkRef.current = e.target
      activeLinkRef.current.dataset.selected = 'true'
      moveIndicator(newLinkRef.current)
      return
    }
    newLinkRef.current = e.target
    // flyt indikator til nyt link
    moveIndicator(newLinkRef.current)
  }

  function moveIndicator(newLink) {
    // Bredden af nyt link
    const newLinkWidth = newLink.offsetWidth / listRef.current.offsetWidth

    // indstil hvortil indikator skal rykke og hvor bred den skal være
    listRef.current.style.setProperty('--_left', newLink.offsetLeft + 'px')
    listRef.current.style.setProperty('--_width', newLinkWidth)

    // sæt det aktive link til at være det nye link
    activeLinkRef.current = newLink
  }

  useEffect(() => {
    // useEffect nødvendig for at sætte indikator korrekt på første pageload
    const slug = pathname.slice(1)
    if (slug) {
      // på forsiden er slug false, derfor if statement her
      const initialPage = document.querySelector(`#${slug}`)
      activeLinkRef.current = initialPage
    }
    activeLinkRef.current.dataset.selected = 'true'
    moveIndicator(activeLinkRef.current)
  }, [])
  return (
    <nav className={styles.navbar}>
      <ul ref={listRef}>
        <li>
          <Link
            href="/"
            id="home"
            onClick={handleClick}
            ref={activeLinkRef}
          >
            Forside
          </Link>
        </li>
        <li>
          <Link
            href="/sortering"
            id="sortering"
            onClick={handleClick}
          >
            Sortering
          </Link>
        </li>
        <li>
          <Link
            href="/genbrugsstationer"
            id="genbrugsstationer"
            onClick={handleClick}
          >
            Genbrugsstationer
          </Link>
        </li>
        <li>
          <Link
            href="/bestil-beholder"
            id="bestil-beholder"
            onClick={handleClick}
          >
            Bestil Beholder
          </Link>
        </li>
      </ul>
    </nav>
  )
}
