import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../Menu/menu";
import SocialLinks from "../Social Links/socialLinks";

function Header({ onClick }) {
  const [imageUrl, setImageUrl] = useState(null);
  const rootAdress = "http://91.107.217.207";
  useEffect(() => {
    // Зробіть запит до URL для отримання даних з JSON
    axios
      .get(
        "http://91.107.217.207/jsonapi/block_content/basic/d6ee7696-ee2d-47f1-a4ba-c6b6a2ac583c?resourceVersion=id%3A1&include=field_image"
      )
      .then((response) => {
        const fieldImage = response.data.data.field_image; // Збережіть отримані дані у стані компонента
        const imageUrl = rootAdress + fieldImage.uri.url;
        setImageUrl(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <header className="flex justify-between">
      <Menu />
      <SocialLinks onClick={onClick} />
    </header>
  );
}
export default Header;
