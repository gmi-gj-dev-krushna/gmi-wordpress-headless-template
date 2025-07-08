import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const heading = " GMI Wordpress Headless Template";

  const { ref, inView } = useInView({
    triggerOnce: false, // allow it to repeat
    threshold: 0.3, // 30% of element must be visible
  });

  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="text-white font-bebas flex justify-center items-center text-center h-64">
      <motion.div
        ref={ref}
        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl px-4 flex flex-wrap justify-center gap-2"
        variants={containerVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"} // repeat + reverse
      >
        {heading.split(" ").map((word, wordIdx) => (
          <span key={wordIdx} className="inline-block mr-2">
            {word.split("").map((letter, letterIdx) => (
              <motion.span
                key={letterIdx}
                className="inline-block"
                variants={letterVariant}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
