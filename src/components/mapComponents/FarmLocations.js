import { useMemo, useState } from "react";
import { GoogleMap, MarkerF, InfoBox, PolygonF } from "@react-google-maps/api";

import "./styleSheet/FarmLocations.css";

const FarmLocations = ({ isLoaded }) => {
  const [mapZoomLevel, setMapZoomLevel] = useState(15);
  //default map center and infoBox center
  const [coordinates, setCoordinates] = useState({
    lat: 6.5486898158251075,
    lng: 3.3598934728257746,
  });

  //infoBox styling
  const infoBoxStyling = useMemo(
    () => ({
      //   backgroundColor: "rgb(0, 60, 55, 0.4)",
      width: "auto",
      height: "auto",
      zIndex: 4,
      borderRadius: "10px",
      padding: "5px",
      paddingLeft: "10px",
      overflow: "hidden",
      color: "#fff",
      textShadow:
        "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
    }),
    []
  );

  const polygonPaths = useMemo(
    //data structure to be expected from the backend
    () => [
      {
        farm_field: "ILUPEJU_FARM",
        coordinates: [
          { lat: 6.548232930975129, lng: 3.357923452331253 },
          { lat: 6.548283560478482, lng: 3.358032081796356 },
          { lat: 6.548093033636583, lng: 3.358112548066803 },
          { lat: 6.5480490658935055, lng: 3.358007941915222 },
        ],
      },
      {
        farm_field: "INDUSTRIAL_AVENUE_FARM",
        coordinates: [
          { lat: 6.54861056697686, lng: 3.3569940218546312 },
          { lat: 6.54871715531832, lng: 3.3573105225183886 },
          { lat: 6.547853789097953, lng: 3.3576592096903246 },
          { lat: 6.54771522400995, lng: 3.357321251354448 },
          { lat: 6.548189542805562, lng: 3.357149589977495 },
          { lat: 6.548248166445621, lng: 3.3571817764856737 },
          { lat: 6.548312119499665, lng: 3.357154954395525 },
          { lat: 6.548290801815895, lng: 3.3571120390512865 },
        ],
      },
      {
        farm_field: "PLAYGROUND_FARM",
        coordinates: [
          { lat: 6.54851252569085, lng: 3.358549298006057 },
          { lat: 6.548680402351308, lng: 3.358981133657455 },
          { lat: 6.548441910888221, lng: 3.3590843987045282 },
          { lat: 6.5482540488174985, lng: 3.3586579274711603 },
        ],
      },
    ],

    []
  );

  const polygonOptions = useMemo(
    () => ({
      fillColor: "#003c37",
      fillOpacity: 0.1,
      strokeColor: "red",
      strokeOpacity: 1,
      strokeWeight: 2,
      clickable: false,
      draggable: false,
      editable: false,
      geodesic: false,
      zIndex: 1,
    }),
    []
  );

  const zoomMarker = (coordinates) => {
    setMapZoomLevel(18);
    setCoordinates(coordinates);
  };

  //Loading screen before map renders
  if (!isLoaded) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <GoogleMap
        zoom={mapZoomLevel}
        center={coordinates}
        mapContainerClassName="map-container"
        mapTypeId="satellite"
      >
        {polygonPaths[0] &&
          polygonPaths.map(({ farm_field, coordinates }) => {
            return (
              <div key={farm_field}>
                <PolygonF
                  key={coordinates[0].lat}
                  //get coordinates from DrawingManager
                  paths={coordinates}
                  options={polygonOptions}
                />
                <MarkerF
                  key={coordinates[0].lng}
                  position={{
                    lat: coordinates[0].lat,
                    lng: coordinates[0].lng,
                  }}
                  draggable={false}
                  onClick={() => zoomMarker((coordinates = coordinates[0]))}
                />
                <InfoBox
                  key={farm_field}
                  options={{ closeBoxURL: "", enableEventPropagation: true }}
                  position={{
                    lat: coordinates[0].lat,
                    lng: coordinates[0].lng,
                  }}
                >
                  <div style={infoBoxStyling}>
                    <p>{farm_field}</p>
                  </div>
                </InfoBox>
              </div>
            );
          })}
      </GoogleMap>
    </>
  );
};

export default FarmLocations;
