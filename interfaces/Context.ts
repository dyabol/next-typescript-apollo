import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { NextContext } from "next";

export default interface IContext extends NextContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  query: {
    id: string;
    slug: string;
    token: string;
  };
}
