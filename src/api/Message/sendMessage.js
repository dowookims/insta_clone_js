import { prisma } from "../../../generated/prisma-client";

export default {
  mutation: {
    sendMessage: async(_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message , to} = args;
      let room;
      if (roomId === undefined){
        if (user.id !== toId){
          room = await prisma.createRoom({ 
            participants: {
              connect: [ { id: toId}, { id: user.id }]
            },
          });
        }
      } else {
        room = await prisma.room({id: roomId });
      }
      if (!room){
        throw Error("Room Not Found")
      }
      const message = await prisma.createMessage({ text: message, to})
      
      return null;
    }
  }
};
