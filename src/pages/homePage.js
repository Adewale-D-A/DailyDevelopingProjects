import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div>
        <h1>Welcome to this React Integration Test Application</h1>
      </div>
      <div>
        <Link to="/wp-react-blog">Navigate to Wordpress React Page</Link>
      </div>
      <div>
        <Link to="/google-map">Navigate to Map Section</Link>
      </div>
    </>
  );
};

export default HomePage;
