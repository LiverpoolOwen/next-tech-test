import React from 'react';
import { Search } from './features/search/Search';
import './App.css';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1">Next music search</Typography>
        <Search />
      </header>
    </div>
  );
}

export default App;
