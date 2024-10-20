import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnimal, updateAnimal, deleteAnimal } from '../api';
import '../styles/AnimalDetail.css';

const AnimalDetail = () => {
  const [animal, setAnimal] = useState({ nome: '', especie: '', imagem: '' });
  const [updatedAnimal, setUpdatedAnimal] = useState({ nome: '', especie: '', imagem: '' });
  const { id } = useParams();  // Para pegar o ID do animal
  const navigate = useNavigate(); // Para redirecionar

  useEffect(() => {
    const fetchAnimal = async () => {
      const data = await getAnimal(id);
      setAnimal(data);
      setUpdatedAnimal(data);  // Preenche os campos de edição com os dados atuais
    };
    fetchAnimal();
  }, [id]);

  const handleUpdateAnimal = async (e) => {
    e.preventDefault();
    await updateAnimal(id, updatedAnimal);
    navigate(`/animals/${id}`); // Redireciona para a página de detalhes após a atualização
  };

  const handleDeleteAnimal = async () => {
    await deleteAnimal(id);
    navigate('/');  // Redireciona para a lista de animais após a exclusão
  };

  return (
    <div className="animal-detail-container">
      <h1 className="animal-detail-title">{animal.nome}</h1>
      <div className="animal-detail-content">
        <div className="animal-info">
          <img src={animal.imagem} alt={animal.nome} className="animal-image" />
          <p><strong>Espécie:</strong> {animal.especie}</p>
        </div>

        <form className="animal-edit-form" onSubmit={handleUpdateAnimal}>
          <h2>Editar Animal</h2>
          <input
            type="text"
            placeholder="Nome"
            value={updatedAnimal.nome}
            onChange={(e) => setUpdatedAnimal({ ...updatedAnimal, nome: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Espécie"
            value={updatedAnimal.especie}
            onChange={(e) => setUpdatedAnimal({ ...updatedAnimal, especie: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Imagem (URL)"
            value={updatedAnimal.imagem}
            onChange={(e) => setUpdatedAnimal({ ...updatedAnimal, imagem: e.target.value })}
            className="input-field"
          />
          <button type="submit" className="submit-button">Atualizar</button>
        </form>
        <br />
        <br />
        <button onClick={handleDeleteAnimal} className="delete-button">Deletar Animal</button>
      </div>
    </div>
  );
};

export default AnimalDetail;
