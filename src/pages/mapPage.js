import { getGeocode, getLatLng } from "use-places-autocomplete";

import {
  GoogleMap,
  MarkerF,
  InfoBox,
  CircleF,
  DrawingManagerF,
} from "@react-google-maps/api";
import React, { useMemo, useState } from "react";

import "././pageStyling/Map.css";
import LocationSearchComponent from "../components/mapComponents/LocationSearch";

const SearchMapUI = ({ isLoaded }) => {
  //useSTATE CONTENTS
  //user's search input useState
  const [searchValue, setSearchValue] = useState("");
  //user's polygon drawing coordinates --- sending to backend
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  //default map center and infoBox center
  const [coordinates, setCoordinates] = useState({
    lat: 6.5486898158251075,
    lng: 3.3598934728257746,
  });
  //set farm name for coordinates drawn
  const [farmName, setFarmName] = useState("");

  //useMEMO CONTENTS
  //polygon drawing settings and options
  const DrawingManagerOptions = useMemo(
    () => ({
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon", "rectangle", "circle", "polyline", "marker"],
      },
      polygonOptions: {
        fillColor: `#2196F3`,
        strokeColor: `#2196F3`,
        fillOpacity: 0.5,
        strokeWeight: 2,
        clickable: true,
        editable: true,
        draggable: true,
        zIndex: 1,
      },
    }),
    []
  );
  //circle default settings and options
  const circleOptions = useMemo(
    () => ({
      strokeColor: "#718a33",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#003c37",
      fillOpacity: 0.35,
      clickable: false,
      draggable: false,
      editable: false,
      visible: true,
      radius: 300,
      zIndex: 3,
    }),
    []
  );
  //infoBox styling
  const infoBoxStyling = useMemo(
    () => ({
      backgroundColor: "#003c37",
      width: "150px",
      height: "auto",
      zIndex: 4,
      borderRadius: "10px",
      padding: "5px",
      paddingLeft: "10px",
      overflow: "hidden",
      color: "#fff",
    }),
    []
  );

  //Drag marker event handling Marker Drag
  //onMarkerDrop Handler Function to reset map's center coordinates to marker longitude and latitude
  const MarkerValue = (e) => {
    setCoordinates({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  //onClick event handling location search
  //Handler function to extract the longitude and latitude of search address
  const changeCoordinates = (address) => {
    //set search value to selected search
    setSearchValue(address, false);
    //change address to longitude and latitude coordinates
    getGeocode({ address: address }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      setCoordinates({
        lat,
        lng,
      });
    });
  };

  let NewArray = [];

  //Polygon drawing complete
  //Handler function to set new state for polygon coordinates
  const onPolygonComplete = (polygon) => {
    polygon?.latLngs?.Wc[0]?.Wc?.forEach((latLng) => {
      // console.log(`Lat: ${latLng.lat()}`, `Lng: ${latLng.lng()}`);
      NewArray.push({
        lat: latLng.lat(),
        lng: latLng.lng(),
      });
      setPolygonCoordinates([...polygonCoordinates, ...NewArray]);
    });
  };

  //Initialization of google instance

  //Loading screen before map renders
  if (!isLoaded) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div className="map-design">
        <div className="search-section">
          <LocationSearchComponent
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            changeCoordinates={changeCoordinates}
            polygonCoordinates={polygonCoordinates}
            farmName={farmName}
            setFarmName={setFarmName}
          />
        </div>
        <div className="map-div">
          <GoogleMap
            zoom={15}
            center={coordinates}
            mapContainerClassName="map-container"
            mapTypeId="hybrid"
          >
            <CircleF center={coordinates} options={circleOptions} />
            <MarkerF
              position={coordinates}
              onDragEnd={(e) => MarkerValue(e)}
              draggable={true}
            />
            <DrawingManagerF
              // drawingMode="polygon"
              onPolygonComplete={(polygon) => onPolygonComplete(polygon)}
              options={DrawingManagerOptions}
            />
            <InfoBox
              options={{ closeBoxURL: "", enableEventPropagation: true }}
              position={{
                lat: coordinates?.lat,
                lng: coordinates?.lng,
              }}
            >
              {coordinates?.lat === 6.5486898158251075 &&
              coordinates?.lng === 3.3598934728257746 ? (
                <p style={infoBoxStyling}>Hola! You can drag the pin</p>
              ) : (
                <div style={infoBoxStyling}>
                  <p>Lat: {coordinates?.lat}</p>
                  <p>lng: {coordinates?.lng}</p>
                </div>
              )}
            </InfoBox>
          </GoogleMap>
        </div>
      </div>
    </>
  );
};

export default SearchMapUI;
