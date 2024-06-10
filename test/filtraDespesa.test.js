require('dotenv').config();
const connectDB = require('../src/db/connectDB');
const buscaPorParametro = require('../src/services/despesas/buscaPorParametro.service');
const cadastrarDespesa = require('../src/services/despesas/cadastrarDespesa.service');
const deletarTodasDespesas = require('../src/services/despesas/deletarTodasDespesas.service');
const { default: mongoose } = require('mongoose');
const parametrosParaBusca = require('../src/util/criaParametrosBusca');

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

describe('Verifica a ordenacao do vencimento', () => {
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
  test('Verifica se esta ordenado a partir de vencimento', async () => {
    const response = await buscaPorParametro({});
    const ordenado = response.map((item) => Number(item.vencimento)).sort();
    expect(response.length).toBeGreaterThan(0);
    expect(response.map((item) => Number(item.vencimento))).toEqual(ordenado);
  });
});

describe('filtra despesas por responsaveis', () => {
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

  test('Verifica se o responsavel é Nala', async () => {
    const parametros = parametrosParaBusca({ responsavel: 'Nala' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.responsavel === 'Nala')).toBe(true);
  });
  test('Verifica se o reponsavel é Alfredo OU Nala', async () => {
    const parametros = parametrosParaBusca({ responsavel: 'Alfredo,Nala' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.responsavel === 'Alfredo' || item.responsavel === 'Nala')).toBe(true);
  });
});

describe('filtra despesas por Vencimento', () => {
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

  test('busca por vencimento maior ou igual a 03/01/2023 e menor ou igual a 03/01/2024', async () => {
    const parametros = parametrosParaBusca({ datainicio: '2023-01-03', dataFim: '2024-01-03' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => new Date(item.vencimento) >= new Date('2023-01-03') && new Date(item.vencimento) <= new Date('2024-01-03'))).toBe(true);
  });
});

describe('Filtra despesas por situacao', () => {
  beforeAll(async () => {
    await connectDB();
    await cadastrarDespesa(item1);
    await cadastrarDespesa(item2);
  });
  afterAll(async () => {
    await deletarTodasDespesas({});
    await mongoose.disconnect();
  });
  test('Filtra desepesa por situacao pendente', async () => {
    const parametros = parametrosParaBusca({ situacao: 'Pendente' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.situacao === 'Pendente')).toBe(true);
  });
  test('filtra despesa por situacao atrasada OU pendente.', async () => {
    const parametros = parametrosParaBusca({ situacao: 'Atrasada,Pendente' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.situacao === 'Atrasada' || item.situacao === 'Pendente'));
  });
});

describe('filtra despesas por idComumParcelas', () => {
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
  test('Filtra despesas por idComumParcelas igual a "1"', async () => {
    const parametros = parametrosParaBusca({ idComumParcelas: '1' });
    const response = await buscaPorParametro(parametros);
    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.idComumParcelas === '1')).toBe(true);
  });
  test('Filtra despesas por idComumParcelas igual a "2"', async () => {
    const parametros = parametrosParaBusca({ idComumParcelas: '2' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.idComumParcelas === '2')).toBe(true);
  });
});

describe('filtra despesas por categoria', () => {
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
  test('Filtra despesas por categoria igual a eletronicos', async () => {
    const parametros = parametrosParaBusca({ categoria: 'eletronicos' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.categoria === 'eletronicos')).toBe(true);
  });
  test('Filtra despesas por categoria igual a Pet', async () => {
    const parametros = parametrosParaBusca({ categoria: 'Pet' });
    const response = await buscaPorParametro(parametros);

    expect(response.length).toBeGreaterThan(0);
    expect(response.every((item) => item.categoria === 'Pet')).toBe(true);
  });
});
