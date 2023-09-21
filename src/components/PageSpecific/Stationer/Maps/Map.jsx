'use client'
import { useEffect, useRef, useState } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import styles from './styles.module.scss'
import { Spinner } from './Spinner'

// selve map-component. Denne skal wrappes i en <Wrapper> i en parent component, før google.maps er tilgængelig.

export const Map = ({ center, zoom, disableZoom }) => {
  const ref = useRef()

  useEffect(() => {
    const newMap = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      gestureHandling: disableZoom ? 'none' : 'auto',
      disableDefaultUI: true,
    })

    const marker = new window.google.maps.Marker({
      position: center,
      title: 'Hello World!',
    })
    marker.setMap(newMap)
  }, [ref])

  return (
    <div
      ref={ref}
      className={styles.mapContainer}
      id="map"
    />
  )
}
