import React, { useState, useEffect } from "react";
import axios from "axios";
import striptags from "striptags";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LatestArticles() {
  const rootAdress = "http://91.107.217.207";
  const [teasers, setTeasers] = useState([]);

  useEffect(() => {
    axios
      .get("http://91.107.217.207/latest-articles?_format=json")
      .then((response) => {
        const teasersData = response.data;
        setTeasers(teasersData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const extractHref = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const link = doc.querySelector("a");
    return link ? link.getAttribute("href") : "";
  };

  return (
    <div className="font-poppins">
      <h3 className="text-base font-semibold text-[#121212]/30 uppercase mb-[40px] px-[12px] md:px-[28px]">
        Artikel Terbaru
      </h3>
      <div className="flex flex-wrap gap-y-[40px]">
        {teasers.map((item, index) => (
          <div className="w-full sm:w-6/12 lg:w-4/12" key={index}>
            <a className="block px-[12px] md:px-[28px]">
              <img
                className="object-cover object-center h-[250px] w-full"
                src={rootAdress + item.field_image_1}
              ></img>
              <div
                className="text-[14px] pt-[16px] pb-[10px] font-normal text-black/50"
                dangerouslySetInnerHTML={{ __html: item.field_date }}
              ></div>
              <div className="text-[25px] font font-semibold leading-[35px]">
                <a href={rootAdress + extractHref(item.title)}>
                  {striptags(item.title)}
                </a>
              </div>
              <div>
                <div
                  className="line-clamp-6 text-ellipsis pt-[20px] font-extralight text-[15px]"
                  key={index}
                >
                  {striptags(item.body)}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestArticles;
