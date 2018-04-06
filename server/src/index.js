import express from 'express';
import { createServer } from 'http';

import constants from './config/constants';
import middlewares from './config/middlewares';

import './config/db';

import mocks from './mocks/';

const app = express();
middlewares(app);

const graphQLServer = createServer(app);

// mocks().then(() => {
graphQLServer.listen(constants.PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on PORT: ${constants.PORT}`);
  }
});
// });
