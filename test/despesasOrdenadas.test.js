const { default: mongoose } = require('mongoose');
const connectDB = require('../src/db/connectDB');
require('dotenv').config();
const buscaPorParametro = require('../src/services/despesas/buscaPorParametro.service');
const cadastrarDespesa = require('../src/services/despesas/cadastrarDespesa.service');
const deletarTodasDespesas = require('../src/services/despesas/deletarTodasDespesas.service');

describe('verifica se das despesas estao chegando ordenadas ', () => {
  beforeAll(async () => {
    await connectDB();
    const item1 = {
      nomeProduto: 'Celular',
      categoria: 'eletronicos',
      valor: 200,
      parcelas: 1,
      responsavel: 'Alfredo,Ana',
      vencimento: '03/01/2024',
      descricao: 'teste de parcelamento',
      situacao: 'Pendente',
    };
    const item2 = {
      nomeProduto: 'Teclado',
      categoria: 'eletronicos',
      valor: 200,
      parcelas: 1,
      responsavel: 'Alfredo,Ana',
      vencimento: '03/01/2023',
      descricao: 'teste de parcelamento',
      situacao: 'Pendente',
    };
    await cadastrarDespesa(item1, 5);
    await cadastrarDespesa(item2, 10);
  });
  afterAll(async () => {
    await deletarTodasDespesas();
    await mongoose.disconnect();
  });
  test('Ordenadas por vencimento', async () => {
    const response = await buscaPorParametro({});
    const ordenadoPeloDB = response.map((vencimento) => vencimento.vencimento);
    const exemploOrdenado = response.map((vencimento) => vencimento.vencimento).sort();
    expect(ordenadoPeloDB).toEqual(exemploOrdenado);
  });
});
