const despesasControllers = require('../controllers/despesasController.js');
const validarBodyMiddleware = require('../middleware/validarBody.middlewares.js');
const despesa = require('express').Router();

despesa.post('/', validarBodyMiddleware, despesasControllers.create);
despesa.get('/todas', despesasControllers.getAll);
despesa.delete('/', despesasControllers.deleteAll);
despesa.get('/pendenteseatrasadas', despesasControllers.getAtrasadaPendente);
despesa.get('/pendentes', despesasControllers.getAllPendentes);

module.exports = despesa;
