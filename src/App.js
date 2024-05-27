import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NiveisPage from './pages/NiveisPage';
import DesenvolvedoresPage from './pages/DesenvolvedoresPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/niveis" element={<NiveisPage />} />
        <Route path="/desenvolvedores" element={<DesenvolvedoresPage />} />
      </Routes>
    </Router>
  );
}

export default App;
