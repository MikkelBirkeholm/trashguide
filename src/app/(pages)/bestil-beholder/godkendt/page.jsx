import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Page() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  return (
    <main>
      <div className="contentwrapper">
        <div className="announcement">
          <h1>Din bestilling er modtaget</h1>
          {token && <Link href="/min-side">Gå til din side</Link>}
        </div>
      </div>
    </main>
  )
}
