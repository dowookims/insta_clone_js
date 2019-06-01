import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragment";

export default {
  Query:{
    me: async(_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      // return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
      return await prisma.user({ id: user.id});
    }
  },
  
};