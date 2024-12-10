// src/pages/SavedRecipes.js
import { useState, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Header from "../components/header";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(saved);
  }, []);

  const removeSavedRecipe = (id) => {
    const updatedSavedRecipes = savedRecipes.filter(
      (recipe) => recipe.id !== id
    );
    localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes));
    setSavedRecipes(updatedSavedRecipes);
  };

  return (
    <>
      <Header />
      <div className="p-5 max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide">
          Saved Recipes
        </h1>
        {savedRecipes.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">
            You don't have any saved recipes yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {savedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="relative border max-w-lg mx-auto border-gray-200 rounded-lg shadow-lg overflow-hidden text-center"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <h2 className="text-lg font-bold my-3 text-[#222831]">
                  {recipe.title}
                </h2>
                <div className="flex justify-center mb-4">
                  <Link
                    to={`/recipe-details/${recipe.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
                <div className="flex justify-center mb-4">
                  <IoMdCloseCircle
                    className="text-2xl cursor-pointer text-red-500"
                    onClick={() => removeSavedRecipe(recipe.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SavedRecipes;
