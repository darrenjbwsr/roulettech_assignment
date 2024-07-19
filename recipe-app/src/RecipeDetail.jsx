import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode }  from 'jwt-decode';
import AuthContext from './AuthContext';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const { user, refreshToken } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (user) {
        try {
          let response = await fetch(`http://127.0.0.1:8000/api/recipes/${id}/`, {
            headers: {
              'Authorization': `Bearer ${user.access}`
            }
          });
          if (response.status === 401) {
            await refreshToken();
            response = await fetch(`http://127.0.0.1:8000/api/recipes/${id}/`, {
              headers: {
                'Authorization': `Bearer ${user.access}`
              }
            });
          }

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setRecipe(data);
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      } else {
        navigate('/login');
      }
    };

    fetchRecipe();
  }, [user, id, navigate, refreshToken]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/recipes/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.access}`
        }
      });

      if (response.status === 204) {
        navigate('/');
      } else {
        throw new Error('Failed to delete the recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };
  const user_decode = jwtDecode(user.access)
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-2 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-2xl mb-4 font-semibold">{recipe.name}</h2>
        <p className="mb-2"><strong>Ingredients:</strong> {recipe.ingredients}</p>
        <p className="mb-2"><strong>Instructions:</strong> {recipe.instructions}</p>
        <button onClick={() => navigate(-1)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Back
        </button>
          {user_decode.user_id === recipe.user && (
          <button onClick={handleDelete} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-4">
            Delete
          </button>)}
      </div>
    </div>
  );
};

export default RecipeDetail
