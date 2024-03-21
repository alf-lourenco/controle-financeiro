const arraySituacaoParcela = require('../src/services/despesas/arraySituacaoParcela.service');

describe('Array com status das parcelas', () => {
  test('Cria array com os possiveis status das parcelas', () => {
    const situacao = arraySituacaoParcela(2, 2, 2);
    expect(situacao.length).toBe(6);
  });
});
