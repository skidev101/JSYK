import { motion } from "framer-motion";

const AnimatedCheckmark = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className="mx-auto text-blue-500"
    >
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.path
        d="M30 52 L45 67 L70 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
    </svg>
  );
};

export default AnimatedCheckmark;
