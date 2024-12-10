import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import RecipeDetails from "./pages/recipeDetails";
import Main from "./pages/main";
import SavedRecipes from "./pages/savedRecipes" 

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/recipes",
        element: <Home />,
      },
      {
        path: "/recipe-details/:id", 
        element: <RecipeDetails />,
      },
      {
        path: "/saved-recipes", 
        element: <SavedRecipes />,
      },
    ],
  },
  {
    path: "/",
    element: <Main />,
  },
]);

export default router;
