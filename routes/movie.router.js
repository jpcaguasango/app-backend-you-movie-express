const express = require('express');
const MovieService = require('../services/movie.service');
const routerMovie = express.Router();
const movieService = new MovieService();

/**
 * @swagger
 * paths:
 * /api/v1/movies/page/{page}:
 *  get:
 *    description: Get data per page
 *      response:
 *        200:
 *          description: Success
 *
 */
routerMovie.get('/page/:page', async (req, res) => {
  const { page } = req.params;
  const response = await movieService.findAll(page);
  res.status(response.statusCode).json(response.data);
});

/**
 * @swagger
 * /api/v1/movies/query/?title={title}&page={page}:
 *  get:
 *    description: Get data per page
 *      response:
 *        200:
 *          description: Success
 *
 */
routerMovie.get('/query', async (req, res) => {
  const { title, page } = req.query;
  const response = await movieService.findQuery(title, page);
  res.status(response.statusCode).json(response.data);
});

routerMovie.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await movieService.findOne(id);
  res.status(response.statusCode).json(response.data);
});

module.exports = { routerMovie };
