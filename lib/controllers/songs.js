const { Router } = require('express');
const Song = require('../models/Song');

module.exports = Router()
  .post('/', async (req, res) => {
    try {
      const song = await Song.insert(req.body);
      res.json(song);
    } catch (error) {
      res.status(500).send(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const song = await Song.getById(req.params.id);
      res.json(song);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const songs = await Song.getAll();
      res.json(songs);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const song = await Song.updateById(req.params.id, req.body);
    res.json(song);
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const song = await Song.deleteById(req.params.id);
      res.json(song);
    } catch (error) {
      next(error);
    }
  });
