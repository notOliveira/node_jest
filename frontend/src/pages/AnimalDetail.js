import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAnimal, updateAnimal, deleteAnimal } from '../api';  // Importa funções da API

const AnimalDetail = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [updatedAnimal, setUpdatedAnimal] = useState({ nome: '', especie: '', imagem: '' });

  const fetchAnimal = async () => {
    try {
      const animal = await getAnimal(id);  // Usa a função da API para buscar o animal
      setAnimal(animal);
      setUpdatedAnimal({ nome: animal.nome, especie: animal.especie, imagem: animal.imagem });
    } catch (error) {
      console.error('Erro ao buscar detalhes do animal', error);
    }
  };

  const handleUpdateAnimal = async (e) => {
    e.preventDefault();
    try {
      await updateAnimal(id, updatedAnimal);  // Usa a função da API para atualizar o animal
      fetchAnimal();  // Atualiza os detalhes do animal
    } catch (error) {
      console.error('Erro ao atualizar animal', error);
    }
  };

  const handleDeleteAnimal = async () => {
    try {
      await deleteAnimal(id);  // Usa a função da API para deletar o animal
      // Redirecionar para a página de listagem após deletar
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao deletar animal', error);
    }
  };

  useEffect(() => {
    fetchAnimal();  // Chama a função para buscar os detalhes do animal quando o componente é montado
  }, [id]);

  if (!animal) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Detalhes do Animal</h1>
      <p><strong>Nome:</strong> {animal.nome}</p>
      <p><strong>Espécie:</strong> {animal.especie}</p>
      <p><strong>Imagem:</strong> <img src={animal.imagem} alt={animal.nome} /></p>

      <h2>Editar Animal</h2>
      <form onSubmit={handleUpdateAnimal}>
        <input
          type="text"
          value={updatedAnimal.nome}
          onChange={(e) => setUpdatedAnimal({ ...updatedAnimal, nome: e.target.value })}
        />
        <input
          type="text"
          value={updatedAnimal.especie}
          onChange={(e) => setUpdatedAnimal({ ...updatedAnimal, especie: e.target.value })}
        />
        <input
          type="text"
          value={updatedAnimal.imagem}
          onChange={(e) => setUpdatedAnimal({ ...updatedAnimal, imagem: e.target.value })}
        />
        <button type="submit">Atualizar</button>
      </form>
      <br /><br /><br />

      <button onClick={handleDeleteAnimal}>Deletar Animal</button>
      <br /><br /><br />
      <Link to="/">Voltar para lista</Link>
    </div>
  );
};

export default AnimalDetail;
