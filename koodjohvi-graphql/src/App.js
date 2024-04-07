import './App.css';
import React from "react";
import { BrowserRouter as HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import ProtectedRoute from './Components/ProtectedRoute';

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://01.kood.tech/api/graphql-engine/v1/graphql" }),
]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <HashRouter basename='/koodGraphQL'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/error" element={<h1>Invalid Path</h1>} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
