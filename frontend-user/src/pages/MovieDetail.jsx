import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moviesData from '../data/movies.json';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Breadcrumb from '../components/common/Breadcrumb';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundMovie = moviesData.find(m => m.id === parseInt(id));
      setMovie(foundMovie || null);
      setLoading(false);
    };

    loadMovie();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); 
  };

  const handleRent = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    const rental = {
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      rentalDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 jours
    };

    const existingRentals = JSON.parse(localStorage.getItem('rentals') || '[]');

    const alreadyRented = existingRentals.some(r => r.id === movie.id);

    if (alreadyRented) {
      setNotification({ type: 'error', message: 'Vous avez déjà loué ce film' });
      return;
    }

    const updatedRentals = [...existingRentals, rental];
    localStorage.setItem('rentals', JSON.stringify(updatedRentals));

    setNotification({ type: 'success', message: 'Film loué avec succès !' });

    setTimeout(() => {
      navigate('/my-rentals');
    }, 2000);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <p>Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!movie) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Film non trouvé</h1>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary-dark px-6 py-2 rounded"
          >
            Retour à l'accueil
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      {notification && (
        <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-xl z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="relative h-[50vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={movie.backdrop || movie.poster} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <button 
          onClick={handleGoBack}
          className="absolute top-24 left-8 bg-black/50 hover:bg-black/70 px-4 py-2 rounded-lg flex items-center space-x-2 z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Retour</span>
        </button>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="bg-gray-900 rounded-lg p-8 shadow-2xl">
          <Breadcrumb items={[
            { label: 'Films', path: '/' },
            { label: movie.genre, path: `/?genre=${movie.genre}` },
            { label: movie.title }
          ]} />

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full rounded-lg shadow-xl"
              />
            </div>
            
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-primary px-3 py-1 rounded">{movie.year}</span>
                <span className="text-yellow-400">★ {movie.rating}/10</span>
                <span className="text-gray-400">{movie.genre}</span>
                {movie.duration && <span className="text-gray-400">{movie.duration} min</span>}
              </div>

              <p className="text-lg text-gray-300 mb-8">{movie.description}</p>

              {movie.cast && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Casting</h3>
                  <p className="text-gray-300">{movie.cast.join(', ')}</p>
                </div>
              )}

              {movie.director && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Réalisateur</h3>
                  <p className="text-gray-300">{movie.director}</p>
                </div>
              )}

              <Button size="lg" onClick={handleRent} className="mb-8">
                Louer ce film
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetail;