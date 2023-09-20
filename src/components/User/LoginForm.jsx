'use client'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'
import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'

export const LoginForm = () => {
  const [showPass, setShowPass] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const fieldRef = useRef()
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
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'post',
        body: formData,
      })

      if (res.status == 200) {
        const parsedRes = await res.json()
        sessionStorage.setItem('token', parsedRes.access_token)
        sessionStorage.setItem('user_id', parsedRes.user.id)
        router.push('/')
      }
      if (res.status == 401) {
        setErrorMsg('Brugernavn eller password er forkert')
      }
    } catch (error) {
      console.log(error)
    }
  }

  function showHidePass() {
    setShowPass(!showPass)
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
            type={showPass ? 'text' : 'password'}
            ref={fieldRef}
            placeholder="Indtast dit kodeord"
            {...register('password', {
              required: 'Du skal udfylde dette felt',
            })}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            onClick={showHidePass}
          >
            {showPass ? (
              <path
                fill="currentColor"
                d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"
              ></path>
            ) : (
              <path
                fill="currentColor"
                d="M12 17.5c-3.8 0-7.2-2.1-8.8-5.5H1c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5h-2.2c-1.6 3.4-5 5.5-8.8 5.5Z"
              ></path>
            )}
          </svg>

          {errors.password && <p>{errors.password?.message}</p>}
        </label>

        <button>Log Ind</button>
      </form>
      {errorMsg && <span>{errorMsg}</span>}
    </div>
  )
}
