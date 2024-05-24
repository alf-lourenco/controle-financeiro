function criaDataFim() {
  const dataFim = new Date();
  dataFim.setUTCMonth(dataFim.getUTCMonth() + 1);
  dataFim.setUTCDate(0);
  return `${dataFim.getFullYear()}-${dataFim.getUTCMonth() + 1}-${dataFim.getUTCDate()}`;
}
module.exports = criaDataFim;
