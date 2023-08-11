import React, { useState, useEffect } from "react";
import axios from "axios";
import striptags from "striptags";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PilihanEditor() {
  const rootAdress = "http://91.107.217.207";
  const [teasers, setTeasers] = useState([]);

  useEffect(() => {
    axios
      .get("http://91.107.217.207/editors-choice?_format=json")
      .then((response) => {
        const teasersData = response.data;
        setTeasers(teasersData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    infinite: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const extractHref = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const link = doc.querySelector("a");
    return link ? link.getAttribute("href") : "";
  };
  return (
    <div className="font-poppins">
      <h3 className="text-base font-semibold text-[#121212]/30 uppercase mb-[40px] px-[12px] md:px-[28px]">
        Pilihan Editor
      </h3>
      <div className="">
        <Slider {...settings}>
          {teasers.map((item, index) => (
            <div
              className="w-6/12 h-auto lg:h-[510px] lg:w-3/12 border-r border-[#e5e5e5]"
              key={index}
            >
              <div className="block px-[12px] md:px-[28px]">
                <img
                  className="object-cover object-center h-[175px] w-full"
                  src={rootAdress + item.field_image_1}
                ></img>
                <div
                  className="text-[11px] pt-[16px] pb-[10px] font-normal text-black/50"
                  dangerouslySetInnerHTML={{ __html: item.field_date }}
                ></div>
                <div className="text-[18px] leading-[24px] md:text-[22px] font font-semibold md:leading-[35px]">
                  <a href={rootAdress + extractHref(item.title)}>
                    {striptags(item.title)}
                  </a>
                </div>
                <div>
                  <div
                    className="text-ellipsis pt-[20px] font-extralight hidden lg:line-clamp-6 lg:text[15px] xl:text-[18px]"
                    key={index}
                  >
                    {striptags(item.body)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default PilihanEditor;
