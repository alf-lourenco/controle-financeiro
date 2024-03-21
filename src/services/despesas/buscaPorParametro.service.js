const Despesa = require('../../model/Despesas');

const buscaPorParametro = async (parametro) => {
  return await Despesa.find(parametro);
};
module.exports = buscaPorParametro;
