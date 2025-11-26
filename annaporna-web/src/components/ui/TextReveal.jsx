const TextReveal = ({ text, className = "" }) => {
  return (
    <div className={`inline-block ${className}`}>
       {text.split(" ").map((word, i) => (
         <span 
            key={i} 
            className="inline-block animate-slide-up opacity-0"
            style={{ animationDelay: `${i * 0.1}s` }}
         >
           {word}&nbsp;
         </span>
       ))}
    </div>
  );
};

export default TextReveal;