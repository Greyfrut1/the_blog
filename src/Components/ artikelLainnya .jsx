import React, { useState, useEffect } from "react";
import axios from "axios";
import striptags from "striptags";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { root } from "postcss";

function ArtikelLainnya() {
  const rootAdress = "http://91.107.217.207";
  const [teasers, setTeasers] = useState([]);
  const [archives, setArchives] = useState([]);
  const [banner, setBanner] = useState([]);
  const [testimonial, setTestimonial] = useState([]);

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
  useEffect(() => {
    axios
      .get("http://91.107.217.207/archives?_format=json")
      .then((response) => {
        const archivesData = response.data;
        setArchives(archivesData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        "http://91.107.217.207/jsonapi/block_content/basic/07440139-1de0-44ab-98d8-9a7b437245db?resourceVersion=id%3A5&include=field_image"
      )
      .then((response) => {
        const bannerData = response.data.data.field_image.uri.url;
        setBanner(bannerData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://91.107.217.207/testimonials?_format=json")
      .then((response) => {
        const testimonialData = response.data;
        setTestimonial(testimonialData);
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
    <div className="font-poppins flex flex-wrap px-0 md:px-[40px] pt-[20px] md:pt-[60px] pb-0 md:pb-[40px]">
      <div className="w-full lg:w-8/12 px-[12px]">
        <h3 className="text-base font-semibold text-[#121212]/30 uppercase mb-[40px]">
          Artikel Lainnya
        </h3>
        <div className="flex flex-wrap gap-y-[40px]">
          {teasers.map((item, index) => (
            <div className="w-full" key={index}>
              <a className="flex flex-wrap px-0 lg:px-[20px]">
                <div className="w-8/12 lg:w-7/12 px-[12px]">
                  <div
                    className="text-[11px] pt-0 lg:pt-[16px] pb-[10px] font-normal text-black/50"
                    dangerouslySetInnerHTML={{ __html: item.field_date }}
                  ></div>
                  <div className="text-[18px] md:text-[25px] font font-semibold leading-[24px] md:leading-[35px]">
                    <a href={rootAdress + extractHref(item.title)}>
                      {striptags(item.title)}
                    </a>
                  </div>
                  <div className="hidden md:block">
                    <div
                      className="line-clamp-3 text-ellipsis pt-[20px] font-extralight text-[18px]"
                      key={index}
                    >
                      {striptags(item.body)}
                    </div>
                  </div>
                </div>
                <img
                  className="px-[12px] object-cover object-center h-[180px] w-4/12 lg:w-5/12"
                  src={rootAdress + item.field_image_1}
                ></img>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar w-full lg:w-4/12 mt-[20px] py-[20px] lg:py-0 lg:mt-0 px-[12px] bg-[#f5f6f8] md:bg-transparent">
        <div className="w-full">
          <h3 className="text-base font-semibold text-[#121212]/30 uppercase mb-[28px] lg:mb-[40px]">
            Arsip 2021
          </h3>
          <div>
            {archives.map((item) => (
              <div className="pl-0 md:pl-[20px] pt-[24px] border-l-0 lg:border-l border-b last:border-b-0 first:pt-[10px] pb-[24px]">
                <div className="text-[11px] font font-normal leading-[11px] text-black/50 pb-[6px]">
                  {item.field_date}
                </div>
                <div className="text-[16px] font font-normal leading-[24px]">
                  <a href={rootAdress + extractHref(item.title)}>
                    {striptags(item.title)}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-[-12px] md:mx-0 w-full my-[30px] lg:my-[60px]">
          <img
            className="w-[100vw] max-w-none md:w-full h-auto"
            alt="alt"
            src={rootAdress + banner}
          ></img>
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#121212]/30 uppercase mb:[28px] md:mb-[40px]">
            Testimonial{" "}
          </h3>
          {testimonial.map((item) => (
            <div className="pl-0 md:pl-[20px] pt-[24px] border-l-0 md:border-l border-b last:border-b-0 first:pt-[10px] pb-[24px]">
              <img
                className="w-[36px] h-[36px] object-cover object-center rounded-[50%] absolute"
                src={rootAdress + item.field_image_1}
                alt="alt"
              ></img>
              <div className="pl-[50px]">
                <div
                  className="text-[13px] font font-light leading-[21px]"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                ></div>
                <div className="[&>*]:before:content-['@'] text-[14px] md:text-[13px] font font-medium md:font-normal leading-[22px] mt-[6px]">
                  <a href={rootAdress + extractHref(item.title)}>
                    {striptags(item.title)}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtikelLainnya;
