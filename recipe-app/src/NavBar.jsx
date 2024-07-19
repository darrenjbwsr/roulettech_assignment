import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from './AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-blue-500 p-4 w-full relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl">Recipe Delicious</div>
        <div className="block">
          <button onClick={toggleMenu} className="text-white md:hidden">
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <div
          className={`absolute right-0 mt-20 py-4 w-48 bg-white rounded-lg shadow-xl ${isOpen ? 'block' : 'hidden'} md:mt-0 md:relative md:bg-transparent md:w-auto md:shadow-none md:flex md:items-center md:space-x-4`}
        >
          {!user ? (
            <>
              <NavLink
                to="/login"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? 'md:text-white text-blue-500 font-bold block py-2 md:py-0' : 'text-gray-800 hover:text-blue-500 block py-2 md:py-0'
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? 'md:text-white text-blue-500 font-bold block py-2 md:py-0' : 'text-gray-800 hover:text-blue-500 block py-2 md:py-0'
                }
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? 'md:text-white text-blue-500 font-bold block py-2 md:py-0' : 'text-gray-800 hover:text-blue-500 block py-2 md:py-0'
                }
              >
                Recipe List
              </NavLink>
              <NavLink
                to="/create-recipe"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? 'md:text-white text-blue-500 font-bold block py-2 md:py-0' : 'text-gray-800 hover:text-blue-500 block py-2 md:py-0'
                }
              >
                Create Recipe
              </NavLink>
              <button onClick={() => { logout(); closeMenu(); }} className="text-gray-800 hover:text-blue-500 block py-2 md:py-0">
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
