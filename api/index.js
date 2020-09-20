import koa from "koa"; // koa@2
import koaRouter from "koa-router";
import { ApolloServer, graphiqlKoa } from "apollo-server-koa";
import { makeExecutableSchema } from "graphql-tools";

import schema from "./schema";

console.log(schema);
const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers,
  }),
});

const app = new koa();
const router = new koaRouter();

server.applyMiddleware({ app });

const PORT = 8080;

// router.get(
//   "/graphiql",
//   graphiqlKoa({
//     endpointURL: "/graphql", // a POST endpoint that GraphiQL will make the actual requests to
//   })
// );

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT + server.graphqlPath}`);
});
