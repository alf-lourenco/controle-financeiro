require('dotenv').config();

const { default: mongoose } = require('mongoose');
const main = require('../src/db/connectDB.js');
const Despesa = require('../src/model/Despesas.js');
const listarDespesas = require('../src/services/despesas/listarDespesa.service.js');
const deletarTodasDespesas = require('../src/services/despesas/deletarTodasDespesas.service.js');
const cadastrarDespesa = require('../src/services/despesas/cadastrarDespesa.service.js');

describe('Crud', () => {
  beforeAll(async () => {
    await main();
  });
  afterAll(async () => {
    await deletarTodasDespesas();
    await mongoose.disconnect();
  });
  test('Listar Banco vazio', async () => {
    const resp = await listarDespesas();
    expect(resp.length > 0).toBe(false);
  });
  test('Criar despesa Pendentes', async () => {
    const despesa = {
      nomeProduto: 'Notebook',
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
    const resp = await listarDespesas();
    expect(resp.length > 0).toBe(true);
  });
  test('Deletar dados', () => {
    deletarTodasDespesas();
  });
});
