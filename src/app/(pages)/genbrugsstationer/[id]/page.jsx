import { StationView } from '@/components/PageSpecific/Stationer/StationView'

async function getSectionDetails(id) {
  const res = await fetch(`http://localhost:4000/orgs/${id}`, {
    next: { revalidate: 10 },
  })
  const data = await res.json()
  return data
}

export default async function Page({ params }) {
  const id = params.id
  const details = await getSectionDetails(id)

  return (
    <main>
      <div className="contentwrapper">
        <StationView
          data={details}
          org={id}
        />
      </div>
    </main>
  )
}
