import Illustration from "../assets/auth_illustration.svg";
import { IoCreateOutline } from "react-icons/io5";
import { API_URL } from "../config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { DotPulse } from "@uiball/loaders";
import toast from "react-hot-toast";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const mutation = useMutation(
    (user) => axios.post(`${API_URL}/auth/users/`, user),
    {
      onSuccess: () => navigate("/login"),

      onError: (error) => {
        const { response } = error;
        if (response && response.data) {
          const errorData = response.data;
          Object.keys(errorData).forEach((field) => {
            const fieldErrors = errorData[field];
            fieldErrors.forEach((errorMsg) => {
              toast.error(errorMsg);
            });
          });
        }
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    let hasErrors = false;

    if (firstName === "") {
      errors.firstName = true;
      hasErrors = true;
    }

    if (lastName === "") {
      errors.lastName = true;
      hasErrors = true;
    }

    if (email === "") {
      errors.email = true;
      hasErrors = true;
    }

    if (password === "") {
      errors.password = true;
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({
      firstName: false,
      lastName: false,
      email: false,
      password: false,
    });
    mutation.mutate({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
  };

  return (
    <div className='flex sm:pt-2 justify-center absolute w-full h-screen overflow-hidden bg-[#f6f6f6] px-2 sm:px-4 space-x-2'>
      <form
        onSubmit={handleSubmit}
        className='w-full sm:w-[450px] sm:h-[580px] pt-3 px-4 shadow-inner shadow-slate-50 bg-[#efefef] flex flex-col items-center space-y-3 rounded-md'>
        <div>
          <IoCreateOutline
            className='text-slate-100 font-semibold rounded-full bg-green-500 p-5 box-content'
            size={35}
          />
        </div>
        <h1 className='text-2xl'>Create Your Account</h1>
        <div className='w-full px-4 grid space-y-1 text-green-500 font-mono'>
          <label htmlFor='firstName'>FIRST NAME</label>
          <input
            id='firstName'
            className={`bg-transparent outline-none focus:border-green-400 border border-slate-300 rounded py-2.5 w-full px-2 text-slate-700 ${
              formErrors.firstName ? "border-red-500" : ""
            }`}
            type='text'
            placeholder='johnDoe'
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          {formErrors.firstName && (
            <span className='text-xs text-red-500 ml-1'>
              First name is required
            </span>
          )}
        </div>
        <div className='w-full px-4 grid space-y-1 text-green-500 font-mono'>
          <label htmlFor='lastName'>LAST NAME</label>
          <input
            id='lastName'
            className={`bg-transparent outline-none focus:border-green-400 border border-slate-300 rounded py-2.5 w-full px-2 text-slate-700 ${
              formErrors.lastName ? "border-red-500" : ""
            }`}
            type='text'
            placeholder='johnDoe'
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          {formErrors.lastName && (
            <span className='text-xs text-red-500 ml-1'>
              Last name is required
            </span>
          )}
        </div>
        <div className='w-full px-4 grid space-y-1 text-green-500 font-mono'>
          <label htmlFor='email'>EMAIL ADDRESS</label>
          <input
            id='email'
            className={`bg-transparent outline-none focus:border-green-400 border border-slate-300 rounded py-2.5 w-full px-2 text-slate-700 ${
              formErrors.email ? "border-red-500" : ""
            }`}
            type='email'
            placeholder='example@gmail.com'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {formErrors.email && (
            <span className='text-xs text-red-500 ml-1'>
              Email address is required
            </span>
          )}
        </div>
        <div className='w-full px-4 grid space-y-1 text-green-500 font-mono'>
          <label htmlFor='password'>PASSWORD</label>
          <input
            id='password'
            className={`bg-transparent outline-none focus:border-green-400 border border-slate-300 rounded py-2.5 w-full px-2 text-slate-700 ${
              formErrors.password ? "border-red-500" : ""
            }`}
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {formErrors.password && (
            <span className='text-xs text-red-500 ml-1'>
              Password is required
            </span>
          )}
        </div>
        <div className='px-4 w-full space-y-4'>
          <button
            onClick={handleSubmit}
            className='text-lg w-full py-3 rounded text-slate-50 bg-green-500 hover:bg-green-600 relative'>
            Sign Up
            {mutation.isLoading && (
              <div className='absolute top-6 right-20'>
                <DotPulse size={50} speed={1.3} color='white' />
              </div>
            )}
          </button>
          <p>
            I'm already a member!
            <Link to='/login' className='ml-2 hover:underline text-green-500'>
              Login
            </Link>
          </p>
        </div>
      </form>
      <div className='w-2/5 hidden md:flex'>
        <img src={Illustration} alt='' />
      </div>
    </div>
  );
};

export default SignUp;
