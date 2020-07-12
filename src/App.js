// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDOM from 'react-dom';

// import Apollo Client libraries
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

import { setContext } from 'apollo-link-context';

import GlobalStyle from '/components/GlobalStyle';

import Pages from './pages';

// configure Apollo Client to work with our local API server
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  // add empty resolvers object to be able to query local cache
  resolvers: {},
  connectToDevTools: true
});

const data = {
  isLoggedIn: !!localStorage.getItem('token')
};

// write the cache data on initial load
cache.writeData({ data });

// write cache data after cache is reset
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
