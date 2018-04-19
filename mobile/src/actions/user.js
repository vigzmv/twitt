import { AsyncStorage } from 'react-native';

export function login() {
  return {
    type: 'LOGIN',
  };
}

export function logout() {
  return async dispatch => {
    try {
      await AsyncStorage.removeItem('@twitt');
      return dispatch({
        type: 'LOGOUT',
      });
    } catch (error) {
      throw error;
    }
  };
}

export function getUserInfo(info) {
  return {
    type: 'GET_USER_INFO',
    info,
  };
}
