import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaSquareGithub, FaSquareXTwitter } from "react-icons/fa6";
import { ImLinkedin } from "react-icons/im";
const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white pt-2'>
      <div className='container mx-auto py-8 px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-1'>
          <div>
            <h4 className='text-xl font-bold mb-4'>About Us</h4>
            <p className='text-gray-400'>
              As a full-stack web developer, I specialize in creating dynamic
              websites using Django REST Framework, React, and Tailwind CSS. My
              work reflects my technical skills and commitment to delivering
              user-friendly web solutions that meet my clients' needs.
            </p>
          </div>
          <div className='md:mx-auto'>
            <h4 className='text-xl font-bold mb-4'>Quick Links</h4>
            <ul className='text-gray-400 flex flex-col gap-y-1.5'>
              <Link className='hover:text-gray-300' to='/shop'>
                Shop All
              </Link>
              <Link to='/Electronics' className='hover:text-gray-300'>
                Electronics
              </Link>
              <Link to='/Books' className='hover:text-gray-300'>
                Books
              </Link>
              <Link to='/Groceries' className='hover:text-gray-300'>
                Groceries
              </Link>
              <Link to='/clothes' className='hover:text-gray-300'>
                clothes
              </Link>
              <Link to='/Beauty' className='hover:text-gray-300'>
                Beauty
              </Link>
            </ul>
          </div>
          <div>
            <h4 className='text-xl font-bold mb-4'>Contact Information</h4>
            <ul className='text-gray-400 space-y-1'>
              <Link
                to='https://eyob-tech.com'
                className='cursor-pointer hover:underline flex gap-x-2'>
                <AiOutlineGlobal size={26} />
                <span className='break-words'>eyob-tech.com</span>
              </Link>
              <li className='flex gap-x-2'>
                <MdEmail size={26} />
                <span className='break-words'>eyobabdellasharo@gmail.com</span>
              </li>
              <li className='flex gap-x-2'>
                <FaSquareXTwitter size={25} /> <span>@EyobAbdella1</span>
              </li>
              <Link
                className=' cursor-pointer hover:underline flex gap-x-2 pl-0.5'
                to='https://www.linkedin.com/in/eyob-abdella-532554262/'>
                <ImLinkedin size={22} />
                <span>Connect with me on LinkedIn</span>
              </Link>
              <Link
                className=' cursor-pointer hover:underline flex gap-x-2 pl-0.5'
                to='https://github.com/EyobAbdella'>
                <FaSquareGithub size={25} />
                <span>Connect with me on Github</span>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className='bg-gray-800 py-4 mt-auto'>
        <div className='container mx-auto'>
          <p className='text-center text-gray-400'>
            © {new Date().getFullYear()} Eyob Abdella. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
