'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

// const findPets = require('./modules/pets');


app.get('/', (req, res) => {
  res.send('Hola. Your default endpoint is working');
});

// app.get('/pets', findPets);



app.listen(PORT, () => console.log(`listening on ${PORT}`));
