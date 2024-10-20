import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const App = () => {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({ nome: '', especie: '', imagem: '' });


  const listAnimals = async () => {

    try {
      const response = await axios.get(`${API_URL}/animal`);
      setAnimals(response.data);
    } catch (error) {
      console.error('Erro ao buscar animais');
    }
  }

  const createAnimal = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/animal`, newAnimal);
    listAnimals();
  }

  useEffect(() => {
    listAnimals();
  }, []);

  return (
    <div>
      <h1>Lista de Animais</h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            {animal.nome} - R$ {animal.preco}
          </li>
        ))}
      </ul>

      <h2>Novo Animal</h2>
      <form onSubmit={createAnimal}>
        <input
          type="text"
          placeholder="Nome do animal"
          value={newAnimal.nome}
          onChange={(e) => setNewAnimal({ ...newAnimal, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Espécie do animal"
          value={newAnimal.especie}
          onChange={(e) => setNewAnimal({ ...newAnimal, especie: e.target.value })}
        />

        <input
          type="text"
          placeholder="Imagem do animal"
          value={newAnimal.imagem}
          onChange={(e) => setNewAnimal({ ...newAnimal, imagem: e.target.value })}
        />

        <button type="submit">Cadastrar</button>
        </form>
    </div>
  );
};

export default App;