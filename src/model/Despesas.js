const mongoose = require('mongoose');

const despesas = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },

    valor: {
      type: Number,
      required: true,
    },
    parcelas: {
      type: Number,
      default: 1,
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
    comum: {
      type: String,
    },
    situacao: {
      type: String,
      default: 'Pendente',
      enum: ['Pendente', 'Em atraso', 'Finalizada'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Despesa = mongoose.model('controleFinanceiro', despesas);
module.exports = Despesa;
