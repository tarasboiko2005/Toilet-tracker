import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "50vh",
};

const Search = ({ lat: latitude, lng: longitude }) => {
    const center_new = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    };
    console.log(center_new)

    const [mapCenter, setMapCenter] = useState({ lat: latitude, lng: longitude });

    const onLoad = React.useCallback(
        function callback(map) {
            const bounds = new window.google.maps.LatLngBounds(center_new);
            map.fitBounds(bounds);
        },
        [center_new]
    );

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBkahPllK9iMTwnZ8CdBBgAM3bgPQIlG8A",
    });

    return isLoaded ? (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={1}
                onLoad={onLoad}
                options={{
                    disableDefaultUI: true,
                    gestureHandling: 'greedy',
                    zoom: 1,
                    styles: [
                        {
                            featureType: "poi",
                            stylers: [{ visibility: "off" }],
                            zoom: 1,
                        },
                    ]
                }}
            >
                <Marker
                    position={{ lat: center_new.lat, lng: center_new.lng }}
                    icon={{
                        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47 46" fill="none" width="47" height="46"><path d="M23.5 45.4167C36.1569 45.4167 46.4167 40.8013 46.4167 35.1042C46.4167 32.2029 43.7515 29.5813 39.4615 27.7044C36.8444 32.5077 32.8546 36.6488 27.7855 38.8144C26.4304 39.3911 24.9728 39.6884 23.5 39.6884C22.0273 39.6884 20.5697 39.3911 19.2146 38.8144C14.1455 36.6488 10.1557 32.5077 7.53858 27.7067C3.24858 29.579 0.583374 32.2029 0.583374 35.1042C0.583374 40.8013 10.8432 45.4167 23.5 45.4167Z" fill="%23DF3737"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 14.6585C8 6.56312 15.1634 0 24 0C32.8366 0 40 6.56312 40 14.6585C40 22.6908 34.8937 32.0619 26.9257 35.4143C26.0003 35.8008 25.0053 36 24 36C22.9947 36 21.9997 35.8008 21.0743 35.4143C13.1063 32.0619 8 22.6885 8 14.6585ZM24 20.2496C25.2124 20.2496 26.3752 19.7755 27.2325 18.9316C28.0898 18.0877 28.5714 16.9431 28.5714 15.7497C28.5714 14.5562 28.0898 13.4117 27.2325 12.5678C26.3752 11.7239 25.2124 11.2498 24 11.2498C22.7876 11.2498 21.6248 11.7239 20.7675 12.5678C19.9102 13.4117 19.4286 14.5562 19.4286 15.7497C19.4286 16.9431 19.9102 18.0877 20.7675 18.9316C21.6248 19.7755 22.7876 20.2496 24 20.2496Z" fill="%23DF3737"/></svg>',
                        scaledSize: { width: 40, height: 40 },
                    }}
                />
            </GoogleMap>
        </>
    ) : (
        <></>
    );
};


export default function Confirm_marker(props) {
    const navigate = useNavigate();
    const { id, name, coordinates, tags } = props.markerInfo;

    const changeVisibility = () => {
        const url = '/api/v1/markers/changeVisibility/' + id;
        const authorization = 'Bearer ' + window.localStorage.getItem('jsonwebtoken');

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Authorization': authorization
            },
            data: ''
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                navigate("/admin_menu");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return props.trigger ? (
        <div>
            <svg
                onClick={() => props.setTrigger(false)}
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
            <Search lat={coordinates.lat} lng={coordinates.lng} />

            <h1 onClick={changeVisibility}>Make visible</h1>

            <div>
                <h2>Marker Info:</h2>
                <p>ID: {id}</p>
                <p>Name: {name}</p>
                {/* <p>Coordinates: {coordinates.lat}, {coordinates.lng}</p> */}
                {/* <p>Tags: {tags.join(', ')}</p> */}
            </div>
        </div>
    ) : null;
}
