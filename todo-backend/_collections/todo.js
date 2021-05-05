use("todoApp");
// db.todo.drop();
db.todos.insertMany([
  {
    _id: ObjectId("5f762ca643893a773b2a5e48"),
    task: 'Sua lista de tarefas aqui!',
    completed: false,
    deleted: false,
    date: new Date()
  }
]);

