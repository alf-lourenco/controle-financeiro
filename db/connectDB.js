const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect('mongodb+srv://root:admin13@cluster0.w8qusu6.mongodb.net/mentoria?retryWrites=true&w=majority');
  } catch (error) {
    console.log('Erro na conecxão com o Banco \n ' + error);
  }
}

module.exports = main;
