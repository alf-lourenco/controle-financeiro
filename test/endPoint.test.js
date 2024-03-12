require('dotenv').config();

const { default: mongoose } = require('mongoose');
const { cadastrarDespesa, listarTodos, despesasControllers } = require('../src/controllers/despesasController.js');
const main = require('../src/db/connectDB.js');
const Despesa = require('../src/model/Despesas.js');
describe('Crud', () => {
  beforeAll(async () => {
    await main();
  });
  afterAll(async () => {
    await Despesa.deleteMany({});
    await mongoose.disconnect();
  });
  test('Listar Banco vazio', async () => {
    const resp = await listarTodos();
    expect(resp.length > 0).toBe(false);
  });
  test('Criar despesa Pendentes', async () => {
    const despesa = {
      item: 'Notebook',
      categoria: 'eletronicos',
      valor: 90,
      parcelas: 15,
      responsavel: 'Alfredo',
      vencimento: '25/02/2024',
      descricao: 'Novo notebook, parcelado em infinitas vezes',
      situacao: 'Pendente',
    };
    const resp = await cadastrarDespesa(despesa);
    expect(resp).toBe('Cadastro realizado com sucesso');
  });

  test('Listar despesas', async () => {
    const resp = await listarTodos();
    expect(resp.length > 0).toBe(true);
  });
  test('Deletar dados', () => {
    Despesa.deleteMany();
  });
});
