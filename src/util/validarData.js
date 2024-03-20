function validarData(dia, mes, ano) {
  const dataFormatada = new Date(`${ano}-${mes}-${dia}`);
  if (dataFormatada.toDateString() === 'Invalid Date') throw 'Data inválida';
  return dataFormatada;
}
module.exports = validarData;
