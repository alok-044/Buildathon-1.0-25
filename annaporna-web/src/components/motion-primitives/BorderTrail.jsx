import { motion } from "framer-motion";

export function BorderTrail({
  className,
  size = 60,
  transition,
  onAnimationComplete,
  style,
  children,
  ...props
}) {
  return (
    <div className={`relative ${className}`} {...props}>
      {children}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none z-10"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className="h-full w-full"
          x="0"
          y="0"
          rx="16"
          ry="16"
          fill="none"
          stroke="transparent"
          strokeWidth="0"
        />
        <motion.rect
          className="h-full w-full"
          x="0"
          y="0"
          rx="16" 
          ry="16"
          fill="none"
          stroke="url(#border-trail-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
          animate={{
            pathLength: [0.05, 0.2, 0.05],
            pathOffset: [0, 1], 
            opacity: [0, 1, 0] 
          }}
          transition={transition || {
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          onAnimationComplete={onAnimationComplete}
        />
        <defs>
          <linearGradient id="border-trail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16A34A" stopOpacity="0" />
            <stop offset="50%" stopColor="#16A34A" stopOpacity="1" />
            <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}