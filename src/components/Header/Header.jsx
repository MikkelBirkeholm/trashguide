import { Navbar } from '../Navbar/Navbar'
import styles from './Header.module.scss'
import { MobileNavbar } from '../Navbar/MobileNavbar'
import { Logo } from '../Singles/Logo'
import LockButton from './LockButton'

export default function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <Navbar />
      <MobileNavbar />
      <LockButton />
    </div>
  )
}
