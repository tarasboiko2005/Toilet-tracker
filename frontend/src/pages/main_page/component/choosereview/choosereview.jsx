import React from 'react'
import { useState } from 'react'
import styles from './choosereview.module.css'
import Choosereview_2 from '../writereview/writereview'
import View_review from '../viewreview/viewreview'

function choosereview(props) {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [buttonPopup_View, setButtonPopup_View] = useState(false)

    return (props.trigger) ? (
        <div>
            <div className={styles.container}>
                <div className={styles.exitandtext}>
                    <div className={styles.exit}>
                        <svg
                            onClick={() => props.setTriger(false)}
                            width="18"
                            height="24"
                            viewBox="0 0 10 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.30121 7.29944C3.90874 7.68795 3.90551 8.32105 4.29399 8.71356L9.06537 13.5344C9.45397 13.9271 9.45059 14.5604 9.05782 14.9489L8.69533 15.3074C8.30276 15.6957 7.6698 15.6923 7.28139 15.2999L0.744658 8.69532C0.356154 8.30278 0.359422 7.66963 0.751956 7.28112L7.35624 0.744642C7.74878 0.356138 8.38193 0.359405 8.77044 0.75194L9.12853 1.11375C9.51701 1.50625 9.51377 2.13935 9.1213 2.52787L4.30121 7.29944Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                    <div className={styles.text}>Choose what you want to do</div>
                </div>
                <div className={styles.button_box}>
                    <button className={styles.buttons} onClick={() => setButtonPopup(true)}>Write a review</button>
                    <button className={styles.buttons} onClick={() => setButtonPopup_View(true)}>View reviews</button>
                </div>
            </div>
            <Choosereview_2 trigger={buttonPopup} setTriger={setButtonPopup}>{props.children}</Choosereview_2>
            <View_review trigger={buttonPopup_View} setTriger={setButtonPopup_View}>{props.children}</View_review>
        </div>
    ) : ""
}

export default choosereview
