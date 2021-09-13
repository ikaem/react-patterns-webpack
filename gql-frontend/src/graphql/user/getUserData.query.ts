// gql-frontend/src/graphql/user/getUserData.query.ts

import { gql } from '@apollo/client';

export default gql`
  query GetUserData($token: String!) {
    getUserData(token: $token) {
      id
      email
      username
      privilege
      active
    }
  }
`;
