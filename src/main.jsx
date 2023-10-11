import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:4700/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
  
)
