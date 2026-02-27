import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function MyRentals() {
  const [rentals] = useState([]);
  const navigate = useNavigate();

  const handleDiscoverClick = () => {
    navigate('/');
  };

  if (rentals.length === 0) {
    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center min-h-[60vh]">
          <h1 className="text-3xl font-bold mb-6 text-white">Mes locations</h1>
          <p className="text-xl text-gray-400 mb-8">Vous n'avez pas encore de films en location</p>
          <button 
            onClick={handleDiscoverClick}
            className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-lg text-lg font-semibold text-white"
          >
            Découvrir des films
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-8 text-white">Mes locations</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentals.map(rental => {
            const expiryDate = new Date(rental.expiryDate);
            const now = new Date();
            const daysLeft = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={rental.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={rental.poster} 
                  alt={rental.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 text-white">{rental.title}</h3>
                  <p className="text-gray-400 mb-1">
                    Loué le: {new Date(rental.rentalDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400 mb-3">
                    Expire le: {new Date(rental.expiryDate).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded text-sm text-white ${
                      daysLeft > 3 ? 'bg-green-500' : daysLeft > 1 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {daysLeft > 0 ? `${daysLeft} jours restants` : 'Expiré'}
                    </span>
                    <Link 
                      to={`/movie/${rental.id}`}
                      className="text-primary hover:underline"
                    >
                      Voir détail
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyRentals;