import React from 'react';
import Header from './Header';
import Movie from './Movie';
import Search from './Search'
import '../App.css';
import { initialState, reducer } from "../store/reducer";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=be1b26d2";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=be1b26d2`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
    };

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);
  
  const { movies, errorMessage, loading } = state;
  
  return (
    <div className="App">
     <Header text="SMOOTHIES" />
     <Search search={search} />
     <p className="App-intro">Here's our favorites!!!</p>
     <div className="movies">
     {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
