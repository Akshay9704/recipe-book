import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-200 shadow-md">
      <h1
        onClick={() => (window.location.href = "/")}
        className="text-xl font-extrabold text-center tracking-wide cursor-pointer"
      >
        Recipe<span className="text-red-500">Book.</span>
      </h1>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <a
              href="/"
              className="text-gray-900 font-semibold text-lg hover:text-red-600"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/recipes"
              className="text-gray-700 font-semibold text-lg hover:text-red-600"
            >
              Recipes
            </a>
          </li>
          <li>
            <a
              href="/saved-recipes"
              className="text-gray-700 font-semibold text-lg hover:text-red-600"
            >
              Saved Recipes
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
