const despesasControllers = require('../controllers/despesasController.js');
const validarBodyMiddleware = require('../middleware/validarBody.middlewares.js');
const despesa = require('express').Router();

despesa.post('/', validarBodyMiddleware, async (req, res) => {
  despesasControllers.create(req, res);
});
despesa.get('/todas', async (req, res) => {
  despesasControllers.getAll(req, res);
});
despesa.delete('/', async (req, res) => {
  despesasControllers.deleteAll(req, res);
});
despesa.get('/pendentes', async (req, res) => {
  despesasControllers.getAtrasadaPendente(req, res);
});

module.exports = despesa;
