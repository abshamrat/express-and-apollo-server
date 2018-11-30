// const Todo = require('./todo');

module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  TodoItem.associate = (models) => {
    TodoItem.belongsTo(models.Todo, {
      foreignKey: 'todoId',
      onDelete: 'CASCADE',
    });
  };

  // TodoItem.belongsTo(Todo, {foreignKey: 'todoId'});

  return TodoItem;
};

// const TodoItem = sequelize.define('TodoItem', {
//   content: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   complete: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false,
//   },
// });

// TodoItem.belongsTo(Todo);

// module.exports = TodoItem;