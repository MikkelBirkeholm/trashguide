import Image from 'next/image'

import styles from './styles.module.scss'
import Link from 'next/link'
import { memo } from 'react'

export const SectionCard = memo(({ id, title, color, filename }) => {
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
})
