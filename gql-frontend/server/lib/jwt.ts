// gql-frontend/src/lib/jwt.ts

import jwt from 'jsonwebtoken';
import { getBase64 } from '@contentpi/lib';

import config from '../config';

const {
  security: { secretKey },
} = config;

export function jwtVerify(accessToken: string, cb: any) {
  try {
    const accessTokenData = jwt.verify(accessToken, secretKey) as {
      data: any;
    };
    if (!accessTokenData.data) throw new Error('Error verifying token');

    // now we extract data from base 64
    // becuase this is how it is encoded

    const userData = getBase64(accessTokenData.data);
    return cb(userData);
  } catch (e) {
    cb(false);
  }
}

export function getUserData(accessToken: string): any {
  // this callback is so unneccessary
  // maybe it is good to return false, or data
  const userData = jwtVerify(accessToken, (data: any) => data);

  // so userData can either be false or userData

  return userData;
}
