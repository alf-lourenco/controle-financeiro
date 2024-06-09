const { default: mongoose } = require('mongoose');
require('dotenv').config();
const connectDB = require('../src/db/connectDB');
const buscaPorParametro = require('../src/services/despesas/buscaPorParametro.service');
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
    const parametros = parametrosParaBusca({ situacao: 'Pendente' });
    const response = await buscaPorParametro(parametros);
    
    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.situacao === 'Pendente')).toBe(true);
  });
  test('filtra despesa atrasada', async () => {
    const parametros = parametrosParaBusca({ situacao: 'Atrasada' });
    const response = await buscaPorParametro(parametros);
    
    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.situacao === 'Atrasada'));
  });
  test('filtra despesa atrasada e pendente.', async () => {
    const parametros = parametrosParaBusca({ situacao: 'Atrasada,Pendente' });
    const response = await buscaPorParametro(parametros);
    
    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.situacao === 'Atrasada' || item.situacao === 'Pendente'));
  });
  test('verifica ordenacao', async () => {
    const response = await buscaPorParametro({});
    const ordenadoPeloDB = response.map((vencimento) => vencimento.vencimento);
    const exemploOrdenado = response.map((vencimento) => vencimento.vencimento).sort((a, b) => a - b);
    expect(ordenadoPeloDB).toEqual(exemploOrdenado);
  });
});
