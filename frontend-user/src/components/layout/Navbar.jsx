import { NavLink } from 'react-router-dom';
import SearchBar from '../common/SearchBar'; 
import CartButton from '../common/CartButton';
import { useState } from 'react';
import moviesData from '../../data/movies.json';

function Navbar() {
  const [movies] = useState(moviesData);

  const handleSearch = (movie) => {
    window.location.href = `/movie/${movie.id}`;
  };

  return (
    <nav className="fixed w-full z-50 bg-black py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <NavLink to="/" className="text-primary text-3xl font-bold tracking-tight">
            NETFLIX
          </NavLink>
          <ul className="hidden md:flex space-x-6">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? 'text-primary font-bold' : 'text-white hover:text-gray-300'
                }
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/my-rentals" 
                className={({ isActive }) => 
                  isActive ? 'text-primary font-bold' : 'text-white hover:text-gray-300'
                }
              >
                Mes locations
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  isActive ? 'text-primary font-bold' : 'text-white hover:text-gray-300'
                }
              >
                Connexion
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <SearchBar movies={movies} onSearch={handleSearch} />
          <CartButton />
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center cursor-pointer hover:bg-primary-dark">
            <span className="text-sm font-bold text-white">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;