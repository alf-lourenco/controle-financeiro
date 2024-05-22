const { criaDataFim, parametrosParaBusca } = require('../src/util/criaParametrosBusca');

describe('teste para a funcao parametrosBusca', () => {
  test('Busca despesas Atradas ou Pendentes, datas definidas', () => {
    const exemplo = { situacao: new RegExp(/(Atrasada|Pendente)/, 'i'), vencimento: { $gte: '2024-01-31', $lte: '2024-06-10' } };
    const response = parametrosParaBusca('2024-01-31', '2024-06-10', 'Atrasada', 'Pendente');
    expect(response).toEqual(exemplo);
  });
  test('busca despesas Atrasadas ou Pendentes, data padrão', () => {
    const exemplo = { situacao: new RegExp(/(Atrasada|Pendente)/, 'i'), vencimento: { $lte: criaDataFim() } };
    const response = parametrosParaBusca('', '', 'Atrasada', 'Pendente');
    expect(response).toEqual(exemplo);
  });
  test('Busca despesas pendentes, datas definidas', () => {
    const exemplo = { situacao: new RegExp('Pendente'), vencimento: { $gte: '2024-01-01', $lte: '2024-12-31' } };
    const response = parametrosParaBusca('2024-01-01', '2024-12-31', 'Pendente');
    expect(response).toMatchObject(exemplo);
  });
  test('busca despesa pendente, data padrão', () => {
    const exemplo = { situacao: new RegExp('Penden') };
    const response = parametrosParaBusca('', '', 'Pendente');
    console.log('response ', response);
    expect(response).toMatchObject(exemplo);
  });
});
