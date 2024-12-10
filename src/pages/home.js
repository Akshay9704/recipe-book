import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import { motion } from "framer-motion";
import { CiSaveDown2 } from "react-icons/ci";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");  
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [showFullMap, setShowFullMap] = useState({});
  const navigate = useNavigate(); 

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`
      );
      setRecipes(response.data.results);
      setFilteredRecipes(response.data.results);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Unable to fetch recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const sanitizeHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  const toggleShowFull = (id) => {
    setShowFullMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    fetchData();
    // Load saved recipes from localStorage
    const saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(saved);
  }, []);

  useEffect(() => {
    const filtered = recipes.filter((recipe) => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterCategory === "" ||
        (filterCategory === "vegetarian" && recipe.vegetarian) ||
        (filterCategory === "vegan" && recipe.vegan) ||
        (filterCategory === "non-veg" && !recipe.vegetarian && !recipe.vegan);
      return matchesSearch && matchesFilter;
    });
    setFilteredRecipes(filtered);
  }, [searchQuery, recipes, filterCategory]);

  const handleImageClick = (id) => {
    navigate(`/recipe-details/${id}`); 
  };

  const handleSaveRecipe = (recipe) => {
    const saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    if (!saved.some((r) => r.id === recipe.id)) {
      saved.push(recipe);
      localStorage.setItem("savedRecipes", JSON.stringify(saved));
      setSavedRecipes(saved);
    }
  };

  const isRecipeSaved = (id) => {
    return savedRecipes.some((r) => r.id === id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="p-5 max-w-screen-lg mx-auto flex-grow">
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide">
          Recipe<span className="text-red-500">Book.</span>
        </h1>

        <div className="flex justify-center w-full gap-3 items-center">
          <input
            type="text"
            placeholder="Search for Recipes"
            className="w-full sm:w-3/4 lg:w-1/2 py-3 px-4 outline-none rounded-2xl shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => setFilterCategory("")}
                active={filterCategory === ""}
              >
                All
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setFilterCategory("vegetarian")}
                active={filterCategory === "vegetarian"}
              >
                Vegetarian
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setFilterCategory("vegan")}
                active={filterCategory === "vegan"}
              >
                Vegan
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setFilterCategory("non-veg")}
                active={filterCategory === "non-veg"}
              >
                Non-Veg
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {loading && (
          <div className="flex flex-col items-center justify-center gap-2 my-8">
            <div className="animate-spin h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full"></div>
            <h4 className="text-red-600 font-semibold">
              Please wait for a minute...
            </h4>
          </div>
        )}

        {!loading && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredRecipes.map((item, index) => {
              const sanitizedSummary = sanitizeHTML(item.summary);
              return (
                <motion.div
                  key={item.id}
                  className="relative border max-w-lg mx-auto border-gray-200 rounded-lg shadow-lg overflow-hidden text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div onClick={() => handleImageClick(item.id)} className="relative group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full cursor-pointer h-48 object-cover transform transition duration-300 group-hover:opacity-50"
                    />
                    <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <p className="text-white text-lg font-bold px-4 py-2">
                        Click to view
                      </p>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold my-3 text-[#222831]">
                    {item.title}
                  </h2>
                  <p className="m-2">
                    {showFullMap[item.id]
                      ? sanitizedSummary
                      : truncateText(sanitizedSummary, 100)}
                    {sanitizedSummary.length > 100 && (
                      <button
                        onClick={() => toggleShowFull(item.id)}
                        className="text-blue-500 ml-2 hover:underline"
                      >
                        {showFullMap[item.id] ? "See less" : "See more"}
                      </button>
                    )}
                  </p>
                  <div className="text-white flex gap-2 justify-center mb-3">
                    {item.vegetarian && (
                      <p className="py-1 px-2 rounded-xl bg-green-500">
                        Vegetarian
                      </p>
                    )}
                    {item.vegan && (
                      <p className="py-1 px-2 rounded-xl bg-green-900">Vegan</p>
                    )}
                    {!item.vegetarian && !item.vegan && (
                      <p className="py-1 px-2 rounded-xl bg-red-500">Non-Veg</p>
                    )}
                  </div>
                  <div className="flex justify-center mb-4">
                    <CiSaveDown2
                      className={`text-2xl cursor-pointer ${isRecipeSaved(item.id) ? 'text-green-500' : 'text-gray-500'}`}
                      onClick={() => handleSaveRecipe(item)}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {!loading && filteredRecipes.length === 0 && !error && (
          <p className="text-center text-gray-500 mt-8">
            No recipes found for "{searchQuery}" with the selected filter.
          </p>
        )}
      </div>
      <Footer className="w-full mt-auto" />
    </div>
  );
};

export default Home;
