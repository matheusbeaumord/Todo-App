import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList(props) {
  const {
    handleDelete,
    handleEdit,
    excludeTasks,
    doneTask,
    updateTodosToShow,
    todos,
    filter,
  } = props;
  const items = todos;

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <button
            type="button"
            className={`${filter === 'todo' ? 'btn btn-success btn-block mt-1': 'btn btn-info btn-block mt-1 '}`}
            onClick={() => updateTodosToShow("todo")}
          >
            To Do
          </button>
        </div>
        <div className="col-md-4">
          <button
            type="button"
            className="btn btn-info btn-block mt-1"
            onClick={() => updateTodosToShow("done")}
          >
            Done
          </button>
        </div>
        <div className="col-md-4">
          <button
            type="button"
            className="btn btn-info btn-block mt-1"
            onClick={() => updateTodosToShow("deleted")}
          >
            Deleted
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        ""
      ) : (
        <ul className="list-group my-5">
          {items.map(({ _id, task, completed, date, deleted }, i) => {
            return (
              <TodoItem
                key={i}
                title={task}
                date={date}
                completed={completed}
                deleted={deleted}
                handleDelete={(e) => handleDelete(e, _id)}
                handleEdit={(e) => handleEdit(e, _id)}
                doneTask={(e) => doneTask(e, _id)}
              />
            );
          })}
          {filter !== "deleted" ? (
            ""
          ) : (
            <div className="row mt-4">
              <button
                type="button"
                className="btn btn-danger btn-block mt-1"
                onClick={excludeTasks}
              >
                Exclude Deleleted tasks
              </button>
            </div>
          )}
        </ul>
      )}
    </div>
  );
}
