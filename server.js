import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, allUsersPreviousPurchasedData } from "./tempDB.js";

const typeDefs = gql`
  type Query {
    previousOrdersOfAllUsers: [PreviousOrder]
    user(id: ID!): User
    users: [User]
  }
  type User {
    id: ID!
    FirstName: String
    LastName: String
    email: String
    password: String
    previousOrderOfSingleUser: [PreviousOrder]
  }

  type PreviousOrder {
    name: String
    by: ID!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_, args) => users.find((user) => user.id === args.id),
    previousOrdersOfAllUsers: () => allUsersPreviousPurchasedData,
  },
  User: {
    // finding the purchased items by the user on the basis of the user id
    previousOrderOfSingleUser: (user) => {
      return allUsersPreviousPurchasedData.filter(
        (order) => order.by === user.id
      );
    },
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
