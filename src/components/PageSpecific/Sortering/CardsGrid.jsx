import React from 'react'
import styles from './styles.module.scss'

export const CardsGrid = ({ children }) => {
  return <div className={styles.cardsGrid}>{children}</div>
}
