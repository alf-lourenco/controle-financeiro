const router = require('./despesas.routes');

const AppRoutes = (app) => {
  app.use('/despesa', router);
};
module.exports = AppRoutes;
