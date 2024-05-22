const buscaPorParametro = require('../services/despesas/buscaPorParametro.service.js');
const cadastrarDespesa = require('../services/despesas/cadastrarDespesa.service.js');
const deletarTodasDespesas = require('../services/despesas/deletarTodasDespesas.service.js');
const listarDespesas = require('../services/despesas/listarDespesa.service.js');
const { parametrosParaBusca } = require('../util/criaParametrosBusca.js');
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
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).send('Não foi possivel realizar a operação.');
    }
  },
  getAtrasadaPendente: async (req, res) => {
    try {
      const parametros = parametrosParaBusca(['Atrasada', 'Pendente'], [req.body.dataInicio, req.body.dataFim]);
      const response = await buscaPorParametro(parametros);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ msg: 'Não foi possivel realizar a operação', erro: error.message });
    }
  },
  getAllPendentes: async (req, res) => {
    try {
      const { dataFim, dataInicio } = req.body;
      const parametros = parametrosParaBusca(['Pendente'], [dataInicio, dataFim]);
      const response = await buscaPorParametro(parametros);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ msg: 'Não foi possivel realizar a operação', erro: error.message });
    }
  },
  deleteAll: async (req, res) => {
    try {
      const response = await deletarTodasDespesas();
      return res.status(201).send('Arquivos deletados com sucesso');
    } catch (error) {
      return res.status(500).send('Não foi possivel realizar a operação.');
    }
  },
};

module.exports = despesasControllers;
