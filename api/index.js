const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const { routerApi } = require('./routes');
const swaggerFile = require('./swagger/swagger_output.json');
require('dotenv').config({ path: './.env' });

const port = process.env.PORT;
const serverUp = process.env.SERVER_UP;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
routerApi(app);

app.get('/api', (req, res) => {
  res.redirect('/api/docs');
});

app.listen(port, () => {
  console.log(`${serverUp}: ${port}`);
});
