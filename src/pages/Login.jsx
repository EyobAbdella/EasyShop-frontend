import { Link, useNavigate } from "react-router-dom";
import Illustration from "../assets/auth_illustration.svg";
import { RiLoginCircleFill } from "react-icons/ri";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { API_URL } from "../config";
import { DotPulse } from "@uiball/loaders";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

const Login = () => {
  const { authTokens, setAuthTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const mutation = useMutation(
    (user) => axios.post(`${API_URL}/auth/jwt/create/`, user),
    {
      onSuccess: (auth) => {
        setAuthTokens(auth.data);
        Cookies.set("authTokens", JSON.stringify(auth.data));
        navigate("/");
      },
      onError: (error) => {
        toast.error(error.response.data.detail);
      },
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    let hasErrors = false;

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
      email: false,
      password: false,
    });

    mutation.mutate({ email, password });
  };

  return (
    <div className='flex pt-10 justify-center absolute w-full h-screen z-[100] bg-[#f6f6f6] px-2 sm:px-4 space-x-2'>
      <form
        onSubmit={handleSubmit}
        className='h-screen w-full sm:w-[500px] sm:h-[530px] pt-10 px-4 flex flex-col items-center py-2 gap-y-6 rounded-md'>
        <div className='text-slate-100 font-semibold w-20 h-20 rounded-full bg-green-400 flex items-center justify-center'>
          <RiLoginCircleFill size={35} />
        </div>
        <h1 className='text-2xl'>Sign In to Your Account</h1>
        <div className='w-full px-4 grid space-y-1 text-green-500 font-mono'>
          <label htmlFor='email'>EMAIL ADDRESS</label>
          <input
            id='email'
            className={`bg-transparent outline-none focus:border-green-400 border border-slate-300 rounded py-3 w-full px-2 text-slate-500 ${
              formErrors.email ? "border-red-500" : ""
            }`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type='email'
            placeholder='example@gmail.com'
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
            className={`bg-transparent outline-none focus:border-green-400 border border-slate-300 rounded py-3 w-full px-2 text-slate-500 ${
              formErrors.password ? "border-red-500" : ""
            }`}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            placeholder='Password'
          />
          {formErrors.password && (
            <span className='text-xs text-red-500 ml-1'>
              Password is required
            </span>
          )}
        </div>
        <div className='px-4 w-full space-y-4 mt-2'>
          <button
            onClick={handleSubmit}
            className='w-full py-3 rounded text-lg text-slate-50 bg-green-500 hover:bg-green-600 relative'>
            Login
            {mutation.isLoading && (
              <div className='absolute top-6 right-20'>
                <DotPulse size={50} speed={1.3} color='white' />
              </div>
            )}
          </button>
          <p>
            I don't have an account!
            <Link to='/sign-up' className='ml-2 hover:underline text-green-500'>
              Sign up
            </Link>
          </p>
        </div>
      </form>
      <div className='w-2/5 hidden lg:flex'>
        <img src={Illustration} alt='' />
      </div>
    </div>
  );
};

export default Login;
