import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>404</h2>
      <p>Det ser ikke ud til siden findes</p>
      <Link href="/">Tilbage til forsiden</Link>
    </div>
  )
}
