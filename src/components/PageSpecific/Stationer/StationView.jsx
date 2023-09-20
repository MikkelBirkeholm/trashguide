'use client'
import { RatingStar } from '@/components/Singles/RatingStar'
import { calcReviewAvg } from '@/utils/calcReviewAvg'
import styles from './styles.module.scss'
import { Map } from './Maps/Map'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { Spinner } from './Maps/Spinner'
import { ReviewForm } from './Anmeldelser/ReviewForm'

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <Spinner />
    case Status.FAILURE:
      return <p>Error!</p>
  }
}

export const StationView = ({ data }) => {
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
        <Wrapper
          apiKey={process.env.NEXT_PUBLIC_MAP_KEY}
          render={render}
        >
          <Map
            center={center}
            zoom={zoom}
            disableZoom={false}
          />
        </Wrapper>
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
      <ReviewForm />
    </div>
  )
}
