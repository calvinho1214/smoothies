import React, {useReducer, useEffect} from 'react';
import Header from './Header';
import Movie from './Movie';
import Search from './Search'
import '../App.css';
import { initialState, reducer } from "../store/reducer";
import axios from "axios";
import spinner from "../assets/ajax-loader.gif";

const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=be1b26d2";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search
      });
    });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

  axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=be1b26d2`)
  .then(
    jsonResponse => {
      if (jsonResponse.data.Response === "True") {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.data.Search
        });
      } else {
        dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: jsonResponse.data.Error
        });
        }
      }
    );
  };
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
    <div className="m-container">
     <Header text="SMOOTHIES" />
     <Search search={search} />
     <p className="App-intro">Here's our favorites!!!</p>
     <div className="movies">{retrievedMovies}</div>
    </div>
    </div>
  );

export default App;
