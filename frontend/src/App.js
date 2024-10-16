import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const App = () => {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: ''});


  const listarProdutos = async () => {
    const response = await axios.get(`${API_URL}/produto`);
    setProdutos(response.data);
  }

  const criarProduto = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/produto`, novoProduto);
    listarProdutos();
  }

  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - R$ {produto.preco}
          </li>
        ))}
      </ul>

      <h2>Novo Produto</h2>
      <form onSubmit={criarProduto}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={novoProduto.nome}
          onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço do produto"
          value={novoProduto.preco}
          onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
        />
        <button type="submit">Cadastrar</button>
        </form>
    </div>
  );
};

export default App;