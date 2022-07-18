import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, previousOrders } from "./tempDB.js";

const typeDefs = gql`
  type Query {
    previousOrders: [PreviousOrder]
    users: [User]
  }
  type User {
    id: ID
    FirstName: String
    LastName: String
    email: String
    password: String
  }

  type PreviousOrder {
    name: String
    id: ID
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    previousOrders: () => previousOrders,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // for playground
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
