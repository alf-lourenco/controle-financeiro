const despesasControllers = require('../controllers/despesasController.js');
const validarBodyMiddleware = require('../middleware/validarBody.middlewares.js');
const despesa = require('express').Router();

despesa.post('/', validarBodyMiddleware, async (req, res) => {
  despesasControllers.create(req, res);
});
despesa.get('/', async (req, res) => {
  despesasControllers.getAll(req, res);
});
despesa.delete('/', async (req, res) => {
  despesasControllers.deleteAll(req, res);
});

module.exports = despesa;
