import { useEffect, useState } from "react";
import axios from "axios";
import striptags from "striptags";

function StaticBlock() {
  const [blockContent, setBlockContent] = useState({});
  const rootAdress = "http://91.107.217.207";
  useEffect(() => {
    axios
      .get(
        "http://91.107.217.207/jsonapi/block_content/w_full_block/121c2905-1aad-4a35-b001-249f99f464e1?resourceVersion=id%3A4&include=field_image"
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
    <div className="flex flex-wrap pb-[20px] md:pb-0 px-[12px] md:px-[60px] font-poppins bg-[#ffd335]">
      <div className="w-full md:w-6/12 pt-[40px] md:pt-[80px] pb-0 md:pb-[20px] pr-[10px] md:pr-[30px] pl-[10px]">
        <h2 className="font-semibold text-[30px] lg:text-[50px] xl:text-[60px] text-black leading-[40px] lg:leading-[60px] xl:leading-[80px] mb-[25px] md:mb-[50px]">
          {blockContent.field_title}
        </h2>
        <p className="text-black text-[18px] lg:text-[25px]">
          {striptags(blockContent?.body?.processed)}
        </p>
        <a
          href={blockContent?.field_link?.uri}
          className="text-white block mx-auto md:mx-0 mb-[50px] text-center py-[20px] w-full max-w-[340px] border border-black text-[25px] font-medium mt-[50px] hover:bg-transparent bg-black hover:text-black transition-all"
        >
          {blockContent?.field_link?.title}
        </a>
      </div>
      <div className="w-full md:w-6/12 relative overflow-hidden">
        <img
          className="static w-[600px] md:absolute mt-0 md:mt-[40px] mx-auto md:ml-auto"
          src={rootAdress + blockContent?.field_image?.uri?.url}
          alt="alt"
        ></img>
      </div>
    </div>
  );
}

export default StaticBlock;
