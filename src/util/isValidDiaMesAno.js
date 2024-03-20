function isValidDiaMesAno(dataVencimento) {
  const [dia, mes, ano] = dataVencimento.split('/');
  diaValido = Number(dia);
  mesValido = Number(mes);
  anoValido = Number(ano);

  if (diaValido > 0 && diaValido <= 31 && mesValido >= 1 && mesValido <= 12 && anoValido > 0) {
    return true;
  }
  return false;
}
module.exports = isValidDiaMesAno;
