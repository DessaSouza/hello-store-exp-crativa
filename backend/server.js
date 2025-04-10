const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const db = require('./src/models/db');
const productRoutes = require('./src/routes/productsRoutes');

const PORT = 3000;

app.use(cors());
app.use(express.json()); // é pra deixar o JSON no body das requisições

//testar as rotas
app.get('/', (req, res) => {
  res.send('API da Hello Store está online!');
});

app.use('/api/produtos', productRoutes);

//iniciar o server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
