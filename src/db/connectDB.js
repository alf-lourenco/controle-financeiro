const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.URL_DB);
    console.log('Conectado');
  } catch (error) {
    console.log('Erro na conexão com o Banco \n ' + error);
  }
}

module.exports = connectDB;
