import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authTokens, logoutUser } = useContext(AuthContext);

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}>
      <FaUserCircle className='cursor-pointer' size={25} />
      {isOpen && (
        <div className='absolute w-36 rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
          {authTokens ? (
            <div
              className='py-1'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'>
              <Link
                to='/order'
                className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                role='menuitem'>
                My Order
              </Link>
              <Link
                to='/'
                onClick={() => logoutUser()}
                className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                role='menuitem'>
                Logout
              </Link>
            </div>
          ) : (
            <div
              className='py-1'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'>
              <Link
                to='/login'
                className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                role='menuitem'>
                Login
              </Link>
              <Link
                to='/sign-up'
                className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                role='menuitem'>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Account;
