import React, { useState } from 'react'
import styles from "./addmarker_two.module.css";
import axios from 'axios';

const addmarker_two = (props) => {
    const [error, setError] = useState(null); // Стан для зберігання тексту помилки
    const [addCoords, setCoords] = useState(props.coordinates);

    const [checkboxValues, setCheckboxValues] = useState([]);
    const [addName, setName] = useState('');
    const handleInputChange_Name = (event) => {
        setName(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            // Якщо чекбокс вибраний, додаємо його значення до масиву
            setCheckboxValues([...checkboxValues, value]);
        } else {
            // Якщо чекбокс знятий, видаляємо його значення з масиву
            setCheckboxValues(checkboxValues.filter(item => item !== value));
        }
        console.log(checkboxValues)
    };

    const addMarker = (event) => {
        if (!window.localStorage.getItem('jsonwebtoken')) {
            setError("Sign in please"); // Оновлюємо стан, щоб зберегти текст помилки
            return; // Повертаємось, якщо відсутній токен
        }
        const authorization = 'Bearer ' + window.localStorage.getItem('jsonwebtoken')

        let data = JSON.stringify({
            "name": addName,
            "coordinates": addCoords,
            "tags": checkboxValues
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/api/v1/markers/create',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                window.location.href = "/success";
            })
            .catch((error) => {
                console.log(error.response.data.detail);
                setError(error.response.data.detail); // Оновлюємо стан, щоб зберегти текст помилки
            });
    };
    return (
        <div className={styles.conteiner}>
            <div className={styles.curtain}>
                <div className={styles.exit}>
                    <a href="/" target="_self" rel="noopener noreferrer">
                        <svg width="10" height="22" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.30121 7.29944C3.90875 7.68795 3.90551 8.32105 4.29399 8.71356L9.06537 13.5344C9.45397 13.9271 9.45059 14.5604 9.05782 14.9489L8.69533 15.3074C8.30276 15.6957 7.6698 15.6923 7.28139 15.2999L0.744659 8.69532C0.356154 8.30278 0.359422 7.66963 0.751956 7.28112L7.35624 0.744642C7.74878 0.356138 8.38193 0.359405 8.77044 0.751939L9.12853 1.11375C9.51701 1.50625 9.51377 2.13935 9.1213 2.52787L4.30121 7.29944Z" fill="black" />
                        </svg>
                    </a >
                </div>
                <div className={styles.text}>
                    Adding a toilet (2/2)
                </div>
            </div>

            <div className={styles.toilet}>
                {error && (
                    <div className={styles.main_mistake}>
                        <svg className={styles.main_cross_icon} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                            <path fill="currentColor" fillRule="evenodd" d="M.877 7.5a6.623 6.623 0 1 1 13.246 0a6.623 6.623 0 0 1-13.246 0M7.5 1.827a5.673 5.673 0 1 0 0 11.346a5.673 5.673 0 0 0 0-11.346m2.354 3.32a.5.5 0 0 1 0 .707L8.207 7.5l1.647 1.646a.5.5 0 0 1-.708.708L7.5 8.207L5.854 9.854a.5.5 0 0 1-.708-.708L6.793 7.5L5.146 5.854a.5.5 0 0 1 .708-.708L7.5 6.793l1.646-1.647a.5.5 0 0 1 .708 0" clipRule="evenodd" />
                        </svg>
                        <p>{error}</p>
                    </div>
                )}
                <div className={styles.toilet_name}>
                    <div className={styles.toilet_name_p}>Specify its place</div>
                    <input className={styles.toilet_name_input} value={addName} onChange={handleInputChange_Name} placeholder="Enter a name..."></input>
                </div>
                <div className={styles.toilet_tags}>
                    <div className={styles.toilet_tags_p}>Specify tags</div>
                    <div className={styles.toilet_tags_list}>
                        <label className={styles.toilet_tag}>
                            <input className={styles.checkbox} onChange={handleCheckboxChange} type="checkbox" value="RESTAURANT" />
                            <div className={styles.checkbox_checked}>
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_346_35)"><path d="M8.7014 5.68598H9.07896C9.34587 5.68671 9.61029 5.63449 9.85688 5.53233C10.1035 5.43017 10.3274 5.2801 10.5156 5.09082L12.5938 2.99609L12.0296 2.42734L9.90745 4.54949L9.46642 4.10846L11.5886 1.98605L11.0046 1.41959L8.8903 3.53361L8.45054 3.09258L10.5727 0.970176L10.0039 0.40625L7.90921 2.48447C7.71991 2.67271 7.56984 2.89663 7.46768 3.14327C7.36552 3.38991 7.3133 3.65437 7.31405 3.92133V4.29863L6.21896 5.39373L1.21878 0.40625C0.0944838 1.79943 0.758449 4.35982 2.02417 5.6258L4.19507 7.7967C4.86919 8.47082 5.003 8.531 5.76777 8.22326C5.93255 8.15699 5.99247 8.16436 6.14609 8.31771L6.47616 8.6257C6.55056 8.70187 6.55234 8.72422 6.55234 8.86996V9.01062C6.55234 9.54586 6.8946 9.85359 7.12007 10.0831L9.75003 12.5938L11.5782 10.7656L7.6063 6.78107L8.7014 5.68598Z" fill="black" /><path d="M5.77307 9.00326C5.01592 9.1584 4.55152 9.30135 3.66361 8.41344C3.64939 8.39922 3.63467 8.38551 3.62045 8.37129L3.12533 7.87617L0.40625 10.5625L2.4375 12.5938L6.09375 8.9375L5.77307 9.00326Z" fill="black" /></g><defs><clipPath id="clip0_346_35"><rect width="13" height="13" fill="white" /></clipPath></defs></svg>
                                <p>Restaurant</p>
                            </div>
                        </label><br />
                        <label className={styles.toilet_tag}>
                            <input className={styles.checkbox} onChange={handleCheckboxChange} type="checkbox" value="SUPERMARKET" />
                            <div className={styles.checkbox_checked}>
                                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_346_38)"><path d="M10.56 11.04C11.0902 11.04 11.52 10.6102 11.52 10.08C11.52 9.54981 11.0902 9.12 10.56 9.12C10.0298 9.12 9.59998 9.54981 9.59998 10.08C9.59998 10.6102 10.0298 11.04 10.56 11.04Z" fill="black" /><path d="M3.60001 11.04C4.13021 11.04 4.56001 10.6102 4.56001 10.08C4.56001 9.54981 4.13021 9.12 3.60001 9.12C3.06982 9.12 2.64001 9.54981 2.64001 10.08C2.64001 10.6102 3.06982 11.04 3.60001 11.04Z" fill="black" /><path d="M11.28 7.92H3.78504L3.94512 7.66032C4.01376 7.54896 4.03392 7.41432 4.00104 7.2876L3.8448 6.68616L10.8007 6.32472C11.0645 6.31128 11.28 6.084 11.28 5.82V2.64C11.28 2.376 11.064 2.16 10.8 2.16H2.66856L2.57472 1.79928C2.54799 1.6964 2.48786 1.6053 2.40377 1.54028C2.31967 1.47526 2.21638 1.43999 2.11008 1.44H0.48C0.352696 1.44 0.230606 1.49057 0.140589 1.58059C0.0505713 1.67061 0 1.7927 0 1.92C0 2.0473 0.0505713 2.16939 0.140589 2.25941C0.230606 2.34943 0.352696 2.4 0.48 2.4H1.73904L3.02064 7.3308L2.51664 8.148C2.47181 8.22071 2.44722 8.30408 2.4454 8.38948C2.44359 8.47488 2.46462 8.55921 2.50632 8.63376C2.54785 8.7084 2.60858 8.77058 2.68221 8.81388C2.75584 8.85717 2.8397 8.88 2.92512 8.88H11.28C11.4073 8.88 11.5294 8.82943 11.6194 8.73941C11.7094 8.64939 11.76 8.5273 11.76 8.4C11.76 8.2727 11.7094 8.15061 11.6194 8.06059C11.5294 7.97057 11.4073 7.92 11.28 7.92Z" fill="black" /></g><defs><clipPath id="clip0_346_38"><rect width="12" height="12" fill="white" /></clipPath></defs></svg>
                                <p>Supermarker</p>
                            </div>
                        </label><br />
                        <label className={styles.toilet_tag}>
                            <input className={styles.checkbox} onChange={handleCheckboxChange} type="checkbox" value="CAFFE" />
                            <div className={styles.checkbox_checked}>
                                <svg width="13" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_346_42)"><path d="M10.049 6.54405V6.01391C10.049 5.71061 9.80828 5.46479 9.51112 5.46479H1.74846C1.45135 5.46479 1.21055 5.71061 1.21055 6.01391V7.7895C1.21055 10.2771 3.19301 12.3008 5.62979 12.3008C7.12231 12.3008 8.44197 11.5398 9.24246 10.3798H10.1032C11.1401 10.3798 11.9835 9.51867 11.9835 8.46014C11.9537 7.1872 10.9284 6.5128 10.049 6.54405ZM5.62981 11.2026C3.78626 11.2026 2.28639 9.67146 2.28639 7.7895V6.563H8.97321V7.7895C8.97321 9.67146 7.47331 11.2026 5.62976 11.2026M9.803 9.26836C9.99082 8.70437 10.0621 8.18314 10.0504 7.66315C10.4889 7.59998 10.8983 8.00194 10.8947 8.46014C10.8641 8.97176 10.5221 9.33092 9.803 9.26836ZM5.90892 3.74624H5.23178V4.43749C5.23178 4.9755 4.42389 4.9755 4.42389 4.43749V3.74624H3.74675C3.21219 3.74624 3.21219 2.92155 3.74675 2.92155H4.42389V2.2303C4.42389 1.68441 5.23175 1.68441 5.23175 2.2303V2.92155H5.9089C6.45211 2.92155 6.45211 3.74624 5.9089 3.74624M8.231 1.92687H7.55399V2.61812C7.54839 3.17257 6.73981 3.1721 6.74598 2.61812V1.92687H6.06889C5.52996 1.92687 5.52996 1.10218 6.06889 1.10218H6.74598V0.410874C6.74598 -0.136958 7.55399 -0.136958 7.55399 0.410874V1.10212H8.231C8.77033 1.10212 8.77033 1.92687 8.231 1.92687ZM10.7536 14H0.53994C-0.17998 14 -0.17998 12.9018 0.53994 12.9018H10.7536C11.4707 12.9018 11.4707 14 10.7536 14Z" fill="black" /></g><defs><clipPath id="clip0_346_42"><rect width="12" height="14" fill="white" /></clipPath></defs></svg>
                                <p>Caffe</p>
                            </div>
                        </label><br />
                        <label className={styles.toilet_tag}>
                            <input className={styles.checkbox} onChange={handleCheckboxChange} type="checkbox" value="PUBLIC" />
                            <div className={styles.checkbox_checked}>
                                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.80553 3.88889C3.60327 3.88889 4.24997 3.24219 4.24997 2.44444C4.24997 1.6467 3.60327 1 2.80553 1C2.00778 1 1.36108 1.6467 1.36108 2.44444C1.36108 3.24219 2.00778 3.88889 2.80553 3.88889Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.30553 3.88889C10.1033 3.88889 10.75 3.24219 10.75 2.44444C10.75 1.6467 10.1033 1 9.30553 1C8.50778 1 7.86108 1.6467 7.86108 2.44444C7.86108 3.24219 8.50778 3.88889 9.30553 3.88889Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" /><path d="M1 6.05556H4.61111L3.88889 14H1.72222L1 6.05556ZM7.5 6.05556H11.1111L11.8333 10.0278H10.75L10.3889 14H8.22222L7.86111 10.0278H6.77778L7.5 6.05556Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <p>Public</p>
                            </div>
                        </label><br />
                        <label className={styles.toilet_tag}>
                            <input className={styles.checkbox} onChange={handleCheckboxChange} type="checkbox" value="FREE" />
                            <div className={styles.checkbox_checked}>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_346_48)"><path d="M12.1875 0.46875H2.8125C1.51805 0.46875 0.46875 1.51805 0.46875 2.8125V12.1875C0.46875 13.482 1.51805 14.5312 2.8125 14.5312H12.1875C13.482 14.5312 14.5312 13.482 14.5312 12.1875V2.8125C14.5312 1.51805 13.482 0.46875 12.1875 0.46875ZM4.21875 6.09375H3.02578V7.14844H4.21875V7.85156H3.02578V9.60938H2.34375V5.39062H4.21875V6.09375ZM7.14258 9.60938H6.43453L5.85539 7.85156H5.59172V9.60938H4.92188V5.39062H6.09375C6.74016 5.39062 7.26562 5.94258 7.26562 6.62109C7.26562 7.13602 6.96258 7.57828 6.53414 7.76133L7.14258 9.60938ZM9.84375 6.09375H8.65078V7.14844H9.84375V7.85156H8.65078V8.90625H9.84375V9.60938H7.96875V5.39062H9.84375V6.09375ZM12.6562 6.09375H11.4633V7.14844H12.6562V7.85156H11.4633V8.90625H12.6562V9.60938H10.7812V5.39062H12.6562V6.09375Z" fill="black" /><path d="M6.0937 6.09375H5.59143V7.14844H6.0937C6.37073 7.14844 6.59596 6.91172 6.59596 6.62109C6.59596 6.33047 6.37073 6.09375 6.0937 6.09375Z" fill="black" /></g><defs><clipPath id="clip0_346_48"><rect width="15" height="15" fill="white" /></clipPath></defs></svg>
                                <p>Free</p>
                            </div>
                        </label><br />
                        <label className={styles.toilet_tag}>
                            <input className={styles.checkbox} onChange={handleCheckboxChange} type="checkbox" value="PAID" />
                            <div className={styles.checkbox_checked}>
                                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 2C4.36 2 1 5.36 1 9.5C1 13.64 4.36 17 8.5 17C12.64 17 16 13.64 16 9.5C16 5.36 12.64 2 8.5 2ZM9.16 13.82V14.09C9.16 14.45 8.8675 14.75 8.5 14.75C8.14 14.75 7.84 14.4575 7.84 14.09V13.775C7.3675 13.6625 6.3925 13.3175 5.8225 12.2C5.65 11.87 5.815 11.4575 6.16 11.315L6.2125 11.2925C6.52 11.165 6.865 11.2925 7.0225 11.585C7.2625 12.0425 7.735 12.6125 8.6125 12.6125C9.31 12.6125 10.0975 12.2525 10.0975 11.405C10.0975 10.685 9.5725 10.31 8.3875 9.8825C7.5625 9.59 5.875 9.11 5.875 7.4C5.875 7.325 5.8825 5.6 7.84 5.18V4.91C7.84 4.5425 8.14 4.25 8.5 4.25C8.86 4.25 9.16 4.5425 9.16 4.91V5.1875C9.9625 5.33 10.4725 5.7575 10.78 6.1625C11.035 6.4925 10.9 6.9725 10.51 7.1375C10.24 7.25 9.925 7.16 9.745 6.9275C9.535 6.6425 9.16 6.35 8.545 6.35C8.02 6.35 7.1875 6.6275 7.1875 7.3925C7.1875 8.105 7.8325 8.375 9.1675 8.8175C10.9675 9.44 11.425 10.355 11.425 11.405C11.425 13.3775 9.55 13.7525 9.16 13.82Z" fill="black" /></svg>
                                <p>Paid</p>
                            </div>
                        </label><br />
                        <label className={styles.toilet_tag}>
                            <input className={styles.checkbox} onChange={handleCheckboxChange} type="checkbox" value="STORE" />
                            <div className={styles.checkbox_checked}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_346_25)"><path fillRule="evenodd" clipRule="evenodd" d="M2 2.85359e-08C1.90492 -3.20869e-05 1.81181 0.0270443 1.73157 0.0780542C1.65134 0.129064 1.58731 0.201893 1.547 0.288L0.047 3.497C0.0102149 3.57597 -0.00529744 3.66319 0.002 3.75H0V4.695C0 5.219 0.226 5.721 0.63 6.091C1.032 6.461 1.579 6.669 2.149 6.669H2.449C3.01001 6.67257 3.55211 6.46643 3.969 6.091C4.133 5.941 4.267 5.769 4.369 5.583C4.496 5.413 4.702 5.413 4.821 5.569C4.924 5.761 5.061 5.937 5.228 6.091C5.631 6.461 6.178 6.669 6.748 6.669H7.285C7.84601 6.67257 8.38811 6.46643 8.805 6.091C8.961 5.947 9.091 5.784 9.191 5.607C9.322 5.402 9.551 5.407 9.671 5.597C9.772 5.778 9.904 5.945 10.063 6.091C10.466 6.461 11.013 6.669 11.583 6.669H11.851C12.412 6.67257 12.9541 6.46643 13.371 6.091C13.774 5.721 14 5.219 14 4.695V3.75H13.998C14.0053 3.66319 13.9898 3.57597 13.953 3.497L12.453 0.288C12.4127 0.201893 12.3487 0.129064 12.2684 0.0780542C12.1882 0.0270443 12.0951 -3.20869e-05 12 2.85359e-08H2ZM1 13V7.729C2.188 8.121 3.605 7.946 4.578 7.193C5.876 8.197 8.127 8.197 9.424 7.193C10.402 7.949 11.816 8.121 13 7.719V13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14H10.745V10.21C10.7448 10.1807 10.7384 10.1518 10.7264 10.1251C10.7143 10.0984 10.6968 10.0745 10.675 10.055C10.6284 10.0131 10.5677 9.99026 10.505 9.991H8.513C8.45031 9.99026 8.38964 10.0131 8.343 10.055C8.32117 10.0745 8.30366 10.0984 8.29161 10.1251C8.27955 10.1518 8.27321 10.1807 8.273 10.21V14H2C1.73478 14 1.48043 13.8946 1.29289 13.7071C1.10536 13.5196 1 13.2652 1 13ZM2.502 10.76V9.5C2.502 9.36739 2.55468 9.24021 2.64845 9.14645C2.74221 9.05268 2.86939 9 3.002 9H6.016C6.14861 9 6.27579 9.05268 6.36955 9.14645C6.46332 9.24021 6.516 9.36739 6.516 9.5V10.76C6.516 10.8926 6.46332 11.0198 6.36955 11.1136C6.27579 11.2073 6.14861 11.26 6.016 11.26H3.002C2.86939 11.26 2.74221 11.2073 2.64845 11.1136C2.55468 11.0198 2.502 10.8926 2.502 10.76Z" fill="black" /></g><defs><clipPath id="clip0_346_25"><rect width="14" height="14" fill="white" /></clipPath></defs></svg>
                                <p>Store</p>
                            </div>
                        </label><br />
                    </div>
                </div>
                <div className={styles.toilet_confirm}>
                    <button className={styles.toilet_confirm_button} onClick={addMarker}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default addmarker_two
