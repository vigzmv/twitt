import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthScreen from './screens/AuthScreen';

import HeaderAvatar from './components/HeaderAvatar';

import { colors } from './utils/constants';

const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);
const addListener = createReduxBoundAddListener('root');

const Tabs = ReactNavigation.TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerTitle: 'Home',
        tabBarIcon: ({ tintColor }) => <FontAwesome size={20} color={tintColor} name="home" />,
      }),
    },

    Explore: {
      screen: ExploreScreen,
      navigationOptions: () => ({
        headerTitle: 'Explore',
        tabBarIcon: ({ tintColor }) => <FontAwesome size={20} color={tintColor} name="search" />,
      }),
    },

    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: () => ({
        headerTitle: 'Notifications',
        tabBarIcon: ({ tintColor }) => <FontAwesome size={20} color={tintColor} name="bell" />,
      }),
    },

    Profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerTitle: 'Profile',
        tabBarIcon: ({ tintColor }) => <FontAwesome size={20} color={tintColor} name="user" />,
      }),
    },
  },
  {
    lazy: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.PRIMARY_LIGHT,
      inactiveTintColor: colors.GREY_LIGHT,
      style: {
        backgroundColor: colors.WHITE,
        height: 45,
      },
      indicatorStyle: {
        backgroundColor: colors.PRIMARY_LIGHTEST,
      },
    },
  },
);

const AppMainNav = ReactNavigation.StackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: () => ({
        headerLeft: <HeaderAvatar />,
        headerRight: <View />, // to center things out
      }),
    },
  },
  {
    cardStyle: {
      backgroundColor: '#f1f6fa',
    },
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.PRIMARY_LIGHTER,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.WHITE,
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
      },
    },
  },
);

function AppNavigator(props) {
  const { dispatch, nav } = props;
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav,
    addListener,
  });

  if (!props.user.isAuthenticated) {
    return <AuthScreen />;
  }

  return <AppMainNav navigation={navigation} />;
}

const mapStateToProps = state => ({
  nav: state.nav,
  user: state.user,
});

export default connect(mapStateToProps)(AppNavigator);

export const { router } = AppMainNav;
