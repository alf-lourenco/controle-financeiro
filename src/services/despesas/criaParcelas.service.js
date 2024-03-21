const { v4: uuidv4 } = require('uuid');
const criaData = require('../../util/criaData');
const calculaDataFutura = require('../../util/calculaDataFutura');
const arraySituacaoParcela = require('./arraySituacaoParcela.service');

function criaParcelas(body, idComum) {
  if (idComum === '') {
    idComum = uuidv4();
  }
  const todasParcelas = [];
  const { vencimento, atrasada, finalizada, pendente, parcelas, situacao } = body;
  const situacaoParcela = arraySituacaoParcela(atrasada, finalizada, pendente);
  const [diaInicio] = vencimento.split('/');
  let dataFormatada = criaData(vencimento);

   for (let i = 1; i <= parcelas; i++) {
    let situacaoAtualizada = situacaoParcela[i - 1];

    let parcela = { ...body, idComumParcelas: idComum };
    parcela.parcelas = i;
    parcela.vencimento = dataFormatada;
    parcela.situacao = situacaoAtualizada !== undefined ? situacaoAtualizada : situacao;
    todasParcelas.push(parcela);
    dataFormatada = calculaDataFutura(dataFormatada, diaInicio);
  }
  return todasParcelas;
}

module.exports = criaParcelas;
