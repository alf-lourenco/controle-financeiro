const Despesa = require('../../model/Despesas');

const buscaPorParametro = async (parametro) => {
  return await Despesa.find(parametro).sort('vencimento');
};
module.exports = buscaPorParametro;
