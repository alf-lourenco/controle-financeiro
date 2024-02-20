const { default: mongoose } = require('mongoose');
const main = require('./db/connectDB.js');

describe('fim', () => {
  test('Conexão com db', async () => {
    await main();
    const isConnected = mongoose.connection.readyState;
    expect(isConnected).toEqual(1);
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
});
