'use client'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const BestillingsForm = () => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [final, setFinal] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [data, setData] = useState({
    1: null, // container_id
    2: null, // bestillingsinformationer
  })

  // renderer steps
  const stepComponents = {
    1: (
      <StepOne
        data={data[1]}
        callback={(stepData, step_num) => handleData(stepData, step_num)}
      />
    ),
    2: (
      <StepTwo
        data={data[2]}
        callback={(stepData, next_step) => handleData(stepData, next_step)}
        finalSubmitCallback={(userData) => handleFinalSubmit(userData)}
      />
    ),
  }

  // sætter dataen ved step-skifte
  function handleData(stepData, step_num) {
    if (!stepData) return
    setData((prev) => ({ ...prev, [step]: stepData }))
    setStep(step_num)
  }

  // igangsætter post af formular
  function handleFinalSubmit(userData) {
    setData((prev) => ({ ...prev, [step]: userData }))
    setFinal(true)
  }

  // lytter til post af formular
  useEffect(() => {
    async function postData() {
      const container_id = +data[1]

      const formData = new FormData()
      formData.append('fullname', data[2].navn)
      formData.append('address', data[2].adresse)
      formData.append('zipcode', data[2].zipcode)
      formData.append('city', data[2].city)
      formData.append('phone', data[2].telefon)
      formData.append('email', data[2].email)
      formData.append('container_id', container_id)

      try {
        const res = await fetch('http://localhost:3000/api/bestil/post', {
          method: 'post',
          body: formData,
        })
        if (res.status == 200) {
          const parsedRes = await res.json()
          router.push('/bestil-beholder/godkendt')
        }
        if (!res.status == 200) {
          setErrorMsg('Noget gik galt. Prøv igen senere.')
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (final) {
      postData()
    }
  }, [final])

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.indicatorWrapper}>
        <div className={styles.indicator}>
          <span data-step="true">1</span>
          <span data-step={step == 2 ? 'true' : ''}>2</span>
        </div>
      </div>
      <div className={styles.formContainer}>
        <span>Trin {step}</span>
        {stepComponents[step]}

        {errorMsg && <span>{errorMsg}</span>}
      </div>
    </div>
  )
}

const StepOne = ({ callback, data }) => {
  const [beholderData, setBeholderData] = useState()
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { beholder: data },
  })

  useEffect(() => {
    // henter beholdere
    async function getBeholderListe() {
      const res = await fetch('http://localhost:4000/containers')
      const data = await res.json()
      setBeholderData(data)
    }
    getBeholderListe()
  }, [])

  const choice = watch('beholder')

  function handleCallback() {
    callback(choice, 2)
  }

  return (
    <form
      onSubmit={handleSubmit(handleCallback)}
      className={styles.stepOne}
    >
      <h1>Vælg type</h1>
      <p>
        Vælg hvilken type beholder, du vil bestille. Skal du bestille flere
        beholdere, skal du lave flere bestillinger.
      </p>
      <fieldset>
        {beholderData?.map((bh) => {
          return (
            <label key={bh.id}>
              <input
                type="radio"
                key={bh.name}
                value={bh.id}
                {...register('beholder', {
                  required: 'Du skal vælge en beholder',
                })}
              />
              <Image
                src={`/Images/Icons/${bh.icon_filename}`}
                width={70}
                height={70}
                alt={bh.name}
              />
              {bh.name}
            </label>
          )
        })}
        {errors.beholder && (
          <p className={styles.errorMsg}>{errors.beholder?.message}</p>
        )}
      </fieldset>
      <button>Videre</button>
    </form>
  )
}

const StepTwo = ({ data, callback, finalSubmitCallback }) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (data) {
      setValue('navn', data.navn)
      setValue('email', data.email)
      setValue('telefon', data.telefon)
      setValue('adresse', data.adresse)
      setValue('city', data.city)
      setValue('zipcode', data.zipcode)
    }
  }, [])

  const userData = watch()

  function handleCallback(e) {
    e.preventDefault()
    callback(userData, 1)
  }

  function handleFinalSubmit() {
    finalSubmitCallback(userData)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFinalSubmit)}
      className={styles.stepTwo}
    >
      <h1>Hvor skal vi levere?</h1>
      <p>
        Indtast dit fulde navn, telefonnummer, email og adresse. Du modtager en
        bekræftelse på mail.
      </p>
      <label>
        <span>Navn</span>
        <input
          type="text"
          placeholder="Navn"
          {...register('navn', {
            required: 'Du skal indtaste dit navn',
            pattern: {
              value: /^[a-zæøåA-ZÆØÅ]{2,40}(?: +[a-zæøåA-ZÆØÅ]{2,40})+$/,
              message: 'Skriv dit fulde navn',
            },
          })}
        />
        {errors.navn && (
          <p className={styles.errorMsg}>{errors.navn?.message}</p>
        )}
      </label>
      <div className={styles.inputRow}>
        <label>
          <span>Email</span>
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Du skal indtaste din email',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Du skal følge formatet: tekst@tekst.xx',
              },
            })}
          />
          {errors.email && (
            <p className={styles.errorMsg}>{errors.email?.message}</p>
          )}
        </label>
        <label>
          <span>Telefon</span>
          <input
            placeholder="Telefon"
            type="tel"
            {...register('telefon', {
              required: 'Indtast telefonnummer',
              pattern: {
                value: /^[\+\(\s.\-\/\d\)]{5,15}$/,
                message: 'Ugyldigt telefonnummer',
              },
            })}
          />
          {errors.telefon && (
            <p className={styles.errorMsg}>{errors.telefon?.message}</p>
          )}
        </label>
      </div>
      <div className={styles.inputRow}>
        <label>
          <span>Adresse</span>
          <input
            placeholder="Adresse"
            type="text"
            {...register('adresse', {
              required: 'Indtast vejnavn og husnummer',
            })}
          />
          {errors.adresse && (
            <p className={styles.errorMsg}>{errors.adresse?.message}</p>
          )}
        </label>
        <label>
          <span>By</span>
          <input
            placeholder="By"
            type="text"
            {...register('city', {
              required: 'Indtast bynavn',
            })}
          />
          {errors.city && (
            <p className={styles.errorMsg}>{errors.city?.message}</p>
          )}
        </label>
        <label>
          <span>Postnummer</span>
          <input
            placeholder="Postnummer"
            type="text"
            {...register('zipcode', {
              required: 'Indtast postnummer',
            })}
          />
          {errors.zipcode && (
            <p className={styles.errorMsg}>{errors.zipcode?.message}</p>
          )}
        </label>
      </div>
      <div className={styles.buttonWrapper}>
        <button
          className="alt-btn"
          onClick={handleCallback}
        >
          Tilbage
        </button>
        <button type="submit">Send</button>
      </div>
    </form>
  )
}
