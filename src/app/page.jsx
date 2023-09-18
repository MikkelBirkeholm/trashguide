import { Slideshow } from '@/components/Slideshow/Slideshow'
import { TextImageBox } from '@/components/TextImageBox/TextImageBox'
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
        <TextImageBox
          imgPos="right"
          imgSrc="/fp-trashcans.png"
          title="Din guide til sortering"
        >
          <p>
            Her kan du se hvordan du skal sortere og hvad der skal i hvilke
            beholdere. Du får også tips og tricks til, hvordan du gør det nemt
            at sortere hjemme hos dig.
          </p>
          <button>Se affaldsguide</button>
        </TextImageBox>
        <TextImageBox
          imgPos="left"
          imgSrc="/fp-silvertrash.png"
          title="Bestil din nye affaldsbeholder"
        >
          <p>
            Her kan du bestille nye affaldsbeholdere direkte hjem til din
            addresse
          </p>
          <button>Bestil her</button>
        </TextImageBox>
      </div>
    </main>
  )
}
