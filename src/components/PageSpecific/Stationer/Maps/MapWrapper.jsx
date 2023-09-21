'use client'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { Map } from './Map'
import { Spinner } from './Spinner'

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <Spinner />
    case Status.FAILURE:
      return <p>Error!</p>
  }
}

// denne component giver de nødvendige information til google maps (f.eks. API key)

export const MapWrapper = ({ center, zoom, disableZoom }) => {
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_MAP_KEY}
      render={render}
    >
      <Map
        center={center}
        zoom={zoom}
        disableZoom={disableZoom}
      />
    </Wrapper>
  )
}
