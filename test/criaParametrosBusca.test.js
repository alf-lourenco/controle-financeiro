const parametrosParaBusca = require('../src/util/criaParametrosBusca');

describe('teste para a funcao parametrosBusca', () => {
  test('Busca despesas Atradas ou Pendentes, datas definidas', () => {
    const exemplo = { situacao: { $in: ['Atrasada', 'Pendente'] }, vencimento: { $gte: '2024-01-31', $lte: '2024-06-10' } };
    const response = parametrosParaBusca({ situacao: 'Atrasada,Pendente', dataInicio: '2024-01-31', dataFim: '2024-06-10' });
    expect(response).toEqual(exemplo);
  });
  test('busca despesas Atrasadas ou Pendentes, data nao definida', () => {
    const exemplo = { situacao: { $in: ['Atrasada', 'Pendente'] } };
    const response = parametrosParaBusca({ situacao: 'Atrasada,Pendente' });
    expect(response).toEqual(exemplo);
  });
  test('Busca despesas pendentes, datas definidas', () => {
    const exemplo = { situacao: { $in: ['Pendente'] }, vencimento: { $gte: '2024-01-01', $lte: '2024-12-31' } };
    const response = parametrosParaBusca({ situacao: 'Pendente', dataInicio: '2024-01-01', dataFim: '2024-12-31' });
    expect(response).toMatchObject(exemplo);
  });
  test('busca despesa pendente, data padrão', () => {
    const exemplo = { situacao: { $in: ['Pendente'] } };
    const response = parametrosParaBusca({ situacao: 'Pendente' });
    expect(response).toMatchObject(exemplo);
  });
});
