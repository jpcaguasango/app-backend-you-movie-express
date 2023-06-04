require('dotenv').config({ path: './.env' });

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: process.env.SWAGGER_TITLE,
      version: '0.1.0',
      description: process.env.SWAGGER_DESCRIPTION,
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Juan Pablo Caguasango',
        email: 'jpablo.caguasango@gmail.com',
      },
    },
    servers: [
      {
        url: process.env.PATH_URL,
      },
    ],
  },
  apis: ['../routes/*.js'],
};

module.exports = { swaggerOptions: options };
