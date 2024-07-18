import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from './AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl">Recipe Delicious</div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <div className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
          {!user ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'text-white font-bold' : 'text-white hover:underline'
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? 'text-white font-bold' : 'text-white hover:underline'
                }
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'text-white font-bold' : 'text-white hover:underline'
                }
              >
                Recipe List
              </NavLink>
              <NavLink
                to="/create-recipe"
                className={({ isActive }) =>
                  isActive ? 'text-white font-bold' : 'text-white hover:underline'
                }
              >
                Create Recipe
              </NavLink>
              <button onClick={logout} className="text-white hover:underline">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
