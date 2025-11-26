const Marquee = ({ items, speed = "fast", direction = "left", className = "", pauseOnHover = false }) => {
  const duration = speed === "fast" ? "20s" : "40s";

  return (
    <div className={`relative flex overflow-hidden ${className} ${pauseOnHover ? "hover:[&>div]:play-state-paused" : ""}`}>
      <div 
        className="flex min-w-full shrink-0 animate-scroll items-center justify-around gap-8 py-4"
        style={{ animationDuration: duration, animationDirection: direction === "right" ? "reverse" : "normal" }}
      >
        {items}
      </div>
     
      <div 
        className="flex min-w-full shrink-0 animate-scroll items-center justify-around gap-8 py-4"
        style={{ animationDuration: duration, animationDirection: direction === "right" ? "reverse" : "normal" }}
      >
        {items}
      </div>
    </div>
  );
};

export default Marquee;