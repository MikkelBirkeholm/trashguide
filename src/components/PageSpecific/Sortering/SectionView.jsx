import Image from 'next/image'
import styles from './styles.module.scss'

async function getCategoryData(id) {
  const res = await fetch(`http://localhost:4000/category/details/${id}`)
  const data = await res.json()
  return data
}

export const SectionView = ({ data }) => {
  return (
    <div className={styles.sectionOuterWrapper}>
      <div
        className={styles.mainContent}
        style={{ backgroundColor: `#${data.color}` }}
      >
        <hgroup>
          <h1>{data.title}</h1>
        </hgroup>
        <Image
          src={`/Images/Guide/Categories/${data.filename}`}
          width={140}
          height={140}
          alt={data.title}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.foldOutsWrapper}>
        {data.categories.map((item) => {
          return (
            <FoldOut
              data={item}
              key={item.id}
            />
          )
        })}
      </div>
    </div>
  )
}

const FoldOut = async ({ data }) => {
  const categoryData = await getCategoryData(data.id)

  return (
    <article className={styles.sectionCardView}>
      <div className={styles.categoryHeader}>
        <Image
          src={`/Images/Guide/Icons/${data.icon_filename}`}
          width={70}
          height={70}
          alt={data.title}
          style={{ objectFit: 'cover', borderRadius: '1rem' }}
        />
        <h2>{data.title}</h2>
      </div>

      <div className={styles.foldOut}>
        <div>
          <div className={styles.isAllowed}>
            <table className={styles.infoTable}>
              <caption>
                <h3>Hvad modtager vi?</h3>
              </caption>
              <thead>
                <tr>
                  <th></th>
                  <th>Station</th>
                  <th>Hjemme</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.types.map((type) => {
                  if (type.rules.is_allowed) {
                    return (
                      <tr key={type.id}>
                        <td>
                          <p>{type.title}</p>
                        </td>
                        <td>{type.rules.is_station ? '✅' : '🚫'}</td>
                        <td>{type.rules.is_home ? '✅' : '🚫'}</td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.notAllowed}>
            <h3>Hvad modtager vi ikke?</h3>
            <ul>
              {categoryData.types.map((type) => {
                if (!type.rules.is_allowed) {
                  return (
                    <li key={type.id}>
                      <p>{type.title}</p>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        </div>
      </div>
      <label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m6 9l6 6l6-6"
          />
        </svg>
        <input
          type="checkbox"
          value="X"
        />
      </label>
    </article>
  )
}
