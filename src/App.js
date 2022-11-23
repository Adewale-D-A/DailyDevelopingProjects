import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import BlogSection from "./components/WordPress&ReactAPI/blogSection";
import SearchMapUI from "././pages/mapPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wp-react-blog" element={<BlogSection />} />
          <Route path="/google-map" element={<SearchMapUI />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
