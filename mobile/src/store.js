import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import thunk from 'redux-thunk';

import reducers from './reducers';

const networkInterface = createNetworkInterface({
  uri: 'http://192.168.0.106:3000/graphql',
});

export const client = new ApolloClient({
  networkInterface,
});

const middlewares = [client.middleware(), thunk];

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
