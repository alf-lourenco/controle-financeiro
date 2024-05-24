const criaDataFim = require('./criaDataFim');

function parametrosParaBusca(status, dataInicio = null, dataFim = null) {
  const parametros = {
    situacao: new RegExp(status.join('|'), 'i'),
    vencimento: validaVencimento(dataInicio, dataFim),
  };
  return parametros;
}
module.exports = parametrosParaBusca;

function validaVencimento(dataInicio, dataFim) {
  const vencimento = {};
  if (!dataInicio && !dataFim) {
    vencimento['$lte'] = criaDataFim();
    return vencimento;
  }
  if (dataInicio) vencimento['$gte'] = dataInicio;
  if (dataFim) vencimento['$lte'] = dataFim;
  return vencimento;
}
