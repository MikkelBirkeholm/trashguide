'use client'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'

export const SearchField = () => {
  const router = useRouter()
  function handleSubmit(e) {
    e.preventDefault()
    router.push(`/search-result?s=${e.target[0].value}`)
  }
  return (
    <div className={styles.searchFormWrapper}>
      <hgroup>
        <h1>Din guide</h1>
        <h2>Til en sund affaladssortering</h2>
      </hgroup>
      <form
        onSubmit={handleSubmit}
        className={styles.searchForm}
      >
        <label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Søg på affald..."
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"
              ></path>
            </svg>
          </button>
        </label>
      </form>
    </div>
  )
}
