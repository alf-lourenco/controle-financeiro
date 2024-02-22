const Despesa = require('../model/Despesas.js');

async function cadastrarDespesa(despesa) {
  return await Despesa.create(despesa);
}
async function listarTodos() {
  try {
    return await Despesa.find();
    
  } catch (error) {
    return error
  }
}
const despesasControllers = {
  creat: async (req, res) => {
    try {
      const response = await cadastrarDespesa(req.body);
      res.json({ msg: 'Operação realizada com sucesso', response });
    } catch (error) {
      res.json(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const response = await listarTodos();
      res.json(response);
    } catch (error) {
      res.send('Erro' + error);
    }
  },
};

module.exports = { despesasControllers, cadastrarDespesa,listarTodos };
