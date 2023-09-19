import React from 'react'
import styles from './styles.module.scss'

import { Logo } from '@/components/Singles/Logo'
import { LoginForm } from '@/components/User/LoginForm'

export default async function Page() {
  return (
    <div className={styles.loginPage}>
      <div>
        <Logo />
        <h1>Log ind på Affaldsguiden for at anmelde stationer</h1>
      </div>
      <div>
        <LoginForm />
      </div>
    </div>
  )
}
