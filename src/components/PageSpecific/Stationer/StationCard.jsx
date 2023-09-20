'use client'
import styles from './styles.module.scss'
import Link from 'next/link'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { RatingStar } from '@/components/Singles/RatingStar'

import { calcReviewAvg } from '@/utils/calcReviewAvg'
import { Spinner } from './Maps/Spinner'
import { Map } from './Maps/Map'

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <Spinner />
    case Status.FAILURE:
      return <p>Error!</p>
  }
}

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
          <Wrapper
            apiKey={process.env.NEXT_PUBLIC_MAP_KEY}
            render={render}
          >
            <Map
              center={center}
              zoom={zoom}
              disableZoom={true}
            />
          </Wrapper>
        </div>
        <div className={styles.detailsWrapper}>
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
