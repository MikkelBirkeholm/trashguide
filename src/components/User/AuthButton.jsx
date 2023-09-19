'use client'
import useUser from '@/utils/useUser'
import { Login } from './LoginForm'
import { Logout } from './Logout'
import { useEffect, useState } from 'react'

export const AuthButton = () => {
  const [checkUser] = useUser()
  const [user, setUser] = useState(null)
  const checker = checkUser()

  useEffect(() => {
    async function getUser() {
      const gottenUser = await checkUser()
      setUser(gottenUser)
    }
    getUser()
  }, [checker])

  return <div>{user ? <Logout /> : <Login />}</div>
}
