import React from 'react';
import Header from './Header';
import Movie from './Movie';
import Search from './Search'
import '../App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

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
  
  return (
    <div className="App">
     <Header text="SMOOTHIES" />
     <div className="movies">
            <Movie />
      </div>
    </div>
  );
}

export default App;
