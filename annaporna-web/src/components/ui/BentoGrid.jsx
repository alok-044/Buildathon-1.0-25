export const BentoGrid = ({ className, children }) => {
  return (
    <div className={`grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <div
      className={`row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-sm p-4 bg-white border border-gray-100 justify-between flex flex-col space-y-4 ${className}`}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-bold text-gray-900 mb-2 mt-2">
          {title}
        </div>
        <div className="font-normal text-gray-600 text-xs leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};