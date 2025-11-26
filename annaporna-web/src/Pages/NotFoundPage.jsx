import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 text-center p-4">
      <h1 className="text-5xl font-extrabold text-brand-orange mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-brand-green text-white font-medium rounded-md hover:bg-brand-dark-green transition-colors duration-200 shadow-lg"
      >
        Go to Homepage
      </Link>
      <div className="mt-8">
        
      </div>
    </div>
  );
};

export default NotFoundPage;