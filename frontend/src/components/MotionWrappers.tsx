import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react"; 

interface AnimationProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
};

// FadeIn: fades in from opacity 0 to 1 with no movement
export const FadeIn = ({ children, duration = 0.5, delay = 0 }: AnimationProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, transition: { duration, delay } });
    } else {
      controls.start({ opacity: 0 });
    }
  }, [inView, controls, duration, delay]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={controls}>
      {children}
    </motion.div>
  );
};

export const FadeOut = ({ children, duration = 0.5, delay = 0 }: AnimationProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 0, transition: { duration, delay } });
    } else {
      controls.start({ opacity: 1 });
    }
  }, [inView, controls, duration, delay]);

  return (
    <motion.div ref={ref} initial={{ opacity: 1 }} animate={controls}>
      {children}
    </motion.div>
  );
};

export const FadeUp = ({ children, duration = 0.5, delay = 0, distance = 50 }: AnimationProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration, delay } });
    } else {
      controls.start({ opacity: 0, y: distance });
    }
  }, [inView, controls, distance, duration, delay]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: distance }} animate={controls}>
      {children}
    </motion.div>
  );
};

export const FadeDown = ({ children, duration = 0.5, delay = 0, distance = 50 }: AnimationProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration, delay } });
    } else {
      controls.start({ opacity: 0, y: -distance });
    }
  }, [inView, controls, distance, duration, delay]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: -distance }} animate={controls}>
      {children}
    </motion.div>
  );
};

export const FadeLeft = ({ children, duration = 0.5, delay = 0, distance = 50 }: AnimationProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0, transition: { duration, delay } });
    } else {
      controls.start({ opacity: 0, x: -distance });
    }
  }, [inView, controls, distance, duration, delay]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -distance }} animate={controls}>
      {children}
    </motion.div>
  );
};

export const FadeRight = ({
  children,
  duration = 0.5,
  delay = 0,
  distance = 50,
  className = '',
}: AnimationProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0, transition: { duration, delay } });
    } else {
      controls.start({ opacity: 0, x: distance });
    }
  }, [inView, controls, distance, duration, delay]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: distance }} animate={controls} className={className}>
      {children}
    </motion.div>
  );
};

export const FadeInUp = ({ children, duration = 0.3, delay = 0, distance = 50 }: AnimationProps) => {
  return (
    <motion.div
      initial={{ y: distance, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: distance, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300, duration, delay }}
    >
      {children}
    </motion.div>
  );
};
