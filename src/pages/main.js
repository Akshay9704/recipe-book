import React from "react";
import Header from "../components/header";
import Banner from "../assets/banner.jpg";
import { motion } from "framer-motion";
import Footer from "../components/footer";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex-grow">
        <img
          src={Banner}
          alt="Banner"
          className="absolute top-0 left-0 w-full h-screen object-cover -z-10"
        />

        <div className="relative">
          <Header />
          <motion.div
            className="text-white flex flex-col justify-center h-full ml-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <h1 className="text-6xl font-extrabold mt-72">
              Welcome to RecipeBook!
            </h1>
            <p className="text-gray-300 text-xl mt-4 font-semibold">
              We provide the best recipes in town, with home delivery and dine-in
              services.
            </p>
          </motion.div>
          <div className="flex">
            <motion.div
              className="ml-12 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <button
                onClick={() => (window.location.href = "/recipes")}
                className="bg-black px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-500 text-white"
              >
                Explore Recipes
              </button>
            </motion.div>
            <motion.div
              className="ml-4 mt-4 inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <button
              onClick={() => (window.location.href = "/saved-recipes")} 
              className="bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-300 text-gray-800">
                Saved Recipes
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer className="w-full mt-auto" />
    </div>
  );
};

export default Main;

