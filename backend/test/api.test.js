const request = require('supertest');
const app = require('../server');

describe('API', () => {
    // Teste para criar um animal
    it('Deve cadastrar um animal', async () => {
        const response = await request(app)
            .post('/animal')
            .send({ nome: 'Animal Teste', especie: 'Cachorro', imagem: 'link1' });
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('nome', 'Animal Teste');
        expect(response.body).toHaveProperty('especie', 'Cachorro');
        expect(response.body).toHaveProperty('imagem', 'link1');
    });

    // Teste para listar animais
    it('Deve listar animais', async () => {
        const response = await request(app).get('/animal');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    // Teste para buscar animal por ID
    it('Deve buscar um animal por ID', async () => {
        const animal = await request(app)
            .post('/animal')
            .send({ nome: 'Animal Para Buscar', especie: 'Gato', imagem: 'link2' });
        const response = await request(app).get(`/animal/${animal.body._id}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('nome', 'Animal Para Buscar');
        expect(response.body).toHaveProperty('especie', 'Gato');
        expect(response.body).toHaveProperty('imagem', 'link2');
    });

    // Teste para atualizar animal
    it('Deve atualizar um animal', async () => {
        const animal = await request(app)
            .post('/animal')
            .send({ nome: 'Animal Atualizar', especie: 'Leão', imagem: 'link3' });
        const response = await request(app)
            .put(`/animal/${animal.body._id}`)
            .send({ nome: 'Animal Atualizado', especie: 'Formiga', imagem: 'link4' });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('nome', 'Animal Atualizado');
        expect(response.body).toHaveProperty('especie', 'Formiga');
        expect(response.body).toHaveProperty('imagem', 'link4');
    });

    // Teste para deletar animal
    it('Deve deletar um animal', async () => {
        const animal = await request(app)
            .post('/animal')
            .send({ nome: 'Animal Deletar', especie: 'Quati', imagem: 'link5' });
        const response = await request(app).delete(`/animal/${animal.body._id}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('message', "Animal deletado com sucesso");
    }); 
});