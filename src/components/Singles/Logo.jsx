import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="logowrapper">
      <Image
        src="/logo-small.png"
        width={30}
        height={30}
        style={{ objectFit: 'contain' }}
        alt=""
      />
      <span>Affaldsguiden</span>
    </div>
  )
}
