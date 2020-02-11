import React from 'react';
import BookList from './components/BookList';
import  { default as ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
      <h1>Andy's Reading List</h1>
      <BookList />
    </div>
    </ApolloProvider>
  );
}

export default App;
