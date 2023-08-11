import { useEffect, useState } from "react";
import axios from "axios";

function SocialLinks({ onClick }) {
  const [socialLinks, setSocialLinks] = useState([]);
  const rootAdress = "http://91.107.217.207";
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios
      .get(
        "http://91.107.217.207/jsonapi/block_content/social_links/da13c4ff-fea5-48e6-bedb-7ede57c8f29d?include=field_social_links.field_icon_svg"
      )
      .then((response) => {
        const socialLinksData = response.data.data.field_social_links;
        setSocialLinks(socialLinksData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="social-links pr-4 pt-8">
      <ul className="flex gap-4">
        {socialLinks.map((item, index) => (
          <li className="hidden lg:block" key={index}>
            <a href={item.field_link.uri}>
              <img
                className="w-6 opacity-50 hover:opacity-100 hover:cursor-pointer"
                src={rootAdress + item?.field_icon_svg?.uri?.url}
                alt="icon"
              ></img>
            </a>
          </li>
        ))}
        <li className="block lg:hidden">
          <button
            className="w-5 h-5 flex justify-between flex-col"
            onClick={onClick}
          >
            <span className="block w-full h-1 bg-white/50"></span>
            <span className="block w-full h-1 bg-white/50"></span>
            <span className="block w-full h-1 bg-white/50"></span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SocialLinks;
