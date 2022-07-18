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
    signUpUser: (_, { newUser }) => {
      const id = randomBytes(4).toString("hex");
      const newUserInput = {
        id,
        ...newUser,
      };

      users.push(newUserInput);
      return users.find((user) => user.id == id);
    },
  },
};

export default resolvers;
