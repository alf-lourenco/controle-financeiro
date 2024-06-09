require('dotenv').config();
const connectDB = require('../src/db/connectDB');
const buscaPorParametro = require('../src/services/despesas/buscaPorParametro.service');
const cadastrarDespesa = require('../src/services/despesas/cadastrarDespesa.service');
const deletarTodasDespesas = require('../src/services/despesas/deletarTodasDespesas.service');
const { default: mongoose } = require('mongoose');
const parametrosParaBusca = require('../src/util/criaParametrosBusca');

describe('filtra despesas por  idComumParcelas', () => {
  const item1 = {
    nomeProduto: 'Celular',
    categoria: 'eletronicos',
    valor: 200,
    parcelas: 5,
    responsavel: 'Alfredo',
    vencimento: '03/01/2024',
    descricao: 'teste de parcelamento',
    situacao: 'Pendente',
    idComumParcelas: '1',
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
    idComumParcelas: '2',
  };
  const item3 = {
    nomeProduto: 'Combustivel',
    categoria: 'Petroleo',
    valor: 200,
    parcelas: 3,
    responsavel: 'Alfredo,Nala',
    vencimento: '15/05/2025',
    descricao: 'teste de parcelamento',
    situacao: 'Pendente',
    idComumParcelas: '3',
  };
  beforeAll(async () => {
    await connectDB();
    await cadastrarDespesa(item1, '1');
    await cadastrarDespesa(item2, '2');
    await cadastrarDespesa(item3, '3');
  });
  afterAll(async () => {
    await deletarTodasDespesas();
    await mongoose.disconnect();
  });
  test('idComumParcelas 1', async () => {
    const parametros = parametrosParaBusca({ idComumParcelas: '1' });
    const response = await buscaPorParametro(parametros);
    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.idComumParcelas === '1')).toBe(true);
  });
  test('idComumParcelas 2', async () => {
    const parametros = parametrosParaBusca({ idComumParcelas: '2' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.idComumParcelas === '2')).toBe(true);
  });
  test('idComumParcelas 3', async () => {
    const parametros = parametrosParaBusca({ idComumParcelas: '3' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.idComumParcelas === '3')).toBe(true);
  });
  test('verifica ordenacao', async () => {
    const response = await buscaPorParametro({ idComumParcelas: '1' });
    const ordenadoPeloDB = response.map((vencimento) => vencimento.vencimento);
    const exemploOrdenado = response.map((vencimento) => vencimento.vencimento).sort((a, b) => a - b);
    expect(ordenadoPeloDB).toEqual(exemploOrdenado);
  });
});
