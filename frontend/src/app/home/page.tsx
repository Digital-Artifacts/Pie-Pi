'use client'

import React from "react";
import ApolloClient from "@/clients/apollo";
import { ApolloProvider } from "@apollo/client";
import Home from "./home";

// import { Header } from "../../components/Header";





export default function HomePage() {
  
  
  return (

    <ApolloProvider client={ApolloClient}>
      <Home />
    </ApolloProvider>
  );
}

