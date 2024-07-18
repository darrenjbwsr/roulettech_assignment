import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const UpdateRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/recipes/${id}/`, {
        headers: {
          'Authorization': `Bearer ${user.access}`
        }
      });
      const data = await response.json();
      setName(data.name);
      setIngredients(data.ingredients);
      setInstructions(data.instructions);
    };

    fetchRecipe();
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/api/recipes/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.access}`
      },
      body: JSON.stringify({ name, ingredients, instructions })
    });
    if (response.ok) {
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Ingredients</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Instructions</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
