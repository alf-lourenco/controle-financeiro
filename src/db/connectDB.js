const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect(process.env.URL_DB);
console.log("Conectado");

    // if (mongoose.connection.readyState === 1) console.log('conectado ao banco');
  } catch (error) {
    console.log('Erro na conecxão com o Banco \n ' + error);
  }
}

module.exports = main;
