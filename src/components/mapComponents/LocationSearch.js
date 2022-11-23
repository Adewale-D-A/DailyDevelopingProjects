import PlacesAutocomplete from "react-places-autocomplete";
import SearchDisplayCoordinates from "./SearchDisplayCoordinates";

import "./styleSheet/LocationSearch.css";

const LocationSearchComponent = ({
  searchValue,
  setSearchValue,
  changeCoordinates,
  polygonCoordinates,
  farmName,
  setFarmName,
}) => {
  return (
    <>
      <PlacesAutocomplete
        value={searchValue}
        onChange={setSearchValue}
        onSelect={changeCoordinates}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "search your location",
                className: "search-bar",
              })}
            />
            <div className="search-suggestion-component">
              {loading && <div>Suggestions Loading...</div>}
              <div className="search-suggestions-ctn">
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  // const style = suggestion.active
                  //   ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  //   : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      key={suggestion.placeId}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        // style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <div>
        <div className="selected-farm-coordinates">
          <SearchDisplayCoordinates polygonCoordinates={polygonCoordinates} />
        </div>
        <div className="farm-name-field-input">
          {polygonCoordinates[0] && (
            <>
              <form className="farm-name-form">
                <div className="farm-name-label-ctn">
                  <label htmlFor="farm-name">
                    Please input your Farm Name:
                  </label>
                </div>
                <div className="farm-name-input-ctn">
                  <input
                    id="farm-name"
                    className="map-section-farm-name-input-field"
                    placeholder="farm name"
                    value={farmName}
                    onChange={(e) => {
                      setFarmName(e.target.value);
                    }}
                  />
                </div>
                <div className="farm-name-btn-ctn">
                  <button>Submit Farm Location</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LocationSearchComponent;
