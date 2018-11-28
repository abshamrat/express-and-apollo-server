const express = require('express');
import schema from './schema';
const { ApolloServer, gql, registerServer } = require('apollo-server-express');

const PORT = 4000;

const app = express();

const path = '/graphql';

const server = new ApolloServer({ schema });

//Mount a jwt or other authentication middleware that is run before the GraphQL execution
// app.use(path, jwtCheck);
// https://medium.com/codingthesmartway-com-blog/apollo-server-introduction-d24b593d4eda

server.applyMiddleware({ app, path: path });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)