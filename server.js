const express = require('express');
import schema from './schema';

const logger = require('morgan');
const bodyParser = require('body-parser');

const { ApolloServer, gql, registerServer } = require('apollo-server-express');

const PORT = 4000;

const app = express();


// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const path = '/graphql';
const server = new ApolloServer({ schema });

//Mount a jwt or other authentication middleware that is run before the GraphQL execution
// app.use(path, jwtCheck);
// https://medium.com/codingthesmartway-com-blog/apollo-server-introduction-d24b593d4eda

// working with Psql guide
// https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize

server.applyMiddleware({ app, path: path });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)