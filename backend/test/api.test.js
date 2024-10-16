const request = require('supertest');
const app = require('../server');

describe('API', () => {
    // Teste para criar produtos
    it('Deve cadastrar um produto', async () => {
        const response = await request(app)
            .post('/produto')
            .send({ nome: 'Produto Teste', preco: 100 });
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('nome', 'Produto Teste');
        expect(response.body).toHaveProperty('preco', 100);
    });

    // Teste para listar produtos
    it('Deve listar produtos', async () => {
        const response = await request(app).get('/produto');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    // Teste para buscar produto por ID
    it('Deve buscar um produto por ID', async () => {
        const produto = await request(app)
            .post('/produto')
            .send({ nome: 'Produto Para Buscar', preco: 200 });
        const response = await request(app).get(`/produto/${produto.body._id}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('nome', 'Produto Para Buscar');
        expect(response.body).toHaveProperty('preco', 200);
    });

    // Teste para atualizar produto
    it('Deve atualizar um produto', async () => {
        const produto = await request(app)
            .post('/produto')
            .send({ nome: 'Produto Atualizar', preco: 300 });
        const response = await request(app)
            .put(`/produto/${produto.body._id}`)
            .send({ nome: 'Produto Atualizado', preco: 400 });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('nome', 'Produto Atualizado');
        expect(response.body).toHaveProperty('preco', 400);
    });

    // Teste para deletar produto
    it('Deve deletar um produto', async () => {
        const produto = await request(app)
            .post('/produto')
            .send({ nome: 'Produto Deletar', preco: 500 });
        const response = await request(app).delete(`/produto/${produto.body._id}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('message', "Produto deletado com sucesso");
    }); 
});