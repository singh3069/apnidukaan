import { users, allUsersPreviousPurchasedData } from "./tempDB.js";
import { randomBytes } from "crypto";

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
  Mutation: {
    signUpUser: (_, args) => {
      const id = randomBytes(2).toString("hex");
      const newUser = {
        id,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: args.password,
      };

      users.push(newUser);
      return users.find((user) => user.id == id);
    },
  },
};

export default resolvers;
