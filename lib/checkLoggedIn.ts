import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';
import gql from 'graphql-tag';

export default (apolloClient: ApolloClient<NormalizedCacheObject>) =>
  apolloClient
    .query({
      query: gql`
        query getUser {
          me {
            id
            fullName
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
