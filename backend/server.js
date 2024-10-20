const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/projeto_jest', {
});

const animalSchema = new mongoose.Schema({
    nome: String,
    especie: String,
    imagem: String
}, {
    collection: 'Animal'
});

const Animal = mongoose.model('Animal', animalSchema);

// Cadastrar animal
app.post('/animal', async (req, res) => {
    try {
        const animal = new Animal(req.body);
        await animal.save();
        res.status(201).send(animal);
    } catch (error) {
        res.status(500).send(error)
    }
});

// Listar animais
app.get('/animal', async (req, res) => {
    try {
        const animals = await Animal.find({});
        res.status(200).send(animals);
    } catch (error) {
        res.status(500).send(error)
    }
});

// Buscar animal por ID
app.get('/animal/:id', async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).send({ message: 'Animal não encontrado' });
        }
        res.status(200).send(animal);
    } catch (error) {
        res.status(500).send(error)
    }
});

// Atualizar animal
app.put('/animal/:id', async (req, res) => {
    try {
        const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!animal) {
            return res.status(404).send({ message: 'Animal não encontrado' });
        }
        res.status(200).send(animal);
    } catch (error) {
        res.status(500).send(error)
    }
});

// Deletar animal
app.delete('/animal/:id', async (req, res) => {
    try {
        const animal = await Animal.findByIdAndDelete(req.params.id);
        if (!animal) {
            return res.status(404).send({ message: 'Animal não encontrado' });
        }
        res.status(200).send({ message: 'Animal deletado com sucesso' });
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