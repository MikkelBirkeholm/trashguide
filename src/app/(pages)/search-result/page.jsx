'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

export default function Search({ searchParams }) {
  const search = searchParams.s
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    async function getSearchResult() {
      const res = await fetch(`http://localhost:4000/search/${search}`)
      const data = await res.json()

      // sorter resultat i hhv kategorier og typer
      const categories = data.data.filter((item) => item.type === 'category')
      const types = data.data.filter((item) => item.type === 'type')

      setSearchResult({
        count: data.num_result,
        keyword: data.keyword,
        categories: categories,
        types: types,
      })
    }
    if (search) {
      getSearchResult()
    }
  }, [search])

  return (
    <main>
      {searchResult ? (
        <div className={styles.resultWrapper}>
          <h1>
            Vi fandt {searchResult.count} resultater for '{searchResult.keyword}
            '
          </h1>
          <div className={styles.results}>
            <h2>Kategorier</h2>
            <ul>
              {searchResult.categories.map((item, i) => {
                return (
                  <li key={i}>
                    <Link
                      href={`http://localhost:3000/sortering/kategori/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <h2>Typer</h2>
            <ul>
              {searchResult.types.map((item, i) => {
                return (
                  <li key={i}>
                    <Link
                      href={`http://localhost:3000/sortering/type/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      ) : (
        <p>Vi kunne ikke finde noget på din forespørgelse</p>
      )}
    </main>
  )
}
