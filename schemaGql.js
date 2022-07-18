import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    previousOrdersOfAllUsers: [PreviousOrder]
    user(id: ID!): User
    users: [User]
  }
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    previousOrderOfSingleUser: [PreviousOrder]
  }

  type PreviousOrder {
    name: String
    by: ID!
  }

  type Mutation {
    signUpUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
  }
`;

export default typeDefs;
