import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        setRecipe(response.data);
      } catch (err) {
        setError("Unable to fetch recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {loading && (
          <div className="flex flex-col items-center justify-center gap-2 my-8">
            <div className="animate-spin h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full"></div>
            <h4 className="text-red-600 font-semibold">Please wait for a minute...</h4>
          </div>
        )}

        {!loading && recipe && (
          <div className="flex flex-col items-center justify-center mt-10 px-4">
            <img
              className="rounded-3xl w-full max-w-xl"
              src={recipe.image}
              alt={recipe.title}
            />
            <h1 className="font-bold text-xl mt-3 text-center">{recipe.title}</h1>

            <div className="mt-3 w-full max-w-3xl">
              <h2 className="font-bold text-2xl">Instructions:</h2>
              {recipe.analyzedInstructions.map((instruction, index) => (
                <div key={index} className="mt-2">
                  {instruction.steps.map((step) => (
                    <div key={step.number} className="mb-4">
                      <p className="font-extrabold text-lg">
                        Step {step.number}:{" "}
                        <span className="font-normal text-md">{step.step}</span>
                      </p>
                      {step.ingredients.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          <p className="text-md font-extrabold text-gray-600 underline">
                            Ingredients:
                          </p>
                          <p className="font-bold">
                            {step.ingredients.map((ingredient) => ingredient.name).join(", ")}
                          </p>
                        </div>
                      )}
                      {step.equipment.length > 0 && (
                        <p className="text-sm font-medium text-gray-600">
                          Equipment: {step.equipment.map((eq) => eq.name).join(", ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetails;
