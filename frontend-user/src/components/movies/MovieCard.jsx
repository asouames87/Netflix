import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

function MovieCard({ movie, onRent }) { 
  const { title, year, rating, poster, description, genre, price, id } = movie;
  
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  
  const navigate = useNavigate();

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleRent = (e) => {
    e.stopPropagation();
    if (onRent) {
      onRent(movie);
    } else {
      console.log('Location du film:', title);
    }
  };

  const handleCardClick = () => {
    navigate(`/movie/${id}`);
  };

  const genreColors = {
    'Action': 'bg-red-500',
    'Comédie': 'bg-yellow-500',
    'Drame': 'bg-blue-500',
    'Science-Fiction': 'bg-purple-500',
    'Horreur': 'bg-orange-500',
    'Thriller': 'bg-gray-500'
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <div className="relative aspect-[2/3]">
        <img 
          src={poster} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
          <span className="text-yellow-400 font-bold text-sm">⭐ {rating}</span>
        </div>

        <div className={`absolute bottom-2 left-2 ${genreColors[genre] || 'bg-gray-500'} px-2 py-1 rounded text-xs font-bold text-white`}>
          {genre}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        
        <div className="flex items-center space-x-3 mb-3 text-sm">
          <span className="text-green-400 font-semibold">{rating}/10</span>
          <span className="text-gray-400">{year}</span>
        </div>
        
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={handleLike}
            className={`px-3 py-1 rounded flex items-center space-x-1 ${
              isLiked ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'
            } text-white`}
          >
            <span>{isLiked ? '❤' : '🤍'}</span>
            <span>{likes} likes</span>
          </button>
          <span className="text-primary font-bold">{price}€</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button size="sm" className="flex-1" onClick={handleRent}>
            ▶ Louer
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            + Info
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;