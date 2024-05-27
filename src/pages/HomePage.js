import React from 'react';
import { Link } from 'react-router-dom';
import './styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="container">
        <h1 className="text-4xl mb-8">Seja bem-vindo ao cadastro de desenvolvedores</h1>
        <nav className="flex justify-center space-x-4">
          <Link to="/niveis" className="text-white">Níveis</Link>
          <Link to="/desenvolvedores" className="text-white">Desenvolvedores</Link>
        </nav>
      </div>
    </div>
  );
}

export default HomePage;
