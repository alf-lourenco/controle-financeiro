function parametrosParaBusca(status, data = []) {
  console.log('data ', !data.includes(undefined) && !data.includes(''));
  const parametros = {
    situacao: new RegExp('(' + status[0] + '|' + status[1] + ')', 'i'),
  };

  if (!data.includes(undefined) && !data.includes('') && data.length > 0) {
    parametros.vencimento = { $gte: data[0], $lte: data[1] };
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
