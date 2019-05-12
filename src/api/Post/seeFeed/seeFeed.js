import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async(_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following();
      console.log(following);
      return [];
    }
  }
}