const NotFound = () => {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen p-4 text-center">
      <img 
        src="/404-error.png" 
        alt="Not found"
        className="w-36 h-36 mb-4 opacity-80"
      />
      <h1 className="text-2xl font-bold text-blue-500">Not found</h1>
      <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
    </section>
  );
};

export default NotFound;
