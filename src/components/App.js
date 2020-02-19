import React from 'react';
import Header from './Header';
import Movie from './Movie';
import '../App.css';

function App() {
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
