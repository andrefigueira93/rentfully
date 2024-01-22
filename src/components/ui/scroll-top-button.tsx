import { ChevronUpIcon } from "@radix-ui/react-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./button";

const ScrollTopButton: React.FC = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showButton && window.scrollY > 400) {
        setShowButton(true);
      } else if (showButton && window.scrollY <= 400) {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showButton]);

  return (
    <Button
      onClick={scrollToTop}
      className={`${
        showButton ? "opacity-100" : "opacity-0"
      } transition fixed bottom-5 right-5 p-0 rounded-full h-16 w-16 shadow-md`}
    >
      <ChevronUpIcon className="text-white animate-bounce h-12 w-12" />
    </Button>
  );
};

export default ScrollTopButton;
