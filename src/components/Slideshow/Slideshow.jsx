'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './Slideshow.module.scss'

const images = ['malerspande.jpg', 'affald-strand-2.jpg', 'affald-skov-1.jpg']

export const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      goToNextImage()
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentImageIndex])

  const goToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length
    setCurrentImageIndex(nextIndex)
  }

  const goToPreviousImage = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length
    setCurrentImageIndex(prevIndex)
  }

  return (
    <div className={styles.slideShow}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2rem"
        height="2rem"
        viewBox="0 0 67.737 67.737"
        onClick={goToNextImage}
      >
        <g
          id="IcTwotoneArrowCircleLeft"
          transform="translate(-2 -2)"
        >
          <path
            id="Path_13"
            data-name="Path 13"
            d="M58.19,31.095A27.095,27.095,0,1,1,31.095,4,27.131,27.131,0,0,1,58.19,31.095M31.095,34.482H44.642V27.708H31.095V17.547L17.547,31.095,31.095,44.642Z"
            transform="translate(4.774 4.774)"
            fill="#d8eadb"
            opacity="0.3"
          />
          <path
            id="Path_14"
            data-name="Path 14"
            d="M62.963,35.869A27.095,27.095,0,1,1,35.869,8.774,27.131,27.131,0,0,1,62.963,35.869m6.774,0A33.869,33.869,0,1,0,35.869,69.737,33.881,33.881,0,0,0,69.737,35.869ZM35.869,39.255H49.416V32.482H35.869V22.321L22.321,35.869,35.869,49.416Z"
            transform="translate(0 0)"
            fill="#d8eadb"
          />
        </g>
      </svg>
      <Image
        src={`/Images/Slideshow/${images[currentImageIndex]}`}
        alt=""
        fill={true}
        priority={true}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2rem"
        height="2rem"
        viewBox="0 0 67.737 67.737"
        onClick={goToPreviousImage}
      >
        <g
          id="IcTwotoneArrowCircleLeft"
          transform="translate(69.737 69.737) rotate(180)"
        >
          <path
            id="Path_13"
            data-name="Path 13"
            d="M58.19,31.095A27.095,27.095,0,1,1,31.095,4,27.131,27.131,0,0,1,58.19,31.095M31.095,34.482H44.642V27.708H31.095V17.547L17.547,31.095,31.095,44.642Z"
            transform="translate(4.774 4.774)"
            fill="#d8eadb"
            opacity="0.3"
          />
          <path
            id="Path_14"
            data-name="Path 14"
            d="M62.963,35.869A27.095,27.095,0,1,1,35.869,8.774,27.131,27.131,0,0,1,62.963,35.869m6.774,0A33.869,33.869,0,1,0,35.869,69.737,33.881,33.881,0,0,0,69.737,35.869ZM35.869,39.255H49.416V32.482H35.869V22.321L22.321,35.869,35.869,49.416Z"
            transform="translate(0 0)"
            fill="#d8eadb"
          />
        </g>
      </svg>
    </div>
  )
}
