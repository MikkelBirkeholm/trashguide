import { BestillingsForm } from '@/components/PageSpecific/BestilBeholder/BestillingsForm'
import React from 'react'

async function getBeholderListe() {
  const res = await fetch('http://localhost:4000/containers')
  const data = await res.json()
  return data
}

export default async function Page() {
  const beholderData = await getBeholderListe()

  return (
    <main>
      <div className="contentwrapper">
        <BestillingsForm />
      </div>
    </main>
  )
}
