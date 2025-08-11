"use client";

import { motion } from "motion/react";

type TransitionMountProps = {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
};

export const TransitionMount = ({ children, delay = 0, x, y }: TransitionMountProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: x ?? 0, y: y ?? 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};
