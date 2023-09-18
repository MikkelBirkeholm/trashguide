import Image from 'next/image'
import React from 'react'
import style from './TextImageBox.module.scss'

export const TextImageBox = ({
  imgSrc = 'https://dummyimage.com/400x600/000/fff',
  imgPos,
  title,
  children,
}) => {
  // imgSrc = url til billede
  // imgPos = left || right = billede til venstre eller højre
  const pos = imgPos == 'left' ? 'ltr' : 'rtl'

  function styledTitle() {
    const wordArr = title.split(' ')
    const firstWord = wordArr.slice(1)
    const minusFirst = firstWord.join(' ')

    return [wordArr[0], minusFirst]
  }

  const printTitle = styledTitle()

  return (
    <div
      className={style.boxwrapper}
      style={{ '--image-pos': pos }}
    >
      <Image
        src={imgSrc}
        width={200}
        height={500}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: 'auto',
          borderRadius: '1rem',
        }}
        alt=""
      />
      <div>
        <h2>
          {printTitle[0]} <span>{printTitle[1]}</span>
        </h2>
        {children}
      </div>
    </div>
  )
}
