const despesasControllers = require('../controllers/despesasController.js');
const validarBodyMiddleware = require('../middleware/validarBody.middlewares.js');
const despesa = require('express').Router();

despesa.post('/', validarBodyMiddleware, despesasControllers.create);
despesa.get('/', despesasControllers.getDespesas);
despesa.delete('/', despesasControllers.deleteAll);

module.exports = despesa;
