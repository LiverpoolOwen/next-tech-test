import React from 'react';
import logo from './logo.svg';
import { Search } from './features/search/Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Next music search</h1>
        <Search />
      </header>
    </div>
  );
}

export default App;
