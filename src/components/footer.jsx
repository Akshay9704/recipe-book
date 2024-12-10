import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 mt-10 shadow-md">
      <div className="flex justify-center items-center">
        <p className="text-gray-700 text-sm font-medium">
          &copy; {new Date().getFullYear()} RecipeBook. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
