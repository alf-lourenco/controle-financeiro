const buscaPorParametro = require('../services/despesas/buscaPorParametro.service.js');
const cadastrarDespesa = require('../services/despesas/cadastrarDespesa.service.js');
const deletarTodasDespesas = require('../services/despesas/deletarTodasDespesas.service.js');
const listarDespesas = require('../services/despesas/listarDespesa.service.js');
const criaDataInicio = require('../util/criaDataInicio.js');
const isValidDiaMesAno = require('../util/isValidDiaMesAno.js');
const despesasControllers = {
  create: async (req, res) => {
    try {
      if (!isValidDiaMesAno(req.body.vencimento)) {
        return res.status(400).send('Data inválida. Insira data no formato "dd/mm/aaaa"');
      } else {
        const response = await cadastrarDespesa(req.body);
        return res.status(201).json({ response });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(`Não foi possivel criar despesas. ${error}`);
    }
  },

  getAll: async (req, res) => {
    try {
      const response = await listarDespesas();
      return res.json(response);
    } catch (error) {
      return res.status(500).send('Não foi possivel realizar a operação.');
    }
  },
  getAtrasadaPendente: async (req, res) => {
    let dataInicio = criaDataInicio(req.body.dataInicio);
    let dataFim = new Date();
    dataFim.setUTCMonth(dataFim.getUTCMonth() + 1);
    dataFim.setUTCDate(0);
    try {
      const parametros = {
        situacao: new RegExp(/(Atrasada|Pendente)/i),
        vencimento: {
          $gte: dataInicio,
          $lte: `${dataFim.getFullYear()}-${dataFim.getUTCMonth() + 1}-${dataFim.getUTCDate()}`,
        },
      };
      const response = await buscaPorParametro(parametros);
      return res.json(response);
    } catch (error) {
      return res.status(500).json({msg:'Não foi possivel realizar a operação',erro:error.message});
    }
  },
  deleteAll: async (req, res) => {
    try {
      const response = await deletarTodasDespesas();
      return res.send('Arquivos deletados com sucesso');
    } catch (error) {
      return res.status(500).send('Não foi possivel realizar a operação.');
    }
  },
};

module.exports = despesasControllers;
