export function calcReviewAvg(reviews) {
  if (reviews.length === 0) {
    return 0
  }

  // Sum up all the 'num_stars' using Array.reduce()
  const totalStars = reviews.reduce((acc, review) => acc + review.num_stars, 0)

  // Calculate the average by dividing the total stars by the number of reviews
  const averageStars = totalStars / reviews.length

  // Round to the nearest whole number
  return Math.round(averageStars)
}
