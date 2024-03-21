const verificaSituacao = (atrasada, finalizada, pendente) => {
  if (atrasada > 0) {
    return 'Atrasada';
  } else if (finalizada > 0) {
    return 'Finalizada';
  } else if (pendente > 0) {
    return 'Pendente';
  }
};
module.exports = verificaSituacao;
