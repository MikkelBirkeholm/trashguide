import { CardsGrid } from '@/components/PageSpecific/Sortering/CardsGrid'
import { SearchField } from '@/components/PageSpecific/Sortering/SearchField'
import { SectionCard } from '@/components/PageSpecific/Sortering/SectionCard'
import React from 'react'

async function getSorted() {
  const res = await fetch('http://localhost:4000/section')
  const data = await res.json()
  return data
}

export default async function Page() {
  const sectionData = await getSorted()
  return (
    <main>
      <div className="contentwrapper">
        <SearchField />
        <CardsGrid>
          {sectionData.map((item) => {
            return (
              <SectionCard
                title={item.title}
                key={item.id}
                id={item.id}
                filename={item.filename}
                filepath={item.filepath}
                color={item.color}
              />
            )
          })}
        </CardsGrid>
      </div>
    </main>
  )
}
