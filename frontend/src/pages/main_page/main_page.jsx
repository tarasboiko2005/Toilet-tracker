import GMap from './GMap/GMap'

const center = {
    lat: 49.83514,
    lng: 24.00825
};

const Main_page = () => {
  return (
    <div>
      <GMap center={center}/>
    </div>
  )
}

export default Main_page

// import React, { useState } from 'react'

// function App() {
//   const [latitude, setLatitude] = useState()
//   const [longitude, setLongitude] = useState()

//   navigator.geolocation.watchPosition(position => {
//     const { latitude, longitude } = position.coords;
//     console.log(latitude, longitude)
//     setLatitude(latitude)
//     setLongitude(longitude)
//   })

//   return (
//     <>
//       <h1>Current Location </h1>
//       <h2>Latitude:   {latitude}</h2>
//       <h2>Longitude:  {longitude}</h2>
//     </>
//   )
// }

// export default App;
