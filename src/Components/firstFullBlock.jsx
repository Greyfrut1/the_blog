import { useEffect, useState } from "react";
import axios from "axios";
import striptags from "striptags";

function FirstFullBlock() {
  const [blockContent, setBlockContent] = useState({});
  const rootAdress = "http://91.107.217.207";
  useEffect(() => {
    axios
      .get(
        "http://91.107.217.207/jsonapi/block_content/w_full_block/cf972415-4ba6-4d47-ae43-11798f4b8e2a?include=field_image&resourceVersion=id%3A3"
      )
      .then((response) => {
        const blockData = response.data.data;
        // Remove HTML tags
        setBlockContent(blockData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap px-[12px] md:px-[60px] font-poppins bg-[#121212]">
      <div className="w-full md:w-6/12 pt-[30px] md:pt-[80px] pr-[10px] md:pr-[30px] pl-[10px]">
        <h2 className="font-semibold text-[30px] lg:text-[50px] xl:text-[60px] text-white leading-[40px] lg:leading-[60px] xl:leading-[80px] mb-[25px] md:mb-[50px]">
          {blockContent.field_title}
        </h2>
        <p className="text-white/50 text-[18px] lg:text-[25px]">
          {striptags(blockContent?.body?.processed)}
        </p>
        <a
          href={blockContent?.field_link?.uri}
          className="text-white block mx-auto md:mx-0 mb-[50px] mb:mb-0 text-center py-[20px] w-full max-w-[340px] border border-white text-[25px] font-medium mt-[50px] hover:bg-white hover:text-black transition-all"
        >
          {blockContent?.field_link?.title}
        </a>
      </div>
      <div className="w-full md:w-6/12">
        <img
          className="h-[400px] w-full md:w-[600px] md:h-auto ml-auto object-cover object-center"
          src={rootAdress + blockContent?.field_image?.uri?.url}
          alt="alt"
        ></img>
      </div>
    </div>
  );
}

export default FirstFullBlock;
