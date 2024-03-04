const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect(process.env.URL_DB);
    console.log('Conectado');
  } catch (error) {
    console.log('Erro na conexão com o Banco \n ' + error);
  }
}

module.exports = main;
