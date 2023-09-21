import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link
      className="logowrapper"
      href="/"
      alt="Til forsiden"
    >
      <Image
        src="/logo-small.png"
        width={30}
        height={30}
        style={{ objectFit: 'contain' }}
        alt=""
      />
      <span>Affaldsguiden</span>
    </Link>
  )
}
