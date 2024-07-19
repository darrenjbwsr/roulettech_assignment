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
    <nav className="bg-blue-500 p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl">Recipe Delicious</div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <div className={`md:flex md:items-center md:space-x-4 ${isOpen ? 'block' : 'hidden'} w-full md:w-auto`}>
          {!user ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'text-white font-bold block py-2 md:py-0' : 'text-white hover:underline block py-2 md:py-0'
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? 'text-white font-bold block py-2 md:py-0' : 'text-white hover:underline block py-2 md:py-0'
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
                  isActive ? 'text-white font-bold block py-2 md:py-0' : 'text-white hover:underline block py-2 md:py-0'
                }
              >
                Recipe List
              </NavLink>
              <NavLink
                to="/create-recipe"
                className={({ isActive }) =>
                  isActive ? 'text-white font-bold block py-2 md:py-0' : 'text-white hover:underline block py-2 md:py-0'
                }
              >
                Create Recipe
              </NavLink>
              <button onClick={logout} className="text-white hover:underline block py-2 md:py-0">
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
