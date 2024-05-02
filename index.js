require('dotenv').config();

const express = require('express');
const app = express();

const connectdb = require('./src/db/connectDB.js');
const AppRoutes = require('./src/routers/index.routes.js');

app.use(express.json());

async function main() {
  AppRoutes(app);
  await connectdb();
  app.listen(process.env.PORT, () => console.log(`Servidor online!`));
}
main();
