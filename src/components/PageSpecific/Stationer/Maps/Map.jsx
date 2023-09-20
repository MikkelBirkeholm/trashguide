'use client'
import { useEffect, useRef, useState } from 'react'

import styles from './styles.module.scss'

export const Map = ({ center, zoom, disableZoom }) => {
  const ref = useRef()

  const marker = new google.maps.Marker({
    position: center,
    title: 'Hello World!',
  })

  useEffect(() => {
    const newMap = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      gestureHandling: disableZoom ? 'none' : 'auto',
      disableDefaultUI: true,
    })
    marker.setMap(newMap)
  }, [])

  return (
    <div
      ref={ref}
      className={styles.mapContainer}
      id="map"
    />
  )
}
