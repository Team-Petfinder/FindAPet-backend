'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const handlePets = require('./modules/pets');


const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3002;

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Connected to Mongoose'));



app.get('/', (req, res) => {
  res.send('Hola. Your default endpoint is working');
});

app.get('/pets', handlePets);





app.listen(PORT, () => console.log(`listening on ${PORT}`));
