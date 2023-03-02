'use strict';

require('dotenv').config();
const axios = require('axios');
const cache = require('../cache');
const getToken = require('./getToken');



const getPets = async (req, res, next) => {
  let url = `https://api.petfinder.com/v2/animals`;
  getToken();
  res.send(cache);
  // if (cache.key && (Date.now() - cache.key.timestamp < 3600000)) {
  //   let config = { headers: { 'Authorization': `Bearer ${cache.key}` } };
  //   let response = await axios.get(url, config);
  //   res.status(200).send(response);
  // }
  // else {
  //   getToken;
  //   let config = { headers: { 'Authorization': `Bearer ${cache.key}` } };
  //   let response = await axios.get(url, config);
  //   res.status(200).send(response.data);
  // }
};



module.exports = getPets;
