'use client'
import { useForm, Controller } from 'react-hook-form'
import styles from '../styles.module.scss'
import { useRef, useState } from 'react'
import { RatingStar } from '@/components/Singles/RatingStar'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export const ReviewForm = ({ loggedIn, org }) => {
  const router = useRouter()
  const [hoverRating, setHoverRating] = useState(0)
  const { control, handleSubmit, register, reset } = useForm()
  const formRef = useRef()

  const onSubmit = async (data) => {
    const formData = new FormData()
    const today = new Date()
    formData.append('subject', data.title)
    formData.append('org_id', org)
    formData.append('comment', data.review)
    formData.append('num_stars', data.rating)
    formData.append('date', today)

    const res = await fetch('http://localhost:3000/api/reviews/post', {
      method: 'post',
      body: formData,
    })
    const resData = await res.json()
    if (resData.newId) {
      reset()
      router.refresh()
    }
  }

  const renderStars = (rating, onChange) => {
    return (
      <div style={{ display: 'flex' }}>
        {Array.from({ length: 5 }, (_, i) => {
          const value = i + 1
          return (
            <RatingStar
              key={i}
              filled={value <= (hoverRating || rating)}
              onClick={() => {
                onChange(value)
                setHoverRating(0) // Reset hover rating
              }}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
            />
          )
        })}
      </div>
    )
  }

  return (
    <>
      {loggedIn ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.reviewForm}
          ref={formRef}
        >
          <div>
            <h3>Skriv en kommentar</h3>
            <Controller
              name="rating"
              control={control}
              defaultValue={0}
              render={({ field }) => renderStars(field.value, field.onChange)}
            />
          </div>
          <input
            placeholder="Overskrift"
            type="text"
            {...register('title', { required: true })}
          />
          <textarea
            placeholder="Kommentar"
            {...register('review', { required: true })}
            id="review"
            rows="4"
            cols="50"
          />

          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20.243"
              height="20.243"
              viewBox="0 0 20.243 20.243"
            >
              <path
                id="Shape"
                d="M18.243,12.162a2.027,2.027,0,0,1-2.027,2.027H4.054L0,18.243V2.027A2.027,2.027,0,0,1,2.027,0H16.216a2.027,2.027,0,0,1,2.027,2.027Z"
                transform="translate(1 1)"
                fill="none"
                stroke="#80ab87"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                fillRule="evenodd"
              />
            </svg>
            Kommenter
          </button>
        </form>
      ) : (
        <div className={styles.reviewForm}>
          <span style={{ margin: 'auto' }}>
            Log ind for at kommentere
            <br />
          </span>
          <Link
            href="/login"
            className="alt-btn"
            style={{ margin: 'auto' }}
          >
            Log Ind
          </Link>{' '}
        </div>
      )}
    </>
  )
}
