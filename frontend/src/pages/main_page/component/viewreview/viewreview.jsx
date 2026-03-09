import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./viewreview.module.css";


function view_review(props) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const request = "/api/v1/review/findByReviewId/" + props.children
    axios.get(request)
      .then(res => {
        setReviews(res.data.review);
        console.log(res.data.review);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (props.trigger) ? (
    <>
      <div className={styles.conteiner}>
        <div className={styles.curtain}>
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
        <div className={styles.review_list}>
          {reviews.length > 0 ? (
            reviews.map((review) => {
              console.log(review);
              return (
                <div key={review.id} className={styles.review}>
                  <div className={styles.emailandtext}>
                    <div className={styles.email}>
                      {review.username}
                    </div>
                    <div className={styles.text} id="reviewText">
                      {review.review}
                    </div>
                  </div>
                  <div className={styles.stars}>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17.5147 8.61727C17.7165 8.45098 17.8662 8.21899 17.9428 7.95385C18.0194 7.6887 18.0191 7.40368 17.9418 7.13877C17.8646 6.87385 17.7143 6.64231 17.5121 6.47662C17.3098 6.31093 17.0658 6.21939 16.8142 6.21485L11.9269 6.01064C11.9029 6.00881 11.8799 5.99933 11.8606 5.98334C11.8413 5.96736 11.8266 5.94555 11.8183 5.92055L10.1295 0.875473C10.0446 0.618798 9.89053 0.397161 9.68802 0.240571C9.48551 0.0839804 9.24438 0 8.99729 0C8.75019 0 8.50906 0.0839804 8.30655 0.240571C8.10404 0.397161 7.94992 0.618798 7.86507 0.875473L6.18169 5.93857C6.17337 5.96357 6.15869 5.98538 6.13942 6.00136C6.12015 6.01735 6.09711 6.02683 6.07308 6.02866L1.18583 6.23287C0.934199 6.23741 0.690159 6.32895 0.487932 6.49464C0.285706 6.66033 0.135435 6.89187 0.0581892 7.15678C-0.0190565 7.4217 -0.0194031 7.70672 0.0571981 7.97186C0.133799 8.23701 0.283507 8.46899 0.485329 8.63529L4.3191 11.9686C4.33829 11.9853 4.35263 12.0079 4.36035 12.0335C4.36807 12.0591 4.36884 12.0867 4.36255 12.1128L3.04299 17.284C2.97461 17.5473 2.98123 17.8276 3.06196 18.0866C3.14269 18.3456 3.2936 18.5708 3.49416 18.7316C3.69473 18.8924 3.93521 18.981 4.18289 18.9852C4.43057 18.9895 4.67343 18.9093 4.87842 18.7555L8.92941 15.7525C8.94936 15.7372 8.97304 15.7291 8.99729 15.7291C9.02153 15.7291 9.04521 15.7372 9.06517 15.7525L13.1161 18.7555C13.3184 18.9145 13.5604 19 13.8085 19C14.0567 19 14.2986 18.9145 14.5009 18.7555C14.7015 18.5962 14.8525 18.3721 14.9333 18.1139C15.014 17.8558 15.0204 17.5763 14.9516 17.314L13.6212 12.1248C13.6141 12.0987 13.6145 12.0709 13.6223 12.0451C13.6301 12.0193 13.6448 11.9968 13.6646 11.9807L17.5147 8.61727Z"
                        fill="#F4D78D" />
                    </svg>
                    {review.rating}/5
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.review}>
              <div className={styles.emailandtext}>
                <div className={styles.text} id="reviewText">
                  No rewiews found
                </div>
              </div>
            </div>
          )}
        </div>
      </div >
    </>
  ) : ""
}

const view_review_old = (marker_id) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const request = "/api/v1/review/findByReviewId/" + marker_id.marker_id.marker_id
    axios.get(request)
      .then(res => {
        setReviews(res.data.review);
        console.log(res.data.review);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className={styles.conteiner}>
        <div className={styles.curtain}>
          <svg
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
        <div className={styles.review_list}>
          {reviews.length > 0 ? (
            reviews.map((review) => {
              console.log(review);
              return (
                <div key={review.id} className={styles.review}>
                  <div className={styles.emailandtext}>
                    <div className={styles.email}>
                      {review.username}
                    </div>
                    <div className={styles.text} id="reviewText">
                      {review.review}
                    </div>
                  </div>
                  <div className={styles.stars}>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17.5147 8.61727C17.7165 8.45098 17.8662 8.21899 17.9428 7.95385C18.0194 7.6887 18.0191 7.40368 17.9418 7.13877C17.8646 6.87385 17.7143 6.64231 17.5121 6.47662C17.3098 6.31093 17.0658 6.21939 16.8142 6.21485L11.9269 6.01064C11.9029 6.00881 11.8799 5.99933 11.8606 5.98334C11.8413 5.96736 11.8266 5.94555 11.8183 5.92055L10.1295 0.875473C10.0446 0.618798 9.89053 0.397161 9.68802 0.240571C9.48551 0.0839804 9.24438 0 8.99729 0C8.75019 0 8.50906 0.0839804 8.30655 0.240571C8.10404 0.397161 7.94992 0.618798 7.86507 0.875473L6.18169 5.93857C6.17337 5.96357 6.15869 5.98538 6.13942 6.00136C6.12015 6.01735 6.09711 6.02683 6.07308 6.02866L1.18583 6.23287C0.934199 6.23741 0.690159 6.32895 0.487932 6.49464C0.285706 6.66033 0.135435 6.89187 0.0581892 7.15678C-0.0190565 7.4217 -0.0194031 7.70672 0.0571981 7.97186C0.133799 8.23701 0.283507 8.46899 0.485329 8.63529L4.3191 11.9686C4.33829 11.9853 4.35263 12.0079 4.36035 12.0335C4.36807 12.0591 4.36884 12.0867 4.36255 12.1128L3.04299 17.284C2.97461 17.5473 2.98123 17.8276 3.06196 18.0866C3.14269 18.3456 3.2936 18.5708 3.49416 18.7316C3.69473 18.8924 3.93521 18.981 4.18289 18.9852C4.43057 18.9895 4.67343 18.9093 4.87842 18.7555L8.92941 15.7525C8.94936 15.7372 8.97304 15.7291 8.99729 15.7291C9.02153 15.7291 9.04521 15.7372 9.06517 15.7525L13.1161 18.7555C13.3184 18.9145 13.5604 19 13.8085 19C14.0567 19 14.2986 18.9145 14.5009 18.7555C14.7015 18.5962 14.8525 18.3721 14.9333 18.1139C15.014 17.8558 15.0204 17.5763 14.9516 17.314L13.6212 12.1248C13.6141 12.0987 13.6145 12.0709 13.6223 12.0451C13.6301 12.0193 13.6448 11.9968 13.6646 11.9807L17.5147 8.61727Z"
                        fill="#F4D78D" />
                    </svg>
                    {review.rating}/5
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.review}>
              <div className={styles.emailandtext}>
                <div className={styles.text} id="reviewText">
                  No rewiews found
                </div>
              </div>
            </div>
          )}
        </div>
      </div >
    </>
  );
};

export default view_review;
