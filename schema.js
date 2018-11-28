// import { makeExecutableSchema } from 'graphql-tools';
// import resolvers from './resolvers';

// const typeDefs = [`
//     type Course {
//         id: Int
//         title: String
//         author: String
//         description: String
//         topic: String
//         url: String
//     }
//     type Query {
//         allCourses: [Course]
//         course(id: Int!): Course
//     }
// `];

// const schema = makeExecutableSchema({
//     typeDefs,
//     resolvers
// });


// export default schema;
const { resolver } = require('graphql-sequelize');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList } = require('graphql')
const { Todo, TodoItem } = require('./server/models');

//Define Order type
const todoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'a todo',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the order.',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'status of the order'
    }
  }
})

//Define User type
const todoitemType = new GraphQLObjectType({
  name: 'TodoItem',
  description: 'A TodoItem',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user.',
    },
    content: {
      type: GraphQLString,
      description: 'The content of the item.',
    }
  }
})

//schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'root',
    fields: {
      todo: {
        type: new GraphQLList(todoType),
        resolve: resolver(Todo)
      }
    }
  })
})

module.exports = schema