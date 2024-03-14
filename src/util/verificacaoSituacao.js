const verificacaoSituacao = (atrasada, finalizada, pendente) => {
  if (atrasada > 0) {
    atrasada--;
    return 'Atrasada';
  } else if (finalizada > 0) {
    finalizada--;
    return 'Finalizada';
  } else if (pendente > 0) {
    pendente--;
    return 'Pendente';
  }
};
module.exports = verificacaoSituacao;
