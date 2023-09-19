import Image from 'next/image'
import styles from './Header.module.scss'
import Link from 'next/link'
import { cookies } from 'next/headers'

export default function LockButton() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  return (
    <div className={styles.lock}>
      {token ? (
        <a
          href="/api/auth/logout"
          className={styles.logOutBtn}
        >
          <Image
            src="/icon-lock.svg"
            width={20}
            height={20}
            style={{ objectFit: 'contain' }}
            alt=""
          />
          <p>Log ud</p>
        </a>
      ) : (
        <Link
          href="/login"
          className={styles.logOutBtn}
        >
          <Image
            src="/icon-locked.svg"
            width={20}
            height={20}
            style={{ objectFit: 'contain' }}
            alt=""
          />
          <p>Log ind</p>
        </Link>
      )}
    </div>
  )
}
