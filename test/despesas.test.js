require('dotenv').config();

const { default: mongoose } = require('mongoose');
const main = require('../src/db/connectDB.js');
const Despesa = require('../src/model/Despesas.js');
const cadastrarDespesa = require('../src/services/despesas/cadastrarDespesa.service.js');
const buscaPorParametro = require('../src/services/despesas/buscaPorParametro.service.js');

describe('Cria e deleta despesas', () => {
  const idComum = 'test08';
  beforeAll(async () => {
    await main();
  });

  afterAll(async () => {
    await Despesa.deleteMany({ idComumParcelas: idComum });
    await mongoose.disconnect();
  });
  test('Listar parcela com idComum: test08', async () => {
    const resp = await Despesa.find({ idComumParcelas: idComum });
    expect(resp.length).toBeLessThanOrEqual(0);
  });
  test('Criar despesa Pendentes', async () => {
    const despesa = {
      nomeProduto: 'Notebook',
      categoria: 'eletronicos',
      valor: 90,
      parcelas: 5,
      responsavel: 'Alfredo',
      vencimento: '25/02/2024',
      idComumParcelas: idComum,
      descricao: 'Novo notebook, parcelado em infinitas vezes',
      situacao: 'Pendente',
    };
    const resp = await cadastrarDespesa(despesa, idComum);
    expect(resp).toBe('Cadastro realizado com sucesso');
  });

  test('Listar despesas, parametro idComumParcelas: idComum', async () => {
    const resp = await buscaPorParametro('idComumParcelas', idComum);

    expect(resp.length).toBeGreaterThan(0);
  });
});
