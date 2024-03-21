const Despesa = require('../../model/Despesas');

const deletarTodasDespesas = async () => {
  return await Despesa.deleteMany({});
};
module.exports = deletarTodasDespesas;
