import jwt from 'jsonwebtoken';

import constants from './../config/constants';

export async function requireAuth(user) {
  if (!user || !user._id) {
    throw new Error('Unauthorised!');
  }
}

export function decodeToken(token) {
  const arr = token.split(' ');

  if (arr[0] === 'Bearer') {
    return jwt.verify(arr[1], constants.JWT_SECRET);
  }

  throw new Error('Invalid Token');
}
