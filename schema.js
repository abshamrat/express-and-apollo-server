// https://medium.com/@sam.chai0501/graphql-converting-my-node-express-sequelize-postgresql-back-end-24232e535fb9
// Schema help: https://join-monster.readthedocs.io/en/latest/batch-one-many/
const { resolver } = require('graphql-sequelize');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLNonNull, GraphQLList } = require('graphql')
const Todo = require('./server/models').Todo;
const TodoItem = require('./server/models/todoitem').TodoItem;

console.log(Todo.associate);


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
    },
    complete: {
      type: GraphQLBoolean
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
      // resolve: resolver(Todo.TodoItem),
      sqlBatch: {
        // which column to match up to the users
        thisKey: 'todoId',
        // the other column to compare to
        parentKey: 'id'
      },

    }
  }
});



//schema 
// helper link: https://github.com/mickhansen/graphql-sequelize
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'root',
    fields: {
      allTodo: {
        type: new GraphQLList(todoType),
        resolve: resolver(Todo)
      },
      todo: {
        type: new GraphQLList(todoType),
         // args will automatically be mapped to `where`
         args: {
          id: {
            description: 'id of the todo',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: resolver(Todo)
      },
      todoItem: {
        type: new GraphQLList(todoitemType),
         // args will automatically be mapped to `where`
         args: {
          query: {
            description: "Fuzzy-matched name of user",
            type: new GraphQLNonNull(GraphQLString),
          }
        },
        resolve: resolver(TodoItem, {
          // Custom `where` clause that fuzzy-matches user's name and
          // alphabetical sort by username
          before: (findOptions, args) => {
            findOptions.where = {
              content: { "$like": `%${args.query}%` },
            };
            findOptions.order = [['content', 'ASC']];
            return findOptions;
          },
          // Custom sort override for exact matches first
          after: (results, args) => {
            return results.sort((a, b) => {
              if (a.content === args.query) {
                return 1;
              }
              else if (b.content === args.query) {
                return -1;
              }
              return 0;
            });
          }
        })
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'root_mutations',
    description: 'mutations',
    fields: () => ({
      createTodo: {
        type: todoType,
        args: {
          title:{
            type: new GraphQLNonNull( GraphQLString)
          }
        },
        resolve: (rootValue, input) => {
          if (input.title === "") {
           throw new Error('Title is required');
          }
          return Todo.create({
            title: input.title
          }).then(function(m){
            return m
          })
        }
      },
    })
  }),

})

module.exports = schema