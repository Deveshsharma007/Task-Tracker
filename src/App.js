import React from 'react';
import './App.css';
import photo7 from './Images/photo7.jpg';
import Home from './Components/Home';

function App() {
  return (
    <div className="App"
    style={{
      backgroundImage:`url(${photo7})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: 'fixed'
    }}
    >
      <Home/>
    </div>
  );
}

export default App;
