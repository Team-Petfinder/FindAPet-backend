'use strict';

// require('dotenv').config();
const axios = require('axios');
const cache = require('../cache');

const getToken = async (req, res, next) => {
  let url = `https://api.petfinder.com/v2/oauth2/token`;
  const config = {
    'grant_type': 'client_credentials',
    'client_id': process.env.CLIENT_API,
    'client_secret': process.env.SECRET_KEY
  };
  let response = await axios.post(url, config);
  console.log(response.data);
  cache['key'] = response.data.access_token;
  cache['timestamp'] = Date.now();
};


const getPets = (req, res, next) => {

  //query parameters
  const type = req.query.type;
  const age = req.query.age;
  const size = req.query.size;
  const location = req.query.location;
  const distance = req.query.distance;
  const goodWithChildren = req.query.good_with_children;
  const goodWithDogs = req.query.good_with_dogs;
  const goodWithCats = req.query.good_with_cats;

  let url = `https://api.petfinder.com/v2/animals?status=adoptable&type=${type}&age=${age}&size=${size}&location=${location}&distance=${distance}`;

  if (cache.key && (Date.now() - cache.timestamp < 3600000)) {
    console.log(`cache hit - sending cached data`);
    const config = {
      headers: { 'Authorization': `Bearer ${cache.key}` }
    };
    axios.get(url, config)
      .then(response => {
        const formattedPet = response.data.animals.map(pet => new Pet(pet));
        res.status(200).send(formattedPet);
      })
      .catch(error => next(error));
  } else {
    console.log(`cache missed - making new request`);
    getToken()
      .then(() => {
        const config = {
          headers: { 'Authorization': `Bearer ${cache.key}` }
        };
        axios.get(url, config)
          .then(response => {
            const formattedPet = response.data.animals.map(pet => new Pet(pet));
            res.status(200).send(formattedPet);
          })
          .catch(error => next(error));
      });
  }
};

//creating a pet class
class Pet{
  constructor(pet){
    this.pet_name = pet.name;
    this.pet_gender = pet.gender;
    this.pet_type = pet.type;
    this.pet_age = pet.age;
    this.pet_size = pet.size;
    this.pet_status = pet.status;
    this.pet_distance = pet.distance;
    this.pet_link = pet.url;
  }
}



module.exports = getPets;
