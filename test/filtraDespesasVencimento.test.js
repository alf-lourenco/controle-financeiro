require('dotenv').config();
const connectDB = require('../src/db/connectDB');
const buscaPorParametro = require('../src/services/despesas/buscaPorParametro.service');
const cadastrarDespesa = require('../src/services/despesas/cadastrarDespesa.service');
const deletarTodasDespesas = require('../src/services/despesas/deletarTodasDespesas.service');
const { default: mongoose } = require('mongoose');
const parametrosParaBusca = require('../src/util/criaParametrosBusca');

describe('filtra despesas por Vencimento', () => {
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
    vencimento: '15/05/2025',
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
  test('busca por vencimento maior ou igual a 03/01/2023', async () => {
    const parametros = parametrosParaBusca({ datainicio: '2023-01-03' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => new Date(item.vencimento) >= new Date('2023-01-03'))).toBe(true);
  });
  test('busca por por vencimento menor ou igual a 03/01/2024', async () => {
    const parametros = parametrosParaBusca({ dataFim: '2024-01-03' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => new Date(item.vencimento) <= new Date('2024-01-03'))).toBe(true);
  });
  test('busca por vencimento- maior ou igual a 03/01/2023 e menor ou igual a 03/01/2024', async () => {
    const parametros = parametrosParaBusca({ datainicio: '2023-01-03', dataFim: '2024-01-03' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => new Date(item.vencimento) >= new Date('2023-01-03') && new Date(item.vencimento) <= new Date('2024-01-03'))).toBe(true);
  });
});
