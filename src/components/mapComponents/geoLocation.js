import { GoogleMap } from "@react-google-maps/api";
import { useGeolocated } from "react-geolocated";

import "./styleSheet/geoLocation.css";

const GeoLocation = (isLoaded) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
        timeout: Infinity,
      },
      watchPosition: true,
      userDecisionTimeout: null,
    });

  return (
    <>
      <div>
        {!isGeolocationAvailable ? (
          <div>Your browser does not support Geolocation</div>
        ) : !isGeolocationEnabled ? (
          <div>Geolocation is not enabled</div>
        ) : coords ? (
          isLoaded ? (
            <GoogleMap
              zoom={19}
              center={{ lat: coords.latitude, lng: coords.longitude }}
              mapContainerClassName="map-container"
              mapTypeId="hybrid"
            ></GoogleMap>
          ) : (
            <div>Loading map...</div>
          )
        ) : (
          <div>Getting the location data&hellip; </div>
        )}
      </div>
    </>
  );
};

export default GeoLocation;
