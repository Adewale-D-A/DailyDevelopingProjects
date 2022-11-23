import React, { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";

import HomePage from "./pages/homePage";
import BlogSection from "./components/WordPress&ReactAPI/blogSection";
import SearchMapUI from "././pages/mapPage";
import FarmLocations from "./components/mapComponents/FarmLocations";

function App() {
  //google map api initialization options
  const drawing = useMemo(() => ["places", "drawing"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: drawing,
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wp-react/blog" element={<BlogSection />} />
          <Route
            path="/maps/map-search"
            element={<SearchMapUI isLoaded={isLoaded} />}
          />
          <Route
            path="/maps/farm-locate"
            element={<FarmLocations isLoaded={isLoaded} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
