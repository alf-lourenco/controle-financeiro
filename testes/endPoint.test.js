require('dotenv').config();

const { default: mongoose } = require('mongoose');
const { cadastrarDespesa, listarTodos } = require('../src/controllers/despesasController.js');
const main = require('../src/db/connectDB.js');
beforeAll(() => {
  main();
});
describe('Crud', () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });
  test('Listar Banco vazio', async () => {
    const resp = await listarTodos();
    expect(resp.length > 0).toBe(false);
  });
  test('Criar despesa', async () => {
    const despesa = {
      item: 'Notebook',
      categoria: 'eletronicos',
      valor: 90,
      responsavel: 'Alfredo',
      vencimento: '2024-02-25',
      descricao: 'Novo notebook, parcelado em infinitas vezes',
    };
    const resp = await cadastrarDespesa(despesa);
    expect(resp).toHaveProperty('_id');
  });
  test('Listar despesas', async () => {
    const resp = await listarTodos();
    expect(resp.length > 0).toBe(true);
  });
});
