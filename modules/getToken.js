'use strict';


require('dotenv').config();
const axios = require('axios');
let cache = require('../cache');


const getToken = async (req, res, next) => {
  let url = `https://api.petfinder.com/v2/oauth2/token`;
  const config = {
    'grant_type': 'client_credentials',
    'client_id': process.env.CLIENT_API,
    'client_secret': process.env.SECRET_KEY
  };
  let response = await axios.post(url, config);
  console.log(response);
  const key = response.data.access_token;
  cache['key'] = key;
  cache['timestamp'] = Date.now();
};


module.exports = getToken;
