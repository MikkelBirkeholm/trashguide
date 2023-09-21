import convertDates from '@/utils/convertDates'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import styles from './styles.module.scss'
import Link from 'next/link'

async function getBookings(user) {
  const res = await fetch(`http://localhost:4000/orders/`, {
    cache: 'no-store',
  })
  const data = await res.json()

  const filteredData = data.filter((i) => i.email == user)

  const bookingDetails = filteredData.map(async (i) => {
    const res = await fetch(`http://localhost:4000/orders/${i.id}`, {
      cache: 'no-store',
    })
    const data = await res.json()
    return data
  })
  const compiledData = await Promise.all(bookingDetails)

  return compiledData
}

async function getBeholderListe() {
  const res = await fetch('http://localhost:4000/containers')
  const data = await res.json()
  return data
}

async function getUser(id) {
  const userData = await fetch(`http://localhost:4000/users/${id}`)
  const user = await userData.json()
  return user
}

export default async function Page() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const user_id = cookieStore.get('user_id')
  const beholderData = await getBeholderListe()
  const user = await getUser(user_id.value)
  const allBookins = await getBookings(user.email)

  if (!token) {
    redirect('/')
  }
  return (
    <div className={styles.minSide}>
      <Link
        href="/"
        className="alt-btn arrow-right"
      >
        Tilbage
      </Link>
      <a href="/api/auth/logout">
        <button>Log ud</button>
      </a>
      <Link href="/bestil-beholder">
        <button>Bestil beholder</button>
      </Link>
      <h1>Velkommen, {user.firstname}.</h1>
      <p>Her er dine kommende bestillinger:</p>
      <ul>
        {allBookins.map((i) => {
          const dates = convertDates(i.createdAt)
          const beholder = beholderData.find((bh) => bh.id == i.container_id)
          return (
            <li key={i.id}>
              <div>
                <span>Beholder:</span> <p>{beholder.name}</p>
              </div>

              <div>
                <span>Bestillingsdato:</span>
                <p>
                  {dates.date}. {dates.month}
                </p>
              </div>
              <div>
                <span>Leveringsadresse:</span>
                <p>
                  {i.address}, {i.zipcode} {i.city}
                </p>
              </div>
              <hr />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
