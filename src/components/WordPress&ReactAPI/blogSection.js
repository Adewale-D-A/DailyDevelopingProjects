import axios from "axios";
import { useEffect, useState } from "react";

// import "./blogSection.css";
import "./wp-css-style.css";
// import logo from "./logo.svg";

const BlogSection = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/wp-json/wp/v2/blogs/?_embed", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setApiData(response.data[0].content.rendered);
        console.log(response.data[0].content.rendered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: apiData }} />
    </>
  );
};

export default BlogSection;
