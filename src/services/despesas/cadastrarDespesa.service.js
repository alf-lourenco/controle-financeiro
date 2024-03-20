const verificaSituacao = require('../../util/verificaSituacao');
const { v4: uuidv4 } = require('uuid');
const calcularData = require('../../util/calcularData');
const Despesa = require('../../model/Despesas');
const validarData = require('../../util/validarData');
const { AppError } = require('../../errors/appErrors');

async function cadastrarDespesa(body) {
  const { vencimento, atrasada, finalizada, pendente, nomeProduto, parcelas } = body;
  const [dia, mes, ano] = vencimento.split('/');
  let dataFormatada = validarData(dia, mes, ano);

  const idComum = uuidv4();
  const diaInicio = dia;

  let parcelaAtrasada = atrasada;
  let parcelaFinalizada = finalizada;
  let parcelaPendente = pendente;

  for (let i = 1; i <= parcelas; i++) {
    let situacao = verificaSituacao(parcelaAtrasada, parcelaFinalizada, parcelaPendente);

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
      dataFormatada = calcularData(dataFormatada, diaInicio);
    } catch (error) {
      throw new AppError();
    }
  }
  return 'Cadastro realizado com sucesso';
}

module.exports = cadastrarDespesa;
