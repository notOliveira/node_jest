import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Função para listar todos os animais
export const listAnimals = async () => {
  try {
    const response = await axios.get(`${API_URL}/animal`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar animais', error);
    throw error;
  }
};

// Função para criar um novo animal
export const createAnimal = async (newAnimal) => {
  try {
    const response = await axios.post(`${API_URL}/animal`, newAnimal);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar animal', error);
    throw error;
  }
};

// Função para buscar um animal pelo ID
export const getAnimal = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/animal/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do animal', error);
    throw error;
  }
};

// Função para atualizar um animal
export const updateAnimal = async (id, updatedAnimal) => {
  try {
    const response = await axios.put(`${API_URL}/animal/${id}`, updatedAnimal);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar animal', error);
    throw error;
  }
};

// Função para deletar um animal
export const deleteAnimal = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/animal/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar animal', error);
    throw error;
  }
};
