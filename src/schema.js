import { makeExecutableSchema} from 'graphql-tools';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';

const allTypes = fileLoader(path.join(__dirname, "api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "api/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;
//api의 모든 데이터들을 스키마에서 받는다.