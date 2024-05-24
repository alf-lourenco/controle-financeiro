const { default: mongoose } = require('mongoose');
require('dotenv').config();
const connectDB = require('../src/db/connectDB');
const buscaPorParametro = require('../src/services/despesas/buscaPorParametro.service');
const { configDotenv } = require('dotenv');
const parametrosParaBusca = require('../src/util/criaParametrosBusca');
const Despesa = require('../src/model/Despesas');
const cadastrarDespesa = require('../src/services/despesas/cadastrarDespesa.service');

describe('Filtra despesas pendentes', () => {
  const despesa = {
    nomeProduto: 'Notebook',
    categoria: 'eletronicos',
    valor: 90,
    parcelas: 10,
    responsavel: 'Alfredo',
    vencimento: '25/02/2024',
    descricao: 'Novo notebook, parcelado em infinitas vezes',
    situacao: 'Pendente',
    atrasada: 3,
  };
  beforeAll(async () => {
    await connectDB();
    await Despesa.deleteMany({});
    await cadastrarDespesa(despesa);
  });
  afterAll(async () => {
    await Despesa.deleteMany({});
    await mongoose.disconnect();
  });
  test('Filtra desepesa pendente', async () => {
    const parametros = parametrosParaBusca(['Pendente']);
    const exemplo = await buscaPorParametro(parametros);
    expect(exemplo.length).toBeGreaterThan(0);
    expect(exemplo.every((item) => item.situacao === 'Pendente')).toBe(true);
  });
  test('filtra despesa pendente. situacao Atrasada', async () => {
    const exemplo = await buscaPorParametro({});
    expect(exemplo.length).toBeGreaterThan(0);
    expect(exemplo.every((item) => item.situacao === 'Pendente')).toBe(false);
  });
});
