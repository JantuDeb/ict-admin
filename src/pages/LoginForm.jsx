import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Button from "../components/Button";
const LoginForm = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const { logIn, loading, error } = useAuth();

  function onInputChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    logIn(userInput);
  }

  return (
    <div className="flex justify-center items-center  h-screen">
      <form className="max-w-sm w-full m-2" onSubmit={onSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            name="email"
            value={userInput.email}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="password"
            value={userInput.password}
            onChange={onInputChange}
          />
        </div>
        <Button type="submit" loading={loading}>
          Submit
        </Button>
        {error !== "" && <span className=" text-red-500">{error}</span>}

        <div className="flex justify-between items-center my-2">
         <span> Not registered yet </span>  <Link to="/signup" className="text-blue-500">Create an Acount</Link>
        </div>
        <div>
          <div className="flex flex-col justify-center items-center mt-2">
            <h1 className=" text-gray-500 font-semibold">OR</h1>
            <button
              type="button"
              className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
        
      </form>
    </div>
  );
};

export default LoginForm;
