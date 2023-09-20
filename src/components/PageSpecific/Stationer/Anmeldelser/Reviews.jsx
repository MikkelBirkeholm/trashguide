import React from 'react'
import styles from '../styles.module.scss'
import convertDates from '@/utils/convertDates'
import { RatingStar } from '@/components/Singles/RatingStar'

async function getReviews(id) {
  const res = await fetch(`http://localhost:4000/reviews/${id}`)
  const data = await res.json()
  return data
}

export const Reviews = async ({ id }) => {
  const allReviews = await getReviews(id)
  console.log(allReviews)
  return (
    <div>
      <ReviewGrid>
        {allReviews.map((review) => {
          const stars = Array.from({ length: 5 }, (_, i) => (
            <RatingStar
              key={i}
              filled={i < review.num_stars}
            />
          ))
          const dates = convertDates(review.created_at)
          return (
            <div className={styles.reviewWrapper}>
              <div className={styles.imageContainer}>img</div>
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
