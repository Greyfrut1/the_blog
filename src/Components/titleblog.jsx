import { useEffect, useState } from "react";
import axios from "axios";
import striptags from "striptags";

function TitleBlog({ customStyle }) {
  const [pageContent, setPageContent] = useState("");

  useEffect(() => {
    axios
      .get("http://91.107.217.207/jsonapi/node/page")
      .then((response) => {
        const pageData = response.data.data[0];
        const bodyValue = pageData.body.value;
        const strippedContent = striptags(bodyValue); // Remove HTML tags
        setPageContent(strippedContent);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div
      style={customStyle}
      className="title border-y border-white/10 mt-5 mb-14 mx-0 md:mx-[20px]"
    >
      <svg viewBox="0 0 70 15">
        <text
          className="fill-white font-poppins tracking-tighter text-center font-bold uppercase"
          x={0}
          y={13}
        >
          {pageContent}
        </text>
      </svg>
    </div>
  );
}
export default TitleBlog;
