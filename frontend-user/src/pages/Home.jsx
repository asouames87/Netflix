import { useState } from 'react';
import moviesData from '../data/movies.json';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MovieHero from '../components/movies/MovieHero';
import MovieFilter from '../components/movies/MovieFilter';
import MovieList from '../components/movies/MovieList';

function Home() {
  const [allMovies] = useState(moviesData);
  const [filteredMovies, setFilteredMovies] = useState(moviesData);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <MovieHero movie={allMovies[0]} />
      <div className="container mx-auto">
        <MovieFilter movies={allMovies} onFilter={setFilteredMovies} />
        <MovieList title="Films disponibles" movies={filteredMovies} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;