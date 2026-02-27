import { useState, useMemo } from 'react';

function SearchBar({ movies, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = useMemo(() => {
    if (searchTerm.length < 2) return [];
    
    return movies
      .filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (movie.description && movie.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .slice(0, 5);
  }, [searchTerm, movies]);

  const handleSelect = (movie) => {
    setSearchTerm(movie.title);
    setIsOpen(false);
    console.log('Film sélectionné:', movie);
    if (onSearch) onSearch(movie);
  };

  const handleFocus = () => {
    if (searchTerm.length >= 2) {
      setIsOpen(true);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(value.length >= 2 && suggestions.length > 0);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Rechercher un film..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
        />
        <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
          {suggestions.map(movie => (
            <div
              key={movie.id}
              onClick={() => handleSelect(movie)}
              className="flex items-center p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0"
            >
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-10 h-10 object-cover rounded"
              />
              <div className="ml-3">
                <p className="font-semibold text-white">{movie.title}</p>
                <p className="text-sm text-gray-400">{movie.year} - {movie.rating}/10</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;