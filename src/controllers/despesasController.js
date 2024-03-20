const cadastrarDespesa = require('../services/despesas/cadastrarDespesa.service.js');
const deletarTodasDespesas = require('../services/despesas/deletarTodasDespesas.service.js');
const listarDespesas = require('../services/despesas/listarDespesa.service.js');

const despesasControllers = {
  create: async (req, res) => {
    try {
      const response = await cadastrarDespesa(req.body);
      res.status(201).json({ response });
    } catch (error) {
      console.log(error);
      res.status(500).send(`Não foi possivel criar despesas. ${error}`);
    }
  },

  getAll: async (req, res) => {
    try {
      const response = await listarDespesas();
      res.json(response);
    } catch (error) {
      res.status(500).send('Não foi possivel realizar a operação.');
    }
  },
  deleteAll: async (req, res) => {
    try {
      const response = await deletarTodasDespesas();
      res.send('Arquivos deletados com sucesso');
    } catch (error) {
      res.status(500).send('Não foi possivel realizar a operação.');
    }
  },
};

module.exports = despesasControllers;
