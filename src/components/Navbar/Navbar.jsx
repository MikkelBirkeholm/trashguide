'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.scss'
import Link from 'next/link'

export const Navbar = () => {
  const newLinkRef = useRef()
  const activeLinkRef = useRef()
  const listRef = useRef()

  function handleClick(e) {
    if (activeLinkRef.current === e.target) return

    if (activeLinkRef.current === undefined) {
      activeLinkRef.current = e.target
      activeLinkRef.current.dataset.selected = 'true'
      moveIndicator(newLinkRef.current)
      return
    }
    newLinkRef.current = e.target
    moveIndicator(newLinkRef.current)
  }

  function moveIndicator(newLink) {
    const newTabWidth = newLink.offsetWidth / listRef.current.offsetWidth

    listRef.current.style.setProperty('--_left', newLink.offsetLeft + 'px')
    listRef.current.style.setProperty('--_width', newTabWidth)

    activeLinkRef.current = newLink
  }

  useEffect(() => {
    activeLinkRef.current.dataset.selected = 'true'
    moveIndicator(activeLinkRef.current)
  }, [])

  return (
    <nav className={styles.navbar}>
      <ul ref={listRef}>
        <li>
          <Link
            href="/"
            onClick={handleClick}
            ref={activeLinkRef}
          >
            Forside
          </Link>
        </li>
        <li>
          <Link
            href="/sortering"
            onClick={handleClick}
          >
            Sortering
          </Link>
        </li>
        <li>
          <Link
            href="/genbrugsstationer"
            onClick={handleClick}
          >
            Genbrugsstationer
          </Link>
        </li>
        <li onClick={handleClick}>
          <Link
            href="/bestil-beholder"
            onClick={handleClick}
          >
            Bestil Beholder
          </Link>
        </li>
      </ul>
    </nav>
  )
}
