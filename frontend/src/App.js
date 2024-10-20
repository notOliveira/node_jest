import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimalList from './pages/AnimalList';  // Importa a página de listagem
import AnimalDetail from './pages/AnimalDetail'; // Importa a página de detalhes

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimalList />} />  {/* Página de listagem */}
        <Route path="/animal/:id" element={<AnimalDetail />} />  {/* Página de detalhes */}
      </Routes>
    </Router>
  );
};

export default App;
