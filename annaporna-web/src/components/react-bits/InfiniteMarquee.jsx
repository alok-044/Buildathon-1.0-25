const InfiniteMarquee = ({ items, direction = 'left', speed = 'normal', className = '' }) => {
  return (
    <div className={`relative flex overflow-hidden py-5 user-select-none bg-white gap-10 ${className}`}>
    
      <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-10">
        {items.map((item, index) => (
          <div key={index} className="mx-4 flex items-center justify-center text-xl font-bold text-gray-400 hover:text-brand-green transition-colors">
            {item}
          </div>
        ))}
      </div>
      <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-10" aria-hidden="true">
        {items.map((item, index) => (
          <div key={`clone-${index}`} className="mx-4 flex items-center justify-center text-xl font-bold text-gray-400 hover:text-brand-green transition-colors">
            {item}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-white to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-white to-transparent"></div>
    </div>
  );
};

export default InfiniteMarquee;