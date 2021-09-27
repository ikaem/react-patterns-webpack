// gql-frontend/src/index.tsx

import { render } from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import AppRoutes from './AppRoutes';
import config from '../server/config';
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
  uri: config.apiUrl,
  cache: new InMemoryCache(),
});

render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
  </BrowserRouter>,
  document.querySelector('#root')
);
