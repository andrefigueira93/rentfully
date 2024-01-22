import { motion, MotionProps } from "framer-motion";
import React, { PropsWithChildren } from "react";

export type AnimatedViewProps = PropsWithChildren & MotionProps;

const AnimatedView: React.FC<AnimatedViewProps> = ({ children, ...rest }) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0.8 }}
      exit={{ opacity: 0 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedView;
