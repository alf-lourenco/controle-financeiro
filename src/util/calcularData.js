const calcularData = (date, inicio) => {
  let dataAtual = new Date(date);
  let novaData = new Date(date);

  novaData.setUTCMonth(novaData.getUTCMonth() + 1);
  novaData.setUTCDate(inicio);

  if (novaData.getUTCMonth() - dataAtual.getUTCMonth() > 1) {
    dataAtual.setUTCMonth(dataAtual.getUTCMonth() + 1);
    dataAtual.setUTCDate(0);

    return dataAtual;
  } else {
    return novaData;
  }
};
module.exports = calcularData;