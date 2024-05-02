const Despesa = require('../../model/Despesas');

const deletaPorParcialIdComum = async (idComum) => {
  return await Despesa.deleteMany({ idComumParcelas: new RegExp(idComum, 'i') });
};

module.exports = deletaPorParcialIdComum;
