const calculaDataFutura = (atual, diaInicio) => {
  let dataAtual = new Date(atual);
  let dataFutura = new Date(atual);

  dataFutura.setUTCMonth(dataAtual.getUTCMonth() + 1);
  dataFutura.setUTCDate(diaInicio);
  const dataFuturaExcedeUmMes = dataFutura.getUTCMonth() - dataAtual.getUTCMonth() > 1;

  if (dataFuturaExcedeUmMes) {
    dataFutura.setUTCMonth(dataAtual.getUTCMonth() + 1);
    dataFutura.setUTCDate(0);
  }
  return dataFutura;
};
module.exports = calculaDataFutura;
