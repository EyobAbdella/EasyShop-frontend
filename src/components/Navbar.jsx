import Logo from "../assets/EasyShop.png";
import Search from "./Search";
import ShoppingCart from "./ShoppingCart";
import Account from "./Account";
import MobileNavbar from "./MobileNavbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
const Navbar = () => {
  const { totalPrice } = useContext(StoreContext);

  return (
    <div className='z-50 h-14 sm:h-16 bg-[#fff] text-slate-600 border-b sticky top-0 pt-2.5 border-gray-200 w-full flex items-center'>
      <nav className='hidden custom:flex items-center justify-between xl:px-8 md:px-3 w-full py-4'>
        <Link to='/'>
          <img
            className='custom:w-32 mix-blend-darken pb-2 w-48 lg:w-48'
            src={Logo}
            alt='logo'
          />
        </Link>

        <ul className='flex gap-x-5 xl:gap-x-8 cursor-pointer'>
          <Link
            to='/Shop'
            className='hover:text-slate-400 font-serif font-semibold duration-500'>
            Shop All
          </Link>
          <Link
            to='/Electronics'
            className='hover:text-slate-400 font-serif font-semibold duration-500'>
            Electronics
          </Link>
          <Link
            to='Books'
            className='hover:text-slate-400 font-serif font-semibold duration-500'>
            Books
          </Link>
          <Link
            to='Groceries'
            className='hover:text-slate-400 font-serif font-semibold duration-500'>
            Groceries
          </Link>
          <Link
            to='clothes'
            className='hover:text-slate-400 font-serif font-semibold duration-500'>
            clothes
          </Link>
          <Link
            to='Beauty'
            className='hover:text-slate-400 font-serif font-semibold duration-500'>
            Beauty
          </Link>
        </ul>
        <ul className='flex gap-x-4 text-black items-center'>
          <Link to='/Search'>
            <Search />
          </Link>
          <li>
            <Account />
          </li>
          <Link to='/cart' className=' font-semibold cursor-pointer'>
            ${totalPrice > 0 ? totalPrice.toFixed(2) : "0.00"}
          </Link>
          <Link to='/cart'>
            <ShoppingCart />
          </Link>
        </ul>
      </nav>
      <MobileNavbar />
    </div>
  );
};

export default Navbar;
