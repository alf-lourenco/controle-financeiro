require('dotenv').config();
const { default: mongoose } = require('mongoose');
const connectDB = require('../src/db/connectDB');
const buscaPorParametro = require('../src/services/despesas/buscaPorParametro.service');
const parametrosParaBusca = require('../src/util/criaDataInicioEFim');

describe('Filtrar tarefas do mes atual', () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  test('Filtra parcelas atrasadas e pendentes com vencimento no mes atual', async () => {
    const novaRegex = new RegExp(/(Atrasada|Pendente)/i);
    const amostra = await buscaPorParametro({ situacao: novaRegex });
  const situacaoVencimento = new RegExp(/(Atrasada|Pendente)/i);

  test('Filtra parcelas atrasadas e pendentes com vencimento no mes atual ou anterior', async () => {
    const parametros = parametrosParaBusca();
    const amostra = await buscaPorParametro(parametros);
    amostra.forEach((item) => {
      expect(novaRegex.test(item.situacao)).toBe(true);
      const dataFim = new Date(item.vencimento);
      expect(situacaoVencimento.test(item.situacao)).toBe(true);
      expect(dataFim <= new Date(parametros.vencimento.$lte)).toBe(true);
    });
  });

  test('Filtrar parcelas data de inicio: 2024-05-01 e data de fim: 2024-05-31', async () => {
    const parametros = parametrosParaBusca('2024-05-01', '2024-05-31');
    const response = await buscaPorParametro(parametros);
    response.forEach((item) => {
      const data = new Date(item.vencimento);
      const dataInicio = new Date(parametros.vencimento.$gte);
      const dataFim = new Date(parametros.vencimento.$lte);
      const comparacaoDatas = data >= dataInicio || data <= dataFim;
      expect(situacaoVencimento.test(item.situacao)).toBe(true);
      expect(comparacaoDatas).toBe(true);
    });
  });
});
