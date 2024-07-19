import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginPage from './Login';
import RecipeList from './RecipeList';
import CreateRecipe from './CreateRecipe';
import UpdateRecipe from './UpdateRecipe';
import RecipeDetail from './RecipeDetail';
import SignUpPage from './SignUp';
import NavBar from './NavBar';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route exact path="/" element={<RecipeList/>} />
          <Route path="/create-recipe" element={<CreateRecipe/>} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes/:id/edit" element={<UpdateRecipe/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
