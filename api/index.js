import koa from 'koa' // koa@2
import koaRouter from 'koa-router'
import { ApolloServer, graphiqlKoa } from 'apollo-server-koa'
import { makeExecutableSchema } from 'graphql-tools'

import schema from './graphql'
import Knex from 'knex'
import { Model } from 'objection'
import knexConfig from './knexFile'
import dotenv from 'dotenv'
import { JWT } from './config'
import jwt from 'koa-jwt'

dotenv.config()
var environment = process.env.NODE_ENV || 'development'
var knex = Knex(knexConfig[environment])

knex.raw('select 1+1 as result').then(function () {
  console.log('Succesfully Connected')
})

Model.knex(knex)

const app = new koa()
const router = new koaRouter()

app.use(jwt({ secret: JWT.SECRET, passthrough: true }))

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers,
  }),
  context: ({ ctx: { state: user } }) => ({
    user,
  }),
  playground: true,
})

server.applyMiddleware({ app })

const PORT = 8080

// router.get(
//   "/graphiql",
//   graphiqlKoa({
//     endpointURL: "/graphql", // a POST endpoint that GraphiQL will make the actual requests to
//   })
// );

// app.use(async (ctx) => {
//   ctx.body = 'Hello World'
// })

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT + server.graphqlPath}`)
})
