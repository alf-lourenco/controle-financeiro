require('dotenv').config();

const { default: mongoose } = require('mongoose');
const { cadastrarDespesa, listarTodos, despesasControllers, deletarTodos } = require('../src/controllers/despesasController.js');
const main = require('../src/db/connectDB.js');
const Despesa = require('../src/model/Despesas.js');
describe('Crud', () => {
  beforeAll(async () => {
    await main();
    await Despesa.deleteMany({});
  });
  afterAll(async () => {
    // await Despesa.deleteMany({});
    await mongoose.disconnect();
  });
  test('Listar Banco vazio', async () => {
    const resp = await listarTodos();
    expect(resp.length > 0).toBe(false);
  });
  test('Criar despesa Situacao:Pendente', async () => {
    const despesa = {
      item: 'Notebook',
      categoria: 'eletronicos',
      valor: 90,
      parcelas: 5,
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
      item: 'Notebook',
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
  test('Criar despesa com Status: Atrasada, Finalizada, Pendente', async () => {
    const despesa = {
      item: 'Notebook',
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
    const resp = await cadastrarDespesa(despesa, 'ok-1');
    const atrasada = await Despesa.find({ comum: 'ok-1', situacao: 'Atrasada' });
    const finalizada = await Despesa.find({ comum: 'ok-1', situacao: 'Finalizada' });
    const pendente = await Despesa.find({ comum: 'ok-1', situacao: 'Pendente' });

    expect(atrasada.length).toBe(1);
    expect(finalizada.length).toBe(2);
    expect(pendente.length).toBe(2);
  });
  test('Deletar dados', async () => {
    const resp = await deletarTodos();
    expect(resp).toHaveProperty("acknowledged")
  });
});
