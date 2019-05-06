import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
  // fullName: (_, __, { request })
  // @param 1 is a parent(root) resolver that above the query. if i called fullName, parent will be user
  
    fullName: parent => {
    return `${parent.firstName} ${parent.lastName}`
    },
    amIFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id:parentId } = parent;
      try {
        const exists = await prisma.$exists.user({AND: [{id:parentId}, {followers_some: [user.id]}]
        });
        if (exists) return true;
        else return false;
      } catch (err){
        console.log(err)
      }
    },
    itsMe: ( parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
}