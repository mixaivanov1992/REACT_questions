import React from 'react';
import { sections } from '../store';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Question from './Question';
import uuid from 'react-uuid';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={ <Home sections={sections} /> } />
        {
          sections.map(section=>(
              <Route key={uuid()} path={section} element={ <Question sectionName={section}/> } />
          ))
        }
      </Routes>
    </div>
  );
}

export default App;
