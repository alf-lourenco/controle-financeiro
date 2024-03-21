const isValidDiaMesAno = require('../src/util/isValidDiaMesAno');

describe('Verifica se dia,mes e ano são validos', () => {
  test('Data valida', () => {
    const data = '31/12/2024';
    const valid = isValidDiaMesAno(data);
    expect(valid).toBe(true);
  });
  test('Data invalida', () => {
    const data = '32/12/2024';
    const valid = isValidDiaMesAno(data);
    expect(valid).toBe(false);
  });
});
