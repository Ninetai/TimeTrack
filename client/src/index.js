import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';

import App from "./App";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// import React from 'react';
// import * as ReactDOM from 'react-dom/client';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import App from './App';

// const client = new ApolloClient({
//   uri: 'https://flyby-gateway.herokuapp.com/',
//   cache: new InMemoryCache(),
// });

// // Supported in React 18+
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>,
// );