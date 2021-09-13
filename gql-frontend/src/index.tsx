// gql-frontend/src/index.tsx

import { render } from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import AppRoutes from './AppRoutes';
import config from '../server/config';

const client = new ApolloClient({
  uri: config.apiUrl,
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <AppRoutes />
  </ApolloProvider>,
  document.querySelector('#root')
);
