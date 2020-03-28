import React from 'react';
import logo from './img/pokemon.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import pokemon from './components/pokemon';

const App = () => {

  return (
    <Router>
      <div className="App-logo">
        <header className="App-header">
          <img src={logo} className="App" alt="logo" />
          <h1 className='App-title'>Welcome to the Pokedex</h1>
        </header>
        <div className='App-body'>
          <h1 className="center1">GOTTA CATCH'EM ALL</h1>
          <p className="center1">Here, it my pokedex which gives information about the items such as pokemon,berries and machines. Hope you like It</p>
          <br />
          <br />
          <br />
          <Link className='pokemonLink' to='/pokemon/page/0'>
            Pokemon
          </Link>
          <Route exact path='/pokemon/page/:page' component={pokemon} />
        </div>
      </div>
    </Router>
  );
};

export default App;
