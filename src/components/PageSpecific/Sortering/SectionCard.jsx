import Image from 'next/image'
import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

export const SectionCard = ({ id, title, color, filename, filepath }) => {
  return (
    <div className={styles.sectionCard}>
      <Link href={`/sortering/${id}`}>
        <Image
          src={`/Images/Guide/Categories/${filename}`}
          width={200}
          height={400}
          alt={title}
          style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
        />
        <div style={{ backgroundColor: `#${color}` }}>
          <p>{title}</p>
        </div>
      </Link>
    </div>
  )
}
