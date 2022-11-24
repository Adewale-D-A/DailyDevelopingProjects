import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div>
        <h1>Welcome to this React Integration Test Application</h1>
      </div>
      <div>
        <Link to="/wp-react/blog">Navigate to Wordpress React Page</Link>
      </div>
      <div>
        <Link to="/maps/map-search">Navigate to Map Search Section</Link>
      </div>
      <div>
        <Link to="/maps/farm-locate">Navigate to Locate Farms on Map</Link>
      </div>
      <div>
        <Link to="/maps/geo-locate">Get device location</Link>
      </div>
    </>
  );
};

export default HomePage;
