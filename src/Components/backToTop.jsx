import React, { useState, useEffect } from "react";

function BackToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="hero-section">
      <button
        className={`fixed bottom-5 right-4 px-3 py-2 bg-white font-poppins text-[13px] rounded text-[#1e1f57] ${
          showTopBtn
            ? "opacity-100 scale-100 transition-all"
            : "opacity-0 scale-0 transition-all"
        }`}
        onClick={goToTop}
      >
        Back to Top ↑
      </button>
    </div>
  );
}

export default BackToTop;
