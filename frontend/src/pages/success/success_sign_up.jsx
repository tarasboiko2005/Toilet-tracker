import React from 'react'
import styles from './success.module.css'
import { Link } from 'react-router-dom'

const sign_up_success = () => {
  return (
    <div className={styles.conteiner}>
      <div className={styles.successText}>Success!</div>
      <div className={styles.successIcon}>
        <svg width="224" height="224" viewBox="0 0 224 224" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M98 149.898L63 114.891L72.891 105L98 130.102L151.095 77L161 86.905L98 149.898Z" fill="#76B922" /><path d="M112 14C92.6175 14 73.6702 19.7476 57.5542 30.516C41.4381 41.2844 28.8772 56.5899 21.4598 74.497C14.0425 92.4042 12.1017 112.109 15.8831 131.119C19.6644 150.129 28.998 167.591 42.7036 181.296C56.4091 195.002 73.8711 204.336 92.8812 208.117C111.891 211.898 131.596 209.958 149.503 202.54C167.41 195.123 182.716 182.562 193.484 166.446C204.252 150.33 210 131.383 210 112C210 86.0088 199.675 61.0821 181.296 42.7035C162.918 24.325 137.991 14 112 14ZM112 196C95.3864 196 79.1459 191.073 65.3321 181.843C51.5184 172.613 40.7519 159.494 34.3942 144.145C28.0364 128.796 26.3729 111.907 29.6141 95.6124C32.8552 79.318 40.8555 64.3506 52.6031 52.603C64.3507 40.8554 79.3181 32.8552 95.6125 29.614C111.907 26.3729 128.796 28.0364 144.145 34.3941C159.494 40.7519 172.613 51.5184 181.843 65.3321C191.074 79.1458 196 95.3864 196 112C196 134.278 187.15 155.644 171.397 171.397C155.644 187.15 134.278 196 112 196Z" fill="#76B922" /></svg>
      </div>
      <Link to="/sign_in">
        <div className={styles.successButtonBox}>
          <button className={styles.successButton}>Continue</button>
        </div>
      </Link>
    </div>
  )
}

export default sign_up_success
