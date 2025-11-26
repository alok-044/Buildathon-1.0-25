
const AnimatedBorderCard = ({ children, className = "" }) => {
  return (
    <div className={`relative p-0.5 overflow-hidden rounded-3xl group ${className}`}>
     
      <div className="absolute inset-0 h-full w-full animate-rotate rounded-3xl bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#E2E8F0_50%,#16A34A_100%)]"></div>
      
      <div className="relative bg-white h-full w-full rounded-[22px] p-6 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBorderCard;