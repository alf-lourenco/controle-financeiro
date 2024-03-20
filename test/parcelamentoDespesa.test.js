require('dotenv').config();

const { default: mongoose } = require('mongoose');
const main = require('../src/db/connectDB.js');
const Despesa = require('../src/model/Despesas.js');
const deletarTodasDespesas = require('../src/services/despesas/deletarTodasDespesas.service.js');
const listarDespesas = require('../src/services/despesas/listarDespesa.service.js');
const cadastrarDespesa = require('../src/services/despesas/cadastrarDespesa.service.js');

describe('Crud', () => {
  beforeAll(async () => {
    await main();
    await deletarTodasDespesas();
  });
  afterAll(async () => {
    await deletarTodasDespesas();
    await mongoose.disconnect();
  });
  
  test('Criar despesa Situacao:Pendente', async () => {
    const despesa = {
      nomeProduto: 'Notebook',
      categoria: 'eletronicos',
      valor: 90,
      parcelas: 1,
      responsavel: 'Alfredo',
      vencimento: '25/02/2024',
      descricao: 'Novo notebook, parcelado em infinitas vezes',
      situacao: 'Pendente',
    };
    const resp = await cadastrarDespesa(despesa);
    expect(resp).toBe('Cadastro realizado com sucesso');
  });
  test('Criar despesa Finalizada', async () => {
    const despesa = {
      nomeProduto: 'Notebook',
      categoria: 'eletronicos',
      valor: 90,
      parcelas: 5,
      responsavel: 'Alfredo',
      vencimento: '25/02/2024',
      descricao: 'Novo notebook, parcelado em infinitas vezes',
      situacao: 'Finalizada',
    };
    const resp = await cadastrarDespesa(despesa);
    expect(resp).toBe('Cadastro realizado com sucesso');
  });

  test('Criar uma despesa com parcelas contendo as situacoes: Atrasada, Finalizada, Pendente', async () => {
    const despesa = {
      nomeProduto: 'Notebook teste',
      categoria: 'eletronicos',
      valor: 90,
      parcelas: 5,
      responsavel: 'Alfredo',
      vencimento: '31/03/2024',
      descricao: 'Novo notebook, parcelado em infinitas vezes',
      atrasada: 1,
      pendente: 2,
      finalizada: 2,
      situacao: 'Finalizada',
    };
    const resp = await cadastrarDespesa(despesa);
    const atrasada = await Despesa.find({ nomeProduto: 'Notebook teste', situacao: 'Atrasada' });
    const finalizada = await Despesa.find({ nomeProduto: 'Notebook teste', situacao: 'Finalizada' });
    const pendente = await Despesa.find({ nomeProduto: 'Notebook teste', situacao: 'Pendente' });

    expect(atrasada.length).toBe(1);
    expect(finalizada.length).toBe(2);
    expect(pendente.length).toBe(2);
  });
  test('Deletar dados', async () => {
    const resp = await deletarTodasDespesas();
    expect(resp).toHaveProperty('acknowledged');
  });
});
