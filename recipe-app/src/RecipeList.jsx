import { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

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
          <li key={recipe.id} className="mb-2">
            <h3 className="text-xl">{recipe.name}</h3>
            <p>{recipe.ingredients}</p>
            <p>{recipe.instructions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
