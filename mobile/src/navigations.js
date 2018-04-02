import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';

import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import HomeScreen from './screens/HomeScreen';
import { colors } from './utils/constants';

const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);
const addListener = createReduxBoundAddListener('root');

const AppMainNav = ReactNavigation.StackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

function AppNavigator(props) {
  const { dispatch, nav } = props;
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav,
    addListener,
  });

  return <AppMainNav navigation={navigation} />;
}

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(AppNavigator);

export const router = AppMainNav.router;
