'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

export default function Search({ searchParams }) {
  const search = searchParams.s
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    async function getSearchResult() {
      const res = await fetch(`http://localhost:4000/search/${search}`)
      const data = await res.json()
      setSearchResult(data)
      console.log(data)
    }
    if (search) {
      getSearchResult()
    }
  }, [search])

  return (
    <main>
      {searchResult ? (
        <div className={styles.resultWrapper}>
          <p>
            Vi fandt {searchResult.num_result} resultater for '
            {searchResult.keyword}'
          </p>
          {searchResult.data.map((item, i) => {
            return <p key={i}>{item.title}</p>
          })}
        </div>
      ) : (
        <p>Vi kunne ikke finde noget på din forespørgelse</p>
      )}
    </main>
  )
}
