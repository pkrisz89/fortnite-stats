import 'babel-polyfill';
import 'whatwg-fetch';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo'

import 'sanitize.css/sanitize.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
process.env.HTTP_PORT = process.env.HTTP_PORT || 3000;

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  uri: ''
});

const Root = () => <ApolloProvider client={client}><App/></ApolloProvider>

ReactDOM.render(
  <Root/>, document.getElementById('app'));
