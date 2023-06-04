const axios = require('axios');

const useMyFetch = (method, path) => {
  const BASE_URL_API = process.env.THE_MOVIE_BASE_URL_API;
  const BEARER_TOKEN = process.env.THE_MOVIE_BEARER_TOKEN;

  const options = {
    method: method,
    url: `${BASE_URL_API}${path}`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };

  return axios.request(options);
};

module.exports = { useMyFetch };
