import { useEffect, useState } from "react";
import axios from "axios";
import { root } from "postcss";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [imageField, setImageField] = useState(null);
  const rootAdress = "http://91.107.217.207";

  useEffect(() => {
    axios
      .get("http://91.107.217.207/jsonapi/menu_link_content/menu_link_content")
      .then((response) => {
        const menuData = response.data.data;
        setMenuItems(menuData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        "http://91.107.217.207/jsonapi/block_content/basic/d6ee7696-ee2d-47f1-a4ba-c6b6a2ac583c?resourceVersion=id%3A1&include=field_image"
      )
      .then((response) => {
        const fieldImage = response.data.data;
        setImageField(fieldImage);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div id="menu" className="menu  px-4 py-7 w-9/12">
      <ul className="flex gap-x-10">
        <li className="menu-item">
          <a href="/">
            <img
              className="logo w-10 hover:cursor-pointer"
              src={rootAdress + imageField?.field_image?.uri?.url}
              alt="Logo"
            ></img>
          </a>
        </li>
        {menuItems.map((item, index) => (
          <li className="menu-item hidden lg:flex" key={index}>
            <a
              href={item.link.uri}
              className="text-white opacity-50 tracking-widest hover:cursor-pointer hover:opacity-100 text-xs font-poppins font-medium uppercase py-2.5"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Menu;
