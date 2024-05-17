function parametrosParaBusca(value1, value2) {
  if (value1 === '' || value2 === '' || value1 === undefined || value2 === undefined) {
    const parametros = {
      situacao: new RegExp(/(Atrasada|Pendente)/i),
      vencimento: {
        $lte: criaDataFim(),
      },
    };
    return parametros;
  }
  const parametros = {
    situacao: new RegExp(/(Atrasada|Pendente)/i),
    vencimento: {
      $gte: value1,
      $lte: value2,
    },
  };
  return parametros;
}
function criaDataFim(value) {
  if (value === '' || value === undefined) {
    const dataFim = new Date();
    dataFim.setUTCMonth(dataFim.getUTCMonth() + 1);
    dataFim.setUTCDate(0);
    return `${dataFim.getFullYear()}-${dataFim.getUTCMonth() + 1}-${dataFim.getUTCDate()}`;
  }

  return value;
}
module.exports = parametrosParaBusca;
