import "./App.css";
import Header from "./Components/Header/header";
import TitleBlog from "./Components/titleblog";
import { useState } from "react";
import BurgerMenu from "./Components/burgerMenu";
import TeasersArticles from "./Components/teasersArticles";
import TutorialDesign from "./Components/tutorialDesign";
import FirstFullBlock from "./Components/firstFullBlock";
import PilihanEditor from "./Components/pilihanEditor";
import StaticBlock from "./Components/staticBlock";
import LatestArticles from "./Components/latestArticles";
import IndustriDesign from "./Components/industriDesign ";
import ArtikelLainnya from "./Components/ artikelLainnya ";
import ScrollToTop from "react-scroll-to-top";
import BackToTop from "./Components/backToTop";

function App() {
  const [isStyled, setIsStyled] = useState(false);

  const test = () => {
    setIsStyled(!isStyled);
    // Виконайте інші дії тут
  };

  const styles = {
    display: isStyled ? "block" : "none",
  };
  const styles2 = {
    display: isStyled ? "none" : "block",
  };
  return (
    <>
      <div className="hidden" style={styles}>
        <BurgerMenu onClick={test} />
      </div>
      <div style={styles2} className="font-poppins bg-[#ECECEC]">
        <div className="container max-w-[1280px] 2xl:max-w-1440 mx-auto bg-white">
          <div className="dark bg-[#121212] px-[20px] md:px-10 py-0 md:pt-5 md:pb-[40px]">
            <Header onClick={test} />
            <TitleBlog />
            <TeasersArticles />
          </div>
          <div className="whitearea py-[20px] px-0 md:px-[40px] md:pt-[60px] md:pb-[80px]">
            <TutorialDesign />
          </div>
          <div>
            <FirstFullBlock />
          </div>
          <div className="py-[20px] md:pt-[60px] md:pb-[40px]">
            <PilihanEditor />
          </div>
          <div>
            <StaticBlock />
          </div>
          <div className="py-[20px] md:pt-[60px] md:pb-[40px] px-0 md:px-[40px]">
            <LatestArticles />
          </div>
          <div className="bg-[#121212] pt-[20px] pb-[40px] md:pt-[60px] md:pb-[40px]">
            <IndustriDesign />
          </div>
          <div>
            <ArtikelLainnya />
          </div>
        </div>
        <BackToTop />
      </div>
    </>
  );
}

export default App;
