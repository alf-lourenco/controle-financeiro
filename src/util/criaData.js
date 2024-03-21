const isValidDiaMesAno = require('./isValidDiaMesAno');

function criaData(dataVencimento) {
  if (!isValidDiaMesAno(dataVencimento)) {
    return undefined;
  }
  const [dia, mes, ano] = dataVencimento.split('/');
  const dataFormatada = new Date(`${ano}-${mes}-${dia}`);
  return dataFormatada;
}
module.exports = criaData;
