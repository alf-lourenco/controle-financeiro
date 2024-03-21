function arraySituacaoParcela(qtdAtrasada = 0, qtdFinalizada = 0, qtdPendente = 0) {
  const situacoesPossiveis = [
    ['Atrasada', qtdAtrasada],
    ['Finalizada', qtdFinalizada],
    ['Pendente', qtdPendente],
  ];
  const situacao = [];
  let loops = 0;
  while (loops < 3) {
    for (let i = 0; i < situacoesPossiveis[loops][1]; i++) {
      situacao.push(situacoesPossiveis[loops][0]);
    }
    loops++;
  }
  return situacao;
}
module.exports = arraySituacaoParcela;
