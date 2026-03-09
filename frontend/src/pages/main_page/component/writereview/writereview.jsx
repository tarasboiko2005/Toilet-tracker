import React, { useState, useEffect } from "react";
import axios from "axios";
import writeReview_styles from "./writereview.module.css";

const Svg_star = ({ id, color, handleClick }) => {
    return (
        <>
            <svg
                onClick={() => handleClick(id)}
                width="32"
                height="33"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M24.3259 11.7921C24.6062 11.5645 24.8142 11.247 24.9206 10.8842C25.0269 10.5214 25.0265 10.1314 24.9192 9.76884C24.8119 9.40632 24.6032 9.08948 24.3223 8.86274C24.0414 8.63601 23.7025 8.51075 23.353 8.50453L16.5652 8.22509C16.5318 8.22258 16.4998 8.20961 16.473 8.18773C16.4463 8.16586 16.4259 8.13602 16.4143 8.10181L14.0687 1.19802C13.9509 0.846776 13.7368 0.543484 13.4556 0.329202C13.1743 0.114921 12.8394 0 12.4962 0C12.153 0 11.8181 0.114921 11.5369 0.329202C11.2556 0.543484 11.0416 0.846776 10.9237 1.19802L8.58568 8.12646C8.57412 8.16068 8.55373 8.19052 8.52697 8.21239C8.50021 8.23426 8.46821 8.24724 8.43484 8.24975L1.64699 8.52919C1.2975 8.53541 0.958554 8.66067 0.677684 8.8874C0.396814 9.11413 0.188104 9.43097 0.0808184 9.79349C-0.0264673 10.156 -0.0269487 10.546 0.0794418 10.9089C0.185832 11.2717 0.393759 11.5891 0.674069 11.8167L5.99875 16.3781C6.0254 16.401 6.04532 16.4319 6.05604 16.4669C6.06677 16.502 6.06783 16.5397 6.05909 16.5754L4.22637 23.6518C4.1314 24.0121 4.1406 24.3956 4.25272 24.7501C4.36484 25.1045 4.57444 25.4127 4.853 25.6327C5.13156 25.8528 5.46556 25.974 5.80957 25.9798C6.15357 25.9856 6.49087 25.8759 6.77558 25.6654L12.402 21.556C12.4297 21.5351 12.4626 21.524 12.4962 21.524C12.5299 21.524 12.5628 21.5351 12.5905 21.556L18.2169 25.6654C18.4977 25.883 18.8338 26 19.1785 26C19.5231 26 19.8592 25.883 20.1401 25.6654C20.4187 25.4474 20.6285 25.1407 20.7406 24.7875C20.8527 24.4343 20.8616 24.0518 20.7661 23.6929L18.9183 16.5918C18.9085 16.5562 18.909 16.5181 18.9198 16.4828C18.9306 16.4475 18.9512 16.4167 18.9786 16.3946L24.3259 11.7921Z"
                    fill={color}
                />
            </svg>
        </>
    );
};

function choosereview(props) {
    const [selectedObject, setSelectedObject] = useState(null);
    const [textReview, setReviewText] = useState('');

    const handleReviewChange = (event) => {
        setReviewText(event.target.value);
    };

    const [error, setError] = useState(null); // Стан для зберігання тексту помилки
    const addMarker = () => {
        if (!window.localStorage.getItem('jsonwebtoken')) {
            setError("Sign in please"); // Оновлюємо стан, щоб зберегти текст помилки
            return; // Повертаємось, якщо відсутній токен
        }
        const authorization = 'Bearer ' + window.localStorage.getItem('jsonwebtoken')

        let data = JSON.stringify({
            "review": textReview,
            "rating": selectedObject,
            "markerId": props.children,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/api/v1/review/addReview',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                props.setTriger(false)
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const handleClick = (objectIndex) => {
        setSelectedObject(objectIndex);
    };

    return (props.trigger) ? (
        <>
            <div className={writeReview_styles.container_main}>
                {error && (
                    <div className={writeReview_styles.error_box}>
                        <svg className={writeReview_styles.main_cross_icon} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                            <path fill="currentColor" fillRule="evenodd" d="M.877 7.5a6.623 6.623 0 1 1 13.246 0a6.623 6.623 0 0 1-13.246 0M7.5 1.827a5.673 5.673 0 1 0 0 11.346a5.673 5.673 0 0 0 0-11.346m2.354 3.32a.5.5 0 0 1 0 .707L8.207 7.5l1.647 1.646a.5.5 0 0 1-.708.708L7.5 8.207L5.854 9.854a.5.5 0 0 1-.708-.708L6.793 7.5L5.146 5.854a.5.5 0 0 1 .708-.708L7.5 6.793l1.646-1.647a.5.5 0 0 1 .708 0" clipRule="evenodd" />
                         </svg>
                        <a href="/sign_in" target="_self" rel="noopener noreferrer">
                            <p>{error}</p>
                        </a>
                    </div>
                )}
                <div className={writeReview_styles.container}>
                    <div className={writeReview_styles.exitandstars}>
                        <div className={writeReview_styles.exit}>
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
                        <div className={writeReview_styles.stars}>
                            {[...Array(5)].map((_, index) => (
                                <Svg_star
                                    key={index}
                                    id={`${index + 1}`}
                                    color={selectedObject < index + 1 ? "#B3B3B3" : "#FFCB46"}
                                    selectedObject={selectedObject}
                                    handleClick={handleClick}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={writeReview_styles.review_box}>
                        <form>
                            <textarea
                                className={writeReview_styles.review_field}
                                value={textReview}
                                onChange={handleReviewChange}
                                rows="4"
                                cols="50"
                            />
                        </form>
                    </div>
                    <div className={writeReview_styles.button_box}>
                        <button onClick={addMarker}>Send</button>
                    </div>
                </div>
            </div>
        </>
    ) : ""
}

export default choosereview
