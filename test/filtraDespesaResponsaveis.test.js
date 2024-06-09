require('dotenv').config();
const connectDB = require('../src/db/connectDB');
const buscaPorParametro = require('../src/services/despesas/buscaPorParametro.service');
const cadastrarDespesa = require('../src/services/despesas/cadastrarDespesa.service');
const deletarTodasDespesas = require('../src/services/despesas/deletarTodasDespesas.service');
const { default: mongoose } = require('mongoose');
const parametrosParaBusca = require('../src/util/criaParametrosBusca');

describe('filtra despesas por responsaveis', () => {
  const item1 = {
    nomeProduto: 'Celular',
    categoria: 'eletronicos',
    valor: 200,
    parcelas: 5,
    responsavel: 'Alfredo',
    vencimento: '03/01/2024',
    descricao: 'teste de parcelamento',
    situacao: 'Pendente',
  };
  const item2 = {
    nomeProduto: 'Ração',
    categoria: 'Pet',
    valor: 200,
    parcelas: 3,
    responsavel: 'Nala',
    vencimento: '03/01/2023',
    descricao: 'teste de parcelamento',
    situacao: 'Pendente',
  };
  const item3 = {
    nomeProduto: 'Combustivel',
    categoria: 'Petroleo',
    valor: 200,
    parcelas: 3,
    responsavel: 'Alfredo,Nala',
    vencimento: '15/05/2023',
    descricao: 'teste de parcelamento',
    situacao: 'Pendente',
  };
  beforeAll(async () => {
    await connectDB();
    await cadastrarDespesa(item1);
    await cadastrarDespesa(item2);
    await cadastrarDespesa(item3);
  });
  afterAll(async () => {
    await deletarTodasDespesas();
    await mongoose.disconnect();
  });
  test('busca por Responsavel - Alfredo', async () => {
    const parametros = parametrosParaBusca({ responsavel: 'Alfredo' });
    const response = await buscaPorParametro(parametros);
    expect(response.every((item) => item.responsavel === 'Alfredo')).toBe(true);
  });
  test('busca por por Responsavel - Nala', async () => {
    const parametros = parametrosParaBusca({ responsavel: 'Nala' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.responsavel === 'Nala')).toBe(true);
  });
  test('busca por Responsavel- Alfredo, Nala', async () => {
    const parametros = parametrosParaBusca({ responsavel: 'Alfredo,Nala' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.responsavel === 'Alfredo' || item.responsavel === 'Nala')).toBe(true);
  });
  test('verifica ordenacao', async () => {
    const response = await buscaPorParametro({ responsavel: 'Alfredo' });
    const ordenadoPeloDB = response.map((vencimento) => vencimento.vencimento);
    const exemploOrdenado = response.map((vencimento) => vencimento.vencimento).sort((a, b) => a - b);
    expect(ordenadoPeloDB).toEqual(exemploOrdenado);
  });
});
