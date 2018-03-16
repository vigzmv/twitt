import express from 'express';
import { createServer } from 'http';

import './config/db';
import constants from './config/constants';
import mocks from './mocks/';
import middlewares from './config/middlewares';

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
