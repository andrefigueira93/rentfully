import { ChevronUpIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";

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
    <AnimatePresence>
      {showButton && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="transition bg-blue-600 fixed bottom-5 right-5 p-0 rounded-full h-16 w-16 shadow-md z-50"
        >
          <ChevronUpIcon className="text-white animate-bounce h-12 w-12 mx-auto" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollTopButton;
