import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full gap-y-4'>
      <h1 className='text-8xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
        Oops!
      </h1>
      <h1 className='font-sans font-bold'>404 - PAGE NOT FOUND</h1>
      <p className='w-96'>
        The page you are looking for does not exist. Please check the URL or
        return to the home page.
      </p>
      <Link to='/' className='bg-blue-800 text-slate-50 px-5 py-2 rounded-full'>
        GO TO HOME PAGE
      </Link>
    </div>
  );
};

export default NotFound;
