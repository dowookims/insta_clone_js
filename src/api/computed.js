import { prisma } from "../../generated/prisma-client";

export default {
  User: {
  // fullName: (_, __, { request })
  // @param 1 is a parent(root) resolver that above the query. if i called fullName, parent will be user
  
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`
    },
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id:parentId } = parent;
      try {
        return await prisma.$exists.user({
          AND: [
            { 
              id: user.id 
            }, 
            {
              following_some: 
                {
                  id: parentId
                }  
            }
          ]
        });
      } catch (err){
        console.log(err)
      }
    },
    isSelf: ( parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
}