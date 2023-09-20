import { StationCard } from '@/components/PageSpecific/Stationer/StationCard'
import styles from './styles.module.scss'

async function getLocations() {
  const res = await fetch('http:localhost:4000/orgs?attributes=id', {
    cache: 'no-store',
  })
  const data = await res.json()
  return data
}

async function getLocationDetails(id) {
  const res = await fetch(`http:localhost:4000/orgs/${id}`)
  const data = await res.json()
  return data
}

async function compiledData(data) {
  const formattedData = await Promise.all(
    data.map(async (loc) => {
      const details = await getLocationDetails(loc.id)
      return details
    })
  )
  return formattedData
}

export default async function Page() {
  const locations = await getLocations()
  const locationDetails = await compiledData(locations)

  return (
    <main>
      <div className="contentwrapper">
        <div className={styles.locationGrid}>
          {locationDetails.map((location) => {
            return (
              <StationCard
                data={location}
                key={location.id}
              />
            )
          })}
        </div>
      </div>
    </main>
  )
}
