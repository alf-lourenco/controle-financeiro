const Ajv = require('ajv');
const { AppError } = require('../errors/appErrors');
const ajv = new Ajv();

const validarBodyMiddleware = (req, res, next) => {
  
  const schema = {
    type: 'object',
    properties: {
      nomeProduto: { type: 'string' },
      categoria: { type: 'string' },
      parcelas: { type: 'number' },
      atrasada: { type: 'number' },
      pendente: { type: 'number' },
      finalizada: { type: 'number' },
    },
    required: ['nomeProduto'],
  };
  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    throw new AppError(401, 'Informações invalidas.');
  }
  next();
};
module.exports = validarBodyMiddleware;
