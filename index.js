require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const main = require('./src/db/connectDB.js');

const server = app.listen(port, () => console.log(`Servidor online!`));
main();
console.log(server.readyState);

module.exports = { server, port };
