import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      console.log(request)
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      return true;
      }
    }
  }
