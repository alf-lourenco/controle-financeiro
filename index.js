require('dotenv').config();

const express = require('express');
const app = express();

const main = require('./src/db/connectDB.js');
const router = require('./src/routers/routers.js');

app.use(express.json());
app.use('/', router);
main();
const server = app.listen(process.env.PORT, () => console.log(`Servidor online!`));
