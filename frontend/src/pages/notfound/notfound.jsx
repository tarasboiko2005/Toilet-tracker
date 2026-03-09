import React from 'react'
import styles from './notfound.module.css'
import { Link } from 'react-router-dom'

const main_page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.curtain}></div>
      <div className={styles.error}>
        <div><p className={styles.error_text}>404 Not Found</p></div>
        <div><a className={styles.error_back} href="/"> Click on the text that go back</a></div>
      </div>
    </div>
  )
}

export default main_page
