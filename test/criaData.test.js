const criaData = require('../src/util/criaData');

describe('Criacao de data', () => {
  test('Cria data', () => {
    const data = '31/12/2023';
    const dataCriada = criaData(data);
    expect(dataCriada).toBeDefined();
  });
});
