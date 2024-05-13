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
    const novaRegex = new RegExp(/(Atrasada|Pendente)/i); // Corrigindo a expressão regular
    console.log(novaRegex);
    // const amostra = [
    //   {
    //     _id: '65fc70906691f7740ab517db',
    //     nomeProduto: 'notebook',
    //     categoria: 'eletronicos',
    //     valor: 900,
    //     parcelas: 2,
    //     responsavel: 'Alfredo',
    //     vencimento: '2025-04-30T00:00:00.000Z',
    //     descricao: 'Novo notebook, parcelado em infinitas vezes',
    //     situacao: 'atrasada',
    //     idComumParcelas: 'c851467c-378e-4132-af8f-823ef6859c67',
    //     createdAt: '2024-03-21T17:38:24.728Z',
    //     updatedAt: '2024-03-21T17:38:24.728Z',
    //   },
    //   {
    //     _id: '65fc70906691f7740ab517db',
    //     nomeProduto: 'notebook',
    //     categoria: 'eletronicos',
    //     valor: 900,
    //     parcelas: 2,
    //     responsavel: 'Alfredo',
    //     vencimento: '2025-04-30T00:00:00.000Z',
    //     descricao: 'Novo notebook, parcelado em infinitas vezes',
    //     situacao: 'Pendente',
    //     idComumParcelas: 'c851467c-378e-4132-af8f-823ef6859c67',
    //     createdAt: '2024-03-21T17:38:24.728Z',
    //     updatedAt: '2024-03-21T17:38:24.728Z',
    //   },
    // ];
    //   const despesas = await buscaDespesaAtrasadaOuPendente(){

    // }
    const amostra = await buscaPorParametro({ situacao: novaRegex });
    amostra.forEach((item) => {
      expect(novaRegex.test(item.situacao)).toBe(true); // Testando se a situação corresponde à nova regex
    });
  });
});
