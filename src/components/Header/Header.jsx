import { Navbar } from '../Navbar/Navbar'
import { AuthButton } from '../User/AuthButton'
import { Login } from '../User/Login'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <div className={styles.header}>
      <Navbar />
      <AuthButton />
    </div>
  )
}
