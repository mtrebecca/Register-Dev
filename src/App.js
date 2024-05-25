import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NiveisPage from './pages/NiveisPage';
import DesenvolvedoresPage from './pages/DesenvolvedoresPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/niveis" element={<NiveisPage />} />
        <Route path="/desenvolvedores" element={<DesenvolvedoresPage />} />
      </Routes>
    </Router>
  );
}

export default App;
