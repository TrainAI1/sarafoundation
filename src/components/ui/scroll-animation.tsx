import { motion, type Variants } from "framer-motion";
import { type ReactNode, forwardRef } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const variantMap = {
  "fade-up": fadeUp,
  "fade-in": fadeIn,
  "scale-in": scaleIn,
  "slide-left": slideLeft,
  "slide-right": slideRight,
} as const;

export type AnimationVariant = keyof typeof variantMap;

interface ScrollAnimationProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const ScrollAnimation = forwardRef<HTMLDivElement, ScrollAnimationProps>(
  function ScrollAnimation(
    { children, variant = "fade-up", delay = 0, duration = 0.6, className = "", once = true },
    ref
  ) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-60px" }}
        variants={variantMap[variant]}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  variant = "fade-up",
}: {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
}) {
  return (
    <motion.div
      variants={variantMap[variant]}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
