import { Fragment, useEffect, useState } from "react";

const FloatingButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-9 text-3xl w-18 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none sm:block lg:hidden xl:hidden"
        >
          ↑
        </button>
      )}
    </Fragment>
  );
};

export default FloatingButton;
