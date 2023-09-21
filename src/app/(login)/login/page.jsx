import React from 'react'
import styles from './styles.module.scss'

import { Logo } from '@/components/Singles/Logo'
import { LoginForm } from '@/components/User/LoginForm'
import Link from 'next/link'

export default async function Page() {
  return (
    <div>
      <div className={styles.loginPage}>
        <div>
          <Logo />
          <h1>Log ind på Affaldsguiden for at anmelde stationer</h1>
          <Link
            href="/"
            className="alt-btn arrow-right"
          >
            Tilbage
          </Link>
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
