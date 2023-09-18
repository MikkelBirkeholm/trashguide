'use client'
import useUser from '@/utils/useUser'
import { useRouter } from 'next/navigation'

export const Login = () => {
  const router = useRouter()
  const [checkUser, logUserOut, logUserIn] = useUser()

  async function handleSubmit(e) {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    const login = await logUserIn(username, password)
    if (login) {
      router.refresh()
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="username"
          defaultValue={`${process.env.NEXT_PUBLIC_USERNAME}`}
        />
        <input
          type="password"
          name="password"
          defaultValue={`${process.env.NEXT_PUBLIC_PASSWORD}`}
        />
        <button>Log Ind</button>
      </form>
    </div>
  )
}
