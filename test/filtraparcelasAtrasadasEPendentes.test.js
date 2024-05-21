require('dotenv').config();

const { default: mongoose } = require('mongoose');
const connectDB = require('../src/db/connectDB');
const buscaPorParametro = require('../src/services/despesas/buscaPorParametro.service');

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
    amostra.forEach((item) => {
      expect(novaRegex.test(item.situacao)).toBe(true);
    });
  });
});
