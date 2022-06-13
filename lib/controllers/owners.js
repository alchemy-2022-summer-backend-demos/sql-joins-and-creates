const { Router } = require('express');
const { Owner } = require('../models/Owner');
module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const owner = await Owner.insert(req.body);
      if (req.body.petIds) {
        await Promise.all(req.body.petIds.map((id) => owner.addPetById(id)));
      }
      res.json(owner);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const owner = await Owner.getById(req.params.id);
      res.json(owner);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const owners = await Owner.getAll();
    const respData = owners.map(({ id, name }) => ({ id, name }));
    res.json(respData);
  });
