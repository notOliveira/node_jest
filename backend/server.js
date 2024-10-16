const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/projeto_jest', {
});

const produtoSchema = new mongoose.Schema({
    nome: String,
    preco: Number
}, {
    collection: 'Produto'
});

const Produto = mongoose.model('Produto', produtoSchema);

// Cadastrar produto
app.post('/produto', async (req, res) => {
    try {
        const produto = new Produto(req.body);
        await produto.save();
        res.status(201).send(produto);
    } catch (error) {
        res.status(500).send(error)
    }
});

// Listar produto
app.get('/produto', async (req, res) => {
    try {
        const produtos = await Produto.find({});
        res.status(200).send(produtos);
    } catch (error) {
        res.status(500).send(error)
    }
});

// Buscar produto por ID
app.get('/produto/:id', async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).send({ message: 'Produto não encontrado' });
        }
        res.status(200).send(produto);
    } catch (error) {
        res.status(500).send(error)
    }
});

// Atualizar produto
app.put('/produto/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!produto) {
            return res.status(404).send({ message: 'Produto não encontrado' });
        }
        res.status(200).send(produto);
    } catch (error) {
        res.status(500).send(error)
    }
});

// Deletar produto
app.delete('/produto/:id', async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) {
            return res.status(404).send({ message: 'Produto não encontrado' });
        }
        res.status(200).send({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        res.status(500).send(error)
    }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;