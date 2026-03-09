import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker, InfoWindowF, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import styles from "../main_page/GMap/GMap.module.css";
import style_categories from "../main_page/GMap/MarkerCategory.module.css";

const containerStyle = {
    width: "100%",
    height: "80vh",
};

const center = {
    lat: 49.83514,
    lng: 24.00825
};


function StarSVG() {
    return (
        <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_266_25)">
                <path
                    d="M8.50002 4.195C8.59294 4.12578 8.66186 4.02922 8.69712 3.91885C8.73239 3.80849 8.73223 3.68985 8.69667 3.57958C8.66111 3.46931 8.59192 3.37293 8.49882 3.30396C8.40572 3.23499 8.29337 3.19689 8.17752 3.195L5.92752 3.11C5.91646 3.10924 5.90585 3.10529 5.89698 3.09864C5.88811 3.09198 5.88135 3.08291 5.87752 3.0725L5.10002 0.972501C5.06096 0.86566 4.99001 0.773405 4.89677 0.708224C4.80354 0.643044 4.69253 0.608088 4.57877 0.608088C4.46501 0.608088 4.354 0.643044 4.26077 0.708224C4.16754 0.773405 4.09659 0.86566 4.05752 0.972501L3.28252 3.08C3.27869 3.09041 3.27193 3.09948 3.26306 3.10614C3.25419 3.11279 3.24358 3.11674 3.23252 3.1175L0.982521 3.2025C0.866673 3.20439 0.754321 3.24249 0.66122 3.31146C0.568118 3.38043 0.498936 3.47681 0.463374 3.58708C0.427811 3.69735 0.427652 3.81599 0.462917 3.92635C0.498183 4.03672 0.567106 4.13328 0.660021 4.2025L2.42502 5.59C2.43385 5.59695 2.4465.60634 2.44401 5.617C2.44757 5.62767 2.44792 5.63914 2.44502 5.65L1.83752 7.8025C1.80604 7.91211 1.80909 8.02876 1.84626 8.13657C1.88342 8.24439 1.9529 8.33814 2.04523 8.40507C2.13757 8.472 2.24828 8.50886 2.36231 8.51064C2.47634 8.51241 2.58814 8.47902 2.68252 8.415L4.54752 7.165C4.55671 7.15866 4.56761 7.15526 4.57877 7.15526C4.58994 7.15526 4.60083 7.15866 4.61002 7.165L6.47502 8.415C6.56812 8.48121 6.67953 8.51678 6.79377 8.51678C6.90801 8.51678 7.01942 8.48121 7.11252 8.415C7.20488 8.3487 7.27442 8.25541 7.31158 8.14796C7.34874 8.04051 7.35169 7.92419 7.32002 7.815L6.70752 5.655C6.70428 5.64416 6.70446 5.63258 6.70803 5.62184C6.71161 5.6111 6.71842 5.60173 6.72752 5.595L8.50002 4.195Z"
                    fill="#F4D78D"
                />
            </g>
            <defs>
                <clipPath id="clip0_266_25">
                    <rect width="9" height="9" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

const Search = () => {
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [mapCenter, setMapCenter] = useState(center);
    const [mapCenterDestination, setMapCentermapCenterDestination] = useState();

    navigator.geolocation.watchPosition(position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude)
        setLongitude(longitude)
    })

    const [markers, setMarkers] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);

    const [reviews, setReviews] = useState({});

    const openChooseReview = () => {
        const newReview = <ChooseReview marker_id={activeMarker} />;
        setReviews(prevReviews => ({
            ...prevReviews,
            [activeMarker]: newReview
        }));
        setActiveMarker(null);
    };
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBkahPllK9iMTwnZ8CdBBgAM3bgPQIlG8A",
    });

    useEffect(() => {
        axios
            .get("/api/v1/markers/findAll")
            .then((res) => {
                setMarkers(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    markers.forEach((obj) => {
        if (
            typeof obj.coordinates === "object" &&
            "lat" in obj.coordinates &&
            "lng" in obj.coordinates
        ) {
            return;
        }
        let [lat, lng] = obj.coordinates.split(", ");
        obj.coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
    });

    const onLoad = React.useCallback(
        function callback(map) {
            const bounds = new window.google.maps.LatLngBounds(center);
            map.fitBounds(bounds);
        },
        [center]
    );


    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };




    const [tags, setTags] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [checkboxValues, setCheckboxValues] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/markers/tags')
            .then(res => {
                setTags(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setCheckboxValues([...checkboxValues, value]);
        } else {
            setCheckboxValues(checkboxValues.filter(item => item !== value));
        }
    };

    const filteredMarkers = markers.filter(marker =>
        marker.name.toLowerCase().includes(searchText.toLowerCase()) &&
        checkboxValues.every(selectedTag =>
            marker.tags && marker.tags.some(tag => tag.name === selectedTag)
        )
    );

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    return isLoaded ? (
        <>
            <Link to="/">
                <svg width="20" height="32" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.30121 7.29944C3.90875 7.68795 3.90551 8.32105 4.29399 8.71356L9.06537 13.5344C9.45397 13.9271 9.45059 14.5604 9.05782 14.9489L8.69533 15.3074C8.30276 15.6957 7.6698 15.6923 7.28139 15.2999L0.744659 8.69532C0.356154 8.30278 0.359422 7.66963 0.751956 7.28112L7.35624 0.744642C7.74878 0.356138 8.38193 0.359405 8.77044 0.751939L9.12853 1.11375C9.51701 1.50625 9.51377 2.13935 9.1213 2.52787L4.30121 7.29944Z" fill="black" />
                </svg>
            </Link >
            <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder="Введіть текст для пошуку..."
            />

            {tags.map((tag) => {
                return (
                    <div key={tag.id}>
                        <label>
                            <input type="checkbox" value={tag.name} onChange={handleCheckboxChange} />
                            {tag.name}
                        </label><br />
                    </div>
                );
            })}
            <GoogleMap
                mapContainerStyle={containerStyle}
                onClick={() => setActiveMarker(null)}
                center={mapCenter}
                onLoad={onLoad}
                options={{
                    disableDefaultUI: true,
                    styles: [
                        {
                            featureType: "poi",
                            stylers: [{ visibility: "off" }],
                        },
                    ]
                }}
            >
                <Marker
                    position={{ lat: latitude, lng: longitude }}
                    icon={{
                        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                        scaledSize: { width: 40, height: 40 },
                    }}
                />
                {filteredMarkers.length > 0 ? (
                    filteredMarkers.map(
                        ({ id, name, coordinates, averageRating, destination, tags }) => {
                            destination = { distance: "666", time: "15" };
                            return (
                                <Marker
                                    key={id}
                                    position={coordinates}
                                    onClick={() => handleActiveMarker(id)}
                                    icon={{
                                        url: "data:image/svg+xml;charset=utf-8,%3Csvg width='44' height='62' viewBox='0 0 44 62' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 29.4583C19.9556 29.4583 17.995 28.6462 16.5494 27.2006C15.1038 25.755 14.2917 23.7944 14.2917 21.75C14.2917 19.7056 15.1038 17.745 16.5494 16.2994C17.995 14.8538 19.9556 14.0417 22 14.0417C24.0444 14.0417 26.005 14.8538 27.4506 16.2994C28.8962 17.745 29.7084 19.7056 29.7084 21.75C29.7084 22.7623 29.509 23.7646 29.1216 24.6999C28.7342 25.6351 28.1664 26.4848 27.4506 27.2006C26.7349 27.9164 25.8851 28.4842 24.9499 28.8716C24.0147 29.259 23.0123 29.4583 22 29.4583ZM22 0.166664C16.2758 0.166664 10.786 2.44062 6.7383 6.48828C2.69064 10.5359 0.416687 16.0257 0.416687 21.75C0.416687 37.9375 22 61.8333 22 61.8333C22 61.8333 43.5834 37.9375 43.5834 21.75C43.5834 16.0257 41.3094 10.5359 37.2617 6.48828C33.2141 2.44062 27.7243 0.166664 22 0.166664Z' fill='%232197B0'/%3E%3C/svg%3E",
                                        scaledSize:
                                            activeMarker === id
                                                ? { width: 50, height: 50 }
                                                : { width: 35, height: 35 },
                                    }}
                                >
                                    {reviews[id]}
                                    {activeMarker === id ? (
                                        <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                            <div className={styles.marker_info}>
                                                <div className={styles.marker_info_categoryandreviews}>
                                                    <div className={styles.marker_info_category}>
                                                        {tags.map((tag, index) => (
                                                            <div
                                                                key={index}
                                                                className={`${style_categories.marker_info_category_item
                                                                    } ${style_categories[tag.name.toLowerCase()]}`}
                                                            >
                                                                {tag.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className={styles.marker_info_reviews}>
                                                        <a
                                                            onClick={openChooseReview}
                                                            target="_self"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                textDecoration: "none",
                                                                color: "inherit",
                                                                margin: 0,
                                                                padding: 0,
                                                            }}
                                                        >
                                                            <svg
                                                                width="13"
                                                                height="12"
                                                                viewBox="0 0 13 12"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M2.99063 7.50937H4.3675L7.66125 4.21625C7.715 4.15458 7.75521 4.09 7.78187 4.0225C7.80854 3.95458 7.82187 3.88729 7.82187 3.82062C7.82187 3.75396 7.80792 3.68812 7.78 3.62312C7.75208 3.55771 7.7125 3.49417 7.66125 3.4325L7.08625 2.83875C7.03292 2.785 6.97083 2.74479 6.9 2.71812C6.82958 2.69146 6.76 2.67813 6.69125 2.67813C6.62458 2.67813 6.5575 2.69146 6.49 2.71812C6.42208 2.74479 6.3575 2.785 6.29625 2.83875L2.99 6.1325L2.99063 7.50937ZM3.54313 6.95687V6.36312L5.69812 4.20813L5.98688 4.51312L6.28063 4.81312L4.13687 6.95687H3.54313ZM5.98688 4.51312L6.28063 4.81312L5.69812 4.20813L5.98688 4.51312ZM6.38062 7.50937H10.0094V6.88437H7.00625L6.38062 7.50937ZM0.875 11.5481V1.88437C0.875 1.59687 0.971458 1.35688 1.16438 1.16438C1.35688 0.971458 1.59687 0.875 1.88437 0.875H11.1156C11.4031 0.875 11.6431 0.971458 11.8356 1.16438C12.0285 1.35688 12.125 1.59687 12.125 1.88437V8.61563C12.125 8.90312 12.0288 9.14333 11.8363 9.33625C11.6433 9.52875 11.4031 9.625 11.1156 9.625H2.79813L0.875 11.5481ZM2.53125 9H11.1156C11.2115 9 11.2996 8.96 11.38 8.88C11.46 8.79958 11.5 8.71146 11.5 8.61563V1.88437C11.5 1.78854 11.46 1.70042 11.38 1.62C11.2996 1.54 11.2115 1.5 11.1156 1.5H1.88437C1.78854 1.5 1.70042 1.54 1.62 1.62C1.54 1.70042 1.5 1.78854 1.5 1.88437V10.0281L2.53125 9Z"
                                                                    fill="#8E7859"
                                                                />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className={styles.marker_info_nameandmark}>
                                                    <div className={styles.marker_info_name}>{name}</div>
                                                    <div className={styles.marker_info_mark}>
                                                        <StarSVG />
                                                        {averageRating.toFixed(1)}
                                                        <p className={styles.marker_info_mark_4stars}>/5</p>
                                                    </div>
                                                </div>
                                                <div className={styles.marker_info_distanceandtime}>
                                                    <div className={styles.marker_info_distance}>
                                                        {destination.distance} meters
                                                    </div>
                                                    <div className={styles.marker_info_time}>
                                                        {destination.time} min
                                                    </div>
                                                </div>
                                            </div>
                                        </InfoWindowF>
                                    ) : null}
                                </Marker>
                            );
                        })
                ) : (
                    <div>
                        <p>No markers found</p>
                    </div>
                )}
            </GoogleMap>
        </>
    ) : (
        <></>
    );
};

export default Search;
