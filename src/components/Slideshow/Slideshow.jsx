import Image from 'next/image'
import React from 'react'

export const Slideshow = () => {
  return (
    <div>
      <Image
        src="/slides/malerspande.jpg"
        alt=""
        style={{ objectFit: 'cover', width: '100vw', height: '60vh' }}
        width={1000}
        height={400}
      />
    </div>
  )
}
