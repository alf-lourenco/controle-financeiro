const { criaDataFim, parametrosParaBusca } = require('../src/util/criaParametrosBusca');

describe('teste para a funcao parametrosBusca', () => {
  test('Busca despesas Atradas ou Pendentes, datas definidas', () => {
    const exemplo = { situacao: new RegExp(/(Atrasada|Pendente)/, 'i'), vencimento: { $gte: '2024-01-31', $lte: '2024-06-10' } };
    const response = parametrosParaBusca(['Atrasada', 'Pendente'], '2024-01-31', '2024-06-10');
    expect(response).toEqual(exemplo);
  });
  test('busca despesas Atrasadas ou Pendentes, data padrão', () => {
    const exemplo = { situacao: new RegExp(/(Atrasada|Pendente)/, 'i'), vencimento: { $lte: criaDataFim() } };
    const response = parametrosParaBusca(['Atrasada', 'Pendente']);
    expect(response).toEqual(exemplo);
  });
  test('Busca despesas pendentes, datas definidas', () => {
    const exemplo = { situacao: new RegExp('Pendente'), vencimento: { $gte: '2024-01-01', $lte: '2024-12-31' } };
    const response = parametrosParaBusca(['Pendente'], '2024-01-01', '2024-12-31');
    expect(response).toMatchObject(exemplo);
  });
  test('busca despesa pendente, data padrão', () => {
    const exemplo = { situacao: new RegExp('Penden') };
    const response = parametrosParaBusca(['Pendente']);
    expect(response).toMatchObject(exemplo);
  });
});
