const criaParcelas = require('../src/services/despesas/criaParcelas.service');

describe('Criando parcelas de uma despesa', () => {
  test('cria 5 parcelas da mesma compra', () => {
    const despesa = {
      nomeProduto: 'Notebook',
      categoria: 'eletronicos',
      valor: 90,
      parcelas: 5,
      responsavel: 'Alfredo',
      vencimento: '25/02/2024',
      descricao: 'Novo notebook, parcelado em infinitas vezes',
      situacao: 'Pendente',
    };
    const parcelas = criaParcelas(despesa, 1);
    expect(parcelas.length).toBe(5);
  });
});
