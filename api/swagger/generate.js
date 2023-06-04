const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['./routes/movie.router.js'];

swaggerAutogen(outputFile, endpointsFiles);
