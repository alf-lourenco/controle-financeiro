const mongoose = require('mongoose');

const despesas = new mongoose.Schema(
  {
    nomeProduto: {
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
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    situacao: {
      type: String,
      default: 'Pendente',
      enum: ['Pendente', 'Atrasada', 'Finalizada'],
    },
    comum: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Despesa = mongoose.model('controleFinanceiro', despesas);
module.exports = Despesa;
