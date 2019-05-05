import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragment";

export default {
  Query:{
    me: async(_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      // return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
      const userProfile = await prisma.user({ id: user.id});
      const posts = await prisma.user({ id: user.id}).posts();
      return {
        user: userProfile, 
        posts
      };
    }
  },
  User: {
    // fullName: (_, __, { request })
    // @param 1 is a parent(root) resolver that above the query. if i called fullName, parent will be user
    
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`
    }
  }
};