import { users, allUsersPreviousPurchasedData } from "./tempDB.js";

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

export default resolvers;
