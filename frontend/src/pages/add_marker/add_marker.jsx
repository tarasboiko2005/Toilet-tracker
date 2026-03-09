import React, { useState } from 'react';
import axios from 'axios';
import { GoogleMap, useJsApiLoader, Marker, } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "50vh",
};
const center = {
  lat: 49.83514,
  lng: 24.00825
};


const add_marker_page = () => {
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [addName, setName] = useState('');
  const [addCoords, setCoords] = useState('');

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Якщо чекбокс вибраний, додаємо його значення до масиву
      setCheckboxValues([...checkboxValues, value]);
    } else {
      // Якщо чекбокс знятий, видаляємо його значення з масиву
      setCheckboxValues(checkboxValues.filter(item => item !== value));
    }

  };

  const handleInputChange_Name = (event) => {
    setName(event.target.value);
  };



  const addMarker = (event) => {
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
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <a href="/" target="_self" rel="noopener noreferrer">
        <svg width="20" height="32" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.30121 7.29944C3.90875 7.68795 3.90551 8.32105 4.29399 8.71356L9.06537 13.5344C9.45397 13.9271 9.45059 14.5604 9.05782 14.9489L8.69533 15.3074C8.30276 15.6957 7.6698 15.6923 7.28139 15.2999L0.744659 8.69532C0.356154 8.30278 0.359422 7.66963 0.751956 7.28112L7.35624 0.744642C7.74878 0.356138 8.38193 0.359405 8.77044 0.751939L9.12853 1.11375C9.51701 1.50625 9.51377 2.13935 9.1213 2.52787L4.30121 7.29944Z" fill="black" />
        </svg>
      </a >
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          // onClick={() => setActiveMarker(null)}
          onClick={handleMapClick}
          center={center}
          onLoad={onLoad}
          options={{
            disableDefaultUI: true,
            styles: [
              {
                featureType: "poi",
                stylers: [{ visibility: "off" }],
              },
            ],
            zoom: 16
          }}
        >
          {newMarker && (
            <Marker
              position={{ lat: newMarker.coordinates.lat, lng: newMarker.coordinates.lng }}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: { width: 40, height: 40 },
              }}
            />
          )}

        </GoogleMap>
        <label>
          <input type="checkbox" value="CAFFE" onChange={handleCheckboxChange} />
          CAFFE
        </label><br />
        <label>
          <input type="checkbox" value="SUPERMARKET" onChange={handleCheckboxChange} />
          SUPERMARKET
        </label><br />
        <label>
          <input type="checkbox" value="RESTAURANT" onChange={handleCheckboxChange} />
          RESTAURANT
        </label><br />
        <label>
          <input type="checkbox" value="PUBLIC" onChange={handleCheckboxChange} />
          PUBLIC
        </label><br />
        <label>
          <input type="checkbox" value="FREE" onChange={handleCheckboxChange} />
          FREE
        </label><br />
        <label>
          <input type="checkbox" value="PAID" onChange={handleCheckboxChange} />
          PAID
        </label><br />
        <label>
          <input type="checkbox" value="STORE" onChange={handleCheckboxChange} />
          STORE
        </label><br />
        <h3>Ви вибрали:</h3>
        <ul>
          {checkboxValues.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={addName}
        onChange={handleInputChange_Name}
        placeholder="Введіть ім'я..."
      />
      <button onClick={addMarker}>Send marker</button>
    </>
  ) : (
    <>
      <a href="/" target="_self" rel="noopener noreferrer">
        An error occurred. Click on the text that go back
      </a >
    </>
  );
}

export default add_marker_page
