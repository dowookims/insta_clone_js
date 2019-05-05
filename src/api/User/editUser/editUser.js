import { prisma } from '../../../../generated/prisma-client/index.js';

export default {
  Mutation: {
    editUser: async(_, args, { request, isAuthenticated }) => {
      isAuthenticated(request)
      const { name, email, firstName, lastName, bio } = args;
      const { user } = request;
      const hasName = await prisma.user({ name })
      if ((name !== user.name) && hasName ) return false
      else {
        return prisma.updateUser({ 
          where: 
            {id: user.id}, 
            data: 
              {name, email, firstName, lastName, bio}
          })
      }
    }
  }
}