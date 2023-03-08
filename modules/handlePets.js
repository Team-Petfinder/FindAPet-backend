'use strict';

const Animal = require('../model/animal');

const petHandler = {};

petHandler.getPets = function (req, res, next) {
  // empty object returns all
  // console.log(req.user);
  let queryObject = {email: req.user.email};
  Animal.find(queryObject)
    .then(data => res.status(200).send(data))
    .catch(error => next(error));
};

petHandler.postPets = function (req, res, next) {
  const data = req.body;
  Animal.create({...data, email: req.user.email})
    .then(createdAnimal => res.status(200).send(createdAnimal))
    .catch(error => next(error));
};

petHandler.deletePets = function (req, res, next) {
  const id = req.params.id;
  Animal.findByIdAndDelete(id)
    .then(deletedPet => res.status(200).send(deletedPet))
    .catch(error => next(error));
};


petHandler.putPets = function (req, res, next) {
  const id = req.params.id;
  const data = req.body;
  Animal.findByIdAndUpdate(id, data, { new: true, overwrite: true })
    .then(updatedPet => res.status(200).send(updatedPet))
    .catch(error => next(error));
};



module.exports = petHandler;
