import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from "apollo-boost";
import Vue from "vue";
import VueApollo from "vue-apollo";

const httpLink = new HttpLink({ uri: `${window.location.origin}/api` });
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("user-token");

  operation.setContext({
    headers: {
      Authorization: token || ""
    }
  });

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  // request -> apply auth -> send http request.
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export default apolloProvider;
