import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listAnimals, createAnimal } from '../api';  // Importa funções da API

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({ nome: '', especie: '', imagem: '' });

  const fetchAnimals = async () => {
    try {
      const animals = await listAnimals();  // Usa a função da API para listar animais
      setAnimals(animals);
    } catch (error) {
      console.error('Erro ao buscar animais');
    }
  };

  const handleCreateAnimal = async (e) => {
    e.preventDefault();
    try {
      await createAnimal(newAnimal);  // Usa a função da API para criar um animal
      fetchAnimals();  // Atualiza a lista
    } catch (error) {
      console.error('Erro ao criar animal');
    }
  };

  useEffect(() => {
    fetchAnimals();  // Chama a função para buscar os animais quando o componente é montado
  }, []);

  return (
    <div>
      <h1>Lista de Animais</h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal._id}>
            <Link to={`/animal/${animal._id}`}>{animal.nome} - {animal.especie}</Link>
          </li>
        ))}
      </ul>

      <h2>Novo Animal</h2>
      <form onSubmit={handleCreateAnimal}>
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

export default AnimalList;
