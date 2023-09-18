import { Slideshow } from '@/components/Slideshow/Slideshow'
import Link from 'next/link'

export default async function Home() {
  return (
    <main>
      <Slideshow />
      <div className="cta">
        <h2>Find og anmeld genbrugsstationer</h2>
        <div>
          <Link href="#">
            <button>Find station</button>
          </Link>
          <Link
            href="#"
            className="alt-btn"
          >
            Log Ind
          </Link>
        </div>
      </div>
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
