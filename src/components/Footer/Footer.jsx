import Image from 'next/image'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.footerContent}>
          <div className="logowrapper">
            <Image
              src="/logo-white.svg"
              width={30}
              height={30}
              style={{ objectFit: 'contain' }}
              alt=""
            />
            <span>Affaldsguiden</span>
          </div>
          <p>
            Vi arbejder for at informere om korrekt affaldssortering. Ved at
            sortere hjælper du os, men også klimaet.
          </p>
          <span>©2023 Affaldsguiden. </span>
        </div>

        <div className={styles.arrowUp}>
          <a href="#">Til toppen</a>
          <Image
            src="/arrow-up.svg"
            width={30}
            height={30}
            style={{ objectFit: 'contain' }}
            alt=""
          />
        </div>
      </div>
    </footer>
  )
}
