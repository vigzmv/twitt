import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import thunk from 'redux-thunk';

import reducers from './reducers';

const networkInterface = createNetworkInterface({
  uri: 'http://192.168.0.104:3000/graphql',
});

networkInterface.use([
  {
    async applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      try {
        const token = await AsyncStorage.getItem('@twitt');
        if (token != null) {
          req.options.headers.authorization = `Bearer ${token}`;
        }
      } catch (error) {
        throw error;
      }

      return next();
    },
  },
]);

export const client = new ApolloClient({
  networkInterface,
});

const middlewares = [client.middleware(), thunk];

if (__DEV__) {
  const { createLogger } = require('redux-logger');
  middlewares.push(createLogger());
}

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
