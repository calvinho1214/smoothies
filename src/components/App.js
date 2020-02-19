import React from 'react';
import Header from './Header';
import Movie from './Movie';
import Search from './Search'
import '../App.css';
import { initialState, reducer } from "../store/reducer";

const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=be1b26d2";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);}

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
      })
}

  
  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );
  
  return (
    <div className="App">
     <Header text="SMOOTHIES" />
     <Search search={search} />
     <p className="App-intro">Here's our favorites!!!</p>
     <div className="movies">{retrievedMovies}</div>
    </div>
  );

export default App;
