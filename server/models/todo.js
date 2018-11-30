// const TodoItem = require('./todoitem');

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Todo.associate = (models) => {
    return Todo.hasMany(models.TodoItem, {
      foreignKey: 'todoId',
      as: 'todoItems',
    });
  };
  // Todo.TodoItem = Todo.hasMany(TodoItem, {as: 'TodoItems',  foreignKey: 'todoId'});

  return Todo;
};

// const Todo = sequelize.define('Todo', {
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// Todo.TodoItem = Todo.hasMany(TodoItem, {as: 'TodoItems'});

// module.exports = Todo;