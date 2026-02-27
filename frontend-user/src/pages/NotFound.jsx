import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function NotFound() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page non trouvée</h2>
        <p className="text-xl text-gray-400 mb-8">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <Link 
          to="/" 
          className="bg-primary hover:bg-primary-dark px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;