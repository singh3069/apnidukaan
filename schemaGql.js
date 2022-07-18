import { gql } from "apollo-server";

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

export default typeDefs;
