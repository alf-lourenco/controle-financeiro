const buscaPorParametro = require('../services/despesas/buscaPorParametro.service.js');
const cadastrarDespesa = require('../services/despesas/cadastrarDespesa.service.js');
const deletarTodasDespesas = require('../services/despesas/deletarTodasDespesas.service.js');
const parametrosParaBusca = require('../util/criaParametrosBusca.js');
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
      return res.status(500).send(`Não foi possivel criar despesas. ${error.message}`);
    }
  },

  getDespesas: async (req, res) => {
    try {
      const parametros = parametrosParaBusca(req.body);
      const response = await buscaPorParametro(parametros);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).send(`Não foi possível realizar a operação: ${error.message}`);
    }
  },

  deleteAll: async (req, res) => {
    try {
      const response = await deletarTodasDespesas();
      return res.status(200).send('Arquivos deletados com sucesso');
    } catch (error) {
      return res.status(500).send(`Não foi possível realizar a operação: ${error.message}`);
    }
  },
};

module.exports = despesasControllers;
