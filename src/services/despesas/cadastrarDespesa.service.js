const verificacaoSituacao = require('../../util/verificacaoSituacao');
const { v4: uuidv4 } = require('uuid');
const validarData = require('../../util/validarData');
const Despesa = require('../../model/Despesas');
const { AppError } = require('../../errors/appErrors');

async function cadastrarDespesa(body) {
  const { vencimento, atrasada, finalizada, pendente, nomeProduto, parcelas } = body;
  const [dia, mes, ano] = vencimento.split('/');
  let dataFormatada = new Date(`${ano}-${mes}-${dia}`);
  if (dataFormatada.toDateString() === 'Invalid Date') throw 'Data inválida';
  const idComum = uuidv4();
  const diaInicio = dia;

  let parcelaAtrasada = atrasada;
  let parcelaFinalizada = finalizada;
  let parcelaPendente = pendente;

  for (let i = 1; i <= parcelas; i++) {
    let situacao = verificacaoSituacao(parcelaAtrasada, parcelaFinalizada, parcelaPendente);

    let parcela = { ...body, IdComumParcelas: idComum };
    parcela.parcelas = i;
    parcela.vencimento = dataFormatada.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    parcela.situacao = situacao;
    switch (situacao) {
      case 'Atrasada':
        parcelaAtrasada--;
        break;
      case 'Finalizada':
        parcelaFinalizada--;
        break;
      case 'Pendente':
        parcelaPendente--;
        break;

      default:
        break;
    }

    try {
      await Despesa.create(parcela);
      dataFormatada = validarData(dataFormatada, diaInicio);
    } catch (error) {
      throw new AppError();
    }
  }
  return 'Cadastro realizado com sucesso';
}

module.exports = cadastrarDespesa;
