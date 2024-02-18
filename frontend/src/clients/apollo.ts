import { ApolloClient as Apollo, InMemoryCache} from '@apollo/client';
// import { createClient } from 'urql'

const ApolloClient = new Apollo({
    uri: "https://api.thegraph.com/subgraphs/name/adedamolaxl/avalanche-pietube",
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export default ApolloClient;