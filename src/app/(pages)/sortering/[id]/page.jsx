import { SectionView } from '@/components/PageSpecific/Sortering/SectionView'

async function getSectionDetails(id) {
  const res = await fetch(`http://localhost:4000/section/${id}`)
  const data = await res.json()
  return data
}

export default async function Page({ params }) {
  const id = params.id
  const details = await getSectionDetails(id)

  return (
    <main>
      <div className="contentwrapper">
        <SectionView data={details} />
      </div>
    </main>
  )
}
