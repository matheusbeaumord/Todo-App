import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import {
  getAllTodos,
  createTodo,
  getTaskById,
  // deleteTodo,
  updateTodo,
  removeTasks,
} from "./helpers/APIHelpers";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(false);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");

  const data = new Date();
  const newDate =
    data.getHours() +
    ":" +
    data.getMinutes() +
    " - " +
    data.getDate() +
    "/" +
    (data.getMonth() + 1) +
    "/" +
    data.getFullYear();

  const getAllTasks = async () => {
    const listTodos = await getAllTodos();
    setTodos(listTodos.filter((item) => !item.completed && !item.deleted));
    setItems(listTodos);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo) {
      alert("please enter something");
      return;
    }
    if (items.some(({ task }) => task === todo)) {
      alert(`Task: ${todo} already exists`);
      return;
    }
    const newTodo = await createTodo({ task: todo, date: newDate });
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  // const handleDelete = async (e, id) => {
  //   try {
  //     e.stopPropagation()
  //     await deleteTodo(id)
  //     setTodos(todos.filter(({ _id: i }) => id !== i))
  //   } catch (err) { }
  // };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const {
      data: { _id, task, deleted },
    } = await getTaskById(id);
    if (deleted) {
      const completedTrue = await updateTodo(_id, {
        task: task,
        deleted: false,
        date: newDate,
      });
      getAllTasks();
      return completedTrue;
    }
    await updateTodo(_id, { task: task, deleted: true, date: newDate });
    getAllTasks();
  };

  const handleEdit = async (e, id) => {
    e.stopPropagation();
    const { data } = await getTaskById(id);
    setTodo(data.task);
    setEdit(true);
    setId(id);
  };

  const updateTask = async (e) => {
    try {
      e.stopPropagation();
      await updateTodo(id, { task: todo, date: newDate });
    } catch (error) {}
  };

  const excludeTasks = async (e) => {
    e.preventDefault();
    await removeTasks();
    setFilter("")
    getAllTasks();
  };

  const doneTask = async (e, id) => {
    e.stopPropagation();
    const {
      data: { _id, task, completed },
    } = await getTaskById(id);
    if (completed) {
      const completedTrue = await updateTodo(_id, {
        task: task,
        completed: false,
        date: newDate,
      });
      getAllTasks();
      return completedTrue;
    }
    await updateTodo(_id, { task: task, completed: true, date: newDate });
    getAllTasks();
  };

  const updateTodosToShow = (value) => {
    switch (value) {
      case "todo":
        getAllTasks()
        // setTodos(items.filter((item) => !item.completed && !item.deleted));
        setFilter(value);
        break;
      case "done":
        // setTodos(result)
        setTodos(items.filter((item) => item.completed));
        setFilter(value);
        break;
      case "deleted":
        setTodos(items.filter((item) => item.deleted));
        setFilter(value);
        break;
      default:
        break;
    }
  };

  const handleChange = ({ target }) => setTodo(target.value);

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 col-md-8 mx-auto mt-4">
          <h3 className="text-capitalize text-center">Todo List</h3>
          <TodoInput
            todo={todo}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            updateTask={updateTask}
            edit={edit}
          />
          <TodoList
            edit={edit}
            todos={todos}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            excludeTasks={excludeTasks}
            doneTask={doneTask}
            updateTodosToShow={updateTodosToShow}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
