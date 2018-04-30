import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import thunk from 'redux-thunk';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import reducers from './reducers';

const BACKEND_URL = '192.168.0.103:3000';

const networkInterface = createNetworkInterface({
  uri: `http://${BACKEND_URL}/graphql`,
});

const wsClient = new SubscriptionClient(`ws://${BACKEND_URL}/subscriptions`, {
  reconnect: true,
  connectionParams: {},
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

const networkInterfaceWithSubs = addGraphQLSubscriptions(networkInterface, wsClient);

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubs,
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
