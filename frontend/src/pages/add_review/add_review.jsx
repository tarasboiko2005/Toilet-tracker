import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const addReview = () => {
    const [textReview, setReviewText] = useState('');
    const [rating, setRating] = useState('');
    const [markerID, setMarkerID] = useState('');

    const handleReviewChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleMarkerIDChange = (event) => {
        setMarkerID(event.target.value);
    };

    const addMarker = (event) => {
        const authorization = 'Bearer ' + window.localStorage.getItem('jsonwebtoken')

        let data = JSON.stringify({
            "review": textReview,
            "rating": rating,
            "markerId": markerID,
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
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Link to="/">
                <svg width="20" height="32" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.30121 7.29944C3.90875 7.68795 3.90551 8.32105 4.29399 8.71356L9.06537 13.5344C9.45397 13.9271 9.45059 14.5604 9.05782 14.9489L8.69533 15.3074C8.30276 15.6957 7.6698 15.6923 7.28139 15.2999L0.744659 8.69532C0.356154 8.30278 0.359422 7.66963 0.751956 7.28112L7.35624 0.744642C7.74878 0.356138 8.38193 0.359405 8.77044 0.751939L9.12853 1.11375C9.51701 1.50625 9.51377 2.13935 9.1213 2.52787L4.30121 7.29944Z" fill="black" />
                </svg>
            </Link >
            <input
                type="text"
                value={textReview}
                onChange={handleReviewChange}
                placeholder="Введіть відгук..."
            />
            <input
                type="text"
                value={rating}
                onChange={handleRatingChange}
                placeholder="Введіть рейтинг..."
            />
            <input
                type="text"
                value={markerID}
                onChange={handleMarkerIDChange}
                placeholder="Введіть мітку..."
            />
            <button onClick={addMarker}>Send review</button>
        </>
    );
};

export default addReview;
