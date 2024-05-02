require('dotenv').config();
const { default: mongoose } = require('mongoose');
const main = require('../src/db/connectDB.js');
const Despesa = require('../src/model/Despesas.js');
const cadastrarDespesa = require('../src/services/despesas/cadastrarDespesa.service.js');
const deletaPorParcialIdComum = require('../src/services/despesas/deletaPorParcialIdComum.service.js');

describe('Crud', () => {
  beforeAll(async () => {
    await main();
    await deletaPorParcialIdComum('test');
  });
  afterAll(async () => {
    await deletaPorParcialIdComum('test');
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
    const resp = await cadastrarDespesa(despesa, 'test03');
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
    const resp = await cadastrarDespesa(despesa, 'test04');
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
    const resp = await cadastrarDespesa(despesa, 'test01');
    const atrasada = await Despesa.find({ nomeProduto: 'Notebook teste', situacao: 'Atrasada', idComumParcelas: 'test01' });
    const finalizada = await Despesa.find({ nomeProduto: 'Notebook teste', situacao: 'Finalizada', idComumParcelas: 'test01' });
    const pendente = await Despesa.find({ nomeProduto: 'Notebook teste', situacao: 'Pendente', idComumParcelas: 'test01' });

    expect(atrasada.length).toBe(1);
    expect(finalizada.length).toBe(2);
    expect(pendente.length).toBe(2);
  });
});
