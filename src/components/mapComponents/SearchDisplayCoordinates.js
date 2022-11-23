import "./styleSheet/SearchDisplayCoordinates.css";

const SearchDisplayCoordinates = ({ polygonCoordinates }) => {
  return (
    <>
      {" "}
      {polygonCoordinates[0] && (
        <div className="farm-selected-title">
          <span>Selected Farm Location Coordinates:</span>
        </div>
      )}
      <div className="farm-coordinates-data">
        {polygonCoordinates &&
          polygonCoordinates?.map((value) => {
            return (
              <div
                key={value.lat ? value.lat : "random"}
                className="polygon-coordinate-display"
              >
                <div className="single-coordinate-display">
                  <b>lat: </b>
                  {value.lat},
                </div>
                <div className="single-coordinate-display">
                  <b>lng: </b> {value.lng}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SearchDisplayCoordinates;
