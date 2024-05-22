function parametrosParaBusca(status, dataInicio = '', dataFim = '') {
  const parametros = {
    situacao: new RegExp('(' + status[0] + '|' + status[1] + ')', 'i'),
  };

  if (dataInicio !== '' && dataFim !== '') {
    parametros.vencimento = { $gte: dataInicio, $lte: dataFim };
    return parametros;
  } else if (status.includes('Atrasada')) {
    parametros.vencimento = { $lte: criaDataFim() };
    return parametros;
  } else {
    return parametros;
  }
}
function criaDataFim() {
  const dataFim = new Date();
  dataFim.setUTCMonth(dataFim.getUTCMonth() + 1);
  dataFim.setUTCDate(0);
  return `${dataFim.getFullYear()}-${dataFim.getUTCMonth() + 1}-${dataFim.getUTCDate()}`;
}
module.exports = { parametrosParaBusca, criaDataFim };
