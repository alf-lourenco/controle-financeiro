function criaPropriedade(value) {
  if (value) return (value = new RegExp(value.replace(',', '|'), 'i'));
}
function removePropUndefined(objeto) {
  const response = { ...objeto };
  for (let prop in response) {
    if (response[prop] === undefined) delete response[prop];
  }
  return response;
}
function criaPropriedadeVencimento(dataInicio, dataFim) {
  if (dataInicio || dataFim) {
    const vencimento = {};

    if (dataInicio) vencimento['$gte'] = dataInicio;
    if (dataFim) vencimento['$lte'] = dataFim;

    return vencimento;
  }
}

function parametrosParaBusca(value) {
  const { situacao, dataInicio, dataFim, idComumParcelas, categoria, responsavel } = value;
  const parametros = {
    situacao: criaPropriedade(situacao),
    responsavel: criaPropriedade(responsavel),
    categoria: criaPropriedade(categoria),
    vencimento: criaPropriedadeVencimento(dataInicio, dataFim),
    idComumParcelas: idComumParcelas,
  };
  const response = removePropUndefined(parametros);
  return response;
}
module.exports = parametrosParaBusca;
