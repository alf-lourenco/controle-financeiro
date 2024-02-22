const mongoose = require('mongoose');

const despesas = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    valor: {
      type: Number,
      required: true,
    },
    responsavel: {
      type: String,
      required: true,
    },
    vencimento: {
      type: Date,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    situacao: {
      type: String,
      default: 'Pendente',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Despesa = mongoose.model('controleFinanceiro', despesas);
module.exports = Despesa;
