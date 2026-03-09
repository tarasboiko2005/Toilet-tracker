import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindowF, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import stylesSearch from "./search.module.css";
import styles from "../../main_page/GMap/GMap.module.css";
import style_categories from "../../main_page/GMap/MarkerCategory.module.css";
import axios from 'axios';

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

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 49.83514,
  lng: 24.00825
};


const Search = () => {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [reviews, setReviews] = useState({});

  const [mapCenter, setMapCenter] = useState(center);
  const [topValue, setTopValue] = useState("0px"); // початкове значення

  const body = document.body;

  const handleClickShow = () => {
    setTopValue("-331px");
  };

  const handleClickHide = () => {
    setTopValue("0px");
  };

  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

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

  const [tags, setTags] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [checkboxValues, setCheckboxValues] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/markers/tags')
      .then(res => {
        setTags(res.data);
        console.log(res.data);
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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBkahPllK9iMTwnZ8CdBBgAM3bgPQIlG8A",
  });

  navigator.geolocation.watchPosition(position => {
    const { latitude, longitude } = position.coords;
    setLatitude(latitude)
    setLongitude(longitude)
  })
  
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
  return isLoaded ? (
    <>
      {/* {filteredMarkers.length > 0 ? (
        filteredMarkers.map((marker) => {
          return (
            <div className={styles.marker_box} key={marker.id}>
              {marker.name}
            </div>
          );
        })
      ) : (
        <div className={styles.marker_box}>
          No markers found
        </div>
      )} */}
      <GoogleMap
            mapContainerStyle={containerStyle}
            onClick={() => setActiveMarker(null)}
            center={mapCenter}
            onLoad={onLoad}
            options={{
                disableDefaultUI: true,
                gestureHandling: 'greedy',
                zoom: 17,
                styles: [
                    {
                        featureType: "poi",
                        stylers: [{ visibility: "off" }],
                    },
                ]
            }}
        >
        <div className={stylesSearch.search}>
          <div className={stylesSearch.search_exit}>
            <a href="/" target="_self" rel="noopener noreferrer">
              <svg width="10" height="22" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.30121 7.29944C3.90875 7.68795 3.90551 8.32105 4.29399 8.71356L9.06537 13.5344C9.45397 13.9271 9.45059 14.5604 9.05782 14.9489L8.69533 15.3074C8.30276 15.6957 7.6698 15.6923 7.28139 15.2999L0.744659 8.69532C0.356154 8.30278 0.359422 7.66963 0.751956 7.28112L7.35624 0.744642C7.74878 0.356138 8.38193 0.359405 8.77044 0.751939L9.12853 1.11375C9.51701 1.50625 9.51377 2.13935 9.1213 2.52787L4.30121 7.29944Z" fill="black" />
              </svg>
            </a>
          </div>
          <input className={stylesSearch.search_field} value={searchText} onChange={handleInputChange} placeholder="Find a place..." />
        </div>
        <div className={stylesSearch.markers_button_box}>
          <button className={stylesSearch.marker_button} onClick={handleClickShow}>
            <div className={stylesSearch.marker_button_box_1}>
              <div className={stylesSearch.marker_button_box_text_1}>
                Tags
              </div>
              <div className={stylesSearch.marker_button_box_text_2}>
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.99999 4.2C3.88365 4.2 4.59999 3.48366 4.59999 2.6C4.59999 1.71634 3.88365 1 2.99999 1C2.11634 1 1.39999 1.71634 1.39999 2.6C1.39999 3.48366 2.11634 4.2 2.99999 4.2Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" /><path d="M10.2 4.2C11.0837 4.2 11.8 3.48366 11.8 2.6C11.8 1.71634 11.0837 1 10.2 1C9.31638 1 8.60004 1.71634 8.60004 2.6C8.60004 3.48366 9.31638 4.2 10.2 4.2Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" /><path d="M1 6.60001H5L4.2 15.4H1.8L1 6.60001ZM8.2 6.60001H12.2L13 11H11.8L11.4 15.4H9L8.6 11H7.4L8.2 6.60001Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <p>Public</p>
              </div>
            </div>
            <div className={stylesSearch.marker_button_box_2}>
              Edit
            </div>
          </button>
        </div>
        <Marker
          position={{ lat: latitude, lng: longitude }}
          icon={{
            url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 46" fill="none" width="47" height="46"><path d="M23.5 45.4167C36.1569 45.4167 46.4167 40.8013 46.4167 35.1042C46.4167 32.2029 43.7515 29.5813 39.4615 27.7044C36.8444 32.5077 32.8546 36.6488 27.7855 38.8144C26.4304 39.3911 24.9728 39.6884 23.5 39.6884C22.0273 39.6884 20.5697 39.3911 19.2146 38.8144C14.1455 36.6488 10.1557 32.5077 7.53858 27.7067C3.24858 29.579 0.583374 32.2029 0.583374 35.1042C0.583374 40.8013 10.8432 45.4167 23.5 45.4167Z" fill="%23DF3737"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 14.6585C8 6.56312 15.1634 0 24 0C32.8366 0 40 6.56312 40 14.6585C40 22.6908 34.8937 32.0619 26.9257 35.4143C26.0003 35.8008 25.0053 36 24 36C22.9947 36 21.9997 35.8008 21.0743 35.4143C13.1063 32.0619 8 22.6885 8 14.6585ZM24 20.2496C25.2124 20.2496 26.3752 19.7755 27.2325 18.9316C28.0898 18.0877 28.5714 16.9431 28.5714 15.7497C28.5714 14.5562 28.0898 13.4117 27.2325 12.5678C26.3752 11.7239 25.2124 11.2498 24 11.2498C22.7876 11.2498 21.6248 11.7239 20.7675 12.5678C19.9102 13.4117 19.4286 14.5562 19.4286 15.7497C19.4286 16.9431 19.9102 18.0877 20.7675 18.9316C21.6248 19.7755 22.7876 20.2496 24 20.2496Z" fill="%23DF3737"/></svg>',
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
                          <div className={styles.marker_info_reviews} onClick={() => setButtonPopup(true)}>
                            <a
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
                        </div>
                        <div className={styles.marker_info_distanceandtime}>
                          <div className={styles.marker_info_distance_and_time}>
                            <div className={styles.marker_info_distance}>
                              {destination.distance} meters
                            </div>
                            <div className={styles.marker_info_time}>
                              {destination.time} min
                            </div>
                          </div>
                          <div className={styles.marker_info_mark}>
                            <StarSVG />
                            {averageRating.toFixed(1)}
                            <p className={styles.marker_info_mark_4stars}>/5</p>
                          </div>
                        </div>
                        <div className={styles.marker_button_to_way_div}>
                          <button className={styles.marker_button_to_way} onClick={() => showDirections(coordinates.lat, coordinates.lng)}>Pave the way</button>
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
      <div className={stylesSearch.drawer} style={{ top: topValue }}>
        <button className={stylesSearch.drawer_exit} onClick={handleClickHide}></button>
        <div className={stylesSearch.toilet_tags}>
          <div className={stylesSearch.toilet_tags_p}>Specify tags</div>
          <div className={stylesSearch.toilet_tags_list}>
            <label className={stylesSearch.toilet_tag}>
              <input className={stylesSearch.checkbox} onChange={handleCheckboxChange} type="checkbox" value="RESTAURANT" />
              <div className={stylesSearch.checkbox_checked}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_346_35)"><path d="M8.7014 5.68598H9.07896C9.34587 5.68671 9.61029 5.63449 9.85688 5.53233C10.1035 5.43017 10.3274 5.2801 10.5156 5.09082L12.5938 2.99609L12.0296 2.42734L9.90745 4.54949L9.46642 4.10846L11.5886 1.98605L11.0046 1.41959L8.8903 3.53361L8.45054 3.09258L10.5727 0.970176L10.0039 0.40625L7.90921 2.48447C7.71991 2.67271 7.56984 2.89663 7.46768 3.14327C7.36552 3.38991 7.3133 3.65437 7.31405 3.92133V4.29863L6.21896 5.39373L1.21878 0.40625C0.0944838 1.79943 0.758449 4.35982 2.02417 5.6258L4.19507 7.7967C4.86919 8.47082 5.003 8.531 5.76777 8.22326C5.93255 8.15699 5.99247 8.16436 6.14609 8.31771L6.47616 8.6257C6.55056 8.70187 6.55234 8.72422 6.55234 8.86996V9.01062C6.55234 9.54586 6.8946 9.85359 7.12007 10.0831L9.75003 12.5938L11.5782 10.7656L7.6063 6.78107L8.7014 5.68598Z" fill="black" /><path d="M5.77307 9.00326C5.01592 9.1584 4.55152 9.30135 3.66361 8.41344C3.64939 8.39922 3.63467 8.38551 3.62045 8.37129L3.12533 7.87617L0.40625 10.5625L2.4375 12.5938L6.09375 8.9375L5.77307 9.00326Z" fill="black" /></g><defs><clipPath id="clip0_346_35"><rect width="13" height="13" fill="white" /></clipPath></defs></svg>
                <p>Restaurant</p>
              </div>
            </label><br />
            <label className={stylesSearch.toilet_tag}>
              <input className={stylesSearch.checkbox} onChange={handleCheckboxChange} type="checkbox" value="SUPERMARKET" />
              <div className={stylesSearch.checkbox_checked}>
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_346_38)"><path d="M10.56 11.04C11.0902 11.04 11.52 10.6102 11.52 10.08C11.52 9.54981 11.0902 9.12 10.56 9.12C10.0298 9.12 9.59998 9.54981 9.59998 10.08C9.59998 10.6102 10.0298 11.04 10.56 11.04Z" fill="black" /><path d="M3.60001 11.04C4.13021 11.04 4.56001 10.6102 4.56001 10.08C4.56001 9.54981 4.13021 9.12 3.60001 9.12C3.06982 9.12 2.64001 9.54981 2.64001 10.08C2.64001 10.6102 3.06982 11.04 3.60001 11.04Z" fill="black" /><path d="M11.28 7.92H3.78504L3.94512 7.66032C4.01376 7.54896 4.03392 7.41432 4.00104 7.2876L3.8448 6.68616L10.8007 6.32472C11.0645 6.31128 11.28 6.084 11.28 5.82V2.64C11.28 2.376 11.064 2.16 10.8 2.16H2.66856L2.57472 1.79928C2.54799 1.6964 2.48786 1.6053 2.40377 1.54028C2.31967 1.47526 2.21638 1.43999 2.11008 1.44H0.48C0.352696 1.44 0.230606 1.49057 0.140589 1.58059C0.0505713 1.67061 0 1.7927 0 1.92C0 2.0473 0.0505713 2.16939 0.140589 2.25941C0.230606 2.34943 0.352696 2.4 0.48 2.4H1.73904L3.02064 7.3308L2.51664 8.148C2.47181 8.22071 2.44722 8.30408 2.4454 8.38948C2.44359 8.47488 2.46462 8.55921 2.50632 8.63376C2.54785 8.7084 2.60858 8.77058 2.68221 8.81388C2.75584 8.85717 2.8397 8.88 2.92512 8.88H11.28C11.4073 8.88 11.5294 8.82943 11.6194 8.73941C11.7094 8.64939 11.76 8.5273 11.76 8.4C11.76 8.2727 11.7094 8.15061 11.6194 8.06059C11.5294 7.97057 11.4073 7.92 11.28 7.92Z" fill="black" /></g><defs><clipPath id="clip0_346_38"><rect width="12" height="12" fill="white" /></clipPath></defs></svg>
                <p>Supermarker</p>
              </div>
            </label><br />
            <label className={stylesSearch.toilet_tag}>
              <input className={stylesSearch.checkbox} onChange={handleCheckboxChange} type="checkbox" value="RESTAURANT" />
              <div className={stylesSearch.checkbox_checked}>
                <svg width="13" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_346_42)"><path d="M10.049 6.54405V6.01391C10.049 5.71061 9.80828 5.46479 9.51112 5.46479H1.74846C1.45135 5.46479 1.21055 5.71061 1.21055 6.01391V7.7895C1.21055 10.2771 3.19301 12.3008 5.62979 12.3008C7.12231 12.3008 8.44197 11.5398 9.24246 10.3798H10.1032C11.1401 10.3798 11.9835 9.51867 11.9835 8.46014C11.9537 7.1872 10.9284 6.5128 10.049 6.54405ZM5.62981 11.2026C3.78626 11.2026 2.28639 9.67146 2.28639 7.7895V6.563H8.97321V7.7895C8.97321 9.67146 7.47331 11.2026 5.62976 11.2026M9.803 9.26836C9.99082 8.70437 10.0621 8.18314 10.0504 7.66315C10.4889 7.59998 10.8983 8.00194 10.8947 8.46014C10.8641 8.97176 10.5221 9.33092 9.803 9.26836ZM5.90892 3.74624H5.23178V4.43749C5.23178 4.9755 4.42389 4.9755 4.42389 4.43749V3.74624H3.74675C3.21219 3.74624 3.21219 2.92155 3.74675 2.92155H4.42389V2.2303C4.42389 1.68441 5.23175 1.68441 5.23175 2.2303V2.92155H5.9089C6.45211 2.92155 6.45211 3.74624 5.9089 3.74624M8.231 1.92687H7.55399V2.61812C7.54839 3.17257 6.73981 3.1721 6.74598 2.61812V1.92687H6.06889C5.52996 1.92687 5.52996 1.10218 6.06889 1.10218H6.74598V0.410874C6.74598 -0.136958 7.55399 -0.136958 7.55399 0.410874V1.10212H8.231C8.77033 1.10212 8.77033 1.92687 8.231 1.92687ZM10.7536 14H0.53994C-0.17998 14 -0.17998 12.9018 0.53994 12.9018H10.7536C11.4707 12.9018 11.4707 14 10.7536 14Z" fill="black" /></g><defs><clipPath id="clip0_346_42"><rect width="12" height="14" fill="white" /></clipPath></defs></svg>
                <p>Caffe</p>
              </div>
            </label><br />
            <label className={stylesSearch.toilet_tag}>
              <input className={stylesSearch.checkbox} onChange={handleCheckboxChange} type="checkbox" value="PUBLIC" />
              <div className={stylesSearch.checkbox_checked}>
                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.80553 3.88889C3.60327 3.88889 4.24997 3.24219 4.24997 2.44444C4.24997 1.6467 3.60327 1 2.80553 1C2.00778 1 1.36108 1.6467 1.36108 2.44444C1.36108 3.24219 2.00778 3.88889 2.80553 3.88889Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.30553 3.88889C10.1033 3.88889 10.75 3.24219 10.75 2.44444C10.75 1.6467 10.1033 1 9.30553 1C8.50778 1 7.86108 1.6467 7.86108 2.44444C7.86108 3.24219 8.50778 3.88889 9.30553 3.88889Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" /><path d="M1 6.05556H4.61111L3.88889 14H1.72222L1 6.05556ZM7.5 6.05556H11.1111L11.8333 10.0278H10.75L10.3889 14H8.22222L7.86111 10.0278H6.77778L7.5 6.05556Z" fill="black" stroke="black" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <p>Public</p>
              </div>
            </label><br />
            <label className={stylesSearch.toilet_tag}>
              <input className={stylesSearch.checkbox} onChange={handleCheckboxChange} type="checkbox" value="FREE" />
              <div className={stylesSearch.checkbox_checked}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_346_48)"><path d="M12.1875 0.46875H2.8125C1.51805 0.46875 0.46875 1.51805 0.46875 2.8125V12.1875C0.46875 13.482 1.51805 14.5312 2.8125 14.5312H12.1875C13.482 14.5312 14.5312 13.482 14.5312 12.1875V2.8125C14.5312 1.51805 13.482 0.46875 12.1875 0.46875ZM4.21875 6.09375H3.02578V7.14844H4.21875V7.85156H3.02578V9.60938H2.34375V5.39062H4.21875V6.09375ZM7.14258 9.60938H6.43453L5.85539 7.85156H5.59172V9.60938H4.92188V5.39062H6.09375C6.74016 5.39062 7.26562 5.94258 7.26562 6.62109C7.26562 7.13602 6.96258 7.57828 6.53414 7.76133L7.14258 9.60938ZM9.84375 6.09375H8.65078V7.14844H9.84375V7.85156H8.65078V8.90625H9.84375V9.60938H7.96875V5.39062H9.84375V6.09375ZM12.6562 6.09375H11.4633V7.14844H12.6562V7.85156H11.4633V8.90625H12.6562V9.60938H10.7812V5.39062H12.6562V6.09375Z" fill="black" /><path d="M6.0937 6.09375H5.59143V7.14844H6.0937C6.37073 7.14844 6.59596 6.91172 6.59596 6.62109C6.59596 6.33047 6.37073 6.09375 6.0937 6.09375Z" fill="black" /></g><defs><clipPath id="clip0_346_48"><rect width="15" height="15" fill="white" /></clipPath></defs></svg>
                <p>Free</p>
              </div>
            </label><br />
            <label className={stylesSearch.toilet_tag}>
              <input className={stylesSearch.checkbox} onChange={handleCheckboxChange} type="checkbox" value="PAID" />
              <div className={stylesSearch.checkbox_checked}>
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 2C4.36 2 1 5.36 1 9.5C1 13.64 4.36 17 8.5 17C12.64 17 16 13.64 16 9.5C16 5.36 12.64 2 8.5 2ZM9.16 13.82V14.09C9.16 14.45 8.8675 14.75 8.5 14.75C8.14 14.75 7.84 14.4575 7.84 14.09V13.775C7.3675 13.6625 6.3925 13.3175 5.8225 12.2C5.65 11.87 5.815 11.4575 6.16 11.315L6.2125 11.2925C6.52 11.165 6.865 11.2925 7.0225 11.585C7.2625 12.0425 7.735 12.6125 8.6125 12.6125C9.31 12.6125 10.0975 12.2525 10.0975 11.405C10.0975 10.685 9.5725 10.31 8.3875 9.8825C7.5625 9.59 5.875 9.11 5.875 7.4C5.875 7.325 5.8825 5.6 7.84 5.18V4.91C7.84 4.5425 8.14 4.25 8.5 4.25C8.86 4.25 9.16 4.5425 9.16 4.91V5.1875C9.9625 5.33 10.4725 5.7575 10.78 6.1625C11.035 6.4925 10.9 6.9725 10.51 7.1375C10.24 7.25 9.925 7.16 9.745 6.9275C9.535 6.6425 9.16 6.35 8.545 6.35C8.02 6.35 7.1875 6.6275 7.1875 7.3925C7.1875 8.105 7.8325 8.375 9.1675 8.8175C10.9675 9.44 11.425 10.355 11.425 11.405C11.425 13.3775 9.55 13.7525 9.16 13.82Z" fill="black" /></svg>
                <p>Paid</p>
              </div>
            </label><br />
            <label className={stylesSearch.toilet_tag}>
              <input className={stylesSearch.checkbox} onChange={handleCheckboxChange} type="checkbox" value="STORE" />
              <div className={stylesSearch.checkbox_checked}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_346_25)"><path fillRule="evenodd" clipRule="evenodd" d="M2 2.85359e-08C1.90492 -3.20869e-05 1.81181 0.0270443 1.73157 0.0780542C1.65134 0.129064 1.58731 0.201893 1.547 0.288L0.047 3.497C0.0102149 3.57597 -0.00529744 3.66319 0.002 3.75H0V4.695C0 5.219 0.226 5.721 0.63 6.091C1.032 6.461 1.579 6.669 2.149 6.669H2.449C3.01001 6.67257 3.55211 6.46643 3.969 6.091C4.133 5.941 4.267 5.769 4.369 5.583C4.496 5.413 4.702 5.413 4.821 5.569C4.924 5.761 5.061 5.937 5.228 6.091C5.631 6.461 6.178 6.669 6.748 6.669H7.285C7.84601 6.67257 8.38811 6.46643 8.805 6.091C8.961 5.947 9.091 5.784 9.191 5.607C9.322 5.402 9.551 5.407 9.671 5.597C9.772 5.778 9.904 5.945 10.063 6.091C10.466 6.461 11.013 6.669 11.583 6.669H11.851C12.412 6.67257 12.9541 6.46643 13.371 6.091C13.774 5.721 14 5.219 14 4.695V3.75H13.998C14.0053 3.66319 13.9898 3.57597 13.953 3.497L12.453 0.288C12.4127 0.201893 12.3487 0.129064 12.2684 0.0780542C12.1882 0.0270443 12.0951 -3.20869e-05 12 2.85359e-08H2ZM1 13V7.729C2.188 8.121 3.605 7.946 4.578 7.193C5.876 8.197 8.127 8.197 9.424 7.193C10.402 7.949 11.816 8.121 13 7.719V13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14H10.745V10.21C10.7448 10.1807 10.7384 10.1518 10.7264 10.1251C10.7143 10.0984 10.6968 10.0745 10.675 10.055C10.6284 10.0131 10.5677 9.99026 10.505 9.991H8.513C8.45031 9.99026 8.38964 10.0131 8.343 10.055C8.32117 10.0745 8.30366 10.0984 8.29161 10.1251C8.27955 10.1518 8.27321 10.1807 8.273 10.21V14H2C1.73478 14 1.48043 13.8946 1.29289 13.7071C1.10536 13.5196 1 13.2652 1 13ZM2.502 10.76V9.5C2.502 9.36739 2.55468 9.24021 2.64845 9.14645C2.74221 9.05268 2.86939 9 3.002 9H6.016C6.14861 9 6.27579 9.05268 6.36955 9.14645C6.46332 9.24021 6.516 9.36739 6.516 9.5V10.76C6.516 10.8926 6.46332 11.0198 6.36955 11.1136C6.27579 11.2073 6.14861 11.26 6.016 11.26H3.002C2.86939 11.26 2.74221 11.2073 2.64845 11.1136C2.55468 11.0198 2.502 10.8926 2.502 10.76Z" fill="black" /></g><defs><clipPath id="clip0_346_25"><rect width="14" height="14" fill="white" /></clipPath></defs></svg>
                <p>Store</p>
              </div>
            </label><br />
            {/* {tags.map((tag) => {
                return (
                    <div key={tag.id}>
                        <label>
                            <input type="checkbox" value={tag.name} onChange={handleCheckboxChange} />
                            {tag.name}
                        </label><br />
                    </div>
                );
            })} */}
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Search;
