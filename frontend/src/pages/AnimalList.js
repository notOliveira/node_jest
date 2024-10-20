import React, { useEffect, useState } from 'react';
import { listAnimals, createAnimal } from '../api';
import '../styles/AnimalList.css';
import { Link } from 'react-router-dom';

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({ nome: '', especie: '', imagem: '' });

  useEffect(() => {
    const fetchAnimals = async () => {
      const data = await listAnimals();
      setAnimals(data);
    };
    fetchAnimals();
  }, []);

  const handleCreateAnimal = async (e) => {
    e.preventDefault();
    await createAnimal(newAnimal);
    setNewAnimal({ nome: '', especie: '', imagem: '' });
    const updatedAnimals = await listAnimals();
    setAnimals(updatedAnimals);
  };

  return (
    <div className="animal-list-container">
      <h1 className="title">Lista de Animais</h1>

      <ul className="animal-list">
        {animals.map((animal) => (
            <Link to={`/animal/${animal._id}`}>
            <li key={animal._id} className="animal-item">
                <div className="animal-info">
                <h3>{animal.nome}</h3>
                <p>Espécie: {animal.especie}</p>
                <img src={animal.imagem} alt={animal.nome} className="animal-image" />
                </div>
            </li>
          </Link>
        ))}
      </ul>

      <div className="form-container">
        <h2>Cadastrar Novo Animal</h2>
        <form onSubmit={handleCreateAnimal}>
          <input
            type="text"
            placeholder="Nome do animal"
            value={newAnimal.nome}
            onChange={(e) => setNewAnimal({ ...newAnimal, nome: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Espécie do animal"
            value={newAnimal.especie}
            onChange={(e) => setNewAnimal({ ...newAnimal, especie: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Imagem (URL)"
            value={newAnimal.imagem}
            onChange={(e) => setNewAnimal({ ...newAnimal, imagem: e.target.value })}
            className="input-field"
          />
          <button type="submit" className="submit-button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default AnimalList;
