import React from "react";

const Input = ({ label, value, changeHandler, placeHolder, type = "text" }) => {
  return (
    <div className="m-2 w-full max-w-sm">
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {placeHolder}
      </label>
      <input
        type={type}
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        name={label}
        value={value}
        onChange={changeHandler}
      />
    </div>
  );
};

export default Input;
