import { Slideshow } from '@/components/Slideshow/Slideshow'

export default async function Home() {
  return (
    <main>
      <Slideshow />
      <div className="contentwrapper">
        <h1>Boilerplate</h1>
        <hr />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
          repellat facere maiores suscipit nobis quos. Dolorum totam in illum
          fuga reprehenderit unde vel mollitia possimus facere! Corporis, fuga
          sint. Doloribus.
        </p>
        <button>Disabled Button</button>
      </div>
    </main>
  )
}
