'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export const DeleteBtn = ({ user_id, review_id }) => {
  const router = useRouter()
  async function handleDelete() {
    const res = await fetch(`/api/reviews/delete/${review_id}/${user_id}`)
    const data = await res.json()
    if (data.message) {
      router.refresh()
    }
  }
  return <button onClick={handleDelete}>Slet</button>
}
