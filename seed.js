'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const Animal = require('./model/animal');

const seed = async () => {

  await Animal.create({
    name: 'Susi',
    type: 'Greyhound',
    description: 'Cute',
  })
    .then(animal => console.log(`saved ${animal} to database`))
    .catch(error => console.error(error));

  await Animal.create({
    name: 'Lulu',
    type: 'Bunny',
    description: 'Super cute',
  })
    .then(animal => console.log(`saved ${animal} to database`))
    .catch(error => console.error(error));

  await Animal.create({
    name: 'Pez',
    type: 'Fish',
    description: 'Accidentally killed wiht hot water.',
  })
    .then(animal => console.log(`saved ${animal} to database`))
    .catch(error => console.error(error));

  mongoose.disconnect();

};


seed();




