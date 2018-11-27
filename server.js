const express = require('express');
const { ApolloServer, gql, registerServer } = require('apollo-server-express');

const PORT = 4000;

const app = express();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  },
};
const path = '/graphql';

const server = new ApolloServer({ typeDefs, resolvers });

//Mount a jwt or other authentication middleware that is run before the GraphQL execution
// app.use(path, jwtCheck);
// https://medium.com/codingthesmartway-com-blog/apollo-server-introduction-d24b593d4eda

server.applyMiddleware({ app, path: path });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)