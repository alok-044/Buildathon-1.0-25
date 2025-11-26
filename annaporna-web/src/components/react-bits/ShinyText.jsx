const ShinyText = ({ text, disabled = false, speed = 3, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block bg-clip-text text-transparent bg-linear-to-r 
                  from-brand-green via-brand-orange to-brand-green 
                  ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, #22c55e 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;