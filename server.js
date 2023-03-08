'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyUser = require('./authorize');
const getPets = require('./modules/pets');
const petHandler = require('./modules/handlePets');

const app = express();
app.use(cors({
  origin: '*',
}));

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

//! all users will be able to search adoptable pets using this route.
app.get('/getpet', getPets);

// only verified vusers will be able to CRUD a "favorite" pet.
app.use(verifyUser);
app.get('/pets', petHandler.getPets);
app.post('/pets', petHandler.postPets);
app.delete('/pets/:id', petHandler.deletePets);
app.put('/pets/:id', petHandler.putPets);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
