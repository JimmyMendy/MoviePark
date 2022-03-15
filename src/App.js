import { useEffect, useState } from "react";
import "./CSS/App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";

const API_URL = `http://www.omdbapi.com?apikey=${process.env.REACT_APP_API_KEY}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const { Search } = await response.json();
    // console.log(Search);
    setMovies(Search);
  };

  useEffect(() => {
    searchMovies('French');
  }, []);

  return (
    <div className='app'>
      <h1>Movie Park</h1>

      <div className='search'>
        <input
          type='text'
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt='Search Icon'
          onClick={() => {
            searchMovies(searchTerm)
          }}
        />
      </div>
          
      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
