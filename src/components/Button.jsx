import React from "react";
import Loader from "./Loader";

const Button = ({ loading, children, type, clickHandler }) => {
  return (
    <button
      type={type}
      onClick={clickHandler}
      className="flex max-w-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full justify-center px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {loading ? (
        <Loader />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
