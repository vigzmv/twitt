import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import './config/db';
import constants from './config/constants';

const app = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(bodyParser.json());

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH,
  }),
);

app.use(
  constants.GRAPHQL_PATH,
  graphqlExpress({
    schema,
  }),
);

const graphQLServer = createServer(app);

app.listen(constants.PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on PORT: ${constants.PORT}`);
  }
});
