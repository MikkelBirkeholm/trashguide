'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import useUser from '@/utils/useUser'

export const Logout = () => {
  const router = useRouter()
  const [checkUser, logUserOut, logUserIn] = useUser()

  async function handleLogOut() {
    const logout = await logUserOut()
    if (logout) {
      router.refresh()
    }
  }

  return <button onClick={() => handleLogOut()}>Logout</button>
}
