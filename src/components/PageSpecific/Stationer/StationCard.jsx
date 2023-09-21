import styles from './styles.module.scss'
import Link from 'next/link'

import { RatingStar } from '@/components/Singles/RatingStar'

import { calcReviewAvg } from '@/utils/calcReviewAvg'

import { MapWrapper } from './Maps/MapWrapper'

export const StationCard = ({ data }) => {
  const center = { lat: data.longtitude, lng: data.latitude }
  const zoom = 12

  const reviewAvg = calcReviewAvg(data.reviews)

  const stars = Array.from({ length: 5 }, (_, i) => (
    <RatingStar
      key={i}
      filled={i < reviewAvg}
    />
  ))

  return (
    <div className={styles.stationCard}>
      <Link href={`/genbrugsstationer/${data.id}`}>
        <div className={styles.mapWrapper}>
          <MapWrapper
            center={center}
            zoom={zoom}
            disableZoom={true}
          />
        </div>
        <div className={styles.cardDetails}>
          <h2>{data.name}</h2>
          <p>{data.address}</p>
          <p>
            {data.zipcode} {data.city}
          </p>
          <hr />
          <div className={styles.ratings}>
            {stars}
            <p>
              {data.reviews.length} anmeldelse
              {data.reviews.length >= 2 || !data.reviews.length ? 'r' : ''}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
