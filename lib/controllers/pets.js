const { Router } = require('express');
const Pet = require('../models/Pet');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      // creates a new row in the pets table in the database
      const pet = await Pet.insert(req.body);
      // loops through each id in the ownerIds array in the request body
      // calls addOwnerById with each id
      // addOwnerById adds a new row in the pets_owners database
      await Promise.all(req.body.ownerIds.map((id) => pet.addOwnerById(id)));
      res.json(pet);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const pet = await Pet.getById(req.params.id);
      res.json(pet);
    } catch (e) {
      next(e);
    }
  });
