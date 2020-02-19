import React from 'react';
import Header from './Header';
import Movie from './Movie';
import Search from './Search'
import '../App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

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
