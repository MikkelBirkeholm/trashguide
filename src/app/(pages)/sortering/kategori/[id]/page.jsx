import { FoldOut } from '@/components/PageSpecific/Sortering/SectionView'

//   return showIDs.map((id) => ({
//     slug: id,
//   }))
// }

async function getCategoryData(id) {
  const res = await fetch(`http://localhost:4000/category/details/${id}`)
  const data = await res.json()
  return data
}

export default async function Page({ params }) {
  const id = params.id
  const details = await getCategoryData(id)

  return (
    <main>
      <div
        className="contentwrapper"
        style={{ padding: '4rem 0' }}
      >
        <FoldOut data={details} />
      </div>
    </main>
  )
}
