const { default: mongoose } = require('mongoose');
require('dotenv').config();
const connectDB = require('../src/db/connectDB');
const buscaPorParametro = require('../src/services/despesas/buscaPorParametro.service');
const { configDotenv } = require('dotenv');
const { parametrosParaBusca } = require('../src/util/criaParametrosBusca');

describe('Filtra despesas pendentes', () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  test('Filtra desepesa pendente', async () => {
    const parametros = parametrosParaBusca(['Pendente'], []);
    const exemplo = await buscaPorParametro(parametros);
    expect(exemplo.every((item) => item.situacao === 'Pendente')).toBe(true);
  });
  test('filtra despesa pendente. situacao Atrasada', async () => {
    const exemplo = await buscaPorParametro({ situacao: 'Atrasada' });
    expect(exemplo.every((item) => item.situacao === 'Pendente')).toBe(false);
  });
});
