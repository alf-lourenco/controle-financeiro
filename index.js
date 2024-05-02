require('dotenv').config();

const express = require('express');
const app = express();

const main = require('./src/db/connectDB.js');
const AppRoutes = require('./src/routers/index.routes.js');

app.use(express.json());
AppRoutes(app);
main();
const server = app.listen(process.env.PORT, () => console.log(`Servidor online!`));
