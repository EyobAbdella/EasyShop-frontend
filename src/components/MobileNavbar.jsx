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

  return (
    <nav className='h-12 flex custom:hidden items-center justify-between px-2 min-w-full'>
      <Link to='/'>
        <img className='w-44 mix-blend-darken mb-3' src={Logo} alt='logo' />
      </Link>
      <div className='flex gap-x-5'>
        <div className='hidden sm:flex'>
          <Search />
        </div>
        <Link to='/cart' className='flex gap-x-3'>
          <p className='font-semibold cursor-pointer'>
            ${totalPrice > 0 ? totalPrice.toFixed(2) : "0.00"}
          </p>
          <ShoppingCart />
        </Link>
        <div className='z-50' onClick={() => setNav(!nav)}>
          {nav ? <IoCloseSharp size={25} /> : <HiBars3 size={25} />}
        </div>
      </div>
      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-[#e7e7e7] flex flex-col pt-3 items-center gap-y-6"
        }>
        <li className='border-b w-full flex justify-center pb-2 border-slate-500'>
          <Search />
        </li>
        <Link
          onClick={() => setNav(false)}
          to='Shop'
          className='hover:animate-border hover:border-b  text-xl hover:text-black'>
          Shop All
        </Link>
        <Link
          onClick={() => setNav(false)}
          to='Electronics'
          className='hover:animate-border hover:border-b text-xl hover:text-black'>
          Electronics
        </Link>
        <Link
          to='Books'
          onClick={() => setNav(false)}
          className='hover:animate-border hover:border-b text-xl hover:text-black'>
          Books
        </Link>
        <Link
          to='Groceries'
          onClick={() => setNav(false)}
          className='hover:animate-border hover:border-b text-xl hover:text-black'>
          Groceries
        </Link>
        <Link
          to='clothes'
          onClick={() => setNav(false)}
          className='hover:animate-border hover:border-b text-xl hover:text-black'>
          clothes
        </Link>
        <Link
          to='Beauty'
          onClick={() => setNav(false)}
          className='hover:animate-border hover:border-b text-xl hover:text-black'>
          Beauty
        </Link>
        {authTokens ? (
          <>
            <Link
              to='/order'
              onClick={() => setNav(false)}
              className='hover:animate-border hover:border-b text-xl hover:text-black'>
              My Order
            </Link>
            <Link
              to='/'
              onClick={() => logoutUser()}
              className='hover:animate-border hover:border-b text-xl hover:text-black'>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to='/Sign-up'
              className='hover:animate-border hover:border-b text-xl hover:text-black'>
              sign up
            </Link>
            <Link
              to='/Login'
              className='hover:animate-border hover:border-b text-xl hover:text-black'>
              Login
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MobileNavbar;
