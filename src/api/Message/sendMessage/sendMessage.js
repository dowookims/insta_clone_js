import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
  Mutation: {
    sendMessage: async(_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId} = args;
      let room;
      if (roomId === undefined){
        if (user.id !== toId){
          room = await prisma.createRoom({ 
            participants: {
              connect: [ { id: toId}, { id: user.id }]
            },
          })
        }
      } else {
        room = await prisma.room({id: roomId })
      }
      if (!room){
        throw Error("Room Not Found")
      }

      const getTo = room.participants.filter(participant => participant.id !== user.id)[0];
      const newMessage = await prisma.createMessage({
        text: message, 
        from: {
          connect: { id: user.id }
        },
        to: {
          connect: { id: roomId ? getTo.id : toId}
        },
        room: {
          connect: {
            id: room.id
          }
        }
      });
      
      return newMessage;
    }
  }
};
