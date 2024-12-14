const express = require('express')
const { getConection } = require('./db/db-connect-mongo')
const cors = require('cors');
require('dotenv').config();

const app = express()
const port = process.env.PORT;

// implementamos cors
app.use(cors());

getConection();

//Parseo JSON
app.use(express.json());

app.use('/cliente', require('./router/cliente'));
app.use('/etapa', require('./router/etapa'));
app.use('/tipoProyecto', require('./router/tipoProyecto'));
app.use('/universidad', require('./router/universidad'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})