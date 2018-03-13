import express from 'express';
import bodyParser from 'body-parser';

import './config/db';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on PORT: ${PORT}`);
  }
});
