import Image from 'next/image'
import { Navbar } from '../Navbar/Navbar'
import { AuthButton } from '../User/AuthButton'
import { Login } from '../User/Login'
import styles from './Header.module.scss'

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
      <div className={styles.lock}>
        <Image
          src="/icon-locked.svg"
          width={20}
          height={20}
          style={{ objectFit: 'contain' }}
          alt=""
        />
      </div>
    </div>
  )
}
