import React, { useState, useEffect } from 'react'; // Import at the top
import "./App.css";
import MovieCard from './MovieCard';

// API key and URL
const API_URL = `https://www.omdbapi.com?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Function to fetch movies
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    // Handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchMovies(searchTerm); // Call searchMovies directly
        }
    }

    useEffect(() => {
        searchMovies('Batman');
    }, []);

    return (
        <div className='app'>
            <h1>CineSearch</h1>
            <div className='search'>
                <input
                    placeholder="Search the Best Cinema"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown} // Trigger on Enter key press
                />
                <img
                    src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
                    alt="search"
                    onClick={() => searchMovies(searchTerm)} // Trigger on click
                />
            </div>
            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} props={movie} />
                    ))}
                </div>
            ) : (
                <div className='empty'>
                    <h2>Sorry, No Movies found</h2>
                </div>
            )}
        </div>
    );
}

export default App; // Export at the end
