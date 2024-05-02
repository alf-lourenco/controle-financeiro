const { default: mongoose } = require('mongoose');
const main = require('../src/db/connectDB.js');

require('dotenv').config();

describe('Teste de conexao com o banco', () => {
  test('Conexao com DB', async () => {
    await main();
    expect(mongoose.connection.readyState).toEqual(1);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});