'use client'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'
import { useForm } from 'react-hook-form'

export const LoginForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('password', data.password)

    const res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'post',
      body: formData,
    })

    if (res.ok) {
      const parsedRes = await res.json()
      const result = JSON.parse(parsedRes)
      sessionStorage.setItem('token', result.access_token)
      sessionStorage.setItem('user_id', result.user.id)
      sessionStorage.setItem('user_firstname', result.user.firstname)
      sessionStorage.setItem('user_lastname', result.user.lastname)
      console.log('didnt go back?')
      router.push('/')
    } else {
      console.log(res)
    }
  }

  function handleDemoClick() {
    setValue('username', process.env.NEXT_PUBLIC_USERNAME)
    setValue('password', process.env.NEXT_PUBLIC_PASSWORD)
  }
  return (
    <div className={styles.loginForm}>
      <h2>Log ind</h2>
      <a
        href="#"
        onClick={handleDemoClick}
      >
        Benyt demo-bruger
      </a>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Brugernavn</span>
          <input
            placeholder="Brugernavn (email)"
            type="email"
            {...register('username', {
              required: 'Du skal udfylde dette felt',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Du skal følge formatet: tekst@tekst.xx',
              },
            })}
          />
          {errors.username && <p>{errors.username?.message}</p>}
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            placeholder="Indtast dit kodeord"
            {...register('password', {
              required: 'Du skal udfylde dette felt',
            })}
          />
          {errors.password && <p>{errors.password?.message}</p>}
        </label>

        <button>Log Ind</button>
      </form>
    </div>
  )
}
