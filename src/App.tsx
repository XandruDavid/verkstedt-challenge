import React from 'react';

import './App.css';
import { Explorer } from './components/explorer/Explorer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          GitHub populare repos explorer
        </h1>
      </header>
      <Explorer />
    </div>
  );
}

export default App;
