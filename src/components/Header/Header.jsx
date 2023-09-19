import Image from 'next/image'
import { Navbar } from '../Navbar/Navbar'
import styles from './Header.module.scss'
import Link from 'next/link'
import { MobileNavbar } from '../Navbar/MobileNavbar'

export default function Header() {
  return (
    <div className={styles.header}>
      <div className="logowrapper">
        <Image
          src="/logo-small.png"
          width={30}
          height={30}
          style={{ objectFit: 'contain' }}
          alt=""
        />
        <span>Affaldsguiden</span>
      </div>
      <Navbar />
      <MobileNavbar />

      <div className={styles.lock}>
        <Link href="/login">
          <Image
            src="/icon-locked.svg"
            width={20}
            height={20}
            style={{ objectFit: 'contain' }}
            alt=""
          />
        </Link>
      </div>
    </div>
  )
}
