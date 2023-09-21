import React from 'react'
import styles from '../styles.module.scss'
import convertDates from '@/utils/convertDates'
import { RatingStar } from '@/components/Singles/RatingStar'
import { cookies } from 'next/headers'
import { DeleteBtn } from './DeleteBtn'

async function getReviews(id) {
  // fetcher alle reviews
  const res = await fetch(`http://localhost:4000/reviews/${id}`)
  const data = await res.json()
  return data
}

export const Reviews = async ({ id }) => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const user_id = cookieStore.get('user_id')

  const allReviews = await getReviews(id)

  return (
    <div>
      <ReviewGrid>
        {allReviews.map((review) => {
          // renderer stjerner udfra gennemsnits-rating
          const stars = Array.from({ length: 5 }, (_, i) => (
            <RatingStar
              key={i}
              filled={i < review.num_stars}
            />
          ))
          //konverterer/opdeler dato-string
          const dates = convertDates(review.created_at)
          return (
            <div
              className={styles.reviewWrapper}
              key={review.id}
            >
              <div className={styles.imageContainer}>
                {review.user.firstname[0]}
              </div>
              <div className={styles.reviewContent}>
                <div className={styles.contentHeader}>
                  <span>
                    {review.user.firstname} {review.user.lastname}
                  </span>
                  <span>
                    {dates.date}. {dates.month} {dates.year}
                  </span>
                </div>
                <div className={styles.ratings}>{stars}</div>
                <h4>{review.subject}</h4>
                <p>{review.comment}</p>
                {token && review.user.id == user_id.value && (
                  // ----- til demo evt ----
                  // <form
                  //   method="post"
                  //   action={`/api/reviews/delete/${review.id}/${review.user.id}`}
                  // >
                  //   <input
                  //     type="submit"
                  //     value="Slet"
                  //   />
                  // </form>
                  <DeleteBtn
                    user_id={review.user.id}
                    review_id={review.id}
                  />
                )}
              </div>
            </div>
          )
        })}
      </ReviewGrid>
    </div>
  )
}

const ReviewGrid = ({ children }) => {
  return <div className={styles.reviewGrid}>{children}</div>
}
