function criaDataInicio(value) {
  if (value === '' || value === undefined) {
    const dataInicio = new Date();
    dataInicio.setUTCDate(1);
    return `${dataInicio.getFullYear()}-${dataInicio.getUTCMonth() + 1}-${dataInicio.getUTCDate()}`;
  }
  return value;
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
module.exports = { criaDataInicio, criaDataFim };
