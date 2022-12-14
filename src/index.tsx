import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const container = document.getElementById('root');
const root = createRoot(container!);

var client = new ApolloClient({
  uri: 'http://localhost:8081/v1/graphql',
  cache: new InMemoryCache(),
});
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === "production"){
  client = new ApolloClient({
    uri: 'https://fast-heron-34.hasura.app/v1/graphql',
    cache: new InMemoryCache(),
  });
}

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
