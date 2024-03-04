const Despesa = require('../model/Despesas.js');

async function cadastrarDespesa(despesa) {
  return await Despesa.create(despesa);
}
async function listarTodos() {
  return await Despesa.find();
}
const despesasControllers = {
  create: async (req, res) => {
    try {
      const response = await cadastrarDespesa(req.body);
      res.status(201).json({ msg: 'Operação realizada com sucesso', response });
    } catch (error) {
      console.log(error);
      res.status(500).send('Não foi possivel criar despesas. Verifique os valores digitados');
    }
  },

  getAll: async (req, res) => {
    try {
      const response = await listarTodos();
      res.json(response);
    } catch (error) {
      res.status(500).send('Não foi possivel realizar a operação.');
    }
  },
};

module.exports = { despesasControllers, cadastrarDespesa, listarTodos };
