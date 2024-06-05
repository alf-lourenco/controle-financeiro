const Despesa = require('../../model/Despesas');
const { AppError } = require('../../errors/appErrors');
const criaParcelas = require('./criaParcelas.service');

async function cadastrarDespesa(body, idComumParcelas = '') {
  let parcelas = criaParcelas(body, idComumParcelas);

  try {
    await Despesa.insertMany(parcelas);
    return 'Cadastro realizado com sucesso';
  } catch (error) {
    throw error;
  }
}

module.exports = cadastrarDespesa;
