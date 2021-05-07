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
      <div className="">
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className={`nav-link ${filter === 'todo' ? 'active' : ''}`}
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
            onClick={() => updateTodosToShow("todo")}
          >
            To Do
          </button>
          <button
            className={`nav-link ${filter === 'done' ? 'active' : ''}`}
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
            onClick={() => updateTodosToShow("done")}
          >
            Done
          </button>
          <button
            className={`nav-link ${filter === 'deleted' ? 'active' : ''}`}
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
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
