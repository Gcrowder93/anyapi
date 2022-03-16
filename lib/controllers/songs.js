const { Router } = require('express');
const Song = require('../models/Song');

module.exports = Router()
  .post('/', async (req, res) => {
    const song = await Song.insert(req.body);
    res.json(song);
  })

  .get('/:id', async (req, res) => {
    const song = await Song.getById(req.params.id);
    res.json(song);
  })

  .get('/', async (req, res) => {
    const songs = await Song.getAll();
    res.json(songs);
  })

  .patch('/:id', async (req, res) => {
    const song = await Song.updateById(req.params.id, req.body);
    res.json(song);
  })

  .delete('/:id', async (req, res) => {
    const song = await Song.deleteById(req.params.id);
    res.json(song);
  });
