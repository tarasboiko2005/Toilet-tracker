import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, useJsApiLoader, Marker, InfoWindowF, } from "@react-google-maps/api";
import SecondStep from "./addmarker_two"

const containerStyle = {
  width: "100%",
  height: "100vh",
};
const center = {
  lat: 49.83514,
  lng: 24.00825
};


const Curtainns = () => {
  const curtain = {
    width: '100%',
    height: '71px',
    padding: '10px 20px 10px 20px',
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    borderRadius: '0 0 15px 15px',
    display: 'flex',
    flexDirection: 'colomn',
  };
  const exit = {
    width: '10px',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  };

  const text = {
    width: '100%',
    height: '100%',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 'bold',
    justifyContent: 'center',
  };

  return <div style={curtain}>
    <div style={exit}>
      <Link to="/">
        <svg width="10" height="22" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.30121 7.29944C3.90875 7.68795 3.90551 8.32105 4.29399 8.71356L9.06537 13.5344C9.45397 13.9271 9.45059 14.5604 9.05782 14.9489L8.69533 15.3074C8.30276 15.6957 7.6698 15.6923 7.28139 15.2999L0.744659 8.69532C0.356154 8.30278 0.359422 7.66963 0.751956 7.28112L7.35624 0.744642C7.74878 0.356138 8.38193 0.359405 8.77044 0.751939L9.12853 1.11375C9.51701 1.50625 9.51377 2.13935 9.1213 2.52787L4.30121 7.29944Z" fill="black" />
        </svg>
      </Link >
    </div>
    <div style={text}>
      Chose toilet position (1/2)
    </div>
  </div>;
};

const buttonStyle = {
  maxWidth: '500px',
  width: '242px',
  height: '52px',
  fontSize: '20px',
  backgroundColor: '#2197B0',
  top: '90%',
  left: '50%',
  transform: 'translateX(-50%)',
  borderRadius: '20px 20px 20px 20px',
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s',
};


const add_marker_page = () => {
  const [showAddMarker, setShowAddMarker] = useState(false);

  const [addCoords, setCoords] = useState('');

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    },
    [center]
  );

  const [newMarker, setNewMarker] = useState();

  const handleMapClick = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();

    // Створюємо новий маркер з отриманими координатами
    const newMarker = {
      coordinates: { lat, lng },
      name: "New Marker", // Ви можете додати додаткові поля за вашими потребами
    };

    // Оновлюємо список маркерів, додаючи новий маркер
    setNewMarker(newMarker);
    console.log(newMarker)
    const coordinatesString = `${lat}, ${lng}`;
    console.log(coordinatesString); // "lat, lng"
    setCoords(coordinatesString);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBkahPllK9iMTwnZ8CdBBgAM3bgPQIlG8A",
  });

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        // onClick={() => setActiveMarker(null)}
        onClick={handleMapClick}
        center={center}
        onLoad={onLoad}
        options={{
          zoom: 17,
          disableDefaultUI: true,
          styles: [
            {
              featureType: "poi",
              stylers: [{ visibility: "off" }],
            },
          ]
        }}
      >
        <Curtainns />
        <button style={buttonStyle} onClick={() => setShowAddMarker(true)}>Confirm</button>

        {newMarker && (
          <Marker
            position={{ lat: newMarker.coordinates.lat, lng: newMarker.coordinates.lng }}
            icon={{
              url: "data:image/svg+xml;charset=utf-8,%3Csvg width='44' height='62' viewBox='0 0 44 62' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 29.4583C19.9556 29.4583 17.995 28.6462 16.5494 27.2006C15.1038 25.755 14.2917 23.7944 14.2917 21.75C14.2917 19.7056 15.1038 17.745 16.5494 16.2994C17.995 14.8538 19.9556 14.0417 22 14.0417C24.0444 14.0417 26.005 14.8538 27.4506 16.2994C28.8962 17.745 29.7084 19.7056 29.7084 21.75C29.7084 22.7623 29.509 23.7646 29.1216 24.6999C28.7342 25.6351 28.1664 26.4848 27.4506 27.2006C26.7349 27.9164 25.8851 28.4842 24.9499 28.8716C24.0147 29.259 23.0123 29.4583 22 29.4583ZM22 0.166664C16.2758 0.166664 10.786 2.44062 6.7383 6.48828C2.69064 10.5359 0.416687 16.0257 0.416687 21.75C0.416687 37.9375 22 61.8333 22 61.8333C22 61.8333 43.5834 37.9375 43.5834 21.75C43.5834 16.0257 41.3094 10.5359 37.2617 6.48828C33.2141 2.44062 27.7243 0.166664 22 0.166664Z' fill='%232197B0'/%3E%3C/svg%3E",
              scaledSize: { width: 40, height: 40 },
            }}
          />
        )}
      </GoogleMap>
      {showAddMarker && <SecondStep trigger={showAddMarker} coordinates={addCoords} />}
    </>
  ) : (
    <>
      <Link to="/">
        An error occurred. Click on the text that go back
      </Link >
    </>
  );
}

export default add_marker_page
