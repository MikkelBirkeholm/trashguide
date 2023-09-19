// export async function generateStaticParams() {
//   const res = await fetch(`http://localhost:4000/events`)
//   const data = await res.json()
//   const showIDs = data.map((show) => show.id)

import { SectionView } from '@/components/PageSpecific/Sortering/SectionView'

//   return showIDs.map((id) => ({
//     slug: id,
//   }))
// }

async function getSectionDetails(id) {
  const res = await fetch(`http://localhost:3001/section/${id}`)
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
