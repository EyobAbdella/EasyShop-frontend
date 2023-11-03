import Logo from "../assets/EasyShop.png";
import Search from "./Search";
import ShoppingCart from "./ShoppingCart";
import { IoCloseSharp } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { AuthContext } from "../context/AuthContext";

const MobileNavbar = () => {
  const [nav, setNav] = useState(false);
  const { totalPrice } = useContext(StoreContext);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [search, setSearch] = useState(false);

  const handleSearch = () => {
    setSearch(true);
    setNav(false);
  };

  const handleNav = () => {
    setSearch(false);
    setNav(!nav);
  };

  return (
    <nav className='h-12 flex custom:hidden items-center justify-between px-2 min-w-full'>
      <Link
        to='/search'
        className={`z-50 top-0 absolute right-0 bg-[#e7e7e7] w-full ${
          search ? "" : "hidden"
        }`}>
        <div className='w-fit pt-2 pb-3 mx-auto'>
          <Search />
        </div>
      </Link>
      <Link to='/'>
        <img className='w-44 mix-blend-darken mb-3' src={Logo} alt='logo' />
      </Link>
      <div className='flex gap-x-5'>
        <Link to='/search' className='hidden sm:flex'>
          <Search />
        </Link>
        <Link to='/cart' className='flex gap-x-3'>
          <p className='font-semibold cursor-pointer'>
            ${totalPrice > 0 ? totalPrice.toFixed(2) : "0.00"}
          </p>
          <ShoppingCart />
        </Link>
        <div className='z-50' onClick={handleNav}>
          {nav ? <IoCloseSharp size={30} /> : <HiBars3 size={30} />}
        </div>
      </div>
      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-[#e7e7e7] px-4 flex flex-col pt-6 items-center gap-y-6"
        }>
        <li onClick={handleSearch} className='text-2xl'>
          Search
        </li>
        <Link
          onClick={() => setNav(false)}
          to='Shop'
          className=' text-2xl hover:text-slate-400'>
          Shop All
        </Link>
        <Link
          onClick={() => setNav(false)}
          to='Electronics'
          className='text-2xl hover:text-slate-400'>
          Electronics
        </Link>
        <Link
          to='Groceries'
          onClick={() => setNav(false)}
          className='text-2xl hover:text-slate-400'>
          Groceries
        </Link>
        <Link
          to='Books'
          onClick={() => setNav(false)}
          className='text-2xl hover:text-slate-400'>
          Books
        </Link>
        <Link
          to='clothes'
          onClick={() => setNav(false)}
          className='text-2xl hover:text-slate-400'>
          clothes
        </Link>
        <Link
          to='Beauty'
          onClick={() => setNav(false)}
          className='text-2xl hover:text-slate-400'>
          Beauty
        </Link>
        {authTokens ? (
          <>
            <Link
              to='/order'
              onClick={() => setNav(false)}
              className='text-2xl hover:text-slate-400'>
              My Order
            </Link>
            <Link
              to='/'
              onClick={() => logoutUser()}
              className='text-2xl hover:text-slate-400'>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to='/Sign-up' className='text-2xl hover:text-slate-400'>
              sign up
            </Link>
            <Link to='/Login' className='text-2xl hover:text-slate-400'>
              Login
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MobileNavbar;
