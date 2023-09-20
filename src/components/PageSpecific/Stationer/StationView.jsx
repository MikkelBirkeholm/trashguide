import { RatingStar } from '@/components/Singles/RatingStar'
import { calcReviewAvg } from '@/utils/calcReviewAvg'
import styles from './styles.module.scss'
import { ReviewForm } from './Anmeldelser/ReviewForm'
import { MapWrapper } from './Maps/MapWrapper'
import { cookies } from 'next/headers'
import { Reviews } from './Anmeldelser/Reviews'

export const StationView = async ({ data, org }) => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  const center = { lat: data.longtitude, lng: data.latitude }
  const zoom = 11

  const reviewAvg = calcReviewAvg(data.reviews)

  const stars = Array.from({ length: 5 }, (_, i) => (
    <RatingStar
      key={i}
      filled={i < reviewAvg}
    />
  ))

  return (
    <div className={styles.stationOuterWrapper}>
      <div className={styles.mapWrapper}>
        <MapWrapper
          center={center}
          zoom={zoom}
          disableZoom={false}
        />
      </div>
      <div className={styles.detailsWrapper}>
        <h1>{data.name}</h1>
        <div className={styles.ratings}>{stars}</div>
        <p>{data.address}</p>
        <p>
          {data.zipcode} {data.city}
        </p>
        <p>{data.country}</p>
      </div>
      <hr />
      <ReviewForm
        loggedIn={!!token}
        org={org}
      />
      <Reviews id={org} />
    </div>
  )
}
