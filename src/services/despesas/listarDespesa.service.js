const Despesa = require('../../model/Despesas');

const listarDespesas = async () => {
  return Despesa.find();
};
module.exports = listarDespesas;
