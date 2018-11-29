// https://medium.com/@sam.chai0501/graphql-converting-my-node-express-sequelize-postgresql-back-end-24232e535fb9
const { resolver } = require('graphql-sequelize');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList } = require('graphql')
const { Todo, TodoItem } = require('./server/models');



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


//Define Order type
const todoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'a todo',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the todolist.',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'todo title'
    },
    todoItem: {
      type: new GraphQLList(todoitemType),
      description: 'todo items'

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
      },
      todoItem: {
        type: new GraphQLList(todoitemType),
        resolve: resolver(TodoItem)
      }
    }
  })
})

module.exports = schema