import { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const fetchRecipes = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/recipes/', {
          headers: {
            'Authorization': `Bearer ${user?.access}`
          }
        });
        const data = await response.json();
        setRecipes(data);
      };

      fetchRecipes();
    }
  }, [user, navigate]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Recipes</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id} className="mb-2 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold truncate"><NavLink to={`/recipes/${recipe.id}`} className="text-blue-500 hover:underline">
                {recipe.name}
              </NavLink></h3>
            <p className="truncate">{recipe.ingredients}</p>
            <p className="truncate">{recipe.instructions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
