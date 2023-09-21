import Link from 'next/link'

async function getCategoryData(id) {
  const res = await fetch(`http://localhost:4000/category/details/${id}`)
  const data = await res.json()
  return data
}

async function hasCategory(categoryId) {
  const res = await fetch(`http://localhost:4000/types/77`)
  const types = await res.json()

  const result = types.filter((type) => type.id == categoryId)
  const filteredResult = result.map((item) => {
    return item.categories.filter((cat) => cat.rules.is_allowed == true)
  })

  return filteredResult
}

async function filterData(array) {
  const catIds = array[0].map((cat) => cat.id)

  const dataArray = catIds.map(async (id) => {
    const catDetails = await getCategoryData(id)
    return catDetails
  })
  const compiledData = await Promise.all(dataArray)
  return compiledData
}

export default async function Page({ params }) {
  const id = params.id
  const allTypes = await hasCategory(id)
  const filteredTypes = await filterData(allTypes)

  if (filteredTypes.length == 0) {
    return (
      <main>
        <div className="contentwrapper">
          <p>Vi håndterer desværre ikke denne type affald</p>
        </div>
      </main>
    )
  }
  return (
    <main>
      <div className="contentwrapper">
        <h1>Sorteres under:</h1>
        {filteredTypes.map((item, i) => {
          return (
            <Link
              key={i}
              href={`http://localhost:3000/sortering/kategori/${item.id}`}
            >
              {item.title}
            </Link>
          )
        })}
      </div>
    </main>
  )
}
