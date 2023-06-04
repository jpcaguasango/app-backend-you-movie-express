const express = require('express');
const { routerMovie } = require('./movie.router');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/movies', routerMovie);
};

module.exports = { routerApi };
