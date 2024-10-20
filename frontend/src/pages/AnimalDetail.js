import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';  // Importa useParams para pegar os parâmetros da rota

const API_URL = 'http://localhost:3000';

const AnimalDetail = () => {
  const { id } = useParams();  // Use useParams para pegar o ID da URL
  const [animal, setAnimal] = useState(null);

  const getAnimal = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/animal/${id}`);
      setAnimal(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do animal', error);
    }
  };

  useEffect(() => {
    getAnimal(id);  // Chama a função para buscar o animal pelo ID
  }, [id]);

  if (!animal) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Detalhes do Animal</h1>
      <p><strong>Nome:</strong> {animal.nome}</p>
      <p><strong>Espécie:</strong> {animal.especie}</p>
      <p><strong>Imagem:</strong> <img src={animal.imagem} alt={animal.nome} height={300}/></p>
      <Link to="/">Voltar para lista</Link>
    </div>
  );
};

export default AnimalDetail;
