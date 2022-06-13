const { Router } = require('express');
const { Owner } = require('../models/Owner');
module.exports = Router()
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
    const respData = owners.map(({ name }) => ({ name }));
    res.json(respData);
  });
