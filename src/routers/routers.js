const {despesasControllers} = require('../controllers/despesasController.js');
const router = require('express').Router();

router.post('/despesa', async (req, res) => {
  despesasControllers.create(req, res);
});
router.get('/despesa', async (req, res) => {
  despesasControllers.getAll(req, res);
});
router.delete('/despesa', async (req, res) => {
  despesasControllers.deleteAll(req, res);
});

module.exports = router;
